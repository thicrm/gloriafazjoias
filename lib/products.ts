// Product data management and parsing

export interface Product {
  id: string
  name: string
  slug: string
  images: string[]
  category: string
  material: string
  nuvemshopId?: string
  nuvemshopUrl?: string
  price?: number
  description?: string
}

// Generate URL-friendly slug from product name
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Extract category from product name
function extractCategory(name: string): string {
  const lowerName = name.toLowerCase()
  if (lowerName.includes('anel')) return 'Anéis'
  if (lowerName.includes('colar')) return 'Colares'
  if (lowerName.includes('brinco')) return 'Brincos'
  if (lowerName.includes('bracelete')) return 'Braceletes'
  if (lowerName.includes('pingente')) return 'Pingentes'
  if (lowerName.includes('marca páginas')) return 'Acessórios'
  if (lowerName.includes('conjunto')) return 'Conjuntos'
  return 'Geral'
}

// Extract material from product name
function extractMaterial(name: string): string {
  const lowerName = name.toLowerCase()
  if (lowerName.includes('ouro')) return 'Ouro'
  if (lowerName.includes('prata')) return 'Prata'
  if (lowerName.includes('latão')) return 'Latão'
  return 'Não especificado'
}

// Parse products database file
export function parseProductsDatabase(databaseContent: string): Product[] {
  const products: Product[] = []
  const lines = databaseContent.split('\n')
  
  let currentProduct: { name: string; images: string[] } | null = null
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    // Skip empty lines and comments
    if (!trimmedLine || trimmedLine.startsWith('#')) {
      // If we hit a blank line and have a product, save it
      if (currentProduct && currentProduct.images.length > 0) {
        const slug = generateSlug(currentProduct.name)
        products.push({
          id: slug,
          name: currentProduct.name,
          slug,
          images: currentProduct.images,
          category: extractCategory(currentProduct.name),
          material: extractMaterial(currentProduct.name),
        })
        currentProduct = null
      }
      continue
    }
    
    // Check if line is a URL (starts with http)
    if (trimmedLine.startsWith('http')) {
      if (currentProduct) {
        currentProduct.images.push(trimmedLine)
      }
    } else {
      // It's a product name
      // Save previous product if exists
      if (currentProduct && currentProduct.images.length > 0) {
        const slug = generateSlug(currentProduct.name)
        products.push({
          id: slug,
          name: currentProduct.name,
          slug,
          images: currentProduct.images,
          category: extractCategory(currentProduct.name),
          material: extractMaterial(currentProduct.name),
        })
      }
      // Start new product
      currentProduct = {
        name: trimmedLine,
        images: [],
      }
    }
  }
  
  // Don't forget the last product
  if (currentProduct && currentProduct.images.length > 0) {
    const slug = generateSlug(currentProduct.name)
    products.push({
      id: slug,
      name: currentProduct.name,
      slug,
      images: currentProduct.images,
      category: extractCategory(currentProduct.name),
      material: extractMaterial(currentProduct.name),
    })
  }
  
  return products
}

// Get all products (for client-side, we'll import the parsed data)
// For server-side, we can read the file directly
export async function getAllProducts(): Promise<Product[]> {
  // In a real implementation, you might read from a file or API
  // For now, we'll use a static import approach
  // This will be replaced with actual file reading or API call
  return []
}

// Get product by slug
export function getProductBySlug(products: Product[], slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

// Filter products by category
export function filterByCategory(products: Product[], category: string): Product[] {
  if (!category) return products
  return products.filter((p) => p.category === category)
}

// Filter products by material
export function filterByMaterial(products: Product[], material: string): Product[] {
  if (!material) return products
  return products.filter((p) => p.material === material)
}

// Get unique categories from products
export function getCategories(products: Product[]): string[] {
  const categories = new Set(products.map((p) => p.category))
  return Array.from(categories).sort()
}

// Get unique materials from products
export function getMaterials(products: Product[]): string[] {
  const materials = new Set(products.map((p) => p.material))
  return Array.from(materials).sort()
}

