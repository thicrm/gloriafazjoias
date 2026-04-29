import type Stripe from 'stripe'

import { notifyCartPaidFromStripePaymentIntent } from '@/lib/payments/cart-paid-notify'

/**
 * Called after signature verification for payment_intent.succeeded.
 */
export async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  await notifyCartPaidFromStripePaymentIntent(paymentIntent)
  console.info('[stripe webhook] payment_intent.succeeded processed', {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
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
