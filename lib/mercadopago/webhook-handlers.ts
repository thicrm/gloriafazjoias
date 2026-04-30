import 'server-only'

export type MercadoPagoWebhookBody = {
  action?: string
  type?: string
  data?: { id?: string | number }
}

/**
 * Após validação de assinatura: apenas log. E-mails de carrinho são enviados pelo checkout.
 */
export async function handleMercadoPagoWebhookNotification(
  body: MercadoPagoWebhookBody
): Promise<void> {
  const rawId = body.data?.id
  if (rawId == null) return
  console.info('[mercadopago webhook] notificação recebida (e-mails de pedido pelo checkout)', {
    id: rawId,
  })
}
