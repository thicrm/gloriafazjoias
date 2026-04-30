'use client'

import { useEffect, useState } from 'react'

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
      role="region"
      aria-label="Promoção Pix"
      className="fixed left-0 right-0 top-20 z-[45] isolate flex items-center justify-center border-0 bg-red-900 py-2.5 pl-4 pr-10 text-center outline-none ring-0 sm:pr-12 [backface-visibility:hidden] [transform:translateZ(0)] after:pointer-events-none after:absolute after:inset-x-0 after:top-full after:z-10 after:h-[6px] after:bg-red-900 after:content-['']"
    >
      <p
        className="font-title text-xs text-refined-gold sm:text-sm [text-shadow:0_0_10px_rgba(212,175,55,0.95),0_0_22px_rgba(212,175,55,0.55),0_0_36px_rgba(212,175,55,0.25)]"
      >
        <span className="font-semibold">5% off no Pix</span>
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
  )
}
