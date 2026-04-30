/**
 * Normalizes Stripe keys from env (quotes, Bearer prefix, line breaks from copy-paste).
 * Works for both secret (sk_/rk_) and publishable (pk_) keys.
 */
export function normalizeStripeEnvKey(raw: string | undefined | null): string {
  if (raw == null) return ''
  let k = String(raw).trim()
  if (k.length >= 2 && ((k.startsWith('"') && k.endsWith('"')) || (k.startsWith("'") && k.endsWith("'")))) {
    k = k.slice(1, -1).trim()
  }
  if (k.toLowerCase().startsWith('bearer ')) {
    k = k.slice(7).trim()
  }
  k = k.replace(/[\r\n]+/g, '').replace(/\s+/g, '')
  return k
}
