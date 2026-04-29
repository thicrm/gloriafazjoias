import { NextResponse } from 'next/server'
import {
  handlePaymentIntentFailed,
  handlePaymentIntentSucceeded,
} from '@/lib/stripe/webhook-handlers'
import { getStripe, isStripeConfigured } from '@/lib/stripe/server'
import { verifyStripeWebhook } from '@/lib/stripe/verify-stripe-webhook'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      { error: 'Stripe is not configured on the server (missing STRIPE_SECRET_KEY).' },
      { status: 503 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET?.trim()
  if (!webhookSecret) {
    return NextResponse.json(
      { error: 'STRIPE_WEBHOOK_SECRET is not configured' },
      { status: 503 }
    )
  }

  const signature = request.headers.get('stripe-signature')

  let rawBody: string
  try {
    rawBody = await request.text()
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  const stripe = getStripe()
  const verified = verifyStripeWebhook(stripe, {
    rawBody,
    stripeSignatureHeader: signature,
    requestHeaders: request.headers,
    webhookSecret,
  })

  if (!verified.ok) {
    return NextResponse.json({ error: verified.message }, { status: verified.status })
  }

  const event = verified.event

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object
        await handlePaymentIntentSucceeded(pi)
        break
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object
        await handlePaymentIntentFailed(pi)
        break
      }
      default:
        break
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Handler error'
    return NextResponse.json({ error: message }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}
