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
  'alianca-estrela': { priceBrl: 197 },
  'broche-estrela': { priceBrl: 215 },
  'colar-em-orbita': { priceBrl: 206 },
  'anel-ceu-estrelado': { priceBrl: 494 },
  'anel-domo-crescente': { priceBrl: 467 },
  'anel-domo-do-ceu-i': { priceBrl: null },
  'anel-domo-do-ceu-ii': { priceBrl: 1115 },
  'anel-ofuro': { priceBrl: 980 },
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
  'marca-pagina-peixinho': { priceBrl: 69.20 },
  'marca-pagina-pirarucu': { priceBrl: 152 },
  'colar-amitis': { priceBrl: 368 },
  'brinco-amitis': { priceBrl: 332 },
}
