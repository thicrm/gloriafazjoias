import 'server-only'

import { MercadoPagoConfig, Payment } from 'mercadopago'

import { notifyCartPaidFromMercadoPagoPayment } from '@/lib/payments/cart-paid-notify'

export type MercadoPagoWebhookBody = {
  action?: string
  type?: string
  data?: { id?: string | number }
}

/**
 * After `x-signature` verification: load payment and send cart e-mails when approved.
 */
export async function handleMercadoPagoWebhookNotification(
  body: MercadoPagoWebhookBody
): Promise<void> {
  const rawId = body.data?.id
  if (rawId == null) return

  const token = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim()
  if (!token) {
    console.warn('[mercadopago webhook] MERCADOPAGO_ACCESS_TOKEN not set — cannot load payment')
    return
  }

  const client = new MercadoPagoConfig({ accessToken: token })
  const paymentApi = new Payment(client)

  let payment: Awaited<ReturnType<typeof paymentApi.get>>
  try {
    payment = await paymentApi.get({ id: Number(rawId) })
  } catch (e) {
    console.error('[mercadopago webhook] payment get failed', e)
    return
  }

  await notifyCartPaidFromMercadoPagoPayment({
    id: payment.id,
    status: payment.status,
    transaction_amount: payment.transaction_amount,
    metadata: payment.metadata as Record<string, unknown> | undefined,
  })
}
