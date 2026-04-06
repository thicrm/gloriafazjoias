/**
 * Store products — jóias page order and DB mapping (produtos-site.md).
 * slugOverride: when two store rows share one DB asset (e.g. marca-páginas).
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
}

/** Order follows produtos-site.md */
export const STORE_PRODUCTS: StoreProductEntry[] = [
  { displayName: 'Anel Reservatório', dbSlug: null, category: 'Anéis' },
  { displayName: 'Colar Explosão', dbSlug: null, category: 'Colares' },
  { displayName: 'Aliança Estrela', dbSlug: null, category: 'Anéis' },
  { displayName: 'Broche Estrela', dbSlug: null, category: 'Broches' },
  {
    displayName: 'Colar Em Órbita',
    dbSlug: 'pingente-estrela',
    slugOverride: 'colar-em-orbita',
    category: 'Colares',
  },
  { displayName: 'Anel Céu Estrelado', dbSlug: 'anel-ceu-estrelado', category: 'Anéis' },
  { displayName: 'Anel Domo Crescente', dbSlug: null, category: 'Anéis' },
  { displayName: 'Anel Domo do Céu II', dbSlug: 'anel-domo-do-ceu-ii', category: 'Anéis' },
  { displayName: 'Anel Onsen (cru)', dbSlug: null, category: 'Anéis' },
  { displayName: 'Anel Onsen (prata)', dbSlug: 'anel-onsen-prata', category: 'Anéis' },
  { displayName: 'Anel Onsen (dourado)', dbSlug: 'anel-onsen-ouro', category: 'Anéis' },
  { displayName: 'Anel Onsen Paraíba', dbSlug: null, category: 'Anéis' },
  { displayName: 'Anel Ondas (prata)', dbSlug: 'anel-ondas-prata', category: 'Anéis' },
  { displayName: 'Anel Ondas (dourado)', dbSlug: 'anel-ondas-ouro', category: 'Anéis' },
  { displayName: 'Anel Ondas (cru)', dbSlug: null, category: 'Anéis' },
  { displayName: 'Brinco Andorinhas', dbSlug: 'brinco-andorinhas', category: 'Brincos' },
  { displayName: 'Brinco Sobreposição II', dbSlug: 'brinco-sobreposicao-ii', category: 'Brincos' },
  { displayName: 'Anel Vão', dbSlug: null, category: 'Anéis' },
  { displayName: 'Bracelete Ode', dbSlug: 'bracelete-oco', category: 'Braceletes e Pulseiras' },
  {
    displayName: 'Brinco Estrelas Cadentes',
    dbSlug: 'brinco-estrelas',
    category: 'Brincos',
  },
  { displayName: 'Brinco Mãe', dbSlug: 'brinco-mae', category: 'Brincos' },
  { displayName: 'Brinco Mãe Duplo', dbSlug: null, category: 'Brincos' },
  { displayName: 'Colar Mãe', dbSlug: 'colar-mae-prata', category: 'Colares' },
  { displayName: 'Colar Mãe Maior', dbSlug: null, category: 'Colares' },
  { displayName: 'Colar Mãe Dourada', dbSlug: 'colar-mae-ouro', category: 'Colares' },
  { displayName: 'Colar Mãe Duplo', dbSlug: null, category: 'Colares' },
  {
    displayName: 'Marca-página Peixinho',
    dbSlug: 'marca-paginas',
    slugOverride: 'marca-pagina-peixinho',
    category: 'Objetos',
  },
  {
    displayName: 'Marca-página Pirarucu',
    dbSlug: 'marca-paginas',
    slugOverride: 'marca-pagina-pirarucu',
    category: 'Objetos',
  },
  { displayName: 'Colar Amitis', dbSlug: null, category: 'Colares' },
  { displayName: 'Brinco Amitis', dbSlug: null, category: 'Brincos' },
]
