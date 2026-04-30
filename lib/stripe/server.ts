import 'server-only'
import Stripe from 'stripe'

let stripe: Stripe | null = null
let stripeKeyUsed: string | null = null

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim()
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured')
  }
  if (!stripe || stripeKeyUsed !== key) {
    stripe = new Stripe(key)
    stripeKeyUsed = key
  }
  return stripe
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim())
}
