import { NextResponse } from 'next/server'
import {
  trimCustomer,
  validateAndComputeOrderTotals,
  type CheckoutCustomer,
} from '@/lib/checkout/order-totals'
import {
  buildEmailLinesFromItems,
  encodeSnapshotToMetadata,
} from '@/lib/orders/payment-order-snapshot'
import {
  getStripe,
  isStripeAuthenticationFailure,
  isStripeConfigured,
} from '@/lib/stripe/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type CreateIntentBody = {
  items?: unknown
  shippingMethod?: string
  cepDestino?: string
  customer?: Partial<CheckoutCustomer>
  /** Short summary for Stripe dashboard / description */
  productLabel?: string
}

function buildLabel(body: CreateIntentBody, lineCount: number): string {
  if (typeof body.productLabel === 'string' && body.productLabel.trim()) {
    return body.productLabel.slice(0, 200).trim()
  }
  return `Pedido Glória Faz Jóias (${lineCount} tipo(s) de peça)`
}

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: 'Stripe is not configured on the server (missing STRIPE_SECRET_KEY).' },
      { status: 503 }
    )
  }

  let body: CreateIntentBody
  try {
    body = (await request.json()) as CreateIntentBody
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const itemArr = Array.isArray(body.items) ? body.items : []
  if (itemArr.length === 0) {
    return NextResponse.json({ error: 'Carrinho vazio.' }, { status: 400 })
  }

  const shippingMethod = body.shippingMethod === 'correios' ? 'correios' : 'motoboy'

  const totals = await validateAndComputeOrderTotals({
    items: body.items,
    shippingMethod,
    cepDestino: typeof body.cepDestino === 'string' ? body.cepDestino : undefined,
  })
  if (!totals.ok) {
    return NextResponse.json({ error: totals.error }, { status: totals.status })
  }

  const customer: CheckoutCustomer = {
    fullName: String(body.customer?.fullName ?? '').trim(),
    email: String(body.customer?.email ?? '').trim(),
    phone: String(body.customer?.phone ?? '').trim(),
    cpf: String(body.customer?.cpf ?? '').trim(),
    address: String(body.customer?.address ?? '').trim(),
    cep: body.customer?.cep != null ? String(body.customer.cep) : undefined,
  }

  if (customer.fullName.length < 3 || !customer.email.includes('@')) {
    return NextResponse.json(
      { error: 'Preencha nome completo e um e-mail válido.' },
      { status: 400 }
    )
  }

  const label = buildLabel(body, itemArr.length)
  const metaCustomer = trimCustomer(customer)
  const description = `Glória Faz Jóias — ${label}`.slice(0, 500)

  const emailLines = buildEmailLinesFromItems(itemArr)
  if (!emailLines) {
    return NextResponse.json(
      { error: 'Itens do carrinho inválidos para confirmação por e-mail.' },
      { status: 400 }
    )
  }
  const snapshot = { v: 1 as const, lines: emailLines }
  const encodedSnap = encodeSnapshotToMetadata(snapshot)
  if (!encodedSnap) {
    return NextResponse.json(
      { error: 'Pedido excede o limite de metadados. Reduza itens ou contate a loja.' },
      { status: 400 }
    )
  }

  const idempotencyKey = request.headers.get('idempotency-key') ?? undefined

  try {
    const stripe = getStripe()
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: totals.amountBrlCents,
        currency: totals.currency,
        automatic_payment_methods: { enabled: true },
        description,
        metadata: {
          source: 'gloria-faz-joias',
          order_type: 'cart',
          shipping_method: shippingMethod,
          products_cents: String(totals.productsCents),
          shipping_cents: String(totals.shippingCents),
          ...metaCustomer,
          ...(totals.storeSlugSample
            ? { store_slug: totals.storeSlugSample.slice(0, 80) }
            : {}),
          ...encodedSnap,
        },
        receipt_email: customer.email,
      },
      idempotencyKey ? { idempotencyKey } : undefined
    )

    if (!paymentIntent.client_secret) {
      return NextResponse.json(
        { error: 'PaymentIntent did not return client_secret' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amountBrlCents: totals.amountBrlCents,
      currency: totals.currency,
    })
  } catch (err) {
    if (isStripeAuthenticationFailure(err)) {
      console.error(
        '[create-intent] Stripe rejected the secret key — check Vercel STRIPE_SECRET_KEY (sk_/rk_, test vs live, no quotes, redeploy after changing env).'
      )
      return NextResponse.json(
        {
          error:
            'Pagamento indisponível no momento. Se você é o administrador, verifique a chave Stripe no painel de hospedagem.',
        },
        { status: 503 }
      )
    }
    const message = err instanceof Error ? err.message : 'Stripe error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
