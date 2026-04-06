/**
 * Stripe PaymentIntent amounts (BRL centavos) keyed by store slug.
 * Built from lib/store-pricing.ts — only products with a numeric price are payable online.
 */
import { STORE_PRICING } from '@/lib/store-pricing'

export const PRODUCT_PRICES_BRL_CENTS: Record<string, number> = (() => {
  const out: Record<string, number> = {}
  for (const [slug, v] of Object.entries(STORE_PRICING)) {
    if (v.priceBrl !== null) {
      out[slug] = Math.round(v.priceBrl * 100)
    }
  }
  return out
})()
