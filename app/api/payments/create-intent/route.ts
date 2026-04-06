import { NextResponse } from 'next/server'
import { getStoreProductBySlug } from '@/lib/products-data'
import { isValidRingSizeString } from '@/lib/ring-sizes'
import { calculateTotalBrlCents } from '@/lib/stripe/pricing'
import { getStripe, isStripeConfigured } from '@/lib/stripe/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type CreateIntentBody = {
  items?: unknown
  /** Display label for Stripe dashboard / receipts (not used for amount). */
  productLabel?: string
  /** Ring size (BR), e.g. "18" or "18.5" — required when product category is Anéis. */
  ringSize?: string
}

function firstSkuFromItems(items: unknown): string {
  if (!Array.isArray(items) || items.length === 0) return ''
  const first = items[0] as { sku?: unknown }
  return typeof first.sku === 'string' ? first.sku : ''
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

  const priced = calculateTotalBrlCents(body.items)
  if (!priced.ok) {
    return NextResponse.json({ error: priced.error }, { status: 400 })
  }

  const storeSlug = firstSkuFromItems(body.items)
  const product = storeSlug ? getStoreProductBySlug(storeSlug) : undefined
  const needsRingSize = product?.category === 'Anéis'

  const rawRing =
    typeof body.ringSize === 'string' ? body.ringSize.trim().replace(',', '.') : ''
  if (needsRingSize) {
    if (!rawRing || !isValidRingSizeString(rawRing)) {
      return NextResponse.json(
        { error: 'Selecione o tamanho do anel (7 a 26, meios tamanhos permitidos).' },
        { status: 400 }
      )
    }
  } else if (rawRing) {
    return NextResponse.json({ error: 'Tamanho de anel não se aplica a este produto.' }, { status: 400 })
  }

  const label =
    typeof body.productLabel === 'string'
      ? body.productLabel.slice(0, 200).trim()
      : ''
  const ringLabel =
    needsRingSize && rawRing
      ? ` — aro ${rawRing.replace('.', ',')} (BR)`
      : ''
  const description =
    label.length > 0
      ? `Glória Faz Joias — ${label}${ringLabel}`
      : `Pedido — Glória Faz Joias${ringLabel}`

  const idempotencyKey = request.headers.get('idempotency-key') ?? undefined

  try {
    const stripe = getStripe()
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: priced.amountBrlCents,
        currency: priced.currency,
        automatic_payment_methods: { enabled: true },
        description,
        metadata: {
          source: 'gloria-faz-joias',
          currency: priced.currency,
          ...(storeSlug ? { store_slug: storeSlug.slice(0, 80) } : {}),
          ...(needsRingSize && rawRing
            ? { ring_size_br: rawRing.slice(0, 12) }
            : {}),
        },
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
      amountBrlCents: priced.amountBrlCents,
      currency: priced.currency,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
