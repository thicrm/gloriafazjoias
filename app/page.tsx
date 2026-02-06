import ImageWithLoading from '@/components/ImageWithLoading'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Envelope images - Free disposition, behind symbol carimbo */}
      <section className="w-full relative" style={{ zIndex: 0 }}>
        {/* Envelope verso */}
        <div className="relative w-auto max-w-lg group p-4" style={{ position: 'absolute', top: '10px', left: '20%', transform: 'translateX(20px)' }}>
          <ImageWithLoading
            src="/images/envelope verso.PNG"
            alt=""
            width={520}
            height={780}
            className="w-auto h-auto object-contain transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
            sizes="520px"
          />
        </div>
        
        {/* Postal */}
        <div className="relative w-auto max-w-lg group p-4" style={{ position: 'absolute', top: '150px', right: '10%' }}>
          <ImageWithLoading
            src="/images/postal.PNG"
            alt=""
            width={520}
            height={780}
            className="w-auto h-auto object-contain transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
            sizes="520px"
          />
        </div>
        
        {/* Envelope fechado */}
        <div className="relative w-auto max-w-lg group p-4" style={{ position: 'absolute', top: '120px', left: '30%' }}>
          <ImageWithLoading
            src="/images/enevelope_fechado.PNG"
            alt=""
            width={520}
            height={780}
            className="w-auto h-auto object-contain transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
            sizes="520px"
          />
        </div>
      </section>

      {/* Simbolo Carimbo - Visible on page */}
      <section className="w-full -mt-8 relative" style={{ zIndex: 1 }}>
        <div className="flex justify-center items-center py-20">
          <div className="relative w-[42.5%] sm:w-[35%] md:w-[30%] lg:w-[25%] aspect-square">
            <ImageWithLoading
              src="/images/adesivo01.png"
              alt="Gloria Faz Joias"
              fill
              aspectRatio="1/1"
              className="object-contain transition-all duration-700 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)]"
              priority
              sizes="(max-width: 640px) 42.5vw, (max-width: 768px) 35vw, (max-width: 1024px) 30vw, 25vw"
            />
          </div>
        </div>
      </section>

      {/* Picture Grid Section - Hidden for now, structure preserved for future use */}
      <section className="w-full -mt-8 relative hidden" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full relative">
          <Link href="/products" className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20c%C3%A9u%20estrelado/DSC00506.jpg"
              alt="anel céu estrealdo"
              fill
              aspectRatio="1/1.3"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 16.66vw"
            />
          </Link>
          <Link href="/products" className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20c%C3%A9u%20estrelado/DSC00521.jpg"
              alt="anel céu estrelado"
              fill
              aspectRatio="1/1.3"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 16.66vw"
            />
          </Link>
          <Link href="/products" className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20do%20c%C3%A9u%20II/DSC00500.jpg"
              alt="anel domo do céu II"
              fill
              aspectRatio="1/1.3"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 16.66vw"
            />
          </Link>
          <Link href="/products" className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00260.jpg"
              alt="anel onsen"
              fill
              aspectRatio="1/1.3"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 16.66vw"
            />
          </Link>
          <Link href="/products" className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00263.jpg"
              alt="anel onsen"
              fill
              aspectRatio="1/1.3"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 16.66vw"
            />
          </Link>
          <Link href="/products" className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00266.jpg"
              alt="anel onsen"
              fill
              aspectRatio="1/1.3"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 16.66vw"
            />
          </Link>
        </div>
      </section>

      {/* Philosophy Section - Moved to top of pictures */}
      <section className="w-full pt-40 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="font-body text-lg md:text-xl text-refined-charcoal/80 leading-relaxed mb-6 italic">
              Cada joia é uma obra de arte, criada com atenção aos detalhes. Nossas peças são mais que acessórios;
              são histórias transformadas em ouro e pedras preciosas.
            </p>
            <Link
              href="/products"
              className="inline-block mt-8 px-8 py-3 border border-refined-charcoal text-refined-charcoal hover:bg-refined-charcoal hover:text-refined-ivory transition-all duration-500 ease-in-out font-body"
            >
              conheça nossos produtos
            </Link>
          </div>
        </div>
      </section>
      
      {/* Página.png - Free positioning, no container restrictions */}
      <section className="w-full relative">
        <div className="relative w-auto max-w-2xl group p-8">
          <ImageWithLoading
            src="/images/página.png"
            alt=""
            width={800}
            height={1200}
            className="w-auto h-auto object-contain transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 800px"
          />
        </div>
      </section>

      {/* Featured Product Images Section */}
      <section className="w-full px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* First Image */}
            <Link href="/products" className="flex flex-col items-center group">
              <div className="relative w-full overflow-hidden">
                <ImageWithLoading
                  src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00308.jpg"
                  alt="anel ondas ouro"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="font-title text-xl md:text-2xl text-refined-charcoal mb-2 group-hover:text-refined-charcoal/80 transition-colors duration-500 ease-in-out">
                  anel ondas ouro
                </h3>
                <p className="font-body text-sm md:text-base text-refined-charcoal/70 underline">
                  Ver Produto
                </p>
              </div>
            </Link>

            {/* Second Image */}
            <Link href="/products" className="flex flex-col items-center group">
              <div className="relative w-full overflow-hidden">
                <ImageWithLoading
                  src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00304.jpg"
                  alt="anel ondas ouro"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="font-title text-xl md:text-2xl text-refined-charcoal mb-2 group-hover:text-refined-charcoal/80 transition-colors duration-500 ease-in-out">
                  anel ondas ouro
                </h3>
                <p className="font-body text-sm md:text-base text-refined-charcoal/70 underline">
                  Ver Produto
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

