import { NextResponse } from 'next/server'
import { verifyMercadoPagoWebhookSignature } from '@/lib/mercadopago/verify-webhook-signature'
import {
  handleMercadoPagoWebhookNotification,
  type MercadoPagoWebhookBody,
} from '@/lib/mercadopago/webhook-handlers'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const MAX_BODY_BYTES = 256 * 1024

export async function POST(request: Request) {
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET?.trim()
  if (!secret) {
    return NextResponse.json(
      { error: 'MERCADOPAGO_WEBHOOK_SECRET is not configured' },
      { status: 503 }
    )
  }

  let rawBody: string
  try {
    rawBody = await request.text()
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  if (rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  const xSignature = request.headers.get('x-signature')
  const xRequestId = request.headers.get('x-request-id')

  const ok = verifyMercadoPagoWebhookSignature({
    requestUrl: request.url,
    rawBody,
    xSignature,
    xRequestId,
    webhookSecret: secret,
  })

  if (!ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: unknown
  try {
    body = rawBody ? JSON.parse(rawBody) : {}
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 })
  }

  try {
    await handleMercadoPagoWebhookNotification(body as MercadoPagoWebhookBody)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Handler error'
    return NextResponse.json({ error: message }, { status: 500 })
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
