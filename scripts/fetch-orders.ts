/**
 * Fetches all completed orders from Stripe (card) and Mercado Pago (PIX),
 * parses the GFJ metadata, and prints a human-readable order log.
 *
 * Usage:  npx tsx scripts/fetch-orders.ts
 */
import Stripe from 'stripe'
import { MercadoPagoConfig, Payment } from 'mercadopago'

// ── helpers ──────────────────────────────────────────────────────────────────

function fmtBrl(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fmtDate(ts: number | string | undefined) {
  if (!ts) return '—'
  const d = typeof ts === 'number' ? new Date(ts * 1000) : new Date(ts)
  return d.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
}

function camelToSnake(key: string): string {
  return key
    .replace(/([A-Z])/g, '_$1')
    .replace(/([a-zA-Z])(\d)/g, '$1_$2')
    .toLowerCase()
}

function normalizeMpMeta(raw: Record<string, unknown> | null | undefined): Record<string, string> {
  const o: Record<string, string> = {}
  if (!raw) return o
  for (const [k, v] of Object.entries(raw)) {
    if (v == null) continue
    o[camelToSnake(k)] = typeof v === 'string' ? v : String(v)
  }
  return o
}

type OrderLine = { name: string; qty: number; ring?: string }

function parseSnapshot(meta: Record<string, string>): OrderLine[] {
  const PREFIX = 'gfj_ord'
  const single = meta[PREFIX]
  let json = ''
  if (single) {
    json = single
  } else {
    const n = parseInt(meta[`${PREFIX}_n`] ?? '', 10)
    if (!Number.isFinite(n) || n < 1) return []
    for (let p = 0; p < n; p++) {
      const part = meta[`${PREFIX}_${p}`]
      if (!part) return []
      json += part
    }
  }
  try {
    const x = JSON.parse(json) as { v: number; lines: { productName: string; quantity: number; ringSizeBr?: string }[] }
    if (x?.v === 1 && Array.isArray(x.lines)) {
      return x.lines.map((l) => ({ name: l.productName, qty: l.quantity, ring: l.ringSizeBr }))
    }
  } catch { /* ignore */ }
  return []
}

interface Order {
  id: string
  source: 'stripe' | 'mercadopago'
  status: string
  date: string
  client: string
  email: string
  phone: string
  address: string
  cep: string
  shippingMethod: string
  shippingCents: number
  productsCents: number
  totalCents: number
  paymentMethod: string
  items: OrderLine[]
}

function printOrder(o: Order, idx: number) {
  const sep = '─'.repeat(72)
  console.log(`\n${sep}`)
  console.log(`  #${idx + 1}  ${o.date}  [${o.source.toUpperCase()} · ${o.status.toUpperCase()}]`)
  console.log(sep)
  console.log(`  Cliente   : ${o.client}`)
  console.log(`  E-mail    : ${o.email}`)
  console.log(`  Telefone  : ${o.phone || '—'}`)
  console.log(`  Endereço  : ${o.address || '—'}`)
  console.log(`  CEP       : ${o.cep || '—'}`)
  console.log(`  Pagamento : ${o.paymentMethod}  (ref: ${o.id})`)
  console.log(`  Frete     : ${o.shippingMethod}  ${fmtBrl(o.shippingCents)}`)
  console.log(`  Subtotal  : ${fmtBrl(o.productsCents)}`)
  console.log(`  Total     : ${fmtBrl(o.totalCents)}`)
  if (o.items.length) {
    console.log(`  Itens     :`)
    for (const it of o.items) {
      const ring = it.ring ? `  (aro ${it.ring})` : ''
      console.log(`              • ${it.name} ×${it.qty}${ring}`)
    }
  }
}

// ── Stripe ────────────────────────────────────────────────────────────────────

async function fetchStripeOrders(): Promise<Order[]> {
  const key = process.env.STRIPE_SECRET_KEY?.trim()
  if (!key) { console.warn('⚠  STRIPE_SECRET_KEY não definida — pulando Stripe.'); return [] }

  const stripe = new Stripe(key)
  const orders: Order[] = []
  let hasMore = true
  let startingAfter: string | undefined

  while (hasMore) {
    const list = await stripe.paymentIntents.list({
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    })

    for (const pi of list.data) {
      const meta = pi.metadata as Record<string, string>
      if (meta.source !== 'gloria-faz-joias' || meta.order_type !== 'cart') continue

      const productsCents = parseInt(meta.products_cents ?? '', 10)
      const shippingCents = parseInt(meta.shipping_cents ?? '', 10)
      const items = parseSnapshot(meta)

      orders.push({
        id: pi.id,
        source: 'stripe',
        status: pi.status,
        date: fmtDate(pi.created),
        client: meta.customer_name ?? '—',
        email: meta.customer_email ?? '—',
        phone: meta.customer_phone ?? '—',
        address: meta.customer_address ?? '—',
        cep: meta.customer_cep ?? '—',
        shippingMethod: meta.shipping_method === 'correios' ? 'Correios (PAC)' : 'Motoboy',
        shippingCents: Number.isFinite(shippingCents) ? shippingCents : 0,
        productsCents: Number.isFinite(productsCents) ? productsCents : 0,
        totalCents: pi.amount,
        paymentMethod: 'Cartão',
        items,
      })
    }

    hasMore = list.has_more
    if (list.data.length) startingAfter = list.data[list.data.length - 1].id
  }

  return orders
}

// ── Mercado Pago ──────────────────────────────────────────────────────────────

async function fetchMpOrders(): Promise<Order[]> {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim()
  if (!token) { console.warn('⚠  MERCADOPAGO_ACCESS_TOKEN não definida — pulando Mercado Pago.'); return [] }

  const client = new MercadoPagoConfig({ accessToken: token })
  const paymentApi = new Payment(client)
  const orders: Order[] = []

  // MP search: fetch payments with external_reference starting with "gloria-"
  // Using the search endpoint with offset pagination
  let offset = 0
  const limit = 100
  let total = Infinity

  while (offset < total) {
    const result = await paymentApi.search({
      options: {
        limit,
        offset,
      },
    })

    const results = result.results ?? []
    total = result.paging?.total ?? results.length
    if (results.length === 0) break

    for (const p of results) {
      const meta = normalizeMpMeta(p.metadata as Record<string, unknown> | undefined)
      if (meta.source !== 'gloria-faz-joias' || meta.order_type !== 'cart') continue

      const productsCents = parseInt(meta.products_cents ?? '', 10)
      const shippingCents = parseInt(meta.shipping_cents ?? '', 10)
      const txCents = Math.round((p.transaction_amount ?? 0) * 100)
      const items = parseSnapshot(meta)

      orders.push({
        id: String(p.id ?? ''),
        source: 'mercadopago',
        status: p.status ?? '—',
        date: fmtDate(p.date_created ?? undefined),
        client: meta.customer_name ?? '—',
        email: meta.customer_email ?? '—',
        phone: meta.customer_phone ?? '—',
        address: meta.customer_address ?? '—',
        cep: meta.customer_cep ?? '—',
        shippingMethod: meta.shipping_method === 'correios' ? 'Correios (PAC)' : 'Motoboy',
        shippingCents: Number.isFinite(shippingCents) ? shippingCents : 0,
        productsCents: Number.isFinite(productsCents) ? productsCents : 0,
        totalCents: txCents,
        paymentMethod: 'Pix',
        items,
      })
    }

    offset += results.length
    if (results.length < limit) break
  }

  return orders
}

// ── main ──────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🔍  Buscando pedidos em produção...\n')

  const [stripeOrders, mpOrders] = await Promise.all([fetchStripeOrders(), fetchMpOrders()])

  const all = [...stripeOrders, ...mpOrders].sort((a, b) => {
    // sort descending by date string (ISO-like won't work; use id heuristic)
    return b.date.localeCompare(a.date)
  })

  if (all.length === 0) {
    console.log('Nenhum pedido encontrado.')
    return
  }

  console.log(`\n✅  ${all.length} pedido(s) encontrado(s) (${stripeOrders.length} cartão · ${mpOrders.length} pix)\n`)

  all.forEach((o, i) => printOrder(o, i))

  console.log('\n' + '─'.repeat(72) + '\n')

  // Summary table
  const succeeded = all.filter((o) => o.status === 'succeeded' || o.status === 'approved')
  const totalRevenue = succeeded.reduce((sum, o) => sum + o.totalCents, 0)
  console.log(`  Pedidos aprovados : ${succeeded.length} / ${all.length}`)
  console.log(`  Receita total     : ${fmtBrl(totalRevenue)}`)
  console.log()
}

main().catch((e) => { console.error(e); process.exit(1) })
