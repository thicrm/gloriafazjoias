import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Simbolo Carimbo - Overlay on Grid */}
      <div className="absolute left-1/2 transform -translate-x-1/2 scale-[0.85]" style={{ top: '80px', zIndex: 10 }}>
        <Image
          src="/images/adesivo01.png"
          alt="Gloria Faz Joias"
          width={600}
          height={600}
          className="object-contain transition-all duration-500 ease-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)]"
          priority
        />
      </div>

      {/* Picture Grid Section */}
      <section className="w-full -mt-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-6 w-full">
          <Link href="/products" className="relative w-full aspect-[1/1.3] overflow-hidden group cursor-pointer">
            <Image
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20c%C3%A9u%20estrelado/DSC00506.jpg"
              alt="anel céu estrealdo"
              fill
              className="object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 16.66vw"
            />
          </Link>
          <Link href="/products" className="relative w-full aspect-[1/1.3] overflow-hidden group cursor-pointer">
            <Image
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20c%C3%A9u%20estrelado/DSC00521.jpg"
              alt="anel céu estrelado"
              fill
              className="object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 16.66vw"
            />
          </Link>
          <Link href="/products" className="relative w-full aspect-[1/1.3] overflow-hidden group cursor-pointer">
            <Image
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20domo%20do%20c%C3%A9u%20II/DSC00500.jpg"
              alt="anel domo do céu II"
              fill
              className="object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 16.66vw"
            />
          </Link>
          <Link href="/products" className="relative w-full aspect-[1/1.3] overflow-hidden group cursor-pointer">
            <Image
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00260.jpg"
              alt="anel onsen"
              fill
              className="object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 16.66vw"
            />
          </Link>
          <Link href="/products" className="relative w-full aspect-[1/1.3] overflow-hidden group cursor-pointer">
            <Image
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00263.jpg"
              alt="anel onsen"
              fill
              className="object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 16.66vw"
            />
          </Link>
          <Link href="/products" className="relative w-full aspect-[1/1.3] overflow-hidden group cursor-pointer">
            <Image
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20onsen/DSC00266.jpg"
              alt="anel onsen"
              fill
              className="object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 16.66vw"
            />
          </Link>
        </div>
      </section>

      {/* Philosophy Section - Moved to top of pictures */}
      <section className="w-full pt-40 px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="font-body text-lg md:text-xl text-refined-charcoal/80 leading-relaxed mb-6 italic">
            Cada joia é uma obra de arte, criada com atenção aos detalhes. Nossas peças são mais que acessórios;
            são histórias transformadas em ouro e pedras preciosas.
          </p>
          <Link
            href="/products"
            className="inline-block mt-8 px-8 py-3 border border-refined-charcoal text-refined-charcoal hover:bg-refined-charcoal hover:text-refined-ivory transition-all duration-300 font-body"
          >
            conheça nossos produtos
          </Link>
        </div>
      </section>

      {/* Featured Product Images Section */}
      <section className="w-full px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* First Image */}
            <Link href="/products" className="flex flex-col items-center group">
              <div className="relative w-full overflow-hidden">
                <Image
                  src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00308.jpg"
                  alt="anel ondas ouro"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="font-title text-xl md:text-2xl text-refined-charcoal mb-2 group-hover:text-refined-charcoal/80 transition-colors">
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
                <Image
                  src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00304.jpg"
                  alt="anel ondas ouro"
                  width={800}
                  height={600}
                  className="w-full h-auto object-contain transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="mt-6 text-center">
                <h3 className="font-title text-xl md:text-2xl text-refined-charcoal mb-2 group-hover:text-refined-charcoal/80 transition-colors">
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

