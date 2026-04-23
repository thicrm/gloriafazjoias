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
  /** When true, product is not shown in the store (omisso). */
  hidden?: boolean
}

/** Order follows produtos site NOVO.md */
export const STORE_PRODUCTS: StoreProductEntry[] = [
  // ── Céu Estrelado ────────────────────────────────────────────────────────
  { displayName: 'Anel Reservatório', dbSlug: null, category: 'Anéis', hidden: true },
  { displayName: 'Colar Explosão', dbSlug: 'colar-explosao', category: 'Colares' },
  { displayName: 'Aliança Estrela', dbSlug: 'alianca-estrela', category: 'Anéis' },
  { displayName: 'Broche Estrela', dbSlug: 'broche-estrela', category: 'Broches' },
  {
    displayName: 'Colar Em Órbita',
    dbSlug: 'pingente-estrela',
    slugOverride: 'colar-em-orbita',
    category: 'Colares',
  },
  { displayName: 'Anel Céu Estrelado', dbSlug: 'anel-ceu-estrelado', category: 'Anéis' },

  // ── Domo do Céu ──────────────────────────────────────────────────────────
  { displayName: 'Anel Domo Crescente', dbSlug: 'anel-domo-do-ceu-crescente', category: 'Anéis' },
  { displayName: 'Anel Domo do Céu I', dbSlug: 'anel-domo-do-ceu-i', category: 'Anéis' },
  { displayName: 'Anel Domo do Céu II', dbSlug: 'anel-domo-do-ceu-ii', category: 'Anéis' },

  // ── Piscina ──────────────────────────────────────────────────────────────
  { displayName: 'Anel Onsen (cru)', dbSlug: 'anel-onsen-cru', category: 'Anéis' },
  { displayName: 'Anel Onsen (prata)', dbSlug: 'anel-onsen-prata', category: 'Anéis' },
  { displayName: 'Anel Onsen (dourado)', dbSlug: 'anel-onsen-ouro', category: 'Anéis' },
  { displayName: 'Anel Onsen Paraíba', dbSlug: null, category: 'Anéis', hidden: true },
  { displayName: 'Anel Ondas (prata)', dbSlug: 'anel-ondas-prata', category: 'Anéis' },
  { displayName: 'Anel Ondas (dourado)', dbSlug: 'anel-ondas-ouro', category: 'Anéis' },
  { displayName: 'Anel Ondas (cru)', dbSlug: 'anel-ondas-cru', category: 'Anéis' },
  // Listed as "sem foto" in lançamento.md but DB has images → show on store
  { displayName: 'Anel Caminhos', dbSlug: 'anel-caminhos', category: 'Anéis' },

  // ── Domo do Céu / Abstrata ────────────────────────────────────────────────
  { displayName: 'Brinco Andorinhas', dbSlug: 'brinco-andorinhas', category: 'Brincos' },
  { displayName: 'Brinco Sobreposição II', dbSlug: 'brinco-sobreposicao-ii', category: 'Brincos' },
  { displayName: 'Anel Vão', dbSlug: 'anel-vao', category: 'Anéis' },
  { displayName: 'Bracelete Ode', dbSlug: 'bracelete-oco', category: 'Braceletes e Pulseiras' },
  { displayName: 'Brinco Estrelas Cadentes', dbSlug: 'brinco-estrelas', category: 'Brincos' },

  // ── Mãe ──────────────────────────────────────────────────────────────────
  { displayName: 'Brinco Mãe', dbSlug: 'brinco-mae', category: 'Brincos' },
  { displayName: 'Brinco Mãe Duplo', dbSlug: null, category: 'Brincos', hidden: true },
  { displayName: 'Colar Mãe', dbSlug: 'colar-mae-prata', category: 'Colares' },
  { displayName: 'Colar Mãe Maior', dbSlug: 'colar-mae-maior', category: 'Colares' },
  { displayName: 'Colar Mãe Dourada', dbSlug: 'colar-mae-ouro', category: 'Colares', hidden: true },
  { displayName: 'Colar Mãe Duplo', dbSlug: 'colar-mae-duplo', category: 'Colares' },

  // ── Peixinhos ────────────────────────────────────────────────────────────
  {
    displayName: 'Marca-página Peixinho',
    dbSlug: 'marca-paginas-peixinho',
    slugOverride: 'marca-pagina-peixinho',
    category: 'Objetos',
  },
  {
    displayName: 'Marca-página Pirarucu',
    dbSlug: 'marca-paginas-pirarucu',
    slugOverride: 'marca-pagina-pirarucu',
    category: 'Objetos',
  },

  // ── Amitis ───────────────────────────────────────────────────────────────
  { displayName: 'Colar Amitis', dbSlug: 'colar-amitis', category: 'Colares' },
  { displayName: 'Brinco Amitis', dbSlug: null, category: 'Brincos', hidden: true },
]
