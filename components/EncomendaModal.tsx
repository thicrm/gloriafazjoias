'use client'

import { useState } from 'react'
import { useCart } from '@/contexts/CartContext'
import { getRingSizeOptions, formatRingSizeLabel } from '@/lib/ring-sizes'

export type EncomendaModalProps = {
  open: boolean
  productName: string
  productSlug: string
  isRing: boolean
  canPayOnline: boolean
  onClose: () => void
}

export default function EncomendaModal({
  open,
  productName,
  productSlug,
  isRing,
  canPayOnline,
  onClose,
}: EncomendaModalProps) {
  const { addItem } = useCart()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [ringSize, setRingSize] = useState('18')
  const [submitting, setSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [successMode, setSuccessMode] = useState<'email' | 'cart'>('email')

  if (!open) return null

  const isValid = name.trim().length >= 2 && email.includes('@')

  const sendEmail = async (wantsToPay: boolean) => {
    await fetch('/api/encomenda', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'produto',
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim() || undefined,
        productName,
        productSlug,
        message: message.trim() || undefined,
        wantsToPay,
      }),
    })
  }

  const handleEncomendarSemPagamento = async () => {
    if (!isValid) return
    setSubmitting(true)
    try {
      await sendEmail(false)
      setSuccessMode('email')
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleAdicionarAoCarrinho = async () => {
    if (!isValid) return
    setSubmitting(true)
    try {
      await sendEmail(true)
      setSuccessMode('cart')
      addItem({
        sku: productSlug,
        productName,
        quantity: 1,
        ringSizeBr: isRing ? ringSize : null,
        acabamento: null,
        formato: null,
      })
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full border border-refined-charcoal/30 bg-white px-4 py-3 font-body text-refined-charcoal focus:outline-none focus:ring-2 focus:ring-refined-gold/40'
  const labelClass = 'block font-body text-sm text-refined-charcoal mb-1'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="encomenda-title"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto border border-refined-gold/40 bg-refined-ivory p-6 shadow-2xl md:p-8"
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

        <h2 id="encomenda-title" className="font-title text-2xl text-refined-charcoal mb-1">
          Encomendar
        </h2>
        <p className="font-body text-sm text-refined-charcoal/70 mb-5">
          {productName}
        </p>

        {/* Warning */}
        <div className="mb-6 border-l-2 border-refined-gold bg-refined-gold/8 px-4 py-3 font-body text-sm text-refined-charcoal/80 leading-relaxed">
          ⏳ Este produto está sujeito a prazo de produção. Após sua solicitação,
          a Glória Faz Jóias entrará em contato pelo e-mail ou telefone fornecidos
          para confirmar detalhes e disponibilidade.
        </div>

        {status === 'success' ? (
          <div className="py-6 text-center space-y-4">
            <p className="font-title text-xl text-refined-gold">Encomenda enviada! ✓</p>
            {successMode === 'email' ? (
              <p className="font-body text-sm text-refined-charcoal/80">
                Você receberá um e-mail de confirmação em <strong>{email}</strong>.
                Entraremos em contato em breve.
              </p>
            ) : (
              <p className="font-body text-sm text-refined-charcoal/80">
                O produto foi adicionado ao carrinho. Ao finalizar a compra e após o{' '}
                <strong>pagamento aprovado</strong>, você receberá a confirmação por e-mail.
              </p>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full border border-refined-charcoal/30 py-3 font-body text-refined-charcoal hover:bg-refined-charcoal/5 transition-colors"
            >
              fechar
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Ring size */}
            {isRing && (
              <div>
                <label className={labelClass} htmlFor="enc-ring">
                  Aro (tamanho do anel)
                </label>
                <select
                  id="enc-ring"
                  value={ringSize}
                  onChange={(e) => setRingSize(e.target.value)}
                  className={inputClass}
                >
                  {getRingSizeOptions().map((s) => (
                    <option key={s} value={String(s)}>
                      {formatRingSizeLabel(s)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className={labelClass} htmlFor="enc-name">Nome completo <span className="text-refined-gold">*</span></label>
              <input
                id="enc-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="enc-email">E-mail <span className="text-refined-gold">*</span></label>
              <input
                id="enc-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="enc-phone">Telefone / WhatsApp</label>
              <input
                id="enc-phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                placeholder="(11) 99999-9999"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="enc-msg">Mensagem (opcional)</label>
              <textarea
                id="enc-msg"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Alguma informação adicional, dúvida ou preferência…"
                className={inputClass}
              />
            </div>

            {status === 'error' && (
              <p className="font-body text-sm text-red-700" role="alert">
                Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.
              </p>
            )}

            <div className="flex flex-col gap-3 pt-2">
              {canPayOnline && (
                <button
                  type="button"
                  disabled={!isValid || submitting}
                  onClick={handleAdicionarAoCarrinho}
                  className="w-full border border-refined-gold bg-refined-gold px-6 py-4 font-body text-refined-ivory transition-all hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] disabled:opacity-50"
                >
                  {submitting ? 'aguarde…' : 'Encomendar e adicionar ao carrinho'}
                </button>
              )}
              <button
                type="button"
                disabled={!isValid || submitting}
                onClick={handleEncomendarSemPagamento}
                className="w-full border border-refined-charcoal/40 bg-white px-6 py-4 font-body text-refined-charcoal transition-colors hover:bg-refined-charcoal/5 disabled:opacity-50"
              >
                {submitting ? 'aguarde…' : canPayOnline ? 'Encomendar sem pagamento' : 'Enviar encomenda'}
              </button>
            </div>

            <p className="font-body text-xs text-refined-charcoal/50 text-center">
              * campos obrigatórios
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
