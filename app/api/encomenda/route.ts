import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import {
  getResendApiKeyOrNull,
  getResendFromAddress,
  logResendRejection,
  STORE_EMAIL,
  STORE_EMAIL_GMAIL,
  STORE_NAME,
} from '@/lib/emails/resend-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

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
  /** Anel — tamanho de aro (BR), ex.: "18" */
  ringSizeBr?: string
  /**
   * Encomenda personalizada (/encomendas) — same fields as the public form.
   * When set, the loja e-mail uses these for a seção estruturada (além do texto legado `message`).
   */
  afirmacao?: string
  tipoPeca?: string[]
  tipoPecaOutro?: string
  ocasiao?: string[]
  ocasiaoOutro?: string
  materiais?: string[]
  materiaisOutro?: string
  /** Q5 — nos conte mais */
  mensagemLivre?: string
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatListWithOutro(arr: unknown, outro: unknown): string {
  if (!Array.isArray(arr)) return ''
  const o = typeof outro === 'string' ? outro.trim() : ''
  return arr
    .map((x) => (x === 'Outro' && o ? `Outro: ${o}` : String(x)))
    .filter(Boolean)
    .join(', ')
}

function hasPersonalizadaStructure(body: EncomendaBody): boolean {
  return Boolean(
    body.afirmacao ||
      (Array.isArray(body.tipoPeca) && body.tipoPeca.length > 0) ||
      (Array.isArray(body.ocasiao) && body.ocasiao.length > 0) ||
      (Array.isArray(body.materiais) && body.materiais.length > 0) ||
      (typeof body.mensagemLivre === 'string' && body.mensagemLivre.trim())
  )
}

