/**
 * Fetches ALL Mercado Pago payments from today and prints raw details.
 */
import Stripe from 'stripe'
import { MercadoPagoConfig, Payment } from 'mercadopago'

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

function fmtBrl(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function fmtDate(ts: string | undefined) {
  if (!ts) return '—'
  return new Date(ts).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
}

async function main() {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim()
  if (!token) { console.error('MERCADOPAGO_ACCESS_TOKEN não definida'); process.exit(1) }

  const client = new MercadoPagoConfig({ accessToken: token })
  const paymentApi = new Payment(client)

  // Today in São Paulo timezone
  const now = new Date()
  const spOffset = -3 * 60
  const spNow = new Date(now.getTime() + (spOffset - now.getTimezoneOffset()) * 60000)
  const todayStr = spNow.toISOString().slice(0, 10)
  console.log(`\n🔍  Buscando pagamentos MP de hoje (${todayStr} horário SP)...\n`)

  // Search with date range
  const beginDate = `${todayStr}T00:00:00.000-03:00`
  const endDate   = `${todayStr}T23:59:59.999-03:00`

  let offset = 0
  const limit = 100
  let total = Infinity
  let found = 0

  while (offset < total) {
    const result = await paymentApi.search({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options: { limit, offset, begin_date: beginDate, end_date: endDate, sort: 'date_created', criteria: 'desc' } as any,
    })

    const results = result.results ?? []
    total = result.paging?.total ?? results.length
    if (results.length === 0) break

    for (const p of results) {
      found++
      const meta = normalizeMpMeta(p.metadata as Record<string, unknown> | undefined)
      const txCents = Math.round((p.transaction_amount ?? 0) * 100)
      const shippingCents = parseInt(meta.shipping_cents ?? '', 10)
      const productsCents = parseInt(meta.products_cents ?? '', 10)

      console.log('─'.repeat(72))
      console.log(`  ID        : ${p.id}`)
      console.log(`  Status    : ${p.status}  (${p.status_detail ?? '—'})`)
      console.log(`  Data      : ${fmtDate(p.date_created ?? undefined)}`)
      console.log(`  Valor     : ${fmtBrl(txCents)}`)
      console.log(`  Cliente   : ${meta.customer_name ?? '—'}`)
      console.log(`  E-mail    : ${meta.customer_email ?? '—'}`)
      console.log(`  Telefone  : ${meta.customer_phone ?? '—'}`)
      console.log(`  Endereço  : ${meta.customer_address ?? '—'}`)
      console.log(`  CEP       : ${meta.customer_cep ?? '—'}`)
      console.log(`  Frete     : ${meta.shipping_method ?? '—'}  ${Number.isFinite(shippingCents) ? fmtBrl(shippingCents) : '—'}`)
      console.log(`  Subtotal  : ${Number.isFinite(productsCents) ? fmtBrl(productsCents) : '—'}`)
      console.log(`  Ext Ref   : ${p.external_reference ?? '—'}`)
      if (Object.keys(meta).length === 0) {
        console.log(`  Metadata  : (vazio — chaves raw abaixo)`)
        console.log(`  Raw meta  :`, JSON.stringify(p.metadata, null, 4))
      }
    }

    offset += results.length
    if (results.length < limit) break
  }

  if (found === 0) {
    console.log('Nenhum pagamento encontrado hoje no Mercado Pago.')
    console.log('\nBuscando os 5 mais recentes (sem filtro de data)...\n')

    const result = await paymentApi.search({ options: { limit: 5, offset: 0 } })
    for (const p of result.results ?? []) {
      const meta = normalizeMpMeta(p.metadata as Record<string, unknown> | undefined)
      const txCents = Math.round((p.transaction_amount ?? 0) * 100)
      console.log('─'.repeat(72))
      console.log(`  ID     : ${p.id}  |  Status: ${p.status}  |  Data: ${fmtDate(p.date_created ?? undefined)}`)
      console.log(`  Valor  : ${fmtBrl(txCents)}  |  Cliente: ${meta.customer_name ?? (p as {payer?: {email?: string}}).payer?.email ?? '—'}`)
    }
  }

  // Also check if today's payment got approved
  console.log('\n\n📊  Resumo do Stripe de hoje também...\n')
  const stripeKey = process.env.STRIPE_SECRET_KEY?.trim()
  if (stripeKey) {
    const stripe = new Stripe(stripeKey)
    const todayTs = Math.floor(new Date(`${todayStr}T00:00:00-03:00`).getTime() / 1000)
    const list = await stripe.paymentIntents.list({
      limit: 20,
      created: { gte: todayTs },
    })
    if (list.data.length === 0) {
      console.log('Nenhum PaymentIntent Stripe de hoje.')
    }
    for (const pi of list.data) {
      const meta = pi.metadata as Record<string, string>
      if (meta.source !== 'gloria-faz-joias') continue
      console.log(`  Stripe ${pi.id}  |  ${pi.status}  |  ${fmtBrl(pi.amount)}  |  ${meta.customer_name ?? '—'}  |  ${fmtDate(pi.created)}`)
    }
  }
}

main().catch((e) => { console.error(e); process.exit(1) })
