import 'server-only'

import type Stripe from 'stripe'
import type { OrderConfirmationPayload } from '@/lib/emails/order-confirmation'
import {
  decodeSnapshotFromRecord,
  recordFromMercadoPagoMetadata,
  type PaymentOrderSnapshotV1,
} from '@/lib/orders/payment-order-snapshot'

function payloadFromMetadataRecord(
  meta: Record<string, string>,
  snap: PaymentOrderSnapshotV1,
  paymentMethod: 'card' | 'pix',
  orderId: string
): OrderConfirmationPayload | null {
  if (meta.order_type !== 'cart' || meta.source !== 'gloria-faz-joias') {
    console.warn('[checkout-order-payload] skip: order_type/source mismatch', {
      order_type: meta.order_type,
      source: meta.source,
    })
    return null
  }

  const productsCents = parseInt(meta.products_cents ?? '', 10)
  const shippingCents = parseInt(meta.shipping_cents ?? '', 10)
  if (!Number.isFinite(productsCents) || !Number.isFinite(shippingCents)) {
    console.warn('[checkout-order-payload] skip: invalid products_cents/shipping_cents', {
      products_cents: meta.products_cents,
      shipping_cents: meta.shipping_cents,
    })
    return null
  }

  const shippingMethod = meta.shipping_method === 'correios' ? 'correios' : 'motoboy'
  const fullName = (meta.customer_name ?? '').trim()
  const email = (meta.customer_email ?? '').trim()
  const phone = (meta.customer_phone ?? '').trim()
  const cpf = (meta.customer_cpf ?? '').replace(/\D/g, '').slice(0, 11)
  const address = (meta.customer_address ?? '').trim()
  const cep = (meta.customer_cep ?? '').replace(/\D/g, '').slice(0, 8)

  if (!fullName || !email.includes('@') || !snap.lines.length) {
    console.warn('[checkout-order-payload] skip: customer or empty lines', {
      hasName: Boolean(fullName),
      hasEmail: email.includes('@'),
      lineCount: snap.lines.length,
    })
    return null
  }

  const totalCents = productsCents + shippingCents

  return {
    fullName,
    email,
    phone,
    cpf,
    address,
    cep,
    shippingMethod,
    shippingCents,
    productsCents,
    totalCents,
    items: snap.lines.map((l) => ({
      productName: l.productName,
      quantity: l.quantity,
      ringSizeBr: l.ringSizeBr,
    })),
    paymentMethod,
    orderId,
  }
}

/** Monta o payload a partir do PaymentIntent (qualquer status com metadados válidos). */
export function buildOrderConfirmationPayloadFromStripePi(
  pi: Stripe.PaymentIntent
): OrderConfirmationPayload | null {
  const meta = pi.metadata as Record<string, string>
  const snap = decodeSnapshotFromRecord(meta)
  if (!snap) {
    console.warn('[checkout-order-payload] Stripe: missing or invalid gfj_ord snapshot', pi.id)
    return null
  }

  const productsCents = parseInt(meta.products_cents ?? '', 10)
  const shippingCents = parseInt(meta.shipping_cents ?? '', 10)
  if (!Number.isFinite(productsCents) || !Number.isFinite(shippingCents)) {
    console.warn('[checkout-order-payload] Stripe: invalid cents metadata', { productsCents, shippingCents })
    return null
  }
  if (pi.amount !== productsCents + shippingCents) {
    console.error('[checkout-order-payload] Stripe: amount mismatch', {
      id: pi.id,
      amount: pi.amount,
      expected: productsCents + shippingCents,
    })
    return null
  }

  return payloadFromMetadataRecord(meta, snap, 'card', pi.id)
}

export function stripePaymentOutcome(pi: Stripe.PaymentIntent): 'succeeded' | 'failed' {
  return pi.status === 'succeeded' ? 'succeeded' : 'failed'
}

/** Mercado Pago — inclui aprovado e recusado/cancelado (metadados ainda presentes). */
export function buildOrderConfirmationPayloadFromMpPayment(payment: {
  id?: string | number
  status?: string
  transaction_amount?: number
  metadata?: Record<string, unknown>
}): OrderConfirmationPayload | null {
  const meta = recordFromMercadoPagoMetadata(payment.metadata)
  const snap = decodeSnapshotFromRecord(meta)
  if (!snap) {
    console.warn('[checkout-order-payload] MP: missing gfj_ord snapshot', payment.id)
    return null
  }

  const productsCents = parseInt(meta.products_cents ?? '', 10)
  const shippingCents = parseInt(meta.shipping_cents ?? '', 10)
  if (!Number.isFinite(productsCents) || !Number.isFinite(shippingCents)) {
    console.warn('[checkout-order-payload] MP: invalid cents metadata', { productsCents, shippingCents })
    return null
  }

  const expectedTotal = productsCents + shippingCents
  const txRaw = payment.transaction_amount
  const tx = typeof txRaw === 'number' && Number.isFinite(txRaw) ? txRaw : Number(txRaw)
  if (!Number.isFinite(tx)) {
    console.warn('[checkout-order-payload] MP: invalid transaction_amount', { transaction_amount: txRaw })
    return null
  }
  const paidCents = Math.round(tx * 100)
  if (paidCents !== expectedTotal) {
    console.error('[checkout-order-payload] MP: amount mismatch', {
      id: payment.id,
      paidCents,
      expectedTotal,
    })
    return null
  }

  const idStr = payment.id != null ? String(payment.id) : ''
  return payloadFromMetadataRecord(meta, snap, 'pix', idStr)
}

export function mercadoPagoPaymentOutcome(status: string | undefined): 'succeeded' | 'failed' {
  return status === 'approved' ? 'succeeded' : 'failed'
}