function buildPersonalizadaDetailsHtml(body: EncomendaBody): string {
  if (!hasPersonalizadaStructure(body)) return ''

  const afirmacao = typeof body.afirmacao === 'string' ? body.afirmacao.trim() : ''
  const tipo = formatListWithOutro(body.tipoPeca, body.tipoPecaOutro)
  const ocas = formatListWithOutro(body.ocasiao, body.ocasiaoOutro)
  const mat = formatListWithOutro(body.materiais, body.materiaisOutro)
  const livre = typeof body.mensagemLivre === 'string' ? body.mensagemLivre.trim() : ''

  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:8px 0;font-family:Arial,sans-serif;font-size:12px;color:#888;vertical-align:top;width:200px;">${escapeHtml(label)}</td>
          <td style="padding:8px 0;font-family:Arial,sans-serif;font-size:14px;color:#3a3a3a;line-height:1.6;">${escapeHtml(value)}</td>
        </tr>`
      : ''

  return `
            <h3 style="margin:0 0 12px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;border-bottom:2px solid #d4af37;padding-bottom:6px;">
              Detalhes da encomenda
            </h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border-collapse:collapse;">
              ${row('1. Afirmação', afirmacao)}
              ${row('2. Tipo(s) de peça', tipo)}
              ${row('3. Ocasião(ões)', ocas)}
              ${row('4. Materiais', mat)}
              ${livre ? row('5. Nos conte mais…', livre) : ''}
            </table>
  `
}

function buildPersonalizadaDetailsText(body: EncomendaBody): string {
  if (!hasPersonalizadaStructure(body)) return ''
  const lines: string[] = ['--- Detalhes da encomenda ---']
  const afirmacao = typeof body.afirmacao === 'string' ? body.afirmacao.trim() : ''
  if (afirmacao) lines.push(`1. Afirmação: ${afirmacao}`)
  const tipo = formatListWithOutro(body.tipoPeca, body.tipoPecaOutro)
  if (tipo) lines.push(`2. Tipo(s) de peça: ${tipo}`)
  const ocas = formatListWithOutro(body.ocasiao, body.ocasiaoOutro)
  if (ocas) lines.push(`3. Ocasião: ${ocas}`)
  const mat = formatListWithOutro(body.materiais, body.materiaisOutro)
  if (mat) lines.push(`4. Materiais: ${mat}`)
  const livre = typeof body.mensagemLivre === 'string' ? body.mensagemLivre.trim() : ''
  if (livre) lines.push(`5. Nos conte mais: ${livre}`)
  return lines.join('\n')
}

function buildStoreHtml(body: EncomendaBody) {
  const typeLabel = body.type === 'produto' ? 'Encomenda de produto' : 'Encomenda personalizada'
  const payLabel = body.wantsToPay
    ? '✅ Cliente deseja efetuar pagamento'
    : 'ℹ️ Cliente solicitou sem pagamento imediato'

  const ringRow =
    body.type === 'produto' && typeof body.ringSizeBr === 'string' && body.ringSizeBr.trim()
      ? `<tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">Aro (BR)</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;"><strong>${escapeHtml(body.ringSizeBr.trim())}</strong></td>
              </tr>`
      : ''

  const personalizadaBlock =
    body.type === 'personalizada' && hasPersonalizadaStructure(body)
      ? buildPersonalizadaDetailsHtml(body)
      : ''

  const legacyMessage =
    body.message && (!hasPersonalizadaStructure(body) || body.type === 'produto')
      ? `
            <h3 style="margin:0 0 10px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;border-bottom:2px solid #d4af37;padding-bottom:6px;">
              ${body.type === 'personalizada' ? 'Resumo (texto enviado)' : 'Mensagem'}
            </h3>
            <p style="margin:0 0 24px;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;white-space:pre-wrap;line-height:1.7;">${escapeHtml(body.message)}</p>
            `
      : body.message && body.type === 'personalizada' && hasPersonalizadaStructure(body)
        ? `
            <h3 style="margin:16px 0 10px;font-family:Georgia,serif;font-size:14px;color:#666;border-bottom:1px solid #e8dcc8;padding-bottom:4px;">
              Texto completo (legado)
            </h3>
            <p style="margin:0;font-family:Arial,sans-serif;font-size:12px;color:#666;white-space:pre-wrap;line-height:1.6;">${escapeHtml(body.message)}</p>
            `
        : ''

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
            ${personalizadaBlock}

            ${body.productName ? `
            <h3 style="margin:0 0 10px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;border-bottom:2px solid #d4af37;padding-bottom:6px;">
              Produto
            </h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:14px;color:#3a3a3a;">
                  <strong>${escapeHtml(body.productName)}</strong>
                  ${body.wantsToPay !== undefined ? `<br/><span style="font-size:13px;color:#666;">${payLabel}</span>` : ''}
                </td>
              </tr>
              ${ringRow}
            </table>
            ` : ''}

            <h3 style="margin:0 0 10px;font-family:Georgia,serif;font-size:15px;color:#1a1a1a;border-bottom:2px solid #d4af37;padding-bottom:6px;">
              Cliente
            </h3>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;width:100px;">Nome</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;"><strong>${escapeHtml(body.name)}</strong></td>
              </tr>
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">E-mail</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;"><a href="mailto:${escapeHtml(body.email)}">${escapeHtml(body.email)}</a></td>
              </tr>
              ${body.phone ? `
              <tr>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#888;">Telefone</td>
                <td style="padding:5px 0;font-family:Arial,sans-serif;font-size:13px;color:#3a3a3a;">${escapeHtml(body.phone)}</td>
              </tr>` : ''}
            </table>

            ${legacyMessage}
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

  /** Product-page flow: "add to cart & pay later" — e-mail only after checkout payment (webhook). */
  if (body.type === 'produto' && body.wantsToPay === true) {
    return NextResponse.json({ ok: true, emailDeferredUntilPayment: true })
  }

  const apiKey = getResendApiKeyOrNull()
  if (!apiKey) {
    console.warn(
      '[encomenda] RESEND_API_KEY ausente — e-mails não enviados. Defina em Vercel (Production) ou .env.local.'
    )
    return NextResponse.json({ ok: true, emailsSent: false, reason: 'resend_not_configured' })
  }

  const resend = new Resend(apiKey)
  const from = getResendFromAddress()

  const subjectStore = body.type === 'produto'
    ? `Nova encomenda: ${body.productName ?? 'produto'} — ${name}`
    : `Nova encomenda personalizada de ${name}`

  const [storeResult, clientResult] = await Promise.allSettled([
    resend.emails.send({
      from,
      to: [STORE_EMAIL, STORE_EMAIL_GMAIL],
      replyTo: email,
      subject: subjectStore,
      html: buildStoreHtml({ ...body, name, email }),
      text: [
        subjectStore,
        '',
        ...(body.type === 'personalizada' && hasPersonalizadaStructure(body)
          ? [buildPersonalizadaDetailsText({ ...body, name, email }), '']
          : []),
        body.productName ? `Produto: ${body.productName}` : '',
        body.ringSizeBr?.trim() ? `Aro (BR): ${body.ringSizeBr.trim()}` : '',
        `Cliente: ${name}`,
        `E-mail: ${email}`,
        body.phone ? `Telefone: ${body.phone}` : '',
        body.wantsToPay !== undefined
          ? `Pagamento: ${body.wantsToPay ? 'Deseja pagar' : 'Sem pagamento imediato'}`
          : '',
        ...(body.message && (!hasPersonalizadaStructure(body) || body.type === 'produto')
          ? ['', 'Mensagem:', body.message]
          : body.message && body.type === 'personalizada' && hasPersonalizadaStructure(body)
            ? ['', 'Texto completo (legado):', body.message]
            : []),
      ].join('\n'),
    }),
    resend.emails.send({
      from,
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
    logResendRejection('encomenda-loja', storeResult.value.error)
  } else {
    console.log('[encomenda] E-mail para loja enviado. id:', storeResult.value.data?.id)
  }

  if (clientResult.status === 'rejected') {
    console.error('[encomenda] Erro ao enviar e-mail para cliente:', clientResult.reason)
  } else if (clientResult.value.error) {
    logResendRejection('encomenda-cliente', clientResult.value.error)
  } else {
    console.log('[encomenda] E-mail para cliente enviado. id:', clientResult.value.data?.id)
  }

  const storeOk =
    storeResult.status === 'fulfilled' && !storeResult.value.error
  const clientOk =
    clientResult.status === 'fulfilled' && !clientResult.value.error

  return NextResponse.json({
    ok: true,
    emailsSent: storeOk && clientOk,
    storeEmailSent: storeOk,
    clientEmailSent: clientOk,
  })
}
