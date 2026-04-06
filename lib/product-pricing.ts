/**
 * Product pricing — sourced from lib/store-pricing.ts. Online checkout uses Stripe.
 */

import { STORE_PRICING } from './store-pricing'

export interface ProductPricing {
  price: number | null
  /** True when the item has a fixed price and can be paid via Stripe on the product page. */
  canPayOnline: boolean
}

export function getProductPricing(slug: string): ProductPricing | undefined {
  const entry = STORE_PRICING[slug]
  if (!entry) return undefined
  const canPayOnline = entry.priceBrl !== null
  return { price: entry.priceBrl, canPayOnline }
}

export function formatPrice(price: number | null): string {
  if (price === null) return 'Preço Sob Consulta'
  return `R$${price.toFixed(2).replace('.', ',')}`
}
