import { PRODUCT_PRICES_BRL_CENTS } from './catalog'

export type CartLine = {
  sku: string
  quantity: number
}

export type PricingResult =
  | { ok: true; amountBrlCents: number; currency: 'brl' }
  | { ok: false; error: string }

const MIN_BRL_CENTS = 50

export function calculateTotalBrlCents(items: unknown): PricingResult {
  if (!Array.isArray(items) || items.length === 0) {
    return { ok: false, error: 'items must be a non-empty array' }
  }

  let total = 0

  for (const raw of items) {
    if (!raw || typeof raw !== 'object') {
      return { ok: false, error: 'each item must be an object' }
    }
    const sku = (raw as { sku?: unknown }).sku
    const quantity = (raw as { quantity?: unknown }).quantity

    if (typeof sku !== 'string' || sku.trim() === '') {
      return { ok: false, error: 'each item needs a non-empty sku' }
    }
    if (typeof quantity !== 'number' || !Number.isFinite(quantity)) {
      return { ok: false, error: 'each item needs a numeric quantity' }
    }
    if (!Number.isInteger(quantity) || quantity < 1) {
      return { ok: false, error: 'quantity must be a positive integer' }
    }

    const unit = PRODUCT_PRICES_BRL_CENTS[sku]
    if (unit === undefined) {
      return { ok: false, error: `unknown sku: ${sku}` }
    }

    total += unit * quantity
  }

  if (total < MIN_BRL_CENTS) {
    return {
      ok: false,
      error: `order total must be at least ${MIN_BRL_CENTS} centavos (Stripe minimum)`,
    }
  }

  return { ok: true, amountBrlCents: total, currency: 'brl' }
}
