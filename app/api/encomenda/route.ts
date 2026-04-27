import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const STORE_EMAIL = 'contato@gloriafazjoias.com'
const STORE_EMAIL_GMAIL = 'gloriafazjoias@gmail.com'
const STORE_NAME = 'Glória Faz Jóias'

type EncomendaBody = {
  name: string
  email: string
  phone?: string
  productName?: string
  productSlug?: string
  message?: string
  wantsToPay?: boolean
  /** "produto" for product-page encomenda, "personalizada" for encomendas page */
  type: 'produto' | 'personalizada'
}

function buildStoreHtml(body: EncomendaBody) {
  const typeLabel = body.type === 'produto' ? 'Encomenda de produto' : 'Encomenda personalizada'
  const payLabel = body.wantsToPay
    ? '✅ Cliente deseja efetuar pagamento'
    : 'ℹ️ Cliente solicitou sem pagamento imediato'

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
              ${typeLabel} 📬
            </h1>
          </td>
        </tr>

        <tr>
          <td style="padding:32px;">
            ${body.productName ? `
            <h3 style="margin:0 0 10px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;border-bottom:2px solid #d4af37;padding-bottom:6px;">
              Produto
            </h3>
            <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:14px;color:#3a3a3a;">
              <strong>${body.productName}</strong>
              ${body.wantsToPay !== undefined ? `<br/><span style="font-size:13px;color:#666;">${payLabel}</span>` : ''}
            </p>
            ` : ''}

            <h3 style="margin:0 0 10px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;border-bottom:2px solid #d4af37;padding-bottom:6px;">
              Cliente
            </h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;width:100px;">Nome</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;"><strong>${body.name}</strong></td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">E-mail</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;"><a href="mailto:${body.email}">${body.email}</a></td>
              </tr>
              ${body.phone ? `
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">Telefone</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;">${body.phone}</td>
              </tr>` : ''}
            </table>

            ${body.message ? `
            <h3 style="margin:0 0 10px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;border-bottom:2px solid #d4af37;padding-bottom:6px;">
              Mensagem
            </h3>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;white-space:pre-wrap;line-height:1.7;">${body.message.replace(/</g, '&lt;')}</p>
            ` : ''}
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

function buildClientHtml(body: EncomendaBody) {
  const isProduto = body.type === 'produto'

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
              Encomenda recebida ✓
            </h2>
            <p style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:14px;color:#555;line-height:1.7;">
              Olá, <strong>${body.name}</strong>! Recebemos sua encomenda com muito carinho.
              ${isProduto && body.productName
                ? `Você se interessou por <strong>${body.productName}</strong>.`
                : 'Sua solicitação de peça personalizada foi recebida.'
              }
            </p>

            <div style="background:#faf6ec;border:1px solid #e8dcc8;border-left:3px solid #d4af37;padding:16px 20px;margin-bottom:24px;">
              <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;line-height:1.7;">
                ${isProduto
                  ? '⏳ <strong>Prazo de produção:</strong> Este produto pode requerer tempo adicional de produção. A Glória Faz Jóias entrará em contato pelo e-mail ou telefone fornecidos para confirmar todos os detalhes e próximos passos.'
                  : '🤝 <strong>Próximos passos:</strong> Em breve entraremos em contato pelo e-mail ou telefone fornecidos para conversarmos sobre sua visão e começarmos a dar vida à sua jóia.'
                }
              </p>
            </div>

            <p style="margin:0;font-family:Arial,sans-serif;font-size:13px;color:#888;line-height:1.6;">
              Dúvidas? Responda este e-mail ou fale pelo WhatsApp. 💛
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

export async function POST(request: Request) {
  let body: EncomendaBody
  try {
    body = (await request.json()) as EncomendaBody
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()

  if (!name || !email.includes('@')) {
    return NextResponse.json({ error: 'Nome e e-mail são obrigatórios.' }, { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey || apiKey === 're_...') {
    console.warn('[encomenda] RESEND_API_KEY não configurado')
    return NextResponse.json({ ok: true, emailSkipped: true })
  }

  const resend = new Resend(apiKey)

  const subjectStore = body.type === 'produto'
    ? `Nova encomenda: ${body.productName ?? 'produto'} — ${name}`
    : `Nova encomenda personalizada de ${name}`

  const [storeResult, clientResult] = await Promise.allSettled([
    resend.emails.send({
      from: `${STORE_NAME} <${STORE_EMAIL}>`,
      to: [STORE_EMAIL, STORE_EMAIL_GMAIL],
      replyTo: email,
      subject: subjectStore,
      html: buildStoreHtml({ ...body, name, email }),
      text: [
        subjectStore,
        '',
        body.productName ? `Produto: ${body.productName}` : '',
        `Cliente: ${name}`,
        `E-mail: ${email}`,
        body.phone ? `Telefone: ${body.phone}` : '',
        body.wantsToPay !== undefined
          ? `Pagamento: ${body.wantsToPay ? 'Deseja pagar' : 'Sem pagamento imediato'}`
          : '',
        body.message ? `\nMensagem:\n${body.message}` : '',
      ].filter(Boolean).join('\n'),
    }),
    resend.emails.send({
      from: `${STORE_NAME} <${STORE_EMAIL}>`,
      to: email,
      replyTo: STORE_EMAIL,
      subject: `Encomenda recebida — ${STORE_NAME}`,
      html: buildClientHtml({ ...body, name, email }),
      text: [
        `Olá ${name}, recebemos sua encomenda!`,
        '',
        body.productName ? `Produto: ${body.productName}` : 'Peça personalizada',
        '',
        'Em breve entraremos em contato para confirmar os detalhes.',
        STORE_NAME,
      ].join('\n'),
    }),
  ])

  if (storeResult.status === 'rejected') {
    console.error('[encomenda] Erro ao enviar e-mail para loja:', storeResult.reason)
  } else if (storeResult.value.error) {
    console.error('[encomenda] Resend recusou e-mail para loja:', JSON.stringify(storeResult.value.error))
  } else {
    console.log('[encomenda] E-mail para loja enviado. id:', storeResult.value.data?.id)
  }

  if (clientResult.status === 'rejected') {
    console.error('[encomenda] Erro ao enviar e-mail para cliente:', clientResult.reason)
  } else if (clientResult.value.error) {
    console.error('[encomenda] Resend recusou e-mail para cliente:', JSON.stringify(clientResult.value.error))
  } else {
    console.log('[encomenda] E-mail para cliente enviado. id:', clientResult.value.data?.id)
  }

  return NextResponse.json({ ok: true })
}
