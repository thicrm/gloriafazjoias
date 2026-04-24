// Product data - parsed from products-database.txt
import { Product, parseProductsDatabase } from './products'
import { getProductDescription, formatProductDescription } from './product-descriptions'

// Re-export Product type for use in other files
export type { Product }

// Raw database content
const databaseContent = `anel bruto latão
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20bruto%20lat%C3%A3o/DSC00205.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20bruto%20lat%C3%A3o/DSC00206.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20bruto%20lat%C3%A3o/DSC00209.jpg

anel caminhos
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20caminhos/DSC00289.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20caminhos/DSC00293.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20caminhos/DSC00302.jpg

anel céu estrelado
https://pub-edc365ea9b5049ae8a0ecf80dea677bb.r2.dev/anel%20ceu%20estrelado.jpg

anel domo do céu I
https://pub-d5ecc79cb81a4dbba75b8d644b7f4d2d.r2.dev/anel%20domo%20do%20ceu%20I%201.jpg
https://pub-d5ecc79cb81a4dbba75b8d644b7f4d2d.r2.dev/anel%20domo%20do%20ceu%20I%202.jpg
https://pub-d5ecc79cb81a4dbba75b8d644b7f4d2d.r2.dev/conjunto%20ceu.jpg
https://pub-d5ecc79cb81a4dbba75b8d644b7f4d2d.r2.dev/colecao%20ceu%201.jpg

anel domo do céu II
https://pub-b58ceffff1a142a79577a358b37c1426.r2.dev/anel%20domo%20do%20ceu%20II%201.jpg
https://pub-b58ceffff1a142a79577a358b37c1426.r2.dev/anel%20domo%20do%20ceu%20II%202.jpg
https://pub-b58ceffff1a142a79577a358b37c1426.r2.dev/anel%20domo%20do%20ceu%20II%203.jpg
https://pub-b58ceffff1a142a79577a358b37c1426.r2.dev/anel%20domo%20do%20ceu%20II%204.jpg
https://pub-b58ceffff1a142a79577a358b37c1426.r2.dev/colecao%20ceu%201.jpg

anel domo do céu crescente
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/C%C3%B3pia%20de%20DSC00552.jpg
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/C%C3%B3pia%20de%20DSC00099.jpg

anel domo fechado
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00099.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00103.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00107.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00111.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00114.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00117.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20fechado/DSC00552.jpg

anel ofurô
https://pub-dedcc52373af43d09c506c27d05b3a8f.r2.dev/anel%20ofuro.jpg
https://pub-dedcc52373af43d09c506c27d05b3a8f.r2.dev/3%20aneis%20piscina.jpg

anel ondas cru
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2387.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2386.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2385.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2384.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2390.JPG

anel ondas prata
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/DSC00240.jpg
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2392.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2393.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2394.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2396.jpg

anel ondas ouro
https://pub-d72a30a164d34ab7b7b3bc41a8903f8f.r2.dev/anel%20ondas%20ouro%201.jpg
https://pub-d72a30a164d34ab7b7b3bc41a8903f8f.r2.dev/anel%20ondas%20ouro%202.jpg
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2397.jpg
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2398.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2399.JPG

anel onsen cru
https://pub-4b0824b8d92a43e8bda0f12eb49c359c.r2.dev/anel%20onsen%20cru.jpg
https://pub-4b0824b8d92a43e8bda0f12eb49c359c.r2.dev/3%20aneis%20piscina.jpg
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2326.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2327.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2328.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2390.JPG

anel onsen prata
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2329.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2330.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2331.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2332.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2333.JPG

anel onsen ouro
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2335.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2338.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2339.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2340.JPG

anel vão
https://pub-e2f28a6b48444c87b10a65e1df0c340c.r2.dev/anel%20vao%20domin%C3%B3%201.jpg
https://pub-e2f28a6b48444c87b10a65e1df0c340c.r2.dev/anel%20vao%20domin%C3%B3%202.jpg
https://pub-e2f28a6b48444c87b10a65e1df0c340c.r2.dev/anel%20vao%20domin%C3%B3%203.jpg

aliança estrela
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/DSC00139.jpg
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/DSC00148.jpg

bracelete oco
https://pub-ab4d4e74a4f84b70873e794e356e235e.r2.dev/bracelete1.jpg
https://pub-ab4d4e74a4f84b70873e794e356e235e.r2.dev/bracelete2.jpg

bracelete organico
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/bracelete%20organico/DSC00086.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/bracelete%20organico/DSC00091.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/bracelete%20organico/DSC00093.jpg

brinco andorinhas
https://pub-c2bdedaa3f554b5f9b5ab83116411f61.r2.dev/brinco%20andorinhas%201.jpg
https://pub-c2bdedaa3f554b5f9b5ab83116411f61.r2.dev/brinco%20andorinhas%202.jpg
https://pub-c2bdedaa3f554b5f9b5ab83116411f61.r2.dev/conjunto%20ceu.jpg
https://pub-c2bdedaa3f554b5f9b5ab83116411f61.r2.dev/colecao%20ceu%201.jpg

brinco estrelas
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2413.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2414.JPG

brinco mãe
https://pub-94bcb2830a5d4ebfa1434095a12056c0.r2.dev/brinco%20mae%201.jpg
https://pub-94bcb2830a5d4ebfa1434095a12056c0.r2.dev/brinco%20mae%202.jpg
https://pub-94bcb2830a5d4ebfa1434095a12056c0.r2.dev/conjunto%20mae.jpg

brinco sobreposição II
https://pub-3354cf49be514a26aa10993b78b41ba2.r2.dev/brinco%20sobreposicao%20II.jpg

broche estrela
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/DSC00147.jpg
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/DSC00148.jpg

colar amitis
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/colar%20amitis.jpg

colar concha
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20concha/DSC00389.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20concha/DSC00394.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20concha/DSC00395.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20concha/DSC00400.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20concha/DSC00402.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20concha/DSC00403.jpg

colar explosão
https://pub-dfe23d8c7ee645c1bb7c945ab9a84805.r2.dev/colar%20explosao%201.jpg
https://pub-dfe23d8c7ee645c1bb7c945ab9a84805.r2.dev/colar%20explosao%202.jpg

colar mãe prata
https://pub-8646f2f25aff4c539924f97bd0e4cb62.r2.dev/colar%20mae.jpg
https://pub-8646f2f25aff4c539924f97bd0e4cb62.r2.dev/colares%20mae.jpg

colar mãe ouro
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20m%C3%A3e/DSC00381.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20m%C3%A3e/DSC00378.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20m%C3%A3e/DSC00373.jpg

colar mãe maior
https://pub-044df4e4180549b094336b2b2a546d2a.r2.dev/colar%20mae%20maior%201.jpg
https://pub-044df4e4180549b094336b2b2a546d2a.r2.dev/colar%20mae%20maior%202.jpg
https://pub-044df4e4180549b094336b2b2a546d2a.r2.dev/colar%20mae%20maior%203.jpg
https://pub-044df4e4180549b094336b2b2a546d2a.r2.dev/conjunto%20mae.jpg

colar mãe duplo
https://pub-a9921c4bce914d048563770aa7e9585c.r2.dev/colar%20mae%20duplo.jpg
https://pub-a9921c4bce914d048563770aa7e9585c.r2.dev/colares%20mae.jpg

conjunto martelado estrela
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/conjunto%20martelado%20estrela/DSC00139.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/conjunto%20martelado%20estrela/DSC00147.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/conjunto%20martelado%20estrela/DSC00148.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/conjunto%20martelado%20estrela/DSC00149.jpg

marca páginas peixinho
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2436.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2440.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2441.JPG
https://pub-bb7a957296ca4e0384dbbfed348330d9.r2.dev/IMG_2442.JPG

marca páginas pirarucu
https://pub-b610227a2c38470b90012882b9c8e119.r2.dev/mp%20pirarucu%201.jpg
https://pub-b610227a2c38470b90012882b9c8e119.r2.dev/mp%20pirarucu%202.jpg
https://pub-b610227a2c38470b90012882b9c8e119.r2.dev/mp%20pirarucu%203.jpg

pingente estrela
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/pingente%20estrela/DSC00525.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/pingente%20estrela/DSC00550.jpg
https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/pingente%20estrela/DSC00551.jpg`

