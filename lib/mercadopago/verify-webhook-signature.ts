import 'server-only'

import crypto from 'crypto'

const MAX_SKEW_MS = 5 * 60 * 1000

export type MercadoPagoWebhookVerifyInput = {
  requestUrl: string
  /** Raw POST body (for extracting data.id when absent from query). */
  rawBody: string
  xSignature: string | null
  xRequestId: string | null
  webhookSecret: string
}

function parseXSignature(xSignature: string): { ts: string; v1: string } | null {
  let ts: string | undefined
  let v1: string | undefined
  for (const part of xSignature.split(',')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    const key = part.slice(0, eq).trim()
    const value = part.slice(eq + 1).trim()
    if (key === 'ts') ts = value
    else if (key === 'v1') v1 = value
  }
  if (ts == null || v1 == null) return null
  return { ts, v1 }
}

function tsToMs(ts: string): number {
  const n = Number(ts)
  if (!Number.isFinite(n)) return NaN
  // MP examples use 10-digit Unix seconds; millis would be ~13 digits
  return ts.length >= 13 ? n : n * 1000
}

/**
 * Validates Mercado Pago `x-signature` per official manifest:
 * `id:[data.id lowercase];request-id:[x-request-id];ts:[ts];`
 * @see https://www.mercadopago.com.br/developers/en/docs/your-integrations/notifications/webhooks
 */
export function verifyMercadoPagoWebhookSignature(input: MercadoPagoWebhookVerifyInput): boolean {
  const parsed = input.xSignature ? parseXSignature(input.xSignature) : null
  if (!parsed || !input.xRequestId?.trim()) return false

  const tsMs = tsToMs(parsed.ts)
  if (!Number.isFinite(tsMs)) return false
  if (Math.abs(Date.now() - tsMs) > MAX_SKEW_MS) return false

  const url = new URL(input.requestUrl)
  let dataId = url.searchParams.get('data.id')?.trim() ?? ''
  if (!dataId && input.rawBody) {
    try {
      const body = JSON.parse(input.rawBody) as { data?: { id?: string | number } }
      const id = body?.data?.id
      if (id != null) dataId = String(id).trim()
    } catch {
      /* ignore */
    }
  }
  if (!dataId) return false

  const manifest = `id:${dataId.toLowerCase()};request-id:${input.xRequestId.trim()};ts:${parsed.ts};`
  const expectedHex = crypto.createHmac('sha256', input.webhookSecret).update(manifest).digest('hex')
  const received = parsed.v1.trim().toLowerCase()

  try {
    const a = Buffer.from(expectedHex, 'hex')
    const b = Buffer.from(received, 'hex')
    if (a.length !== b.length || a.length === 0) return false
    return crypto.timingSafeEqual(a, b)
  } catch {
    return false
  }
}
