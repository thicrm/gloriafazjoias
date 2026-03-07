'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', numeral: 'I', label: 'Inicio', image: '/images/titulos_menu/INICIO_MENU.jpg' },
  { href: '/products', numeral: 'II', label: 'Joias', image: '/images/titulos_menu/JOIAS_MENU.jpg' },
  { href: '/encomendas', numeral: 'III', label: 'Encomendas', image: '/images/titulos_menu/ECOMENDAS_MENU.jpg' },
  { href: '/about', numeral: 'IV', label: 'Sobre', image: '/images/titulos_menu/SOBRE_MENU.jpg' },
  { href: '/contato', numeral: 'V', label: 'Contato', image: '/images/titulos_menu/CONTATO_MENU.jpg' },
]

export default function Navigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isColecoesOpen, setIsColecoesOpen] = useState(false)
  const [isCategoriasOpen, setIsCategoriasOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Prevent body scroll when sidebar is open
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden'
      setIsColecoesOpen(false)
      setIsCategoriasOpen(false)
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen])

  // Preload menu images when component mounts
  useEffect(() => {
    const menuImages = [
      ...navItems.map((item) => item.image),
      '/images/titulos_menu/COLEÇOES_MENU.jpeg',
      '/images/titulos_menu/CATEGORIAS_MENU.jpeg',
    ]
    menuImages.forEach((href) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = href
      document.head.appendChild(link)
    })
  }, [])

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${isScrolled ? '-translate-y-0' : 'translate-y-0'}`}>
        {/* Main navigation */}
        <nav 
          className="border-b border-refined-gold relative z-50"
          style={{ 
            backgroundImage: "url('/images/ azul.jpg')",
            backgroundSize: '30%',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            boxShadow: '0 1px 10px rgba(212, 175, 55, 0.5), 0 1px 20px rgba(212, 175, 55, 0.3)'
          }}
        >
          {/* Stars overlay - above texture, below content */}
          <div 
            className="absolute inset-0 z-0 transition-all duration-700 ease-in-out hover:drop-shadow-[0_0_30px_rgba(212,175,55,0.6)]"
            style={{
              backgroundImage: "url('/images/header01-estrelas.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              pointerEvents: 'auto'
            }}
          />
          {/* Menu Button - Left - positioned relative to nav */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 cursor-pointer transition-opacity duration-500 ease-in-out hover:opacity-70"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Image
              src="/images/titulos_menu/inicio_branco.PNG"
              alt="Inicio"
              width={144}
              height={36}
              className="h-[29px] w-auto object-contain"
              priority
              loading="eager"
            />
          </button>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center justify-between h-20 relative">

              {/* Logo - Centered */}
              <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center group">
                <Image
                  src="/images/nova logo gloria vertical.png"
                  alt="Gloria Faz Joias"
                  width={400}
                  height={120}
                  className="h-[72px] md:h-[88px] w-auto object-contain transition-transform duration-700 ease-in-out group-hover:scale-110"
                  priority
                />
              </Link>

              {/* Spacer for right side to balance the menu button */}
              <div className="w-6"></div>
            </div>
          </div>
        </nav>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 ease-out"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white z-[70] transform transition-transform duration-300 ease-out shadow-2xl ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ width: '260px', backgroundColor: '#ffffff' }}
      >
      </div>

      {/* Navigation Items - Aparecem quando o menu abre */}
      {isSidebarOpen && (
        <nav
          className="fixed left-6 z-[80] max-h-[calc(100vh-56px)] overflow-y-auto pr-2 no-scrollbar"
          style={{ top: '28px' }}
        >
          <ul className="space-y-4">
            {/* Início (image) */}
            <li>
              <Link
                href="/"
                className={`block transition-opacity duration-500 ease-in-out ${
                  pathname === '/' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={closeSidebar}
              >
                <Image
                  src="/images/titulos_menu/INICIO_MENU.jpg"
                  alt="Inicio"
                  width={144}
                  height={36}
                  className="w-auto h-[29px] object-contain"
                  priority
                  loading="eager"
                />
              </Link>
            </li>

            {/* Jóias (image) */}
            <li>
              <Link
                href="/products"
                className={`block transition-opacity duration-500 ease-in-out ${
                  pathname === '/products' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={closeSidebar}
              >
                <Image
                  src="/images/titulos_menu/JOIAS_MENU.jpg"
                  alt="Joias"
                  width={144}
                  height={36}
                  className="w-auto h-[29px] object-contain"
                  priority={false}
                  loading="eager"
                />
              </Link>
            </li>

            {/* Coleções (image) + seta minimalista */}
            <li className="pt-4 ml-6 flex items-center justify-between">
              <Link
                href="/colecoes"
                className={`block transition-opacity duration-500 ease-in-out cursor-pointer ${
                  pathname === '/colecoes' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  setIsColecoesOpen((prev) => !prev)
                }}
              >
                <Image
                  src="/images/titulos_menu/COLEÇOES_MENU.jpeg"
                  alt="Coleções"
                  width={144}
                  height={36}
                  className="w-auto h-[29px] object-contain scale-[0.8]"
                  priority={false}
                  loading="eager"
                />
              </Link>
              <button
                type="button"
                className="ml-2 text-xs font-body text-refined-charcoal/60 hover:text-refined-charcoal transition-colors duration-300"
                onClick={(e) => {
                  e.stopPropagation()
                  e.preventDefault()
                  setIsColecoesOpen((prev) => !prev)
                }}
                aria-label={isColecoesOpen ? 'Recolher coleções' : 'Expandir coleções'}
              >
                <span
                  className={`inline-block transform transition-transform duration-300 ${
                    isColecoesOpen ? 'rotate-90' : ''
                  }`}
                >
                  &gt;
                </span>
              </button>
            </li>

            {isColecoesOpen && (
              <>
                {/* Na água */}
                <li className="mt-2 ml-8">
                  <span className="font-body text-xs text-refined-charcoal/70">
                    Na água
                  </span>
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>
                      <Link
                        href="/colecoes?colecao=piscina"
                        className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                        onClick={closeSidebar}
                      >
                        Piscina
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/colecoes?colecao=vidro-romano"
                        className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                        onClick={closeSidebar}
                      >
                        Vidro Romano
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* No céu */}
                <li className="mt-3 ml-8">
                  <span className="font-body text-xs text-refined-charcoal/70">
                    No céu
                  </span>
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>
                      <Link
                        href="/colecoes?colecao=domo-do-ceu"
                        className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                        onClick={closeSidebar}
                      >
                        Domo do Céu
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/colecoes?colecao=ceu-estrelado"
                        className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                        onClick={closeSidebar}
                      >
                        Céu Estrelado
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Na terra */}
                <li className="mt-3 ml-8">
                  <span className="font-body text-xs text-refined-charcoal/70">
                    Na terra
                  </span>
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>
                      <Link
                        href="/colecoes?colecao=jardins"
                        className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                        onClick={closeSidebar}
                      >
                        Jardins
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/colecoes?colecao=amitis"
                        className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                        onClick={closeSidebar}
                      >
                        Amitis
                      </Link>
                    </li>
                  </ul>
                </li>

                {/* Para presentear */}
                <li className="mt-3 ml-8">
                  <span className="font-body text-xs text-refined-charcoal/70">
                    Para presentear
                  </span>
                  <ul className="mt-2 ml-4 space-y-1">
                    <li>
                      <Link
                        href="/colecoes?colecao=ad-astra-ad-amor"
                        className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                        onClick={closeSidebar}
                      >
                        Ad Astra, Ad Amor
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/colecoes?colecao=mae"
                        className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                        onClick={closeSidebar}
                      >
                        Mãe
                      </Link>
                    </li>
                  </ul>
                </li>
              </>
            )}

            {/* Categorias (image) + seta minimalista */}
            <li className="pt-4 ml-6 flex items-center justify-between">
              <button
                type="button"
                className="block opacity-70 hover:opacity-100 transition-opacity duration-500 ease-in-out cursor-pointer text-left"
                onClick={() => setIsCategoriasOpen((prev) => !prev)}
                aria-label={isCategoriasOpen ? 'Recolher categorias' : 'Expandir categorias'}
              >
                <Image
                  src="/images/titulos_menu/CATEGORIAS_MENU.jpeg"
                  alt="Categorias"
                  width={144}
                  height={36}
                  className="w-auto h-[29px] object-contain scale-[0.8]"
                  priority={false}
                  loading="eager"
                />
              </button>
              <button
                type="button"
                className="ml-2 text-xs font-body text-refined-charcoal/60 hover:text-refined-charcoal transition-colors duration-300"
                onClick={() => setIsCategoriasOpen((prev) => !prev)}
                aria-label={isCategoriasOpen ? 'Recolher categorias' : 'Expandir categorias'}
              >
                <span
                  className={`inline-block transform transition-transform duration-300 ${
                    isCategoriasOpen ? 'rotate-90' : ''
                  }`}
                >
                  &gt;
                </span>
              </button>
            </li>

            {isCategoriasOpen && (
              <li className="ml-6">
                <ul className="mt-2 ml-2 space-y-1">
                  <li>
                    <Link
                      href="/products"
                      className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                      onClick={closeSidebar}
                    >
                      Todas as jóias
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=Anéis"
                      className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                      onClick={closeSidebar}
                    >
                      Anéis
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=Braceletes"
                      className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                      onClick={closeSidebar}
                    >
                      Braceletes e Pulseiras
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=Brincos"
                      className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                      onClick={closeSidebar}
                    >
                      Brincos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=Broches"
                      className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                      onClick={closeSidebar}
                    >
                      Broches
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=Colares"
                      className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                      onClick={closeSidebar}
                    >
                      Colares
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=Penduricalhos"
                      className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                      onClick={closeSidebar}
                    >
                      Penduricalhos
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=Pingentes"
                      className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                      onClick={closeSidebar}
                    >
                      Pingentes
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/products?category=Objetos"
                      className="font-body text-sm italic text-refined-charcoal/80 hover:text-refined-charcoal transition-colors duration-500 ease-in-out"
                      onClick={closeSidebar}
                    >
                      Objetos
                    </Link>
                  </li>
                </ul>
              </li>
            )}

            {/* Encomendas (image) */}
            <li className="pt-4">
              <Link
                href="/encomendas"
                className={`block transition-opacity duration-500 ease-in-out ${
                  pathname === '/encomendas' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={closeSidebar}
              >
                <Image
                  src="/images/titulos_menu/ECOMENDAS_MENU.jpg"
                  alt="Encomendas"
                  width={119}
                  height={29.7}
                  className="w-auto h-[24px] object-contain"
                  priority={false}
                />
              </Link>
            </li>

            {/* Sobre (image) */}
            <li>
              <Link
                href="/about"
                className={`block transition-opacity duration-500 ease-in-out ${
                  pathname === '/about' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={closeSidebar}
              >
                <Image
                  src="/images/titulos_menu/SOBRE_MENU.jpg"
                  alt="Sobre"
                  width={158}
                  height={39.6}
                  className="w-auto h-[32px] object-contain"
                  priority={false}
                />
              </Link>
            </li>

            {/* Contato (image) */}
            <li>
              <Link
                href="/contato"
                className={`block transition-opacity duration-500 ease-in-out ${
                  pathname === '/contato' ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                onClick={closeSidebar}
              >
                <Image
                  src="/images/titulos_menu/CONTATO_MENU.jpg"
                  alt="Contato"
                  width={119}
                  height={29.7}
                  className="w-auto h-[24px] object-contain"
                  priority={false}
                />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  )
}

