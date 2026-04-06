import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import {
  handlePaymentIntentFailed,
  handlePaymentIntentSucceeded,
} from '@/lib/stripe/webhook-handlers'
import { getStripe, isStripeConfigured } from '@/lib/stripe/server'

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
  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let rawBody: string
  try {
    rawBody = await request.text()
  } catch {
    return NextResponse.json({ error: 'Could not read body' }, { status: 400 })
  }

  const stripe = getStripe()

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Invalid payload'
    return NextResponse.json({ error: `Webhook signature: ${message}` }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent
        await handlePaymentIntentSucceeded(pi)
        break
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent
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
