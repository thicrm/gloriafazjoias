import ImageWithLoading from './ImageWithLoading'
import Link from 'next/link'
import { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasImages = product.images && product.images.length > 0
  const firstImage = product.images[0] || ''
  const secondImage = product.images[1] || firstImage

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group cursor-pointer">
        <div className="relative mb-4 aspect-square overflow-hidden">
          {hasImages ? (
            <>
              {/* Default image */}
              <div className="absolute inset-0">
                <ImageWithLoading
                  src={firstImage}
                  alt={product.name}
                  fill
                  aspectRatio="1/1"
                  className="object-cover transition-opacity duration-700 ease-in-out group-hover:opacity-0"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              {/* Hover image (second image or same if only one) */}
              <div className="absolute inset-0">
                <ImageWithLoading
                  src={secondImage}
                  alt={product.name}
                  fill
                  aspectRatio="1/1"
                  className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center border-2 border-dashed border-refined-gold/50 bg-refined-gold/5">
              <p className="font-body text-sm text-refined-charcoal/60 uppercase tracking-wider text-center px-2">
                precisa de correlação de imagens
              </p>
            </div>
          )}
        </div>
        <div className="text-center">
          <h3 className="font-title text-xl mb-2 text-refined-charcoal group-hover:text-refined-charcoal/80 transition-colors duration-500 ease-in-out">
            {product.name}
          </h3>
          <p className="font-body text-refined-charcoal/70 mb-2">
            {product.category} • {product.material}
          </p>
        </div>
      </div>
    </Link>
  )
}

