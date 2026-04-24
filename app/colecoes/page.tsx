import ImageWithLoading from '@/components/ImageWithLoading'
import { storeProducts } from '@/lib/products-data'
import { visibleColecoes, type CollectionKey } from '@/lib/colecoes-data'
import { getProductPricing, formatPrice } from '@/lib/product-pricing'
import Link from 'next/link'

export default async function ColecoesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const rawKey = params.colecao
  const key = Array.isArray(rawKey) ? rawKey[0] : rawKey

  const active =
    visibleColecoes.find((c) => c.key === (key as CollectionKey)) ?? visibleColecoes[0]

  const productsForCollection = active.storeProductSlugs
    ? (active.storeProductSlugs
        .map((slug) => storeProducts.find((p) => p.slug === slug))
        .filter(Boolean) as typeof storeProducts)
    : []

  return (
    <div className="min-h-screen px-4 pb-24">
      <div className="max-w-6xl mx-auto pt-16 md:pt-20 lg:pt-24">
        {/* Título da página - dourado com brilho */}
        <div className="text-center mb-12">
          <h1
            className="font-title text-3xl md:text-4xl lg:text-5xl text-refined-gold mb-4 font-bold"
            style={{
              textShadow:
                '0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.4)',
            }}
          >
            coleções
          </h1>
          <p className="font-body text-sm md:text-base text-refined-royal-blue">
            Explore universos de joias agrupadas por narrativa, matéria e imaginação.
          </p>
        </div>

        {/* Identificação da coleção ativa */}
        <div className="text-center mb-10">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-refined-charcoal/60 mb-2">
            {active.titulo}
          </p>
          {active.subtitulo && (
            <h2 className="font-title text-2xl md:text-3xl text-refined-charcoal font-bold">
              {active.subtitulo}
            </h2>
          )}
        </div>

        {/* Texto da coleção - antes das imagens */}
        <section className="w-full max-w-3xl mx-auto text-center mb-12">
          <p className="font-body text-base md:text-lg text-refined-charcoal/80 leading-relaxed">
            {active.descricao}
          </p>
        </section>

        {/* Grid de imagens da coleção - no final */}
        {/* Desktop: 3-col grid | Mobile: stacked single column */}
        <section className="w-full mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 w-full">
            {productsForCollection.map((product) => {
              const firstImage = product.images[0]
              if (!firstImage) return null
              const pricing = getProductPricing(product.slug)

              return (
                <Link
                  key={product.slug}
                  href={`/products/${product.slug}`}
                  className="w-full min-w-0 block group cursor-pointer"
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden mb-3">
                    <ImageWithLoading
                      src={firstImage}
                      alt={product.name}
                      fill
                      aspectRatio="3/4"
                      className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-title text-lg text-refined-charcoal group-hover:text-refined-charcoal/80 transition-colors duration-500 ease-in-out">
                      {product.name}
                    </h3>
                    {pricing && (
                      <p className="font-body text-sm text-refined-charcoal/70 mt-1">
                        {formatPrice(pricing.price)}
                      </p>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
