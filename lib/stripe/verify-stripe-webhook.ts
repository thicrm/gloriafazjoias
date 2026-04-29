import 'server-only'

import crypto from 'crypto'
import type Stripe from 'stripe'

const DEFAULT_TOLERANCE_SEC = 300
const MAX_BODY_BYTES = 512 * 1024

/** Header Mercado Pago / custom apps often omit; Stripe allows adding it in Dashboard → Webhook → Additional headers. */
export const STRIPE_WEBHOOK_EXTRA_HEADER = 'x-gfj-webhook-secret'

function timingSafeEqualString(a: string, b: string): boolean {
  const ba = Buffer.from(a, 'utf8')
  const bb = Buffer.from(b, 'utf8')
  if (ba.length !== bb.length) return false
  return crypto.timingSafeEqual(ba, bb)
}

export type VerifyStripeWebhookResult =
  | { ok: true; event: Stripe.Event }
  | { ok: false; status: number; message: string }

/**
 * Verifies Stripe webhook: raw body, signature, optional extra header (defense in depth).
 * Set `STRIPE_WEBHOOK_EXTRA_SECRET` and add header `x-gfj-webhook-secret` with the same value in Stripe Dashboard.
 */
export function verifyStripeWebhook(
  stripe: Stripe,
  params: {
    rawBody: string
    stripeSignatureHeader: string | null
    requestHeaders: Headers
    webhookSecret: string
  }
): VerifyStripeWebhookResult {
  if (params.rawBody.length > MAX_BODY_BYTES) {
    return { ok: false, status: 413, message: 'Payload too large' }
  }

  const extra = process.env.STRIPE_WEBHOOK_EXTRA_SECRET?.trim()
  if (extra) {
    const received = params.requestHeaders.get(STRIPE_WEBHOOK_EXTRA_HEADER)
    if (!received || !timingSafeEqualString(received.trim(), extra)) {
      return { ok: false, status: 401, message: 'Unauthorized' }
    }
  }

  const tolRaw = process.env.STRIPE_WEBHOOK_TOLERANCE_SECONDS?.trim()
  const tolerance =
    tolRaw != null && tolRaw !== ''
      ? Math.min(600, Math.max(60, parseInt(tolRaw, 10) || DEFAULT_TOLERANCE_SEC))
      : DEFAULT_TOLERANCE_SEC

  if (!params.stripeSignatureHeader) {
    return { ok: false, status: 400, message: 'Bad request' }
  }

  try {
    const event = stripe.webhooks.constructEvent(
      params.rawBody,
      params.stripeSignatureHeader,
      params.webhookSecret,
      tolerance
    )
    return { ok: true, event }
  } catch {
    return { ok: false, status: 400, message: 'Bad request' }
  }
}
