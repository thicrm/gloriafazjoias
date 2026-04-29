import 'server-only'

import type Stripe from 'stripe'
import {
  sendOrderConfirmationEmails,
  type OrderConfirmationPayload,
} from '@/lib/emails/order-confirmation'
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
  if (meta.order_type !== 'cart' || meta.source !== 'gloria-faz-joias') return null

  const productsCents = parseInt(meta.products_cents ?? '', 10)
  const shippingCents = parseInt(meta.shipping_cents ?? '', 10)
  if (!Number.isFinite(productsCents) || !Number.isFinite(shippingCents)) return null

  const shippingMethod = meta.shipping_method === 'correios' ? 'correios' : 'motoboy'
  const fullName = (meta.customer_name ?? '').trim()
  const email = (meta.customer_email ?? '').trim()
  const phone = (meta.customer_phone ?? '').trim()
  const address = (meta.customer_address ?? '').trim()
  const cep = (meta.customer_cep ?? '').replace(/\D/g, '').slice(0, 8)

  if (!fullName || !email.includes('@') || !snap.lines.length) return null

  const totalCents = productsCents + shippingCents

  return {
    fullName,
    email,
    phone,
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

export async function notifyCartPaidFromStripePaymentIntent(
  pi: Stripe.PaymentIntent
): Promise<void> {
  const meta = pi.metadata as Record<string, string>
  const snap = decodeSnapshotFromRecord(meta)
  if (!snap) {
    console.warn('[cart-paid-email] Stripe: missing or invalid gfj_ord snapshot', pi.id)
    return
  }

  const productsCents = parseInt(meta.products_cents ?? '', 10)
  const shippingCents = parseInt(meta.shipping_cents ?? '', 10)
  if (!Number.isFinite(productsCents) || !Number.isFinite(shippingCents)) return
  if (pi.amount !== productsCents + shippingCents) {
    console.error('[cart-paid-email] Stripe: amount mismatch, skip e-mail', {
      id: pi.id,
      amount: pi.amount,
      expected: productsCents + shippingCents,
    })
    return
  }

  const body = payloadFromMetadataRecord(meta, snap, 'card', pi.id)
  if (!body) return

  await sendOrderConfirmationEmails(body)
}

export async function notifyCartPaidFromMercadoPagoPayment(payment: {
  id?: string | number
  status?: string
  transaction_amount?: number
  metadata?: Record<string, unknown>
}): Promise<void> {
  if (payment.status !== 'approved') return

  const meta = recordFromMercadoPagoMetadata(payment.metadata)
  const snap = decodeSnapshotFromRecord(meta)
  if (!snap) {
    console.warn('[cart-paid-email] MP: missing gfj_ord snapshot', payment.id)
    return
  }

  const productsCents = parseInt(meta.products_cents ?? '', 10)
  const shippingCents = parseInt(meta.shipping_cents ?? '', 10)
  if (!Number.isFinite(productsCents) || !Number.isFinite(shippingCents)) return

  const expectedTotal = productsCents + shippingCents
  const tx = payment.transaction_amount
  if (typeof tx !== 'number' || !Number.isFinite(tx)) return
  const paidCents = Math.round(tx * 100)
  if (paidCents !== expectedTotal) {
    console.error('[cart-paid-email] MP: amount mismatch, skip e-mail', {
      id: payment.id,
      paidCents,
      expectedTotal,
    })
    return
  }

  const idStr = payment.id != null ? String(payment.id) : ''
  const body = payloadFromMetadataRecord(meta, snap, 'pix', idStr)
  if (!body) return

  await sendOrderConfirmationEmails(body)
}
