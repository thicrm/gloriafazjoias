import 'server-only'

import type Stripe from 'stripe'

/**
 * Webhook Stripe: e-mails de carrinho não são enviados aqui (usa POST /api/payments/checkout-email).
 */
export async function notifyCartPaidFromStripePaymentIntent(pi: Stripe.PaymentIntent): Promise<void> {
  console.info(
    '[stripe-webhook] E-mail de pedido não enviado pelo webhook (checkout após o cliente finalizar).',
    { id: pi.id, status: pi.status }
  )
}
