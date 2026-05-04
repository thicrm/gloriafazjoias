'use client'

import { useEffect, useState } from 'react'
import { HEADER_GOLD_BOX_SHADOW } from '@/lib/ui/header-gold-glow'

export default function PixPromoStrip() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!dismissed) {
      document.body.classList.add('gfj-promo-strip-visible')
    } else {
      document.body.classList.remove('gfj-promo-strip-visible')
    }
    return () => {
      document.body.classList.remove('gfj-promo-strip-visible')
    }
  }, [dismissed])

  if (dismissed) return null

  return (
    <div
      className="fixed left-0 right-0 top-20 z-[45] flex w-full flex-col [transform:translateZ(0)] [backface-visibility:hidden]"
    >
      <div
        role="region"
        aria-label="Promo Dia das Mães no Pix"
        className="relative isolate flex items-center justify-center border-0 bg-red-900 px-4 py-3 pr-11 text-center outline-none ring-0 sm:pr-14"
      >
        <p
          className="font-title mx-auto whitespace-nowrap text-[11px] font-normal leading-relaxed tracking-[0.02em] text-refined-gold/95 sm:text-xs md:text-sm [text-shadow:0_0_10px_rgba(212,175,55,0.95),0_0_22px_rgba(212,175,55,0.55),0_0_36px_rgba(212,175,55,0.25)]"
        >
          Dia das Mães: 5% de desconto em todas as compras no Pix!
        </p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="absolute right-0.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center text-refined-gold/75 transition-colors hover:text-refined-gold sm:right-1"
          aria-label="Fechar aviso"
        >
          <span className="text-[1.35rem] font-light leading-none tracking-tight" aria-hidden>
            ×
          </span>
        </button>
      </div>

      {/* 1px + glow = HEADER_GOLD_BOX_SHADOW; ::after em degradê dourado tapa subpixel sem faixa branca */}
      <div
        aria-hidden
        className="pointer-events-none relative isolate h-px min-h-px w-full shrink-0 overflow-visible bg-refined-gold [backface-visibility:hidden] [transform:translateZ(0)] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:z-10 after:h-[10px] after:bg-gradient-to-b after:from-refined-gold/55 after:via-refined-gold/20 after:to-transparent after:content-['']"
        style={{ boxShadow: HEADER_GOLD_BOX_SHADOW }}
      />
    </div>
  )
}
