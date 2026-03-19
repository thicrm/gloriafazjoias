'use client'

import { useState, useEffect } from 'react'
import ImageWithLoading from '@/components/ImageWithLoading'
import { useRouter, useParams } from 'next/navigation'
import { getStoreProductBySlug } from '@/lib/products-data'
import { getProductPricing, formatPrice } from '@/lib/product-pricing'

export default function ProductPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string
  const product = slug ? getStoreProductBySlug(slug) : undefined
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  useEffect(() => {
    if (!product && slug) {
      router.push('/products')
    }
  }, [product, router, slug])

  if (!product) {
    return null
  }

  const hasImages = product.images && product.images.length > 0
  const selectedImage = product.images[selectedImageIndex] || product.images[0]
  const pricing = getProductPricing(product.slug)

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
        <div className="grid grid-cols-2 gap-4 md:gap-12 mb-16 min-w-0">
          {/* Image Section */}
          <div className="min-w-0">
            {/* Selected Image Display */}
            <div className="relative w-full mb-8">
              {hasImages ? (
                <ImageWithLoading
                  src={selectedImage}
                  alt={product.name}
                  fill
                  aspectRatio="1/1"
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="relative w-full aspect-square flex items-center justify-center border-2 border-dashed border-refined-gold/50 bg-refined-gold/5">
                  <p className="font-body text-sm md:text-base text-refined-charcoal/60 uppercase tracking-wider text-center px-4">
                    precisa de correlação de imagens
                  </p>
                </div>
              )}
            </div>

            {/* Image Grid - Similar to home page */}
            {hasImages && product.images.length > 1 && (
              <div className={`grid ${getGridCols(product.images.length)} w-full gap-2 mb-8`}>
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-full overflow-hidden group cursor-pointer transition-all duration-500 ease-in-out ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-refined-charcoal'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <ImageWithLoading
                      src={image}
                      alt={`${product.name} - Imagem ${index + 1}`}
                      fill
                      aspectRatio="1/1.3"
                      className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                      sizes="(max-width: 1024px) 25vw, 10vw"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Comprar button - below images */}
            {pricing && (
              <div className="pt-4 w-full">
                <a
                  href={pricing.checkoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-12 py-4 bg-refined-gold text-refined-ivory border border-refined-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.8),0_0_50px_rgba(212,175,55,0.5)] transition-all duration-500 ease-in-out font-body text-base md:text-lg"
                >
                  comprar
                </a>
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="flex flex-col justify-start min-w-0">
            <h1 className="font-title text-4xl md:text-5xl mb-6 text-refined-charcoal">
              {product.name}
            </h1>
            <div className="mb-6">
              <p className="font-body text-lg text-refined-charcoal/70 mb-2">
                {product.category} • {product.material}
              </p>
              {pricing && (
                <p className="font-body text-lg text-refined-charcoal font-medium mb-4">
                  {formatPrice(pricing.price)}
                </p>
              )}
            </div>
            
            {/* Product Description */}
            {product.description && (
              <div className="mb-8">
                <div className="font-body text-lg text-refined-charcoal/80 leading-relaxed whitespace-pre-line">
                  {product.description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

