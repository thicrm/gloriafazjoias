import 'server-only'
import { normalizeStripeEnvKey } from '@/lib/stripe/normalize-env-key'
import Stripe from 'stripe'

let stripe: Stripe | null = null
let stripeKeyUsed: string | null = null

export function normalizeStripeSecretKey(raw: string | undefined | null): string {
  return normalizeStripeEnvKey(raw)
}

export function getNormalizedStripeSecretKey(): string {
  return normalizeStripeSecretKey(process.env.STRIPE_SECRET_KEY)
}

export function getStripe(): Stripe {
  const key = getNormalizedStripeSecretKey()
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  if (!key.startsWith('sk_') && !key.startsWith('rk_')) {
    console.warn(
      '[stripe] STRIPE_SECRET_KEY should start with sk_ or rk_. If it starts with pk_, use NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY instead.'
    )
  }
  if (!stripe || stripeKeyUsed !== key) {
    stripe = new Stripe(key)
    stripeKeyUsed = key
  }
  return stripe
}

export function isStripeConfigured(): boolean {
  return getNormalizedStripeSecretKey().length > 0
}

/** True when Stripe rejected credentials (invalid/expired key, wrong mode, etc.). */
export function isStripeAuthenticationFailure(err: unknown): boolean {
  if (err instanceof Stripe.errors.StripeAuthenticationError) return true
  if (err && typeof err === 'object' && 'statusCode' in err) {
    const sc = (err as { statusCode?: number }).statusCode
    if (sc === 401) return true
  }
  if (err && typeof err === 'object' && 'code' in err) {
    const code = (err as { code?: string }).code
    if (code === 'invalid_api_key') return true
  }
  if (err instanceof Error && /invalid api key/i.test(err.message)) return true
  return false
}
