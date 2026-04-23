'use client'

import ImageWithLoading from '@/components/ImageWithLoading'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const novidadesImages = [
    {
      src: 'https://pub-f43e187975d24eb89983c20ee1013ffa.r2.dev/_MG_5386.jpg',
      alt: 'jóias gloria faz joias',
    },
    {
      src: 'https://pub-f43e187975d24eb89983c20ee1013ffa.r2.dev/dia%20das%20maes%20site.png',
      alt: 'dia das mães gloria faz joias',
    },
    {
      src: 'https://pub-f43e187975d24eb89983c20ee1013ffa.r2.dev/_MG_5209.jpg',
      alt: 'jóias gloria faz joias',
    },
  ]

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Grid de imagens: logo abaixo da header, sem espaço */}
      <section className="w-full relative z-0 overflow-x-clip">
        <div className="grid grid-cols-3 w-full relative">
          {/* Simbolo Carimbo - Center aligned with bottom edge of grid */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-10 w-[42.5%] sm:w-[35%] md:w-[30%] lg:w-[25%] pointer-events-none">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/selo_o%CC%81.png"
              alt="Gloria Faz Joias"
              fill
              aspectRatio="1/1"
              className="object-contain transition-all duration-700 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)] pointer-events-auto"
              priority
              sizes="(max-width: 640px) 42.5vw, (max-width: 768px) 35vw, (max-width: 1024px) 30vw, 25vw"
            />
          </div>
          <Link href="/products" className="relative w-full min-w-0 overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-82a04559941243a3b2242339c224a2f8.r2.dev/mp%20pirarucu%20azul.jpg"
              alt="marca-página pirarucu"
              fill
              aspectRatio="1/0.91"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 33.33vw"
            />
          </Link>
          <Link href="/products" className="relative w-full min-w-0 overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-82a04559941243a3b2242339c224a2f8.r2.dev/_MG_5123-Editar.jpg"
              alt="jóias gloria faz joias"
              fill
              aspectRatio="1/0.91"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 33.33vw"
            />
          </Link>
          <Link href="/products" className="relative w-full min-w-0 overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-82a04559941243a3b2242339c224a2f8.r2.dev/colar%20explosao%202.jpg"
              alt="colar explosão"
              fill
              aspectRatio="1/0.91"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 33.33vw"
            />
          </Link>
        </div>
      </section>

      {/* Philosophy Section - Próxima ao selo, texto responsivo */}
      <section className="w-full pt-[60px] sm:pt-[90px] md:pt-[116px] px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-[12px] sm:mb-[56px] md:mb-[72px] scale-[0.7] sm:scale-[0.75] md:scale-[0.8]">
            <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl text-refined-charcoal mb-4">
              jóias que criam histórias.
            </h1>
            <Link
              href="/colecoes/todas"
              className="inline-block mt-2 px-12 py-4 border border-refined-gold text-refined-gold hover:bg-refined-gold hover:text-refined-ivory hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all duration-500 ease-in-out font-body text-base md:text-lg"
            >
              conheça nossas coleções
            </Link>
          </div>
        </div>
      </section>

      {/* Caderno Animation - Centered below button */}
      <section className="w-full flex justify-center -mt-[20px] sm:-mt-[60px] md:-mt-[90px] lg:-mt-[120px] -mb-[30px] sm:-mb-[50px] md:-mb-[80px] lg:-mb-[115px] pt-4 pb-10 sm:pt-14 sm:pb-14 md:pt-0 md:pb-0 px-4 overflow-hidden">
        <CadernoAnimation />
      </section>

      {/* Novidades + encomendas row: scaled together on md+; pb-0 so gap below encomendas = mb only (matches mt above) */}
      <section className="w-full overflow-visible px-4 md:pt-24 md:pb-0">
        <div className="mx-auto max-w-7xl md:origin-top md:scale-[1.1]">
          {/* Desktop/Tablet: 3 cards in a row */}
          <div className="mx-auto mt-[50px] hidden w-full max-w-[964px] items-stretch sm:grid sm:grid-cols-3 sm:gap-8 lg:grid-cols-4 lg:gap-8">
            <Link href="/products" className="relative lg:col-span-1 w-full min-w-0 h-[260px] md:h-[320px] overflow-hidden group cursor-pointer">
              <Image
                src={novidadesImages[0].src}
                alt={novidadesImages[0].alt}
                fill
                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 1024px) 33vw, 320px"
                unoptimized
              />
            </Link>
            <Link href="/products" className="relative lg:col-span-2 w-full min-w-0 h-[260px] md:h-[320px] overflow-hidden group cursor-pointer">
              <Image
                src={novidadesImages[1].src}
                alt={novidadesImages[1].alt}
                fill
                className="object-cover object-center transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 1024px) 33vw, 320px"
                unoptimized
              />
            </Link>
            <Link href="/products" className="relative lg:col-span-1 w-full min-w-0 h-[260px] md:h-[320px] overflow-hidden group cursor-pointer">
              <Image
                src={novidadesImages[2].src}
                alt={novidadesImages[2].alt}
                fill
                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 1024px) 33vw, 320px"
                unoptimized
              />
            </Link>
          </div>

          {/* Phone: snap carousel — same pattern as all-collections page */}
          <div className="sm:hidden w-full overflow-x-auto snap-x snap-mandatory flex gap-3 pb-4 mt-[50px]">
            {novidadesImages.map((img, idx) => (
              <Link
                key={idx}
                href="/products"
                className="snap-center flex-shrink-0 w-[72vw] relative overflow-hidden group cursor-pointer aspect-[3/4] block"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                  sizes="72vw"
                  unoptimized
                />
              </Link>
            ))}
          </div>

          {/* Encomendas Button with Maçarico and Alicate Animations - always in a row, scaled to fit */}
          <div className="flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-8 mt-8 sm:mt-10 md:mt-12 lg:mt-14 mb-[42px] sm:mb-10 md:mb-12 lg:mb-14 overflow-visible w-full px-8 md:px-52">
            {/* Maçarico Animation */}
            <MacaricoAnimation />
            
            {/* Encomendas Button */}
            <Link
              href="/encomendas"
              className="inline-block flex-shrink-0 px-6 py-2 sm:px-10 sm:py-3 md:px-12 md:py-4 border border-refined-gold text-refined-gold hover:bg-refined-gold hover:text-refined-ivory hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all duration-500 ease-in-out font-body text-sm sm:text-base md:text-lg"
            >
              encomendas
            </Link>

            {/* Alicate Animation */}
            <AlicateAnimation />
          </div>
        </div>
      </section>

      {/* Picture Slots Section (2) */}
      <section className="w-full px-4 relative mt-[20px]">
        <div className="max-w-7xl mx-auto">
          <div className="mt-[30px] grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-[964px] mx-auto">
            <Link href="/products" className="relative w-full min-w-0 aspect-[3/4] overflow-hidden group cursor-pointer">
              <Image
                src="https://pub-ca5e41281f40490bae03182e5cb87c45.r2.dev/brinco%20mae%201.jpg"
                alt="brinco mãe"
                fill
                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 768px) 33vw, 320px"
                unoptimized
              />
            </Link>
            <Link href="/products" className="relative w-full min-w-0 aspect-[3/4] overflow-hidden group cursor-pointer">
              <Image
                src="https://pub-ca5e41281f40490bae03182e5cb87c45.r2.dev/colar%20mae%20maior%202.jpg"
                alt="colar mãe maior"
                fill
                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 768px) 33vw, 320px"
                unoptimized
              />
            </Link>
            <Link href="/products" className="relative w-full min-w-0 aspect-[3/4] overflow-hidden group cursor-pointer">
              <Image
                src="https://pub-ca5e41281f40490bae03182e5cb87c45.r2.dev/colar%20mae%20maior%203.jpg"
                alt="colar mãe maior"
                fill
                className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                sizes="(max-width: 768px) 33vw, 320px"
                unoptimized
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Envelope Animation - Centered */}
      <section className="w-full flex justify-center mt-[50px] mb-4 px-4 overflow-visible py-8 max-sm:overflow-x-clip max-sm:px-0 max-sm:py-20">
        <EnvelopeAnimation />
      </section>

      {/* Featured Product Images Section - Hidden for now */}
      {/*
      <section className="w-full px-4 pb-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <Link href="/products" className="flex flex-col items-center group">
              <div className="relative w-full overflow-hidden">
                <ImageWithLoading
                  src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00308.jpg"
                  alt="anel ondas ouro"
                  width={800}
                  height={600}
                  className="w-[70%] md:w-[70%] h-auto mx-auto object-contain transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
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

            <Link href="/products" className="flex flex-col items-center group">
              <div className="relative w-full overflow-hidden">
                <ImageWithLoading
                  src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/anel%20ondas/DSC00304.jpg"
                  alt="anel ondas ouro"
                  width={800}
                  height={600}
                  className="w-[70%] md:w-[70%] h-auto mx-auto object-contain transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
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
      */}
    </div>
  )
}

