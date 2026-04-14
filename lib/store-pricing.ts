/**
 * Single source for store prices (BRL). Checkout: carrinho + /checkout (Stripe ou Pix).
 * Stripe centavos are derived in lib/stripe/catalog.ts.
 */

export interface StorePriceEntry {
  priceBrl: number | null
}

export const STORE_PRICING: Record<string, StorePriceEntry> = {
  'anel-reservatorio': { priceBrl: null },
  'colar-explosao': { priceBrl: 1205 },
  'alianca-estrela': { priceBrl: null },
  'broche-estrela': { priceBrl: null },
  'colar-em-orbita': { priceBrl: null },
  'anel-ceu-estrelado': { priceBrl: 494 },
  'anel-domo-crescente': { priceBrl: 467 },
  'anel-domo-do-ceu-ii': { priceBrl: 1277 },
  'anel-onsen-cru': { priceBrl: 827 },
  'anel-onsen-prata': { priceBrl: 881 },
  'anel-onsen-ouro': { priceBrl: 305 },
  'anel-onsen-paraiba': { priceBrl: null },
  'anel-ondas-prata': { priceBrl: 791 },
  'anel-ondas-ouro': { priceBrl: 296 },
  'anel-ondas-cru': { priceBrl: 728 },
  'brinco-andorinhas': { priceBrl: 539 },
  'brinco-sobreposicao-ii': { priceBrl: 305 },
  'anel-vao': { priceBrl: 413 },
  'bracelete-oco': { priceBrl: 2357 },
  'brinco-estrelas': { priceBrl: 782 },
  'brinco-mae': { priceBrl: 413 },
  'brinco-mae-duplo': { priceBrl: 656 },
  'colar-mae-prata': { priceBrl: 467 },
  'colar-mae-maior': { priceBrl: 467 },
  'colar-mae-ouro': { priceBrl: 314 },
  'colar-mae-duplo': { priceBrl: 746 },
  'marca-pagina-peixinho': { priceBrl: 65.6 },
  'marca-pagina-pirarucu': { priceBrl: 152 },
  'colar-amitis': { priceBrl: 368 },
  'brinco-amitis': { priceBrl: 332 },
}
