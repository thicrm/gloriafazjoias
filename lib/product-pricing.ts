/**
 * Product pricing and checkout links - from relation file.
 * Maps store product slugs to price (R$) and checkout URL.
 * Products not on jóias page are withheld.
 */

export interface ProductPricing {
  price: number | null // null = Preço Sob Consulta
  checkoutUrl: string
}

// Store slug -> { price, checkoutUrl }
// Relation names matched to store display names (approximate): Anel Reservatório, Aliança Estrelas, Broche Estrela, Colar em Órbita, Anel Onsen (cru), Colar Mãe Maior, Marca-Página Peixinho
const PRICING_BY_STORE_SLUG: Record<string, ProductPricing> = {
  'brinco-estrelas': { price: 575, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/brinco-estrelas-cadentes/' },
  'anel-ofuro': { price: 800, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/anel-ofuro/' },
  'anel-ceu-estrelado': { price: 422, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/anel-ceu-estrelado/' },
  'anel-domo-do-ceu-ii': { price: 854.9, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/anel-domo-do-ceu-ii/' },
  'anel-onsen-prata': { price: 773, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/anel-onsen-prata/' },
  'anel-onsen-ouro': { price: 296, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/anel-onsen-dourado/' },
  'anel-onsen-cru': { price: 619, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/anel-onsen-cru/' },
  'anel-ondas-prata': { price: 692, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/anel-ondas-prata/' },
  'anel-ondas-ouro': { price: 277, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/anel-ondas-dourado/' },
  'anel-onda-cru': { price: 549, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/anel-ondas-cru/' },
  'anel-domo-crescente': { price: 395.9, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/anel-lua-crescente/' },
  'anel-reservatorio': { price: 260, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/anel-reservatorio/' },
  'alianca-estrela': { price: 188, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/alianca-estrela/' },
  'broche-estrela': { price: 215, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/broche-estrela/' },
  'colar-em-orbita': { price: 224, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/pingente-em-orbita/' },
  'colar-mae-maior': { price: 413.9, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/colar-mae-barroca-rosa-1t381/' },
  'marca-pagina-peixinho': { price: 62, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/marca-pagina-peixinho/' },
  'brinco-andorinhas': { price: 485, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/brinco-andorinhas/' },
  'brinco-mae': { price: 422, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/brinco-mae/' },
  'brinco-sobreposicao-ii': { price: 341.9, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/brinco-sobreposicao-ii/' },
  'colar-concha': { price: 485, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/colar-concha/' },
  'colar-mae-prata': { price: 413.9, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/colar-mae/' },
  'marca-paginas': { price: 242, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/marca-pagina-peixinho/' },
  'colar-mae-ouro': { price: null, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/colar-mae-dourada-1y5ms/' },
  'bracelete-oco': { price: null, checkoutUrl: 'https://gloriafazjoias.lojavirtualnuvem.com.br/produtos/bracelete-ode-tgdrh/' },
}

export function getProductPricing(slug: string): ProductPricing | undefined {
  return PRICING_BY_STORE_SLUG[slug]
}

export function formatPrice(price: number | null): string {
  if (price === null) return 'Preço Sob Consulta'
  return `R$${price.toFixed(2).replace('.', ',')}`
}
