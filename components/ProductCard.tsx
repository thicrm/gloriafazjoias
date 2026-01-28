import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Get first image for default display
  const firstImage = product.images[0] || ''
  // Get second image for hover (if available)
  const secondImage = product.images[1] || firstImage

  return (
    <Link href={`/products/${product.slug}`}>
      <div className="group cursor-pointer">
        <div className="relative aspect-square bg-black overflow-hidden mb-4">
          {/* Default image */}
          <Image
            src={firstImage}
            alt={product.name}
            fill
            className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Hover image (second image or same if only one) */}
          <Image
            src={secondImage}
            alt={product.name}
            fill
            className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
        <div className="text-center">
          <h3 className="font-title text-xl mb-2 text-refined-charcoal group-hover:text-refined-charcoal/80 transition-colors">
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

