'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { allProducts, getProductBySlug } from '@/lib/products-data'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter()
  const product = getProductBySlug(allProducts, params.slug)

  useEffect(() => {
    if (!product) {
      router.push('/products')
    }
  }, [product, router])

  if (!product) {
    return null
  }

  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const selectedImage = product.images[selectedImageIndex] || product.images[0]

  // Calculate grid columns based on number of images
  const getGridCols = (count: number) => {
    if (count <= 2) return 'grid-cols-2'
    if (count <= 3) return 'grid-cols-3'
    if (count <= 4) return 'grid-cols-4'
    if (count <= 5) return 'grid-cols-5'
    return 'grid-cols-6'
  }

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Section */}
          <div>
            {/* Selected Image Display */}
            <div className="relative w-full aspect-square bg-refined-cream overflow-hidden mb-8">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Image Grid - Similar to home page */}
            <div className={`grid ${getGridCols(product.images.length)} w-full gap-2`}>
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-full aspect-[1/1.3] overflow-hidden group cursor-pointer transition-all duration-300 ${
                    selectedImageIndex === index
                      ? 'ring-2 ring-refined-charcoal'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - Imagem ${index + 1}`}
                    fill
                    className="object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                    sizes="(max-width: 1024px) 25vw, 10vw"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-center">
            <h1 className="font-title text-4xl md:text-5xl mb-6 text-refined-charcoal">
              {product.name}
            </h1>
            <div className="mb-6">
              <p className="font-body text-lg text-refined-charcoal/70 mb-2">
                {product.category} • {product.material}
              </p>
            </div>
            
            {/* Product Description - Placeholder for now */}
            <div className="mb-8">
              <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed">
                Cada peça é única e feita à mão com atenção aos detalhes. 
                Esta joia reflete a paixão pela arte e pela literatura que inspira cada criação.
              </p>
            </div>

            {/* Nuvemshop Widget Placeholder - To be implemented */}
            <div className="border-t border-refined-charcoal/10 pt-8">
              <p className="font-body text-sm text-refined-charcoal/60 mb-4">
                Widget de compra Nuvemshop será integrado aqui
              </p>
              {/* TODO: Add Nuvemshop buy button/widget */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

