/**
 * Store products — order follows produtos site NOVO.md.
 * slugOverride: when the URL/pricing slug differs from dbSlug.
 */

export const STORE_CATEGORIES = [
  'Anéis',
  'Braceletes e Pulseiras',
  'Brincos',
  'Broches',
  'Colares',
  'Objetos',
] as const

export type StoreCategory = (typeof STORE_CATEGORIES)[number]

export interface StoreProductEntry {
  displayName: string
  dbSlug: string | null
  /** When set, used as URL slug instead of dbSlug (unique checkout + pricing key). */
  slugOverride?: string
  category: StoreCategory
  /** Explicit material string shown on the product page info line. */
  material?: string
  /** When true, product is not shown in the store (omisso). */
  hidden?: boolean
  /** When true, shows "Encomendar" button instead of "Adicionar ao carrinho". */
  encomenda?: boolean
}

/** Returns true if the product with the given URL slug should show "Encomendar" instead of "Comprar". */
export function isEncomendaSlug(slug: string): boolean {
  return STORE_PRODUCTS.some(
    (entry) =>
      !entry.hidden &&
      entry.encomenda === true &&
      (entry.slugOverride ?? entry.dbSlug) === slug
  )
}

/** Order follows produtos site NOVO.md */
export const STORE_PRODUCTS: StoreProductEntry[] = [
  // ── Céu Estrelado ────────────────────────────────────────────────────────
  { displayName: 'Anel Reservatório', dbSlug: null, category: 'Anéis', hidden: true },
  { displayName: 'Colar Explosão', dbSlug: 'colar-explosao', category: 'Colares', material: 'Prata 950' },
  { displayName: 'Aliança Estrela', dbSlug: 'alianca-estrela', category: 'Anéis', material: 'Prata 925', encomenda: true },
  { displayName: 'Broche Estrela', dbSlug: 'broche-estrela', category: 'Broches', material: 'Prata 925', encomenda: true },
  {
    displayName: 'Colar Em Órbita',
    dbSlug: 'pingente-estrela',
    slugOverride: 'colar-em-orbita',
    category: 'Colares',
    material: 'Prata 925 e Latão',
    encomenda: true,
  },
  { displayName: 'Anel Céu Estrelado', dbSlug: 'anel-ceu-estrelado', category: 'Anéis', material: 'Prata 925 e Latão' },

  // ── Domo do Céu ──────────────────────────────────────────────────────────
  { displayName: 'Anel Domo Crescente', dbSlug: 'anel-domo-do-ceu-crescente', slugOverride: 'anel-domo-crescente', category: 'Anéis', material: 'Prata 925 e Latão' },
  { displayName: 'Anel Domo do Céu I', dbSlug: 'anel-domo-do-ceu-i', category: 'Anéis', material: 'Prata 925 e Latão' },
  { displayName: 'Anel Domo do Céu II', dbSlug: 'anel-domo-do-ceu-ii', category: 'Anéis', material: 'Prata 925 e Latão', encomenda: true },

  // ── Piscina ──────────────────────────────────────────────────────────────
  { displayName: 'Anel Ofurô (Prata)', dbSlug: 'anel-ofuro', category: 'Anéis', material: 'Prata 950', encomenda: true },
  { displayName: 'Anel Onsen (Cru)', dbSlug: 'anel-onsen-cru', category: 'Anéis', material: 'Prata 950' },
  { displayName: 'Anel Onsen (Prata)', dbSlug: 'anel-onsen-prata', category: 'Anéis', material: 'Prata 950' },
  { displayName: 'Anel Onsen (Dourado)', dbSlug: 'anel-onsen-ouro', category: 'Anéis', material: 'Latão' },
  { displayName: 'Anel Onsen Paraíba', dbSlug: null, category: 'Anéis', hidden: true },
  { displayName: 'Anel Ondas (Prata)', dbSlug: 'anel-ondas-prata', category: 'Anéis', material: 'Prata 950' },
  { displayName: 'Anel Ondas (Dourado)', dbSlug: 'anel-ondas-ouro', category: 'Anéis', material: 'Latão' },
  { displayName: 'Anel Ondas (Cru)', dbSlug: 'anel-ondas-cru', category: 'Anéis', material: 'Prata 950', encomenda: true },
  { displayName: 'Anel Caminhos', dbSlug: 'anel-caminhos', category: 'Anéis', hidden: true },

  // ── Domo do Céu / Abstrata ────────────────────────────────────────────────
  { displayName: 'Brinco Andorinhas', dbSlug: 'brinco-andorinhas', category: 'Brincos', material: 'Prata 925', encomenda: true },
  { displayName: 'Brinco Sobreposição II', dbSlug: 'brinco-sobreposicao-ii', category: 'Brincos', material: 'Prata 925' },
  { displayName: 'Anel Vão', dbSlug: 'anel-vao', category: 'Anéis', material: 'Prata 925' },
  { displayName: 'Bracelete Ode', dbSlug: 'bracelete-oco', category: 'Braceletes e Pulseiras', material: 'Prata 925', encomenda: true },
  { displayName: 'Brinco Estrelas Cadentes', dbSlug: 'brinco-estrelas', category: 'Brincos', material: 'Prata 925', encomenda: true },

  // ── Mãe ──────────────────────────────────────────────────────────────────
  { displayName: 'Brinco Mãe', dbSlug: 'brinco-mae', category: 'Brincos', material: 'Prata 925' },
  { displayName: 'Brinco Mãe Duplo', dbSlug: null, category: 'Brincos', hidden: true },
  { displayName: 'Colar Mãe', dbSlug: 'colar-mae-prata', category: 'Colares', material: 'Prata 925' },
  { displayName: 'Colar Mãe Maior', dbSlug: 'colar-mae-maior', category: 'Colares', material: 'Prata 925' },
  { displayName: 'Colar Mãe (Dourado)', dbSlug: 'colar-mae-ouro', category: 'Colares', hidden: true },
  { displayName: 'Colar Mãe Duplo', dbSlug: 'colar-mae-duplo', category: 'Colares', material: 'Prata 925' },

  // ── Peixinhos ────────────────────────────────────────────────────────────
  {
    displayName: 'Marca-página Peixinho',
    dbSlug: 'marca-paginas-peixinho',
    slugOverride: 'marca-pagina-peixinho',
    category: 'Objetos',
    material: 'Cobre',
    encomenda: true,
  },
  {
    displayName: 'Marca-página Pirarucu',
    dbSlug: 'marca-paginas-pirarucu',
    slugOverride: 'marca-pagina-pirarucu',
    category: 'Objetos',
    material: 'Latão',
    encomenda: true,
  },

  // ── Amitis ───────────────────────────────────────────────────────────────
  { displayName: 'Colar Amitis', dbSlug: 'colar-amitis', category: 'Colares', material: 'Prata 925' },
  { displayName: 'Brinco Amitis', dbSlug: null, category: 'Brincos', hidden: true },
]
