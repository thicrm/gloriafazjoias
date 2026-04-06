'use client'

import { useState, useCallback, useMemo } from 'react'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { getStripeBrowser } from '@/lib/stripe-browser'
import { formatRingSizeLabel, getRingSizeOptions } from '@/lib/ring-sizes'

type CheckoutFormProps = {
  productSlug: string
  onClose: () => void
  onPaid: () => void
}

function CheckoutForm({ productSlug, onClose, onPaid }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return
    setSubmitting(true)
    setMessage(null)

    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${origin}/products/${encodeURIComponent(productSlug)}`,
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

type ProductStripeCheckoutProps = {
  productSlug: string
  productName: string
  /** When true, user must pick ring size (BR) before the payment modal opens. */
  requiresRingSize?: boolean
  onSuccess?: () => void
}

const ringSizeOptions = getRingSizeOptions()

export default function ProductStripeCheckout({
  productSlug,
  productName,
  requiresRingSize = false,
  onSuccess,
}: ProductStripeCheckoutProps) {
  const [open, setOpen] = useState(false)
  const [ringModalOpen, setRingModalOpen] = useState(false)
  const [selectedRingSize, setSelectedRingSize] = useState<string>('18')
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const stripePromise = useMemo(() => getStripeBrowser(), [])

  const startCheckout = useCallback(
    async (ringSize?: string) => {
    setError(null)
    setLoading(true)
    try {
      const res = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{ sku: productSlug, quantity: 1 }],
          productLabel: productName,
          ...(ringSize != null && ringSize !== '' ? { ringSize } : {}),
        }),
      })
      const data = (await res.json()) as { clientSecret?: string; error?: string }
      if (!res.ok) {
        setError(data.error ?? 'Não foi possível iniciar o pagamento.')
        setLoading(false)
        return
      }
      if (!data.clientSecret) {
        setError('Resposta inválida do servidor.')
        setLoading(false)
        return
      }
      setClientSecret(data.clientSecret)
      setOpen(true)
    } catch {
      setError('Erro de rede. Verifique a conexão e tente de novo.')
    }
    setLoading(false)
  },
    [productSlug, productName]
  )

  const handleBuyClick = () => {
    setError(null)
    if (requiresRingSize) {
      setRingModalOpen(true)
      return
    }
    startCheckout()
  }

  const handleRingConfirm = () => {
    const v = selectedRingSize.trim()
    if (!v) {
      setError('Selecione o tamanho do anel.')
      return
    }
    setRingModalOpen(false)
    startCheckout(v)
  }

  const closeModal = useCallback(() => {
    setOpen(false)
    setClientSecret(null)
  }, [])

  const handlePaid = useCallback(() => {
    closeModal()
    onSuccess?.()
  }, [closeModal, onSuccess])

  if (!stripePromise) {
    return (
      <div className="pt-4 w-full">
        <p className="font-body text-sm text-refined-charcoal/70 mb-2">
          Pagamento online indisponível: configure NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="pt-4 w-full">
        {error && (
          <p className="font-body text-sm text-red-700 mb-3" role="alert">
            {error}
          </p>
        )}
        <button
          type="button"
          onClick={handleBuyClick}
          disabled={loading}
          className="block w-full text-center px-12 py-4 bg-refined-gold text-refined-ivory border border-refined-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.8),0_0_50px_rgba(212,175,55,0.5)] transition-all duration-500 ease-in-out font-body text-base md:text-lg disabled:opacity-60"
        >
          {loading ? 'abrindo pagamento…' : 'comprar'}
        </button>
      </div>

      {ringModalOpen && (
        <div
          className="fixed inset-0 z-[99] flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="ring-size-title"
          onClick={() => !loading && setRingModalOpen(false)}
        >
          <div
            className="relative w-full max-w-md border border-black bg-refined-ivory p-6 shadow-2xl md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => !loading && setRingModalOpen(false)}
              className="absolute right-3 top-3 text-2xl leading-none text-black/50 hover:text-black"
              aria-label="Fechar"
            >
              ×
            </button>
            <h2 id="ring-size-title" className="font-title pr-10 text-2xl text-black">
              Tamanho do anel
            </h2>
            <p className="mt-2 font-body text-sm leading-relaxed text-black/80">
              Escolha o aro (medida brasileira) antes de seguir para o pagamento. Tamanhos de{' '}
              <strong>7</strong> a <strong>26</strong>, com meios tamanhos (7,5 — 8 — 8,5 …).
            </p>
            <label htmlFor="ring-size-select" className="mt-6 block font-body text-sm text-black">
              Aro (BR)
            </label>
            <select
              id="ring-size-select"
              value={selectedRingSize}
              onChange={(e) => setSelectedRingSize(e.target.value)}
              disabled={loading}
              className="mt-2 box-border w-full border border-black bg-transparent px-4 py-3 font-body text-base text-black focus:outline-none focus:ring-2 focus:ring-black/30"
            >
              {ringSizeOptions.map((n) => {
                const v = String(n)
                return (
                  <option key={v} value={v}>
                    {formatRingSizeLabel(n)}
                  </option>
                )
              })}
            </select>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setRingModalOpen(false)}
                disabled={loading}
                className="border border-black bg-transparent px-6 py-3 font-body text-sm text-black transition-colors hover:bg-black/5 disabled:opacity-50"
              >
                cancelar
              </button>
              <button
                type="button"
                onClick={handleRingConfirm}
                disabled={loading}
                className="border border-refined-gold bg-refined-gold px-6 py-3 font-body text-sm text-refined-ivory transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] disabled:opacity-50"
              >
                continuar para pagamento
              </button>
            </div>
          </div>
        </div>
      )}

      {open && clientSecret && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="stripe-checkout-title"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-refined-ivory border border-refined-gold/40 shadow-2xl p-6 md:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-3 right-3 text-refined-charcoal/60 hover:text-refined-charcoal text-2xl leading-none"
              aria-label="Fechar"
            >
              ×
            </button>
            <h2
              id="stripe-checkout-title"
              className="font-title text-2xl text-refined-charcoal mb-2 pr-8"
            >
              Pagamento
            </h2>
            <p className="font-body text-sm text-refined-charcoal/70 mb-6">
              {productName}
              {requiresRingSize && selectedRingSize ? (
                <span>
                  {' '}
                  — aro {formatRingSizeLabel(parseFloat(selectedRingSize.replace(',', '.')))}{' '}
                  (BR)
                </span>
              ) : null}
            </p>
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
              <CheckoutForm
                productSlug={productSlug}
                onClose={closeModal}
                onPaid={handlePaid}
              />
            </Elements>
          </div>
        </div>
      )}
    </>
  )
}
