'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()
  const topMargin = pathname === '/contato' ? 'mt-6 max-md:mt-5 md:mt-10' : 'mt-12'

  return (
    <footer
      className={`text-refined-charcoal ${topMargin} border-t border-refined-gold relative z-20 overflow-hidden`}
      style={{
        backgroundImage: "url('/images/ azul.jpg')",
        backgroundSize: 'auto 100%',
        backgroundPosition: 'left top',
        backgroundRepeat: 'repeat-x',
        boxShadow: '0 -1px 10px rgba(212, 175, 55, 0.5), 0 -1px 20px rgba(212, 175, 55, 0.3)',
      }}
    >
      <div
        className="absolute inset-0 z-[5] transition-all duration-700 ease-in-out hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]"
        style={{
          backgroundImage: "url('/images/footer01-estrelas.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          pointerEvents: 'auto',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10">
        {/* Phone layout only (<640px) */}
        <div className="flex flex-col items-center justify-center gap-5 text-center sm:hidden">
          <div className="text-white">
            <h3 className="font-title font-bold text-base mb-2">Descubra</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/products" className="font-body italic text-sm hover:text-refined-gold transition-colors duration-300">
                  jóias
                </Link>
              </li>
              <li>
                <Link href="/colecoes" className="font-body italic text-sm hover:text-refined-gold transition-colors duration-300">
                  coleções
                </Link>
              </li>
              <li>
                <Link href="/products" className="font-body italic text-sm hover:text-refined-gold transition-colors duration-300">
                  categorias
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-white">
            <h3 className="font-title font-bold text-base mb-2">Informações</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/encomendas" className="font-body italic text-sm hover:text-refined-gold transition-colors duration-300">
                  encomendas
                </Link>
              </li>
              <li>
                <Link href="/about" className="font-body italic text-sm hover:text-refined-gold transition-colors duration-300">
                  sobre
                </Link>
              </li>
              <li>
                <Link href="/contato" className="font-body italic text-sm hover:text-refined-gold transition-colors duration-300">
                  contato
                </Link>
              </li>
            </ul>
          </div>

          <Link href="/" className="group mt-1">
            <Image
              src="/images/vertical-garramondtype.png"
              alt="Gloria Faz Joias Logo"
              width={140}
              height={190}
              className="object-contain w-[120px] transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
          </Link>

          <p className="text-white font-body italic text-xs">© Glória Faz Jóias 2026</p>
          <p className="text-white/50 font-body text-[10px] mt-1">26.144.748/0001-51</p>
        </div>

        {/* Tablet/Desktop layout (>=640px) */}
        <div className="hidden sm:flex flex-row flex-nowrap items-center justify-between gap-4 sm:gap-8 md:gap-16 min-w-0">
          <div className="flex flex-row flex-nowrap gap-2 sm:gap-4 md:gap-16 md:ml-[150px] flex-shrink min-w-0 translate-x-[40px] md:translate-x-0">
            <div className="text-white flex-shrink-0 scale-[0.85] sm:scale-90 md:scale-100 origin-left -translate-y-[20px]">
              <h3 className="font-title font-bold text-[10px] sm:text-xs md:text-lg mb-0.5 md:mb-3 transition-transform duration-700 ease-in-out hover:scale-110">Descubra</h3>
              <ul className="space-y-0 md:space-y-2">
                <li>
                  <Link href="/products" className="font-body italic text-[9px] sm:text-[10px] md:text-base hover:text-refined-gold transition-colors duration-300">
                    jóias
                  </Link>
                </li>
                <li>
                  <Link href="/colecoes" className="font-body italic text-[9px] sm:text-[10px] md:text-base hover:text-refined-gold transition-colors duration-300">
                    coleções
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="font-body italic text-[9px] sm:text-[10px] md:text-base hover:text-refined-gold transition-colors duration-300">
                    categorias
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-white mt-0 md:mt-[70px] flex-shrink-0 scale-[0.85] sm:scale-90 md:scale-100 origin-left translate-y-[20px]">
              <h3 className="font-title font-bold text-[10px] sm:text-xs md:text-lg mb-0.5 md:mb-3 transition-transform duration-700 ease-in-out hover:scale-110">Informações</h3>
              <ul className="space-y-0 md:space-y-2">
                <li>
                  <Link href="/encomendas" className="font-body italic text-[9px] sm:text-[10px] md:text-base hover:text-refined-gold transition-colors duration-300">
                    encomendas
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="font-body italic text-[9px] sm:text-[10px] md:text-base hover:text-refined-gold transition-colors duration-300">
                    sobre
                  </Link>
                </li>
                <li>
                  <Link href="/contato" className="font-body italic text-[9px] sm:text-[10px] md:text-base hover:text-refined-gold transition-colors duration-300">
                    contato
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link href="/" className="flex-shrink-0 group -translate-x-[40px] md:translate-x-[5px]">
            <div className="flex flex-col items-center">
              <div className="-translate-x-[10px]">
                <Image
                  src="/images/vertical-garramondtype.png"
                  alt="Gloria Faz Joias Logo"
                  width={225}
                  height={300}
                  className="object-contain w-[80px] sm:w-[140px] md:w-[180px] lg:w-[225px] transition-transform duration-700 ease-in-out group-hover:scale-110"
                />
              </div>
              <p className="text-white font-body italic text-[10px] md:text-sm mt-4 mr-0 md:mr-[20px] -translate-y-[20px] translate-x-[20px]">© Glória Faz Jóias 2026</p>
              <p className="text-white/50 font-body text-[9px] md:text-[10px] -translate-y-[16px] translate-x-[20px] md:mr-[20px]">26.144.748/0001-51</p>
            </div>
          </Link>
        </div>
      </div>
    </footer>
  )
}
