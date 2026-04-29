import 'server-only'

import { Resend } from 'resend'

const STORE_EMAIL = 'contato@gloriafazjoias.com'
const STORE_EMAIL_GMAIL = 'gloriafazjoias@gmail.com'
const STORE_NAME = 'Glória Faz Jóias'

export type OrderConfirmationItem = {
  productName: string
  quantity: number
  ringSizeBr?: string
}

export type OrderConfirmationPayload = {
  fullName: string
  email: string
  phone: string
  address: string
  cep: string
  shippingMethod: 'motoboy' | 'correios'
  shippingCents: number
  productsCents: number
  totalCents: number
  items: OrderConfirmationItem[]
  paymentMethod: 'card' | 'pix'
  orderId?: string
}

function formatBrl(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

function shippingLabel(method: 'motoboy' | 'correios') {
  return method === 'motoboy' ? 'Motoboy (entrega privativa)' : 'Correios (PAC)'
}

function paymentLabel(method: 'card' | 'pix') {
  return method === 'card' ? 'Cartão de crédito/débito' : 'Pix'
}

function itemsHtml(items: OrderConfirmationItem[]) {
  return items
    .map(
      (it) =>
        `<tr>
          <td style="padding:8px 0;border-bottom:1px solid #e8dcc8;font-family:Georgia,serif;color:#3a3a3a;">
            ${it.productName}${it.ringSizeBr ? ` — aro ${it.ringSizeBr}` : ''}
          </td>
          <td style="padding:8px 0;border-bottom:1px solid #e8dcc8;text-align:right;font-family:Georgia,serif;color:#3a3a3a;">
            ×${it.quantity}
          </td>
        </tr>`
    )
    .join('')
}

function buildClientHtml(order: OrderConfirmationPayload) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f5f0e8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#fdfbf7;border:1px solid #d4af37;border-radius:2px;">

        <tr>
          <td style="background:#1a1a1a;padding:32px;text-align:center;">
            <h1 style="margin:0;font-family:Georgia,serif;font-size:22px;color:#d4af37;letter-spacing:2px;text-transform:uppercase;">
              Glória Faz Jóias
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding:36px 32px;">
            <h2 style="margin:0 0 8px;font-family:Georgia,serif;font-size:20px;color:#1a1a1a;">
              Pedido confirmado ✓
            </h2>
            <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:14px;color:#555;">
              Olá, <strong>${order.fullName}</strong>! Recebemos seu pedido com sucesso.
              Em breve entraremos em contato para combinar os próximos passos.
            </p>

            <h3 style="margin:0 0 12px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;border-bottom:2px solid #d4af37;padding-bottom:6px;">
              Itens do pedido
            </h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              ${itemsHtml(order.items)}
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;background:#faf6ec;border:1px solid #e8dcc8;padding:16px;" cellpadding="12">
              <tr>
                <td style="padding:6px 12px;font-family:Arial,sans-serif;font-size:13px;color:#555;">Subtotal</td>
                <td style="padding:6px 12px;text-align:right;font-family:Arial,sans-serif;font-size:13px;color:#555;">${formatBrl(order.productsCents)}</td>
              </tr>
              <tr>
                <td style="padding:6px 12px;font-family:Arial,sans-serif;font-size:13px;color:#555;">Frete (${shippingLabel(order.shippingMethod)})</td>
                <td style="padding:6px 12px;text-align:right;font-family:Arial,sans-serif;font-size:13px;color:#555;">${formatBrl(order.shippingCents)}</td>
              </tr>
              <tr style="border-top:1px solid #d4af37;">
                <td style="padding:10px 12px;font-family:Georgia,serif;font-size:16px;font-weight:bold;color:#1a1a1a;">Total</td>
                <td style="padding:10px 12px;text-align:right;font-family:Georgia,serif;font-size:16px;font-weight:bold;color:#d4af37;">${formatBrl(order.totalCents)}</td>
              </tr>
            </table>

            <h3 style="margin:0 0 12px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;border-bottom:2px solid #d4af37;padding-bottom:6px;">
              Dados de entrega
            </h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;width:110px;">Nome</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;">${order.fullName}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">E-mail</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;">${order.email}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">Telefone</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;">${order.phone}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">Endereço</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;">${order.address}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">CEP</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;">${order.cep}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">Pagamento</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;">${paymentLabel(order.paymentMethod)}</td>
              </tr>
            </table>

            <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#888;line-height:1.6;">
              Dúvidas? Responda este e-mail ou entre em contato pelo WhatsApp. 💛
            </p>
          </td>
        </tr>

        <tr>
          <td style="background:#1a1a1a;padding:20px 32px;text-align:center;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#888;">
              ${STORE_NAME} · ${STORE_EMAIL}
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
`.trim()
}

function buildStoreHtml(order: OrderConfirmationPayload) {
  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f5f0e8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#fdfbf7;border:1px solid #d4af37;border-radius:2px;">

        <tr>
          <td style="background:#1a1a1a;padding:28px 32px;">
            <h1 style="margin:0;font-family:Georgia,serif;font-size:18px;color:#d4af37;letter-spacing:1px;">
              Novo pedido recebido 🛍️
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding:32px;">
            <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:14px;color:#3a3a3a;">
              Um novo pedido foi pago com <strong>${paymentLabel(order.paymentMethod)}</strong>.
              ${order.orderId ? `<br/><span style="color:#888;font-size:12px;">Ref: ${order.orderId}</span>` : ''}
            </p>

            <h3 style="margin:0 0 10px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;border-bottom:2px solid #d4af37;padding-bottom:6px;">
              Cliente
            </h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;width:110px;">Nome</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;"><strong>${order.fullName}</strong></td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">E-mail</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;"><a href="mailto:${order.email}">${order.email}</a></td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">Telefone</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;">${order.phone}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">Endereço</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;">${order.address}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">CEP</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;">${order.cep}</td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">Frete</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;">${shippingLabel(order.shippingMethod)}</td>
              </tr>
            </table>

            <h3 style="margin:0 0 10px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;border-bottom:2px solid #d4af37;padding-bottom:6px;">
              Itens
            </h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              ${itemsHtml(order.items)}
            </table>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf6ec;border:1px solid #e8dcc8;">
              <tr>
                <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:13px;color:#555;">Subtotal</td>
                <td style="padding:8px 12px;text-align:right;font-family:Arial,sans-serif;font-size:13px;color:#555;">${formatBrl(order.productsCents)}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-family:Arial,sans-serif;font-size:13px;color:#555;">Frete</td>
                <td style="padding:8px 12px;text-align:right;font-family:Arial,sans-serif;font-size:13px;color:#555;">${formatBrl(order.shippingCents)}</td>
              </tr>
              <tr style="border-top:1px solid #d4af37;">
                <td style="padding:10px 12px;font-family:Georgia,serif;font-size:16px;font-weight:bold;color:#1a1a1a;">Total</td>
                <td style="padding:10px 12px;text-align:right;font-family:Georgia,serif;font-size:16px;font-weight:bold;color:#d4af37;">${formatBrl(order.totalCents)}</td>
              </tr>
            </table>
          </td>
        </tr>

        <tr>
          <td style="background:#1a1a1a;padding:16px 32px;text-align:center;">
            <p style="margin:0;font-family:Arial,sans-serif;font-size:11px;color:#888;">
              ${STORE_NAME} · notificação interna
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>
`.trim()
}

