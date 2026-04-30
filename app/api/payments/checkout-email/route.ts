import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'

import { sendOrderConfirmationEmails } from '@/lib/emails/order-confirmation'
import {
  buildOrderConfirmationPayloadFromMpPayment,
  buildOrderConfirmationPayloadFromStripePi,
  mercadoPagoPaymentOutcome,
  stripePaymentOutcome,
} from '@/lib/payments/checkout-order-payload'
import { getStripe, isStripeConfigured } from '@/lib/stripe/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Body = {
  paymentIntentId?: string
  mercadoPagoPaymentId?: string
}

/**
 * Dispara e-mails de resumo do pedido após o cliente terminar o fluxo de pagamento no checkout.
 * O servidor revalida Stripe / Mercado Pago — não confiar só no cliente.
 */
export async function POST(request: Request) {
  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const piId = typeof body.paymentIntentId === 'string' ? body.paymentIntentId.trim() : ''
  const mpIdRaw = body.mercadoPagoPaymentId
  const mpId =
    mpIdRaw != null && String(mpIdRaw).trim() !== '' ? Number(String(mpIdRaw).trim()) : NaN

  if ((!piId && !Number.isFinite(mpId)) || (piId && Number.isFinite(mpId))) {
    return NextResponse.json(
      { error: 'Informe exatamente um de: paymentIntentId ou mercadoPagoPaymentId' },
      { status: 400 }
    )
  }

  if (piId) {
    if (!isStripeConfigured()) {
      return NextResponse.json({ error: 'Stripe não configurado' }, { status: 503 })
    }
    try {
      const stripe = getStripe()
      const pi = await stripe.paymentIntents.retrieve(piId)
      const payload = buildOrderConfirmationPayloadFromStripePi(pi)
      if (!payload) {
        return NextResponse.json({ error: 'Pedido inválido ou metadados ausentes' }, { status: 400 })
      }
      const outcome = stripePaymentOutcome(pi)
      await sendOrderConfirmationEmails({ ...payload, paymentOutcome: outcome })
      return NextResponse.json({ ok: true, source: 'stripe', paymentOutcome: outcome })
    } catch (e) {
      console.error('[checkout-email] Stripe retrieve failed', e)
      return NextResponse.json({ error: 'Não foi possível validar o pagamento' }, { status: 502 })
    }
  }

  const token = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim()
  if (!token) {
    return NextResponse.json({ error: 'Mercado Pago não configurado' }, { status: 503 })
  }

  try {
    const client = new MercadoPagoConfig({ accessToken: token })
    const paymentApi = new Payment(client)
    const payment = await paymentApi.get({ id: mpId })
    const payload = buildOrderConfirmationPayloadFromMpPayment({
      id: payment.id,
      status: payment.status,
      transaction_amount: payment.transaction_amount,
      metadata: payment.metadata as Record<string, unknown> | undefined,
    })
    if (!payload) {
      return NextResponse.json({ error: 'Pedido inválido ou metadados ausentes' }, { status: 400 })
    }
    const outcome = mercadoPagoPaymentOutcome(payment.status)
    await sendOrderConfirmationEmails({ ...payload, paymentOutcome: outcome })
    return NextResponse.json({ ok: true, source: 'mercadopago', paymentOutcome: outcome })
  } catch (e) {
    console.error('[checkout-email] Mercado Pago get failed', e)
    return NextResponse.json({ error: 'Não foi possível validar o pagamento' }, { status: 502 })
  }
}
