import ImageWithLoading from '@/components/ImageWithLoading'
import { allProducts } from '@/lib/products-data'
import { visibleColecoes } from '@/lib/colecoes-data'
import { getProductPricing, formatPrice } from '@/lib/product-pricing'
import Link from 'next/link'

export default function TodasColecoesPage() {
  return (
    <div className="min-h-screen px-4 pb-24">
      <div className="max-w-6xl mx-auto pt-16 md:pt-20 lg:pt-24">
        {/* Page title - same as individual collection page */}
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
          <p className="font-body text-sm md:text-base text-black">
            Explore universos de joias agrupadas por narrativa, matéria e imaginação.
          </p>
        </div>

        {/* All collections stacked */}
        <div className="space-y-20">
          {visibleColecoes.map((colecao) => {
            const productsForCollection = allProducts.filter((product) => {
              const name = product.name.toLowerCase()
              return colecao.productNameFilters.some((fragment) =>
                name.includes(fragment.toLowerCase()),
              )
            })

            const hasImages = productsForCollection.some((p) => p.images?.length > 0)

            return (
              <section key={colecao.key} className="border-b border-refined-gold/30 pb-16 last:border-0">
                {/* Title on top */}
                <div className="text-center mb-6">
                  <p className="font-body text-xs tracking-[0.25em] uppercase text-refined-charcoal/60 mb-2">
                    {colecao.titulo}
                  </p>
                  {colecao.subtitulo && (
                    <h2 className="font-title text-2xl md:text-3xl text-refined-charcoal font-bold">
                      {colecao.subtitulo}
                    </h2>
                  )}
                </div>

                {/* Text below title */}
                <div className="w-full max-w-3xl mx-auto text-center mb-10">
                  <p className="font-body text-base md:text-lg text-refined-charcoal/80 leading-relaxed">
                    {colecao.descricao}
                  </p>
                </div>

                {/* Carousel — snap scroll on all screen sizes */}
                <div className="w-full">
                  {hasImages ? (
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 md:gap-6 pb-4 w-full no-scrollbar">
                      {productsForCollection.map((product) => {
                        const firstImage = product.images?.[0]
                        if (!firstImage) return null
                        const pricing = getProductPricing(product.slug)

                        return (
                          <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            className="snap-center flex-shrink-0 w-[72vw] md:w-[260px] block group cursor-pointer"
                          >
                            <div className="relative w-full aspect-[3/4] overflow-hidden mb-3">
                              <ImageWithLoading
                                src={firstImage}
                                alt={product.name}
                                fill
                                aspectRatio="3/4"
                                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                                sizes="(max-width: 768px) 72vw, 260px"
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
                  ) : (
                    <div className="w-full min-h-[200px] flex items-center justify-center border-2 border-dashed border-refined-gold/50 bg-refined-gold/5">
                      <p className="font-body text-sm md:text-base text-refined-charcoal/60 uppercase tracking-wider">
                        PRECISA DE CORRELAÇÃO DE IMAGENS
                      </p>
                    </div>
                  )}
                </div>

                {/* Explorar button */}
                <div className="flex justify-center mt-8">
                  <Link
                    href={`/colecoes?colecao=${colecao.key}`}
                    className="inline-block px-10 py-3 border border-refined-gold text-refined-gold hover:bg-refined-gold hover:text-refined-ivory hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all duration-500 ease-in-out font-body text-sm md:text-base tracking-wide"
                  >
                    explorar esta coleção
                  </Link>
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
