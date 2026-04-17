/** Shopping cart line — persisted in localStorage (client). */

export type Acabamento = 'fosco' | 'brilhante'

export type CartLine = {
  /** Stable id for React keys */
  id: string
  sku: string
  productName: string
  quantity: number
  /** Set for Anéis; null otherwise */
  ringSizeBr: string | null
  /** Set for products with finish options; null otherwise */
  acabamento: Acabamento | null
}

export const CART_STORAGE_KEY = 'gloria-faz-joias-cart-v1'

export const CART_CHANGE_EVENT = 'gloria-cart-change'

export function cartLineKey(
  sku: string,
  ringSizeBr: string | null,
  acabamento: Acabamento | null = null
): string {
  return `${sku}::${ringSizeBr ?? '-'}::${acabamento ?? '-'}`
}
