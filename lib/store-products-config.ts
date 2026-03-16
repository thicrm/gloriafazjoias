/**
 * Store products configuration - defines which products appear on the jóias page
 * and how they are filtered. Based on categorias e filtors loja update db.
 *
 * Categories for menu: anéis, braceletes e pulseiras, brincos, broches, colares, objetos
 *
 * dbSlug: slug from products-data (if product exists in DB with images)
 * null: placeholder product - needs "precisa de correlação de imagens"
 */

export const STORE_CATEGORIES = [
  'Anéis',
  'Braceletes e Pulseiras',
  'Brincos',
  'Broches',
  'Colares',
  'Conjuntos',
  'Objetos',
] as const

export type StoreCategory = (typeof STORE_CATEGORIES)[number]

export interface StoreProductEntry {
  displayName: string
  dbSlug: string | null // null = placeholder, needs image correlation
  category: StoreCategory
}

export const STORE_PRODUCTS: StoreProductEntry[] = [
  // ANÉIS
  { displayName: 'anel onda (cru)', dbSlug: null, category: 'Anéis' },
  { displayName: 'anel ondas pratas', dbSlug: 'anel-ondas-prata', category: 'Anéis' },
  { displayName: 'anel ondas dourado', dbSlug: 'anel-ondas-ouro', category: 'Anéis' },
  { displayName: 'anel onsen (cru)', dbSlug: null, category: 'Anéis' },
  { displayName: 'anel onsen prata', dbSlug: 'anel-onsen-prata', category: 'Anéis' },
  { displayName: 'anel onsen dourado', dbSlug: 'anel-onsen-ouro', category: 'Anéis' },
  { displayName: 'anel domo do céu II', dbSlug: 'anel-domo-do-ceu-ii', category: 'Anéis' },
  { displayName: 'anel domo do céu I', dbSlug: 'anel-domo-fechado', category: 'Anéis' },
  { displayName: 'anel céu estrelado', dbSlug: 'anel-ceu-estrelado', category: 'Anéis' },
  { displayName: 'aliança estrela', dbSlug: null, category: 'Anéis' },
  { displayName: 'anel reservatório', dbSlug: null, category: 'Anéis' },
  { displayName: 'anel ofurô', dbSlug: 'anel-ofuro', category: 'Anéis' },
  { displayName: 'anel domo crescente', dbSlug: null, category: 'Anéis' },

  // BRACELETES E PULSEIRAS
  { displayName: 'bracelete ode', dbSlug: 'bracelete-oco', category: 'Braceletes e Pulseiras' },

  // BRINCOS
  { displayName: 'brinco sobreposição II', dbSlug: 'brinco-sobreposicao-ii', category: 'Brincos' },
  { displayName: 'brinco mãe', dbSlug: 'brinco-mae', category: 'Brincos' },
  { displayName: 'brinco andorinhas', dbSlug: 'brinco-andorinhas', category: 'Brincos' },
  { displayName: 'brinco estrelas cadentes', dbSlug: 'brinco-estrelas', category: 'Brincos' },

  // BROCHES
  { displayName: 'broche estrela', dbSlug: null, category: 'Broches' },

  // COLARES
  { displayName: 'colar mãe', dbSlug: 'colar-mae-prata', category: 'Colares' },
  { displayName: 'colar mãe maior', dbSlug: null, category: 'Colares' },
  { displayName: 'colar mãe dourada', dbSlug: 'colar-mae-ouro', category: 'Colares' },
  { displayName: 'colar concha', dbSlug: 'colar-concha', category: 'Colares' },
  { displayName: 'colar em órbita', dbSlug: null, category: 'Colares' },

  // OBJETOS
  { displayName: 'marca-página pirarucu', dbSlug: 'marca-paginas', category: 'Objetos' },
  { displayName: 'marca-página peixinho', dbSlug: null, category: 'Objetos' },
]
