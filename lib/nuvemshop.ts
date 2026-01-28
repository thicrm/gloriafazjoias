// Nuvemshop API integration utilities
// This file will handle fetching products from Nuvemshop API

interface NuvemshopProduct {
  id: number
  name: string
  price: number
  images: Array<{ src: string }>
  variants: Array<{
    id: number
    price: string
    sku: string
  }>
  categories: Array<{ id: number; name: string }>
  tags: string[]
}

interface NuvemshopConfig {
  storeId: string
  accessToken: string
}

// Example function to fetch products from Nuvemshop API
export async function fetchNuvemshopProducts(
  config: NuvemshopConfig
): Promise<NuvemshopProduct[]> {
  try {
    const response = await fetch(
      `https://api.nuvemshop.com.br/2025-03/${config.storeId}/products`,
      {
        headers: {
          'Authentication': `bearer ${config.accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch products from Nuvemshop')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching Nuvemshop products:', error)
    throw error
  }
}

// Transform Nuvemshop product to our Product format
export function transformNuvemshopProduct(
  nuvemshopProduct: NuvemshopProduct
): {
  id: string
  name: string
  price: number
  image: string
  category: string
  material: string
  nuvemshopId: string
} {
  return {
    id: nuvemshopProduct.id.toString(),
    name: nuvemshopProduct.name,
    price: parseFloat(nuvemshopProduct.variants[0]?.price || '0'),
    image: nuvemshopProduct.images[0]?.src || '',
    category: nuvemshopProduct.categories[0]?.name || 'Geral',
    material: extractMaterial(nuvemshopProduct.tags),
    nuvemshopId: nuvemshopProduct.id.toString(),
  }
}

// Helper to extract material from tags
function extractMaterial(tags: string[]): string {
  const materialTags = ['Ouro', 'Prata', 'Diamante', 'Platina']
  const found = tags.find((tag) =>
    materialTags.some((material) =>
      tag.toLowerCase().includes(material.toLowerCase())
    )
  )
  return found || 'Não especificado'
}

