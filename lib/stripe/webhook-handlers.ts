import type Stripe from 'stripe'

import { notifyCartPaidFromStripePaymentIntent } from '@/lib/payments/cart-paid-notify'

/**
 * Called after signature verification for payment_intent.succeeded.
 * Re-fetch the PaymentIntent so metadata (gfj_ord chunks, cart fields) matches the API object.
 */
export async function handlePaymentIntentSucceeded(
  stripe: Stripe,
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  let pi = paymentIntent
  try {
    pi = await stripe.paymentIntents.retrieve(paymentIntent.id)
  } catch (e) {
    console.error('[stripe webhook] paymentIntents.retrieve failed, using event payload', {
      id: paymentIntent.id,
      err: e,
    })
  }

  await notifyCartPaidFromStripePaymentIntent(pi)
  console.info('[stripe webhook] payment_intent.succeeded processed', {
    id: pi.id,
    amount: pi.amount,
  })
}

/**
 * Called for payment_intent.payment_failed.
 */
export async function handlePaymentIntentFailed(
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  console.info('[stripe webhook] payment_intent.payment_failed', {
    id: paymentIntent.id,
    last_payment_error: paymentIntent.last_payment_error?.message,
  })
}