// Parse products and add descriptions
const parsedProducts = parseProductsDatabase(databaseContent)

// Add descriptions to products
export const allProducts: Product[] = parsedProducts.map(product => {
  const description = getProductDescription(product.name)
  if (description) {
    return {
      ...product,
      description: formatProductDescription(description),
    }
  }
  return product
})

// Export helper functions
export { getProductBySlug, filterByCategory, filterByMaterial, getCategories, getMaterials } from './products'

// Store products - curated list for jóias page (from store-products-config)
import { STORE_PRODUCTS, STORE_CATEGORIES, type StoreCategory } from './store-products-config'
import { STORE_PAGE_COPY } from './store-product-copy'

function slugFromDisplayName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Build store products list: DB products + placeholders (precisa de correlação de imagens) */
export function getStoreProducts(): Product[] {
  return STORE_PRODUCTS.filter((entry) => !entry.hidden).map((entry) => {
    if (entry.dbSlug) {
      const dbProduct = allProducts.find((p) => p.slug === entry.dbSlug)
      if (dbProduct) {
        const slug = entry.slugOverride ?? dbProduct.slug
        const fromSite = STORE_PAGE_COPY[slug]
        return {
          ...dbProduct,
          id: slug,
          name: entry.displayName,
          category: entry.category,
          slug,
          ...(entry.material ? { material: entry.material } : {}),
          description: fromSite ?? dbProduct.description,
        }
      }
    }
    const slug = entry.slugOverride ?? slugFromDisplayName(entry.displayName)
    return {
      id: slug,
      name: entry.displayName,
      slug,
      images: [],
      category: entry.category,
      material: entry.material ?? 'Não especificado',
      description: STORE_PAGE_COPY[slug],
    }
  })
}

export const storeProducts = getStoreProducts()

export function getStoreProductBySlug(slug: string): Product | undefined {
  return storeProducts.find((p) => p.slug === slug)
}

export function getStoreCategories(): StoreCategory[] {
  return [...STORE_CATEGORIES]
}

export function filterStoreByCategory(products: Product[], category: string): Product[] {
  if (!category) return products
  return products.filter((p) => p.category === category)
}

