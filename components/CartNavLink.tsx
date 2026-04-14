'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'

/** Bootstrap Icons — cart3 (MIT, https://icons.getbootstrap.com/icons/cart3/) */
function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="currentColor"
      className={className}
      viewBox="0 0 16 16"
      aria-hidden
    >
      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4M7 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
    </svg>
  )
}

export default function CartNavLink() {
  const { itemCount, hydrated } = useCart()
  const show = hydrated && itemCount > 0

  return (
    <Link
      href="/carrinho"
      className="relative z-20 flex items-center justify-center p-2 text-refined-ivory transition-colors hover:text-refined-gold hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.6)] md:p-2.5"
      aria-label={`Carrinho${show ? `, ${itemCount} itens` : ''}`}
      title="Carrinho"
    >
      <CartIcon className="h-6 w-6 md:h-7 md:w-7" />
      {show ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-[1.125rem] min-w-[1.125rem] items-center justify-center rounded-full bg-refined-gold px-1 text-[10px] font-semibold leading-none text-refined-ivory md:h-5 md:min-w-[1.25rem] md:text-[11px]">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      ) : null}
    </Link>
  )
}
