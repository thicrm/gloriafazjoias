'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import {
  cartProductsSubtotalCents,
  cartHasInvalidPrices,
  formatBrlFromCents,
} from '@/lib/cart-pricing-client'
import { MOTOBOY_SHIPPING_BRL_CENTS } from '@/lib/shipping/constants'
import { getStripeBrowser } from '@/lib/stripe-browser'
import StripePaymentModal from '@/components/checkout/StripePaymentModal'
import { formatRingSizeLabel } from '@/lib/ring-sizes'

type ShippingMethod = 'motoboy' | 'correios'

type ConfirmedOrder = {
  fullName: string
  email: string
  phone: string
  address: string
  cep: string
  shippingMethod: ShippingMethod
  shippingCents: number
  productsCents: number
  totalCents: number
  items: Array<{ productName: string; quantity: number; ringSizeBr?: string }>
  paymentMethod: 'card' | 'pix'
}

const SESSION_KEY = 'gfj_pending_order'

export default function CheckoutClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { items, hydrated, clearCart } = useCart()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [cep, setCep] = useState('')

  const [shippingMethod, setShippingMethod] = useState<ShippingMethod | null>(null)
  const [correiosCents, setCorreiosCents] = useState<number | null>(null)
  const [correiosPrazo, setCorreiosPrazo] = useState<string | null>(null)
  const [correiosLoading, setCorreiosLoading] = useState(false)
  const [correiosError, setCorreiosError] = useState<string | null>(null)

  const [stripeOpen, setStripeOpen] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [payMsg, setPayMsg] = useState<string | null>(null)
  const [payLoading, setPayLoading] = useState(false)

  const [pixData, setPixData] = useState<{
    id: string
    qr_code_base64: string | null
    qr_code: string | null
  } | null>(null)

  const [doneBanner, setDoneBanner] = useState(false)
  const [confirmedOrder, setConfirmedOrder] = useState<ConfirmedOrder | null>(null)

  /** Último PaymentIntent do fluxo cartão (para e-mail após o cliente terminar). */
  const [stripePiId, setStripePiId] = useState<string | null>(null)
  const checkoutEmailSent = useRef<Set<string>>(new Set())

  const queueCheckoutEmail = useCallback(
    (opts: { paymentIntentId?: string; mercadoPagoPaymentId?: string }) => {
      const key =
        opts.paymentIntentId ??
        (opts.mercadoPagoPaymentId != null ? `mp:${opts.mercadoPagoPaymentId}` : '')
      if (!key || checkoutEmailSent.current.has(key)) return
      checkoutEmailSent.current.add(key)
      void fetch('/api/payments/checkout-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(opts),
      }).catch(() => {
        /* evita duplicar se o usuário tentar de novo */
      })
    },
    []
  )

  const stripePromise = useMemo(() => getStripeBrowser(), [])

  const normalizedCep = useMemo(() => cep.replace(/\D/g, '').slice(0, 8), [cep])

  const productsCents = useMemo(() => cartProductsSubtotalCents(items), [items])
  const invalid = useMemo(() => cartHasInvalidPrices(items), [items])

  const shippingDisplayCents = useMemo(() => {
    if (shippingMethod === 'motoboy') return MOTOBOY_SHIPPING_BRL_CENTS
    if (shippingMethod === 'correios' && correiosCents != null) return correiosCents
    return null
  }, [shippingMethod, correiosCents])

  const totalCents =
    shippingDisplayCents != null ? productsCents + shippingDisplayCents : null

  useEffect(() => {
    if (!hydrated) return
    if (items.length === 0 && !doneBanner) {
      router.replace('/carrinho')
    }
  }, [hydrated, items.length, router, doneBanner])

  useEffect(() => {
    const pi = searchParams.get('payment_intent')
    const redirectStatus = searchParams.get('redirect_status')
    if (pi?.startsWith('pi_') && redirectStatus) {
      queueCheckoutEmail({ paymentIntentId: pi })
    }

    const status = searchParams.get('redirect_status')
    if (status === 'succeeded') {
      clearCart()
      try {
        const saved = sessionStorage.getItem(SESSION_KEY)
        if (saved) {
          const order = JSON.parse(saved) as ConfirmedOrder
          sessionStorage.removeItem(SESSION_KEY)
          setConfirmedOrder(order)
          setDoneBanner(true)
        } else {
          setDoneBanner(true)
        }
      } catch {
        setDoneBanner(true)
      }
      router.replace('/checkout?ok=1', { scroll: false })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, router, clearCart, queueCheckoutEmail])

  useEffect(() => {
    if (searchParams.get('ok') === '1') {
      setDoneBanner(true)
    }
  }, [searchParams])

  const buildOrderSnapshot = useCallback(
    (paymentMethod: 'card' | 'pix'): ConfirmedOrder | null => {
      if (shippingDisplayCents == null || totalCents == null) return null
      return {
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        cep: normalizedCep,
        shippingMethod: shippingMethod!,
        shippingCents: shippingDisplayCents,
        productsCents,
        totalCents,
        items: items.map((l) => ({
          productName: l.productName,
          quantity: l.quantity,
          ringSizeBr: l.ringSizeBr ?? undefined,
        })),
        paymentMethod,
      }
    },
    [fullName, email, phone, address, normalizedCep, shippingMethod, shippingDisplayCents, productsCents, totalCents, items]
  )

  const completeOrder = useCallback(
    (order: ConfirmedOrder) => {
      clearCart()
      setConfirmedOrder(order)
      setDoneBanner(true)
    },
    [clearCart]
  )

  const fetchCorreios = useCallback(async () => {
    if (normalizedCep.length !== 8) {
      setCorreiosError('Informe o CEP com 8 dígitos para calcular o frete dos Correios.')
      setCorreiosCents(null)
      return
    }
    setCorreiosLoading(true)
    setCorreiosError(null)
    try {
      const res = await fetch('/api/shipping/correios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cepDestino: normalizedCep }),
      })
      const data = (await res.json()) as {
        priceBrlCents?: number
        prazoEntrega?: string
        error?: string
      }
      if (!res.ok) {
        setCorreiosCents(null)
        setCorreiosError(data.error ?? 'Erro ao calcular frete.')
        return
      }
      setCorreiosCents(data.priceBrlCents ?? null)
      setCorreiosPrazo(data.prazoEntrega ?? null)
    } catch {
      setCorreiosError('Erro de rede ao consultar Correios.')
      setCorreiosCents(null)
    } finally {
      setCorreiosLoading(false)
    }
  }, [normalizedCep])

  useEffect(() => {
    if (shippingMethod !== 'correios') {
      setCorreiosCents(null)
      setCorreiosPrazo(null)
      setCorreiosError(null)
      return
    }
    if (normalizedCep.length === 8) {
      fetchCorreios()
    } else {
      setCorreiosCents(null)
      setCorreiosPrazo(null)
    }
  }, [shippingMethod, normalizedCep, fetchCorreios])

  const itemsPayload = useMemo(
    () =>
      items.map((l) => ({
        sku: l.sku,
        quantity: l.quantity,
        productName: l.productName,
        ...(l.ringSizeBr ? { ringSize: l.ringSizeBr } : {}),
      })),
    [items]
  )

  const productLabel = useMemo(
    () => items.map((l) => `${l.productName} ×${l.quantity}`).join(' · ').slice(0, 200),
    [items]
  )

  const customerPayload = useMemo(
    () => ({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      address: address.trim(),
      cep: normalizedCep || undefined,
    }),
    [fullName, email, phone, address, normalizedCep]
  )

  const phoneDigits = phone.replace(/\D/g, '').length

  const canPay =
    !invalid &&
    items.length > 0 &&
    fullName.trim().length >= 3 &&
    email.includes('@') &&
    phoneDigits >= 10 &&
    address.trim().length >= 8 &&
    normalizedCep.length === 8 &&
    shippingMethod != null &&
    totalCents != null &&
    (shippingMethod === 'motoboy' || (shippingMethod === 'correios' && correiosCents != null))

  const closeStripe = useCallback(() => {
    setStripeOpen(false)
    setClientSecret(null)
  }, [])

  const startCard = async () => {
    if (!canPay || !shippingMethod) return
    setPayMsg(null)
    setPayLoading(true)
    try {
      const res = await fetch('/api/payments/create-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsPayload,
          shippingMethod,
          cepDestino: shippingMethod === 'correios' ? normalizedCep : undefined,
          customer: customerPayload,
          productLabel,
        }),
      })
      const data = (await res.json()) as {
        clientSecret?: string
        paymentIntentId?: string
        error?: string
      }
      if (!res.ok || !data.clientSecret) {
        setPayMsg(data.error ?? 'Não foi possível iniciar o pagamento.')
        setPayLoading(false)
        return
      }
      if (data.paymentIntentId) {
        setStripePiId(data.paymentIntentId)
      }
      // Save order snapshot so we can restore it after a possible Stripe redirect
      const snapshot = buildOrderSnapshot('card')
      if (snapshot) {
        try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(snapshot)) } catch { /* ignore */ }
      }
      setClientSecret(data.clientSecret)
      setStripeOpen(true)
    } catch {
      setPayMsg('Erro de rede.')
    }
    setPayLoading(false)
  }

  const startPix = async () => {
    if (!canPay || !shippingMethod) return
    setPayMsg(null)
    setPayLoading(true)
    setPixData(null)
    try {
      const res = await fetch('/api/payments/mercadopago/pix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: itemsPayload,
          shippingMethod,
          cepDestino: shippingMethod === 'correios' ? normalizedCep : undefined,
          customer: customerPayload,
          productLabel,
        }),
      })
      const data = (await res.json()) as {
        id?: string
        qr_code_base64?: string | null
        qr_code?: string | null
        error?: string
      }
      if (!res.ok || data.id == null) {
        setPayMsg(data.error ?? 'Não foi possível gerar o Pix.')
        setPayLoading(false)
        return
      }
      setPixData({
        id: String(data.id),
        qr_code_base64: data.qr_code_base64 ?? null,
        qr_code: data.qr_code ?? null,
      })
    } catch {
      setPayMsg('Erro de rede.')
    }
    setPayLoading(false)
  }

  useEffect(() => {
    if (!pixData?.id) return
    const id = pixData.id
    const timer = setInterval(async () => {
      try {
        const res = await fetch(`/api/payments/mercadopago/status?id=${encodeURIComponent(id)}`)
        const d = (await res.json()) as { status?: string }
        if (d.status === 'approved') {
          clearInterval(timer)
          queueCheckoutEmail({ mercadoPagoPaymentId: id })
          setPixData(null)
          const snapshot = buildOrderSnapshot('pix')
          if (snapshot) {
            completeOrder(snapshot)
          } else {
            clearCart()
            setDoneBanner(true)
          }
        }
        if (d.status === 'rejected' || d.status === 'cancelled') {
          clearInterval(timer)
          queueCheckoutEmail({ mercadoPagoPaymentId: id })
          setPixData(null)
          setPayMsg('Pagamento Pix não foi aprovado. Tente outro meio ou gere um novo Pix.')
        }
      } catch {
        /* ignore transient errors */
      }
    }, 3500)
    return () => clearInterval(timer)
  }, [pixData, clearCart, buildOrderSnapshot, completeOrder, queueCheckoutEmail])

  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const stripeReturnUrl = `${origin}/checkout`

  if (!hydrated) {
    return (
      <div className="min-h-screen px-4 py-16 text-center font-body text-refined-charcoal">
        Carregando…
      </div>
    )
  }

  if (confirmedOrder) {
    return <OrderConfirmation order={confirmedOrder} />
  }

  return (
    <div className="min-h-screen px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl">
        <header className="text-center">
          <h1 className="font-title text-3xl text-refined-gold md:text-4xl drop-shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            Finalizar compra
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-body text-refined-charcoal/80">
            Preencha seus dados, escolha o frete e o pagamento. Valores conferidos no servidor.
          </p>
        </header>

        {doneBanner && !confirmedOrder && (
          <div
            className="mt-8 rounded border border-refined-gold/60 bg-refined-gold/10 px-4 py-3 text-center font-body text-refined-charcoal"
            role="status"
          >
            Pagamento recebido. Obrigada pela sua compra.
          </div>
        )}

        {invalid && (
          <div className="mt-6 border border-red-700/40 bg-red-50 px-4 py-3 font-body text-sm text-red-800">
            Há itens inválidos no carrinho.{' '}
            <Link href="/carrinho" className="underline">
              Voltar ao carrinho
            </Link>
          </div>
        )}

        {/* Resumo */}
        <section className="mt-10 border border-refined-gold/35 bg-refined-ivory/70 p-5">
          <h2 className="font-title text-xl text-refined-charcoal">Resumo do pedido</h2>
          <ul className="mt-4 space-y-2 font-body text-sm text-refined-charcoal/90">
            {items.map((l) => (
              <li key={l.id} className="flex justify-between gap-4">
                <span className="min-w-0">
                  {l.productName} × {l.quantity}
                  {l.ringSizeBr
                    ? ` · aro ${formatRingSizeLabel(parseFloat(l.ringSizeBr.replace(',', '.')))}`
                    : ''}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-4 font-body text-refined-charcoal">
            Subtotal: <strong>{formatBrlFromCents(productsCents)}</strong>
          </p>
        </section>

        {/* Dados */}
        <section className="mt-10 space-y-4">
          <h2 className="font-title text-xl text-refined-charcoal">Seus dados</h2>
          <div>
            <label className="block font-body text-sm text-refined-charcoal" htmlFor="ck-name">
              Nome completo
            </label>
            <input
              id="ck-name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              className="mt-1 w-full border border-refined-charcoal/30 bg-white px-4 py-3 font-body text-refined-charcoal focus:outline-none focus:ring-2 focus:ring-refined-gold/40"
            />
          </div>
          <div>
            <label className="block font-body text-sm text-refined-charcoal" htmlFor="ck-email">
              E-mail
            </label>
            <input
              id="ck-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              className="mt-1 w-full border border-refined-charcoal/30 bg-white px-4 py-3 font-body text-refined-charcoal focus:outline-none focus:ring-2 focus:ring-refined-gold/40"
            />
          </div>
          <div>
            <label className="block font-body text-sm text-refined-charcoal" htmlFor="ck-phone">
              Celular (com DDD)
            </label>
            <input
              id="ck-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              className="mt-1 w-full border border-refined-charcoal/30 bg-white px-4 py-3 font-body text-refined-charcoal focus:outline-none focus:ring-2 focus:ring-refined-gold/40"
            />
          </div>
          <div>
            <label className="block font-body text-sm text-refined-charcoal" htmlFor="ck-cep">
              CEP (para entrega / Correios)
            </label>
            <input
              id="ck-cep"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
              autoComplete="postal-code"
              placeholder="00000-000"
              className="mt-1 w-full border border-refined-charcoal/30 bg-white px-4 py-3 font-body text-refined-charcoal focus:outline-none focus:ring-2 focus:ring-refined-gold/40"
            />
          </div>
          <div>
            <label className="block font-body text-sm text-refined-charcoal" htmlFor="ck-addr">
              Endereço completo de entrega
            </label>
            <textarea
              id="ck-addr"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              autoComplete="street-address"
              className="mt-1 w-full border border-refined-charcoal/30 bg-white px-4 py-3 font-body text-refined-charcoal focus:outline-none focus:ring-2 focus:ring-refined-gold/40"
            />
          </div>
        </section>

        {/* Frete */}
        <section className="mt-10 space-y-4">
          <h2 className="font-title text-xl text-refined-charcoal">Frete</h2>
          <fieldset className="space-y-3 font-body text-refined-charcoal">
            <label className="flex cursor-pointer gap-3 border border-refined-gold/25 bg-refined-ivory/50 p-4">
              <input
                type="radio"
                name="frete"
                checked={shippingMethod === 'motoboy'}
                onChange={() => setShippingMethod('motoboy')}
                className="mt-1"
              />
              <span>
                <strong>Motoboy</strong> — entrega personalizada e privativa —{' '}
                {formatBrlFromCents(MOTOBOY_SHIPPING_BRL_CENTS)}
              </span>
            </label>
            <label className="flex cursor-pointer gap-3 border border-refined-gold/25 bg-refined-ivory/50 p-4">
              <input
                type="radio"
                name="frete"
                checked={shippingMethod === 'correios'}
                onChange={() => setShippingMethod('correios')}
                className="mt-1"
              />
              <span>
                <strong>Correios (PAC)</strong> — cálculo automático pelo CEP acima (ferramenta
                oficial dos Correios).
              </span>
            </label>
          </fieldset>

          {shippingMethod === 'correios' && (
            <div className="font-body text-sm text-refined-charcoal/85">
              {correiosLoading && <p>Calculando frete…</p>}
              {correiosError && <p className="text-red-800">{correiosError}</p>}
              {!correiosLoading && correiosCents != null && (
                <p>
                  Frete PAC: <strong>{formatBrlFromCents(correiosCents)}</strong>
                  {correiosPrazo ? ` · prazo indicado: ${correiosPrazo} dia(s) úteis` : null}
                </p>
              )}
              <button
                type="button"
                onClick={fetchCorreios}
                disabled={correiosLoading || normalizedCep.length !== 8}
                className="mt-2 border border-refined-charcoal/30 px-4 py-2 text-sm transition-colors hover:bg-refined-charcoal/5 disabled:opacity-50"
              >
                recalcular frete
              </button>
            </div>
          )}
        </section>

        {/* Totais */}
        <section className="mt-10 border border-refined-gold/40 bg-refined-ivory/90 p-6">
          <p className="font-body text-refined-charcoal">
            Frete:{' '}
            <strong>
              {shippingDisplayCents != null ? formatBrlFromCents(shippingDisplayCents) : '—'}
            </strong>
          </p>
          <p className="mt-2 font-title text-2xl text-refined-charcoal">
            Total:{' '}
            <strong>{totalCents != null ? formatBrlFromCents(totalCents) : '—'}</strong>
          </p>
        </section>

        {payMsg && (
          <p className="mt-6 font-body text-sm text-red-800" role="alert">
            {payMsg}
          </p>
        )}

        {/* Pagamento */}
        <section className="mt-10 space-y-4">
          <h2 className="font-title text-xl text-refined-charcoal">Pagamento</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              disabled={!canPay || payLoading || !stripePromise || doneBanner}
              onClick={startCard}
              className="flex-1 border border-refined-gold bg-refined-gold px-6 py-4 font-body text-refined-ivory transition-all hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] disabled:opacity-50"
            >
              {payLoading ? 'aguarde…' : 'Cartão'}
            </button>
            <button
              type="button"
              disabled={!canPay || payLoading || doneBanner}
              onClick={startPix}
              className="flex-1 border border-refined-charcoal/40 bg-white px-6 py-4 font-body text-refined-charcoal transition-colors hover:bg-refined-charcoal/5 disabled:opacity-50"
            >
              {payLoading ? 'aguarde…' : 'Pix'}
            </button>
          </div>
          <p className="font-body text-xs text-refined-charcoal/65">
            O valor final cobrado é sempre recalculado no servidor (produtos + frete), igual ao
            resumo acima.
          </p>
        </section>

        <p className="mt-10 text-center">
          <Link href="/carrinho" className="font-body text-sm text-refined-gold underline-offset-2 hover:underline">
            voltar ao carrinho
          </Link>
        </p>
      </div>

      <StripePaymentModal
        open={stripeOpen}
        stripePromise={stripePromise}
        clientSecret={clientSecret}
        returnUrl={stripeReturnUrl}
        title="Pagamento com cartão"
        subtitle={`${productLabel.slice(0, 120)}${productLabel.length > 120 ? '…' : ''} — total ${totalCents != null ? formatBrlFromCents(totalCents) : ''}`}
        onClose={closeStripe}
        onTerminal={(outcome) => {
          closeStripe()
          if (stripePiId) {
            queueCheckoutEmail({ paymentIntentId: stripePiId })
          }
          if (outcome === 'succeeded') {
            const snapshot = buildOrderSnapshot('card')
            if (snapshot) {
              completeOrder(snapshot)
            } else {
              clearCart()
              setDoneBanner(true)
            }
          }
        }}
      />

      {pixData && (
        <PixModal
          pixData={pixData}
          onClose={() => setPixData(null)}
        />
      )}
    </div>
  )
}

function OrderConfirmation({ order }: { order: ConfirmedOrder }) {
  const shippingLabel = order.shippingMethod === 'motoboy'
    ? 'Motoboy (entrega privativa)'
    : 'Correios (PAC)'

  const paymentLabel = order.paymentMethod === 'card'
    ? 'Cartão de crédito/débito'
    : 'Pix'

  return (
    <div className="min-h-screen px-4 py-12 md:py-16">
      <div className="mx-auto max-w-2xl">

        {/* Success header */}
        <div className="text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-refined-gold bg-refined-gold/10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-10 w-10 text-refined-gold"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1 className="font-title text-3xl text-refined-gold md:text-4xl drop-shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            Pedido confirmado!
          </h1>
          <p className="mx-auto mt-3 max-w-md font-body text-refined-charcoal/80">
            Seu pagamento foi recebido. Um e-mail de confirmação foi enviado para{' '}
            <strong>{order.email}</strong>.
          </p>
        </div>

        {/* Order summary */}
        <section className="mt-10 border border-refined-gold/35 bg-refined-ivory/70 p-6">
          <h2 className="font-title text-xl text-refined-charcoal">Resumo do pedido</h2>
          <ul className="mt-4 space-y-2 font-body text-sm text-refined-charcoal/90">
            {order.items.map((item, idx) => (
              <li key={idx} className="flex justify-between gap-4 border-b border-refined-gold/15 pb-2 last:border-0 last:pb-0">
                <span>
                  {item.productName}
                  {item.ringSizeBr ? ` — aro ${item.ringSizeBr}` : ''}
                </span>
                <span className="shrink-0 text-refined-charcoal/60">×{item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 space-y-1 border-t border-refined-gold/25 pt-4 font-body text-sm text-refined-charcoal/80">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatBrlFromCents(order.productsCents)}</span>
            </div>
            <div className="flex justify-between">
              <span>Frete ({shippingLabel})</span>
              <span>{formatBrlFromCents(order.shippingCents)}</span>
            </div>
            <div className="flex justify-between border-t border-refined-gold/25 pt-2 font-title text-lg text-refined-charcoal">
              <span>Total</span>
              <strong className="text-refined-gold">{formatBrlFromCents(order.totalCents)}</strong>
            </div>
          </div>
        </section>

        {/* Delivery details */}
        <section className="mt-6 border border-refined-gold/25 bg-refined-ivory/50 p-6">
          <h2 className="font-title text-xl text-refined-charcoal">Dados de entrega</h2>
          <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-body text-sm">
            <dt className="text-refined-charcoal/55">Nome</dt>
            <dd className="text-refined-charcoal">{order.fullName}</dd>
            <dt className="text-refined-charcoal/55">E-mail</dt>
            <dd className="text-refined-charcoal">{order.email}</dd>
            <dt className="text-refined-charcoal/55">Telefone</dt>
            <dd className="text-refined-charcoal">{order.phone}</dd>
            <dt className="text-refined-charcoal/55">Endereço</dt>
            <dd className="text-refined-charcoal">{order.address}</dd>
            <dt className="text-refined-charcoal/55">CEP</dt>
            <dd className="text-refined-charcoal">{order.cep}</dd>
            <dt className="text-refined-charcoal/55">Pagamento</dt>
            <dd className="text-refined-charcoal">{paymentLabel}</dd>
          </dl>
        </section>

        <p className="mt-4 font-body text-sm text-refined-charcoal/60 text-center">
          Em breve entraremos em contato para combinar os próximos passos. Obrigada! 💛
        </p>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-block border border-refined-gold bg-refined-gold px-8 py-4 font-body text-refined-ivory transition-all hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
          >
            Voltar à loja
          </Link>
        </div>
      </div>
    </div>
  )
}

function PixModal({
  pixData,
  onClose,
}: {
  pixData: { qr_code_base64: string | null; qr_code: string | null }
  onClose: () => void
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (!pixData.qr_code) return
    navigator.clipboard.writeText(pixData.qr_code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pix-title"
    >
      <div className="max-h-[90vh] w-full max-w-md overflow-y-auto border border-refined-gold/40 bg-refined-ivory p-6 shadow-2xl md:p-8">
        <h2 id="pix-title" className="font-title text-2xl text-refined-charcoal">
          Pix
        </h2>
        <p className="mt-2 font-body text-sm text-refined-charcoal/80">
          Escaneie o QR Code ou copie o código no app do seu banco. Aguardando confirmação…
        </p>

        {/* QR Code */}
        {pixData.qr_code_base64 && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`data:image/png;base64,${pixData.qr_code_base64}`}
            alt="QR Code Pix"
            className="mx-auto mt-6 max-w-[220px]"
          />
        )}

        {/* Copia e Cola */}
        {pixData.qr_code && (
          <div className="mt-6">
            <p className="font-body text-xs uppercase tracking-widest text-refined-charcoal/50 mb-2">
              Pix copia e cola
            </p>
            <div className="flex items-stretch gap-2">
              <p className="flex-1 break-all rounded border border-refined-charcoal/20 bg-white px-3 py-2 font-mono text-xs text-refined-charcoal leading-relaxed select-all">
                {pixData.qr_code}
              </p>
              <button
                type="button"
                onClick={handleCopy}
                className="flex-shrink-0 border border-refined-gold px-4 font-body text-sm text-refined-gold hover:bg-refined-gold hover:text-refined-ivory transition-colors duration-300"
              >
                {copied ? 'copiado ✓' : 'copiar'}
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          className="mt-8 w-full border border-refined-charcoal/30 py-3 font-body text-refined-charcoal hover:bg-refined-charcoal/5 transition-colors duration-300"
          onClick={onClose}
        >
          fechar
        </button>
      </div>
    </div>
  )
}