// Maçarico Animation Component
function MacaricoAnimation() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[300px] md:h-[300px] cursor-pointer flex-shrink-0 ml-0 sm:ml-[-80px] md:ml-[-200px] -mt-4 sm:-mt-8 md:-mt-16 transition-all duration-700 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)] rotate-[-20deg] translate-y-0 md:translate-y-[30px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/ma%C3%A7arico-fechado.png"
        alt="Maçarico"
        fill
        className={`object-contain ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
      />
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/ma%C3%A7arico-aberto.png"
        alt="Maçarico"
        fill
        className={`object-contain ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        unoptimized
      />
    </div>
  )
}

// Alicate Animation Component
function AlicateAnimation() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[300px] md:h-[300px] cursor-pointer flex-shrink-0 mr-0 sm:mr-[-80px] md:mr-[-200px] -mt-4 sm:-mt-8 md:-mt-16 transition-all duration-700 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)] rotate-90 translate-y-0 md:-translate-y-[30px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/alicate-fechado.png"
        alt="Alicate"
        fill
        className={`object-contain ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
      />
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/alicate-aberto.png"
        alt="Alicate"
        fill
        className={`object-contain ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        unoptimized
      />
    </div>
  )
}

// Caderno Animation Component
// On touch devices: looping GIF (hover doesn't work). On desktop: hover-based image swap.
function CadernoAnimation() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link 
      href="/about"
      className="relative w-full max-w-[891px] aspect-[891/594] min-h-[200px] cursor-pointer transition-all duration-700 ease-in-out hover:scale-105 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)] translate-x-[5px] sm:translate-x-[25px] md:translate-x-[50px] scale-[1.4] sm:scale-[0.88] md:scale-[0.9] touch:translate-x-[25px] touch:sm:translate-x-[25px] touch:md:translate-x-[50px] touch:scale-[0.88] touch:sm:scale-[0.88] touch:md:scale-[0.9] block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Touch devices: looping GIF (no hover) - scaled up 50% on mobile viewport */}
      <span className="hidden touch:block absolute inset-0 scale-150 sm:scale-100 origin-center">
        <Image
          src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/gif_caderno_abrindo.gif"
          alt="Caderno Sobre"
          fill
          className="object-contain scale-[0.9]"
          unoptimized
        />
      </span>
      {/* Desktop: hover-based image swap */}
      <span className="block touch:hidden absolute inset-0">
        <Image
          src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/caderno-sobre-2.png"
          alt="Caderno Sobre"
          fill
          className={`object-contain transition-opacity duration-300 scale-[0.9] ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          unoptimized
        />
        <Image
          src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/caderno-sobre-1-corrigido.png"
          alt="Caderno Sobre Hover"
          fill
          className={`object-contain transition-opacity duration-300 scale-[0.9] ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          unoptimized
        />
      </span>
    </Link>
  )
}

// Envelope Animation Component
// On touch devices: looping GIF (hover doesn't work). On desktop: hover-based image swap.
function EnvelopeAnimation() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link 
      href="/contato"
      className="relative w-full max-w-[891px] aspect-[891/594] min-h-[200px] cursor-pointer transition-all duration-700 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)] block max-sm:scale-[1.95] max-sm:origin-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Touch devices: looping GIF (no hover) */}
      <span className="hidden touch:block absolute inset-0">
        <Image
          src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/envelope_contato.gif"
          alt="Envelope Contato"
          fill
          className="object-contain"
          unoptimized
        />
      </span>
      {/* Desktop: hover-based image swap */}
      <span className="block touch:hidden absolute inset-0">
        <Image
          src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/envelope_contato_2.png"
          alt="Envelope Contato"
          fill
          className={`object-contain transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
          unoptimized
        />
        <Image
          src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/envelope_contato_1.png"
          alt="Envelope Contato Hover"
          fill
          className={`object-contain transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          unoptimized
        />
      </span>
    </Link>
  )
}

