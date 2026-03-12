import ImageWithLoading from '@/components/ImageWithLoading'
import { allProducts } from '@/lib/products-data'
import { colecoes } from '@/lib/colecoes-data'
import Link from 'next/link'

export default function TodasColecoesPage() {
  return (
    <div className="min-h-screen px-4 pb-24">
      <div className="max-w-6xl mx-auto pt-16 md:pt-20 lg:pt-24">
        {/* Page title - same as individual collection page */}
        <div className="text-center mb-12">
          <h1
            className="font-title text-3xl md:text-4xl lg:text-5xl text-refined-gold mb-4"
            style={{
              textShadow:
                '0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.4)',
            }}
          >
            Coleções
          </h1>
          <p className="font-body text-sm md:text-base text-refined-royal-blue">
            Explore universos de joias agrupadas por narrativa, matéria e imaginação.
          </p>
        </div>

        {/* All collections stacked */}
        <div className="space-y-20">
          {colecoes.map((colecao) => {
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
                    <h2 className="font-title text-2xl md:text-3xl text-refined-charcoal">
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

                {/* Images below text - or placeholder if none */}
                <div className="w-full">
                  {hasImages ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
                      {productsForCollection.map((product) => {
                        const firstImage = product.images?.[0]
                        if (!firstImage) return null

                        return (
                          <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            className="relative w-full overflow-hidden group cursor-pointer aspect-[3/4] block"
                          >
                            <ImageWithLoading
                              src={firstImage}
                              alt={product.name}
                              fill
                              aspectRatio="3/4"
                              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                              sizes="(max-width: 768px) 50vw, 33vw"
                            />
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
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
