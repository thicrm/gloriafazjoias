import type { Metadata } from 'next'
import { Suspense } from 'react'
import CheckoutClient from './CheckoutClient'

export const metadata: Metadata = {
  title: 'Finalizar compra | Glória Faz Jóias',
  description: 'Dados de entrega, frete e pagamento com cartão ou Pix.',
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen px-4 py-16 text-center font-body text-refined-charcoal">
          Carregando checkout…
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  )
}
