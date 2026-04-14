'use client'

import { useState } from 'react'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import type { Stripe } from '@stripe/stripe-js'

type CheckoutFormProps = {
  returnUrl: string
  onClose: () => void
  onPaid: () => void
}

function CheckoutForm({ returnUrl, onClose, onPaid }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setSubmitting(true)
    setMessage(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    })

    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message ?? 'Não foi possível concluir o pagamento.')
      } else {
        setMessage('Ocorreu um erro inesperado. Tente novamente.')
      }
      setSubmitting(false)
      return
    }
    onPaid()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      {message && (
        <p className="font-body text-sm text-red-700" role="alert">
          {message}
        </p>
      )}
      <div className="flex flex-wrap gap-3 justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 font-body text-refined-charcoal border border-refined-charcoal/40 hover:bg-refined-charcoal/5 transition-colors"
        >
          cancelar
        </button>
        <button
          type="submit"
          disabled={!stripe || submitting}
          className="px-8 py-3 bg-refined-gold text-refined-ivory border border-refined-gold font-body disabled:opacity-50 hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition-all"
        >
          {submitting ? 'processando…' : 'pagar'}
        </button>
      </div>
    </form>
  )
}

export type StripePaymentModalProps = {
  open: boolean
  stripePromise: Promise<Stripe | null> | null
  clientSecret: string | null
  returnUrl: string
  title: string
  subtitle: string
  onClose: () => void
  onPaid: () => void
}

export default function StripePaymentModal({
  open,
  stripePromise,
  clientSecret,
  returnUrl,
  title,
  subtitle,
  onClose,
  onPaid,
}: StripePaymentModalProps) {
  if (!open || !stripePromise || !clientSecret) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="stripe-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-refined-ivory border border-refined-gold/40 shadow-2xl p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 text-refined-charcoal/60 hover:text-refined-charcoal text-2xl leading-none"
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 id="stripe-modal-title" className="font-title text-2xl text-refined-charcoal mb-2 pr-8">
          {title}
        </h2>
        <p className="font-body text-sm text-refined-charcoal/70 mb-6">{subtitle}</p>
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: {
              theme: 'stripe',
              variables: {
                colorPrimary: '#d4af37',
                colorBackground: '#fdfbf7',
                colorText: '#1a1a1a',
                borderRadius: '4px',
              },
            },
          }}
        >
          <CheckoutForm returnUrl={returnUrl} onClose={onClose} onPaid={onPaid} />
        </Elements>
      </div>
    </div>
  )
}
