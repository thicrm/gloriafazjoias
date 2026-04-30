import { loadStripe, type Stripe } from '@stripe/stripe-js'
import { normalizeStripeEnvKey } from '@/lib/stripe/normalize-env-key'

let stripePromise: Promise<Stripe | null> | null = null
let stripePublishableKeyUsed: string | null = null

export function getStripeBrowser(): Promise<Stripe | null> | null {
  const key = normalizeStripeEnvKey(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  if (!key) return null
  if (!stripePromise || stripePublishableKeyUsed !== key) {
    stripePromise = loadStripe(key)
    stripePublishableKeyUsed = key
  }
  return stripePromise
}
