import 'server-only'

export type MercadoPagoWebhookBody = {
  action?: string
  type?: string
  data?: { id?: string | number }
}

/**
 * Runs after `x-signature` verification. Extend for order fulfillment, e-mail, etc.
 */
export async function handleMercadoPagoWebhookNotification(body: MercadoPagoWebhookBody): Promise<void> {
  const id = body.data?.id != null ? String(body.data.id) : ''
  console.info('[mercadopago webhook]', {
    action: body.action,
    type: body.type,
    dataId: id || undefined,
  })
}
