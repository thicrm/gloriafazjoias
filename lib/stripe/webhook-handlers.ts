import type Stripe from 'stripe'

/**
 * Called after signature verification for payment_intent.succeeded.
 * Extend this to update orders, send email, adjust stock, etc.
 */
export async function handlePaymentIntentSucceeded(
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  console.info('[stripe webhook] payment_intent.succeeded', {
    id: paymentIntent.id,
    amount: paymentIntent.amount,
    currency: paymentIntent.currency,
    metadata: paymentIntent.metadata,
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
