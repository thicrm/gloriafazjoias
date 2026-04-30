/**
 * 5% sobre o subtotal dos produtos apenas — só no pagamento Pix (Mercado Pago).
 * O frete nunca entra na base do desconto (cobrado integral).
 */
export const PIX_PRODUCT_SUBTOTAL_DISCOUNT_RATE = 0.05

export function productsCentsAfterPixDiscount(productsCents: number): number {
  return Math.round(productsCents * (1 - PIX_PRODUCT_SUBTOTAL_DISCOUNT_RATE))
}

export function pixDiscountFromProductsCents(productsCents: number): number {
  return productsCents - productsCentsAfterPixDiscount(productsCents)
}
