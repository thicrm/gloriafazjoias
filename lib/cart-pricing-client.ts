import type { CartLine } from '@/lib/cart-types'
import { PRODUCT_PRICES_BRL_CENTS } from '@/lib/stripe/catalog'

export function cartProductsSubtotalCents(lines: CartLine[]): number {
  let total = 0
  for (const line of lines) {
    const unit = PRODUCT_PRICES_BRL_CENTS[line.sku]
    if (unit === undefined) continue
    total += unit * line.quantity
  }
  return total
}

/** True if any cart line has no online price (catalog mismatch). */
export function cartHasInvalidPrices(lines: CartLine[]): boolean {
  return lines.some((l) => PRODUCT_PRICES_BRL_CENTS[l.sku] === undefined)
}

export function formatBrlFromCents(cents: number): string {
  return `R$${(cents / 100).toFixed(2).replace('.', ',')}`
}

export function lineUnitCents(sku: string): number | undefined {
  return PRODUCT_PRICES_BRL_CENTS[sku]
}