/** Sends client + store order confirmation e-mails (Resend). */
export async function sendOrderConfirmationEmails(body: OrderConfirmationPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey || apiKey === 're_...') {
    console.warn('[order-confirmation] RESEND_API_KEY não configurado — e-mails não enviados')
    return
  }

  const resend = new Resend(apiKey)

  const [clientResult, storeResult] = await Promise.allSettled([
    resend.emails.send({
      from: `${STORE_NAME} <${STORE_EMAIL}>`,
      to: body.email,
      replyTo: STORE_EMAIL,
      subject: `Pedido confirmado — ${STORE_NAME}`,
      html: buildClientHtml(body),
      text: [
        `Olá ${body.fullName}, seu pedido foi confirmado!`,
        '',
        'Itens:',
        ...body.items.map(
          (i) =>
            `  - ${i.productName} ×${i.quantity}${i.ringSizeBr ? ` (aro ${i.ringSizeBr})` : ''}`
        ),
        '',
        `Subtotal: ${formatBrl(body.productsCents)}`,
        `Frete (${shippingLabel(body.shippingMethod)}): ${formatBrl(body.shippingCents)}`,
        `Total: ${formatBrl(body.totalCents)}`,
        '',
        `Endereço: ${body.address} — CEP ${body.cep}`,
        `Pagamento: ${paymentLabel(body.paymentMethod)}`,
        '',
        'Em breve entraremos em contato. Obrigada!',
        STORE_NAME,
      ].join('\n'),
    }),
    resend.emails.send({
      from: `${STORE_NAME} <${STORE_EMAIL}>`,
      to: [STORE_EMAIL, STORE_EMAIL_GMAIL],
      replyTo: body.email,
      subject: `Novo pedido de ${body.fullName} — ${formatBrl(body.totalCents)}`,
      html: buildStoreHtml(body),
      text: [
        `Novo pedido recebido!`,
        '',
        `Cliente: ${body.fullName}`,
        `E-mail: ${body.email}`,
        `Telefone: ${body.phone}`,
        `Endereço: ${body.address} — CEP ${body.cep}`,
        `Frete: ${shippingLabel(body.shippingMethod)}`,
        `Pagamento: ${paymentLabel(body.paymentMethod)}`,
        '',
        'Itens:',
        ...body.items.map(
          (i) =>
            `  - ${i.productName} ×${i.quantity}${i.ringSizeBr ? ` (aro ${i.ringSizeBr})` : ''}`
        ),
        '',
        `Subtotal: ${formatBrl(body.productsCents)}`,
        `Frete: ${formatBrl(body.shippingCents)}`,
        `Total: ${formatBrl(body.totalCents)}`,
      ].join('\n'),
    }),
  ])

  if (clientResult.status === 'fulfilled') {
    const r = clientResult.value
    if (r.error) {
      console.error('[order-confirmation] Resend recusou e-mail para cliente:', JSON.stringify(r.error))
    } else {
      console.log('[order-confirmation] E-mail para cliente enviado. id:', r.data?.id)
    }
  } else {
    console.error('[order-confirmation] Falha ao enviar e-mail para cliente:', clientResult.reason)
  }

  if (storeResult.status === 'fulfilled') {
    const r = storeResult.value
    if (r.error) {
      console.error('[order-confirmation] Resend recusou e-mail para loja:', JSON.stringify(r.error))
    } else {
      console.log('[order-confirmation] E-mail para loja enviado. id:', r.data?.id)
    }
  } else {
    console.error('[order-confirmation] Falha ao enviar e-mail para loja:', storeResult.reason)
  }
}
