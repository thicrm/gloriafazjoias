'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

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

  const navItems = [
    { href: '/', numeral: 'I', label: 'Home' },
    { href: '/products', numeral: 'II', label: 'Joias' },
    { href: '/about', numeral: 'III', label: 'Sobre' },
  ]

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out ${isScrolled ? '-translate-y-0' : 'translate-y-0'}`}>
        {/* Main navigation */}
        <nav 
          className="bg-white border-b border-refined-charcoal/10 relative"
        >
          {/* Menu Button - Left - positioned relative to nav */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-lg tracking-wider transition-colors duration-300 text-refined-charcoal/70 hover:text-refined-charcoal z-10 cursor-pointer"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open menu"
          >
            <span className="font-title not-italic">I.</span>{' '}
            <span className="font-body italic">Home</span>
          </button>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between h-20 relative">

              {/* Logo - Centered */}
              <Link href="/" className="absolute left-1/2 transform -translate-x-1/2 flex items-center group">
                <Image
                  src="/images/logo_horizontal.jpg"
                  alt="Gloria Faz Joias"
                  width={200}
                  height={60}
                  className="h-9 md:h-11 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110"
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
        style={{ width: '150px' }}
      >
      </div>

      {/* Navigation Items - Appear on page when sidebar opens */}
      {isSidebarOpen && (
        <nav className="fixed left-6 z-[80]" style={{ top: '40px' }}>
          <ul className="space-y-6">
            {/* I. Home - aligned with header button (centered at 40px from top, same as header button) */}
            <li style={{ marginTop: 0 }}>
              <Link
                href="/"
                className={`block text-lg leading-none tracking-wider transition-colors duration-300 ${
                  pathname === '/'
                    ? 'text-refined-charcoal'
                    : 'text-refined-charcoal/70 hover:text-refined-charcoal'
                }`}
                onClick={closeSidebar}
              >
                <span className="font-title not-italic">I.</span>{' '}
                <span className="font-body italic">Home</span>
              </Link>
            </li>
            {/* II. Joias and III. Sobre */}
            {navItems.slice(1).map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block text-lg tracking-wider transition-colors duration-300 ${
                    pathname === item.href
                      ? 'text-refined-charcoal'
                      : 'text-refined-charcoal/70 hover:text-refined-charcoal'
                  }`}
                  onClick={closeSidebar}
                >
                  <span className="font-title not-italic">{item.numeral}.</span>{' '}
                  <span className="font-body italic">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  )
}

