import 'server-only'

/** Must match a verified domain / sender in Resend (Dashboard → Domains). */
export const STORE_EMAIL = 'contato@gloriafazjoias.com'
export const STORE_EMAIL_GMAIL = 'gloriafazjoias@gmail.com'
export const STORE_NAME = 'Glória Faz Jóias'

/**
 * `From` header. Override when the default store address is not verified in Resend yet.
 * Format: `Nome <email@verified-domain.com>`
 * @example RESEND_FROM=Glória Faz Jóias <onboarding@resend.dev>
 */
export function getResendFromAddress(): string {
  const raw = process.env.RESEND_FROM?.trim()
  if (raw) return raw
  return `${STORE_NAME} <${STORE_EMAIL}>`
}

export function getResendApiKeyOrNull(): string | null {
  const k = process.env.RESEND_API_KEY?.trim()
  if (!k || k === 're_...') return null
  return k
}

export function logResendRejection(context: string, error: unknown): void {
  console.error(
    `[${context}] Resend recusou o envio:`,
    typeof error === 'object' && error !== null ? JSON.stringify(error) : error,
    '| Verifique RESEND_API_KEY, domínio verificado no Resend e opcionalmente RESEND_FROM (remetente autorizado).'
  )
}
