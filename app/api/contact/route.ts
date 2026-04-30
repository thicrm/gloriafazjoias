import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import {
  getResendApiKeyOrNull,
  getResendFromAddress,
  logResendRejection,
  STORE_EMAIL,
} from '@/lib/emails/resend-config'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Body = {
  name?: string
  email?: string
  message?: string
}

export async function POST(request: Request) {
  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const name = String(body.name ?? '').trim()
  const email = String(body.email ?? '').trim()
  const message = String(body.message ?? '').trim()

  if (!name || !email.includes('@') || !message) {
    return NextResponse.json(
      { error: 'Preencha todos os campos obrigatórios.' },
      { status: 400 }
    )
  }

  const apiKey = getResendApiKeyOrNull()
  if (!apiKey) {
    console.error('[contact] RESEND_API_KEY não configurado')
    return NextResponse.json(
      { error: 'Serviço de e-mail não configurado. Tente pelo WhatsApp.' },
      { status: 503 }
    )
  }

  const resend = new Resend(apiKey)
  const from = getResendFromAddress()

  const { error: sendError } = await resend.emails.send({
    from,
    to: STORE_EMAIL,
    replyTo: email,
    subject: `Mensagem de ${name} — Glória Faz Jóias`,
    text: `Nome: ${name}\nE-mail: ${email}\n\n${message}`,
    html: `
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
      <hr/>
      <p style="white-space:pre-wrap">${message.replace(/</g, '&lt;')}</p>
    `.trim(),
  })

  if (sendError) {
    logResendRejection('contact', sendError)
    return NextResponse.json(
      { error: 'Não foi possível enviar. Tente novamente.' },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true })
}
