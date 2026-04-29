import 'server-only'

const MELHOR_ENVIO_API = 'https://melhorenvio.com.br/api/v2/me/shipment/calculate'

/** Default package dimensions in cm — same box used for Correios quotes. */
const PACKAGE = { width: 13, height: 8, length: 18 }

/** Declared value (BRL) for ME insurance — required by API; affects some carriers’ quotes. */
const DEFAULT_INSURANCE_BRL = 100

export type MelhorEnvioQuoteResult =
  | { ok: true; priceBrlCents: number; prazoEntrega: string | null; servico: string }
  | { ok: false; error: string }

type MelhorEnvioService = {
  id: number
  name?: string
  price?: string | null
  custom_price?: string | null
  delivery_time?: number
  delivery_range?: { min: number; max: number }
  custom_delivery_range?: { min: number; max: number }
  error?: string | null
  company?: { id: number; name: string }
}

function insuranceValueBrl(): number {
  const raw = process.env.MELHOR_ENVIO_INSURANCE_VALUE_BRL?.trim()
  if (!raw) return DEFAULT_INSURANCE_BRL
  const n = parseFloat(raw.replace(',', '.'))
  return Number.isFinite(n) && n > 0 ? Math.min(n, 1_000_000) : DEFAULT_INSURANCE_BRL
}

/** ME returns a JSON array; some proxies may wrap it — normalize to an array of services. */
function parseCalculateResponse(json: unknown): MelhorEnvioService[] | null {
  if (Array.isArray(json)) {
    return json as MelhorEnvioService[]
  }
  if (json && typeof json === 'object') {
    const o = json as Record<string, unknown>
    if (Array.isArray(o.data)) return o.data as MelhorEnvioService[]
    if (Array.isArray(o.quotes)) return o.quotes as MelhorEnvioService[]
    if (Array.isArray(o.services)) return o.services as MelhorEnvioService[]
  }
  return null
}

function parsePriceString(raw: string | null | undefined): number {
  if (raw == null) return NaN
  const s = String(raw).trim()
  if (!s) return NaN
  return parseFloat(s.replace(',', '.'))
}

/**
 * Requests a shipping quote from Melhor Envio.
 * Prefers PAC (Correios) when available; falls back to cheapest valid option.
 * Requires MELHOR_ENVIO_TOKEN env var (Bearer token from Melhor Envio dashboard).
 *
 * @see https://docs.melhorenvio.com.br/reference/calculo-de-fretes-por-produtos — each `products[]`
 * item must include `insurance_value` and `quantity`; omitting them can yield unreliable quotes.
 */
export async function quoteMelhorEnvio(params: {
  cepOrigem: string
  cepDestino: string
  pesoKg: number
}): Promise<MelhorEnvioQuoteResult> {
  const token = process.env.MELHOR_ENVIO_TOKEN?.trim()
  if (!token) {
    return { ok: false, error: 'Frete não configurado. Contate a loja.' }
  }

  const peso = Math.max(0.3, Math.min(params.pesoKg, 30))
  const insurance = insuranceValueBrl()

  const body = {
    from: { postal_code: params.cepOrigem },
    to: { postal_code: params.cepDestino },
    products: [
      {
        id: 'checkout-quote',
        width: PACKAGE.width,
        height: PACKAGE.height,
        length: PACKAGE.length,
        weight: peso,
        insurance_value: insurance,
        quantity: 1,
      },
    ],
    options: {
      receipt: false,
      own_hand: false,
    },
  }

  let response: Response
  try {
    response = await fetch(MELHOR_ENVIO_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'User-Agent': 'GloriaFazJoias/1.0 (app@gloriafazjoias.com.br)',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })
  } catch {
    return { ok: false, error: 'Não foi possível consultar o frete. Tente novamente.' }
  }

  if (!response.ok) {
    let msg: string
    if (response.status === 401) {
      msg = 'Token de frete inválido. Contate a loja.'
    } else if (response.status === 422) {
      msg = 'CEP inválido ou fora de área de cobertura.'
    } else {
      msg = `Erro ao calcular frete (${response.status}). Tente novamente.`
    }
    return { ok: false, error: msg }
  }

  let parsed: unknown
  try {
    parsed = await response.json()
  } catch {
    return { ok: false, error: 'Resposta inválida do serviço de frete.' }
  }

  const services = parseCalculateResponse(parsed)
  if (!services || services.length === 0) {
    return { ok: false, error: 'Nenhuma opção de frete disponível para este CEP.' }
  }

  const valid = services.filter((s) => !s.error && (s.price || s.custom_price))

  if (valid.length === 0) {
    const firstError = services.find((s) => s.error)?.error
    return {
      ok: false,
      error: firstError || 'Nenhuma opção de frete disponível para este CEP.',
    }
  }

  const nameLower = (s: MelhorEnvioService) => (s.name ?? '').toLowerCase()
  const companyLower = (s: MelhorEnvioService) => (s.company?.name ?? '').toLowerCase()

  const pac = valid.find(
    (s) =>
      nameLower(s).includes('pac') &&
      (companyLower(s).includes('correios') || s.company?.id === 1)
  )
  const chosen =
    pac ??
    valid.reduce((a, b) => {
      const priceA = parsePriceString(a.custom_price ?? a.price)
      const priceB = parsePriceString(b.custom_price ?? b.price)
      const safeA = Number.isFinite(priceA) ? priceA : 9999
      const safeB = Number.isFinite(priceB) ? priceB : 9999
      return safeA <= safeB ? a : b
    })

  const priceStr = chosen.custom_price ?? chosen.price ?? ''
  const priceFloat = parsePriceString(priceStr)
  if (!Number.isFinite(priceFloat) || priceFloat <= 0) {
    return { ok: false, error: 'Não foi possível obter o valor do frete.' }
  }

  const priceBrlCents = Math.round(priceFloat * 100)

  const prazoRange = chosen.custom_delivery_range ?? chosen.delivery_range
  const prazoEntrega = prazoRange
    ? prazoRange.min === prazoRange.max
      ? String(prazoRange.max)
      : `${prazoRange.min}–${prazoRange.max}`
    : chosen.delivery_time != null
      ? String(chosen.delivery_time)
      : null

  const servico = [chosen.name, chosen.company?.name ? `(${chosen.company.name})` : null]
    .filter(Boolean)
    .join(' ')

  return { ok: true, priceBrlCents, prazoEntrega, servico }
}
