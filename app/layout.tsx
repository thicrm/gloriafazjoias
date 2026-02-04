import type { Metadata } from 'next'
import { Baskervville } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

// Using Baskervville as a close alternative to Old Baskerville
// For exact fonts, you'll need to load them via @font-face in CSS
const oldBaskerville = Baskervville({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-title',
  display: 'swap',
  style: ['normal', 'italic'],
})

// Amasis MT Pro Light is not available on Google Fonts
// It will be loaded via @font-face in globals.css if you have the font files
// Using a similar serif as fallback
const amasisMT = Baskervville({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  style: ['normal'],
})

export const metadata: Metadata = {
  title: 'Gloria Faz Joias',
  description: 'Refined jewelry inspired by literature and fine arts',
  icons: {
    icon: '/images/simbolos-carimbo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${oldBaskerville.variable} ${amasisMT.variable}`}>
      <body className="font-body antialiased">
        <Navigation />
        <main className="min-h-screen pt-28 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

