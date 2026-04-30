import type Stripe from 'stripe'

import { notifyCartPaidFromStripePaymentIntent } from '@/lib/payments/cart-paid-notify'

/**
 * Webhook: e-mails de carrinho não são enviados aqui — apenas log (envio via checkout).
 */
export async function handlePaymentIntentSucceeded(
  _stripe: Stripe,
  paymentIntent: Stripe.PaymentIntent
): Promise<void> {
  await notifyCartPaidFromStripePaymentIntent(paymentIntent)
}

export async function handlePaymentIntentFailed(paymentIntent: Stripe.PaymentIntent): Promise<void> {
  console.info('[stripe webhook] payment_intent.payment_failed', {
    id: paymentIntent.id,
    last_payment_error: paymentIntent.last_payment_error?.message,
  })
}
