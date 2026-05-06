import 'server-only'

/** Stripe / Mercado Pago metadata: cart line labels for post-payment e-mail (server-validated amounts). */
export type OrderLineEmail = {
  productName: string
  quantity: number
  ringSizeBr?: string
}

export type PaymentOrderSnapshotV1 = {
  v: 1
  lines: OrderLineEmail[]
}

const CHUNK = 450
const PREFIX = 'gfj_ord'

/**
 * Reads optional `productName` from each cart line (must match priced `items` array).
 */
export function buildEmailLinesFromItems(items: unknown): OrderLineEmail[] | null {
  if (!Array.isArray(items)) return null
  const lines: OrderLineEmail[] = []
  for (const raw of items) {
    if (!raw || typeof raw !== 'object') return null
    const sku = (raw as { sku?: unknown }).sku
    const q = (raw as { quantity?: unknown }).quantity
    const pname = (raw as { productName?: unknown }).productName
    if (typeof sku !== 'string' || typeof q !== 'number' || !Number.isInteger(q) || q < 1) {
      return null
    }
    const productName =
      typeof pname === 'string' && pname.trim() ? pname.trim() : sku
    const ringRaw = (raw as { ringSize?: unknown }).ringSize
    const ringSizeBr =
      typeof ringRaw === 'string' && ringRaw.trim() ? ringRaw.trim() : undefined
    lines.push({ productName, quantity: q, ringSizeBr })
  }
  return lines.length ? lines : null
}

/** Max JSON payload chunks so Stripe metadata stays ≤ 50 keys with other cart fields (~11). */
const MAX_PARTS = 38

/** Returns `null` if payload exceeds metadata limits. */
export function encodeSnapshotToMetadata(s: PaymentOrderSnapshotV1): Record<string, string> | null {
  const json = JSON.stringify(s)
  if (json.length <= CHUNK) {
    return { [PREFIX]: json }
  }
  const out: Record<string, string> = {}
  let i = 0
  let p = 0
  while (i < json.length && p < MAX_PARTS) {
    out[`${PREFIX}_${p}`] = json.slice(i, i + CHUNK)
    i += CHUNK
    p++
  }
  if (i < json.length) return null
  out[`${PREFIX}_n`] = String(p)
  return out
}

export function decodeSnapshotFromRecord(meta: Record<string, string>): PaymentOrderSnapshotV1 | null {
  const single = meta[PREFIX]
  if (single) {
    try {
      const x = JSON.parse(single) as PaymentOrderSnapshotV1
      if (x?.v === 1 && Array.isArray(x.lines)) return x
    } catch {
      return null
    }
    return null
  }
  const nRaw = meta[`${PREFIX}_n`]
  const n = nRaw ? parseInt(nRaw, 10) : 0
  if (!Number.isFinite(n) || n < 1 || n > MAX_PARTS) return null
  let json = ''
  for (let p = 0; p < n; p++) {
    const part = meta[`${PREFIX}_${p}`]
    if (part === undefined) return null
    json += part
  }
  try {
    const x = JSON.parse(json) as PaymentOrderSnapshotV1
    return x?.v === 1 && Array.isArray(x.lines) ? x : null
  } catch {
    return null
  }
}

/**
 * Converts a camelCase key to snake_case.
 * Mercado Pago's SDK deserializes metadata keys from snake_case to camelCase,
 * so we must normalize them back before looking up fields like `products_cents`,
 * `customer_name`, or `gfj_ord`.
 * Examples: "productsCents" → "products_cents", "gfjOrd0" → "gfj_ord_0"
 */
function mpKeyToSnake(key: string): string {
  return key
    .replace(/([A-Z])/g, '_$1')
    .replace(/([a-zA-Z])(\d)/g, '$1_$2')
    .toLowerCase()
}

export function recordFromMercadoPagoMetadata(
  meta: Record<string, unknown> | null | undefined
): Record<string, string> {
  const o: Record<string, string> = {}
  if (!meta || typeof meta !== 'object') return o
  for (const [k, v] of Object.entries(meta)) {
    if (v == null) continue
    const normalizedKey = mpKeyToSnake(k)
    o[normalizedKey] = typeof v === 'string' ? v : String(v)
  }
  return o
}
