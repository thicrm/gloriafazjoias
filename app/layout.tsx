import type { Metadata } from 'next'
import { Baskervville } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Navigation from '@/components/Navigation'
import PixPromoStrip from '@/components/PixPromoStrip'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Providers } from '@/app/providers'

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
    icon: '/images/favicon01.png',
  },
  openGraph: {
    title: 'Gloria Faz Joias',
    description: 'Refined jewelry inspired by literature and fine arts',
    url: 'https://gloriafazjoias.com.br',
    siteName: 'Gloria Faz Joias',
    images: [
      {
        url: '/images/favicon01.png',
        width: 512,
        height: 512,
        alt: 'Gloria Faz Joias',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
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
        {/* Google Tag Manager */}
        <Script id="gtm-init" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-TF8M3QMV');
        `}</Script>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TF8M3QMV"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* Google Ads tag */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18135021895"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18135021895');
        `}</Script>
        <Providers>
          <Navigation />
          <PixPromoStrip />
          <main className="min-h-0 md:min-h-screen pt-20 relative z-10 gfj-main">{children}</main>
          <WhatsAppButton />
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

