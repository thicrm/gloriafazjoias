'use client'

import ImageWithLoading from '@/components/ImageWithLoading'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Grid de imagens: logo abaixo da header, sem espaço */}
      <section className="w-full -mt-8 relative z-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full relative">
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

      {/* Philosophy Section - Próxima ao selo, texto responsivo */}
      <section className="w-full pt-[116px] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-[52px] md:mb-[60px] scale-[0.8]">
            <h1 className="font-title text-xl sm:text-2xl md:text-3xl lg:text-4xl text-refined-charcoal mb-4">
              Jóias que criam histórias.
            </h1>
            <Link
              href="/products"
              className="inline-block mt-2 px-12 py-4 border border-refined-gold text-refined-gold hover:bg-refined-gold hover:text-refined-ivory hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all duration-500 ease-in-out font-body text-base md:text-lg"
            >
              conheça nossas coleções
            </Link>
          </div>
        </div>
      </section>

      {/* Caderno Animation - Centered below button */}
      <section className="w-full flex justify-center -mt-[120px] -mb-[115px]">
        <CadernoAnimation />
      </section>

      {/* Picture Slots Section */}
      <section className="w-full px-4">
        <div className="max-w-7xl mx-auto">
          {/* Three Picture Slots - Centered below */}
          <div className="flex justify-center gap-8 mt-[50px]">
            {/* Picture Slot 1 */}
            <div className="w-[300px] h-[400px] border-2 border-dashed border-refined-gold/50">
              <div className="w-full h-full flex items-center justify-center text-refined-charcoal/30 font-body italic">
                Picture Slot 1
              </div>
            </div>

            {/* Picture Slot 2 */}
            <div className="w-[300px] h-[400px] border-2 border-dashed border-refined-gold/50">
              <div className="w-full h-full flex items-center justify-center text-refined-charcoal/30 font-body italic">
                Picture Slot 2
              </div>
            </div>

            {/* Picture Slot 3 */}
            <div className="w-[300px] h-[400px] border-2 border-dashed border-refined-gold/50">
              <div className="w-full h-full flex items-center justify-center text-refined-charcoal/30 font-body italic">
                Picture Slot 3
              </div>
            </div>
          </div>

          {/* Encomendas Button with Maçarico and Alicate Animations - Centered below slots */}
          <div className="flex items-center justify-center gap-8 mt-[100px] mb-[180px]">
            {/* Maçarico Animation */}
            <MacaricoAnimation />
            
            {/* Encomendas Button */}
            <Link
              href="/encomendas"
              className="inline-block px-12 py-4 border border-refined-gold text-refined-gold hover:bg-refined-gold hover:text-refined-ivory hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all duration-500 ease-in-out font-body text-base md:text-lg"
            >
              encomendas
            </Link>

            {/* Alicate Animation */}
            <AlicateAnimation />
          </div>
        </div>
      </section>

      {/* Full Width 3-Column Picture Grid - Coleção Mãe */}
      <section className="w-full relative -mt-[120px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full">
          <Link href="/products" className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/brinco%20m%C3%A3e/DSC00359.jpg"
              alt="brinco mãe"
              fill
              aspectRatio="1/0.91"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 33.33vw"
            />
          </Link>
          <Link href="/products" className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20m%C3%A3e/DSC00357.jpg"
              alt="colar mãe prata"
              fill
              aspectRatio="1/0.91"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 33.33vw"
            />
          </Link>
          <Link href="/products" className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/colar%20m%C3%A3e/DSC00381.jpg"
              alt="colar mãe ouro"
              fill
              aspectRatio="1/0.91"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="(max-width: 768px) 50vw, 33.33vw"
            />
          </Link>
        </div>
      </section>

      {/* Envelope Animation - Centered */}
      <section className="w-full flex justify-center mt-[50px] mb-4">
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
      className="relative w-[300px] h-[300px] cursor-pointer ml-[-200px] -mt-16 transition-all duration-700 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)]"
      style={{ transform: 'rotate(-20deg) translateY(30px)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/ma%C3%A7arico-fechado.png"
        alt="Maçarico"
        fill
        className={`object-contain transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
      />
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/ma%C3%A7arico-aberto.png"
        alt="Maçarico"
        fill
        className={`object-contain transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
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
      className="relative w-[300px] h-[300px] cursor-pointer mr-[-200px] -mt-16 transition-all duration-700 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)]"
      style={{ transform: 'rotate(90deg) translateY(-30px)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/alicate-fechado.png"
        alt="Alicate"
        fill
        className={`object-contain transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
      />
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/alicate-aberto.png"
        alt="Alicate"
        fill
        className={`object-contain transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        unoptimized
      />
    </div>
  )
}

// Caderno Animation Component
function CadernoAnimation() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link 
      href="/about"
      className="relative w-[891px] h-[594px] cursor-pointer transition-all duration-700 ease-in-out hover:scale-105 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)] translate-x-[50px] scale-[0.9]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/caderno-sobre-2.png"
        alt="Caderno Sobre"
        fill
        className={`object-contain transition-opacity duration-300 scale-[0.9] ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
      />
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/caderno-sobre-1.png"
        alt="Caderno Sobre Hover"
        fill
        className={`object-contain transition-opacity duration-300 scale-[0.9] ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        unoptimized
      />
    </Link>
  )
}

// Envelope Animation Component
function EnvelopeAnimation() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link 
      href="/contato"
      className="relative w-[891px] h-[594px] cursor-pointer transition-all duration-700 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
    </Link>
  )
}

