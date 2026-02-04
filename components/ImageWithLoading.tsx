'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ImageWithLoadingProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  aspectRatio?: string
}

export default function ImageWithLoading({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  sizes,
  priority = false,
  aspectRatio,
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const imageProps = fill
    ? {
        fill: true,
        sizes: sizes || '(max-width: 768px) 100vw, 50vw',
      }
    : {
        width: width || 800,
        height: height || 600,
      }

  // Convert aspectRatio string (e.g., "1/1.3") to CSS aspect-ratio
  const aspectRatioStyle = aspectRatio ? { aspectRatio } : undefined
  const aspectRatioClass = aspectRatio ? `aspect-[${aspectRatio}]` : ''

  return (
    <div
      className={`relative ${aspectRatioClass} w-full overflow-hidden will-change-transform`}
      style={aspectRatioStyle}
    >
      {/* Skeleton Loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-refined-cream/30 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-refined-cream/20 via-refined-cream/40 to-refined-cream/20 animate-shimmer" />
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-refined-cream/30 flex items-center justify-center">
          <span className="font-body text-sm text-refined-charcoal/50">
            Erro ao carregar imagem
          </span>
        </div>
      )}

      {/* Image */}
      <Image
        src={src}
        alt={alt}
        {...imageProps}
        className={`${className} ${isLoading ? 'opacity-0' : ''} will-change-transform`}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false)
          setHasError(true)
        }}
      />
    </div>
  )
}

