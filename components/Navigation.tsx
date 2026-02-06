'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', numeral: 'I', label: 'Inicio', image: '/images/titulos_menu/INICIO_MENU.jpg' },
  { href: '/products', numeral: 'II', label: 'Joias', image: '/images/titulos_menu/JOIAS_MENU.jpg' },
  { href: '/colecoes', numeral: 'III', label: 'Coleções', image: '/images/titulos_menu/COLEÇOES_MENU.jpeg' },
  { href: '/about', numeral: 'IV', label: 'Sobre', image: '/images/titulos_menu/SOBRE_MENU.jpg' },
  { href: '/encomendas', numeral: 'V', label: 'Encomendas', image: '/images/titulos_menu/ECOMENDAS_MENU.jpg' },
  { href: '/contato', numeral: 'VI', label: 'Contato', image: '/images/titulos_menu/CONTATO_MENU.jpg' },
]

export default function Navigation() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
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
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSidebarOpen])

  // Preload menu images when component mounts
  useEffect(() => {
    navItems.forEach((item) => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = item.image
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
            backgroundRepeat: 'repeat'
          }}
        >
          {/* Menu Button - Left - positioned relative to nav */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 cursor-pointer transition-opacity duration-500 ease-in-out hover:opacity-70"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Image
              src="/images/titulos_menu/INICIO_MENU.jpg"
              alt="Inicio"
              width={144}
              height={36}
              className="h-[29px] w-auto object-contain"
              priority
              loading="eager"
            />
          </button>
          <div className="max-w-7xl mx-auto">
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
        style={{ width: '170px', backgroundColor: '#ffffff' }}
      >
      </div>

      {/* Navigation Items - Appear on page when sidebar opens */}
      {isSidebarOpen && (
        <nav className="fixed left-6 z-[80]" style={{ top: '28px' }}>
          <ul className="space-y-6">
            {/* Navigation items */}
            {navItems.map((item) => {
              const isScaledUp = item.href === '/colecoes' || item.href === '/about' || item.href === '/encomendas' || item.href === '/contato'
              const isFullSize = item.href === '/' || item.href === '/products'
              
              // All sizes scaled up by 20% (×1.2)
              // Inicio & Joias: 120×30 → 144×36
              // Sobre: 132×33 → 158.4×39.6
              // Coleções: 109×27.225 → 130.8×32.67
              // Encomendas & Contato: 99×24.75 → 118.8×29.7
              let width, height, heightClass
              
              if (item.href === '/colecoes') {
                width = 131
                height = 32.67
                heightClass = 'h-[26px]'
              } else if (item.href === '/encomendas' || item.href === '/contato') {
                width = 119
                height = 29.7
                heightClass = 'h-[24px]'
              } else if (item.href === '/about') {
                width = 158
                height = 39.6
                heightClass = 'h-[32px]'
              } else {
                // Inicio & Joias
                width = 144
                height = 36
                heightClass = 'h-[29px]'
              }
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`block transition-opacity duration-500 ease-in-out ${
                      pathname === item.href
                        ? 'opacity-100'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={closeSidebar}
                  >
                    <Image
                      src={item.image}
                      alt={item.label}
                      width={width}
                      height={height}
                      className={`w-auto object-contain ${heightClass}`}
                      priority={item.href === '/' || item.href === '/products'}
                      loading={item.href === '/' || item.href === '/products' ? 'eager' : 'lazy'}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>
      )}
    </>
  )
}

