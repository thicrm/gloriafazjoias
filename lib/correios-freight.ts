import 'server-only'

const CORREIOS_CALC_URL =
  'https://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo'

/** PAC sem contrato — código nacional tradicional */
const SERVICO_PAC = '04510'

const FETCH_TIMEOUT_MS = 18_000
const MAX_ATTEMPTS = 2

export type CorreiosQuoteResult =
  | { ok: true; priceBrlCents: number; prazoEntrega: string | null; servico: string }
  | { ok: false; error: string }

function onlyDigits(s: string): string {
  return s.replace(/\D/g, '')
}

export function normalizeCep(cep: string): string | null {
  const d = onlyDigits(cep)
  if (d.length !== 8) return null
  return d
}

function brlStringToCents(raw: string): number | null {
  const t = raw.trim().replace(/\./g, '').replace(',', '.')
  const n = parseFloat(t)
  if (!Number.isFinite(n)) return null
  return Math.round(n * 100)
}

/**
 * Extrai PAC pelo bloco <cServico> com <Codigo>04510</Codigo>.
 * O webservice antigo às vezes devolve vários <Valor>; o primeiro match global quebrava.
 */
function parsePacFromXml(xml: string): {
  cents: number | null
  prazo: string | null
  errorMsg: string | null
} {
  const parts = xml.split(/<cServico\b/i)
  for (let i = 1; i < parts.length; i++) {
    const block = parts[i]
    const end = block.search(/<\/cServico>/i)
    const seg = end >= 0 ? block.slice(0, end) : block
    if (!new RegExp(`<Codigo>\\s*${SERVICO_PAC}\\s*</Codigo>`, 'i').test(seg)) continue

    const errM = seg.match(/<Erro>\s*(-?\d+)\s*<\/Erro>/i)
    const errCode = errM ? parseInt(errM[1], 10) : 0
    const msgM = seg.match(/<MsgErro>([^<]*)<\/MsgErro>/i)
    const msg = msgM?.[1]?.trim() ?? ''

    if (errCode !== 0) {
      return {
        cents: null,
        prazo: null,
        errorMsg: msg || `Correios retornou erro ${errCode} para PAC.`,
      }
    }

    const valM = seg.match(/<Valor>\s*([^<]+)\s*<\/Valor>/i)
    const prazoM = seg.match(/<PrazoEntrega>\s*([^<]+)\s*<\/PrazoEntrega>/i)
    const cents = valM ? brlStringToCents(valM[1]) : null
    const prazo = prazoM ? prazoM[1].trim() : null
    return { cents, prazo, errorMsg: null }
  }

  /* Fallback: primeiro <Valor> (comportamento legado) */
  const m = xml.match(/<Valor>\s*([^<]+)\s*<\/Valor>/i)
  const cents = m ? brlStringToCents(m[1]) : null
  const prazoM = xml.match(/<PrazoEntrega>\s*([^<]+)\s*<\/PrazoEntrega>/i)
  return { cents, prazo: prazoM ? prazoM[1].trim() : null, errorMsg: null }
}

async function fetchCorreiosXml(url: string): Promise<{ ok: true; xml: string } | { ok: false; reason: 'http' | 'timeout' | 'empty' }> {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      method: 'GET',
      signal: ctrl.signal,
      headers: { Accept: 'text/xml, application/xml, */*' },
      cache: 'no-store',
    })
    if (!res.ok) return { ok: false, reason: 'http' }
    const xml = await res.text()
    if (!xml || xml.length < 20) return { ok: false, reason: 'empty' }
    return { ok: true, xml }
  } catch (e) {
    if (e instanceof Error && e.name === 'AbortError') return { ok: false, reason: 'timeout' }
    return { ok: false, reason: 'http' }
  } finally {
    clearTimeout(t)
  }
}

/**
 * Cota PAC via webservice público dos Correios (sem contrato).
 * Nota: o endpoint oficial costuma ser lento ou indisponível; hospedagens em nuvem podem sofrer timeout.
 */
export async function quoteCorreiosPac(params: {
  cepOrigem: string
  cepDestino: string
  pesoKg: number
}): Promise<CorreiosQuoteResult> {
  const orig = normalizeCep(params.cepOrigem)
  const dest = normalizeCep(params.cepDestino)
  if (!orig || !dest) {
    return { ok: false, error: 'CEP de origem ou destino inválido.' }
  }

  const peso = Math.max(0.3, Math.min(params.pesoKg || 0.3, 30))

  const qs = new URLSearchParams({
    nCdEmpresa: '',
    sDsSenha: '',
    nCdServico: SERVICO_PAC,
    sCepOrigem: orig,
    sCepDestino: dest,
    nVlPeso: String(peso),
    nCdFormato: '1',
    nVlComprimento: '18',
    nVlAltura: '8',
    nVlLargura: '13',
    nVlDiametro: '0',
    sCdMaoPropria: 'N',
    nVlValorDeclarado: '0',
    sCdAvisoRecebimento: 'N',
  })

  const url = `${CORREIOS_CALC_URL}?${qs.toString()}`

  let xml: string | null = null
  let lastReason: 'http' | 'timeout' | 'empty' = 'http'

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    const result = await fetchCorreiosXml(url)
    if (result.ok) {
      xml = result.xml
      break
    }
    lastReason = result.reason
    if (attempt < MAX_ATTEMPTS) {
      await new Promise((r) => setTimeout(r, 600))
    }
  }

  if (!xml) {
    if (lastReason === 'timeout') {
      return {
        ok: false,
        error:
          'Os Correios não responderam a tempo. Tente de novo em instantes ou use entrega por motoboy.',
      }
    }
    return {
      ok: false,
      error: 'Não foi possível consultar os Correios. Tente novamente ou escolha motoboy.',
    }
  }

  /* Erro global sem bloco de serviço útil */
  if (/<Erro>-?\d+<\/Erro>/i.test(xml) && !/<cServico/i.test(xml)) {
    const em = xml.match(/<MsgErro>([^<]*)<\/MsgErro>/i)
    return {
      ok: false,
      error: em?.[1]?.trim() || 'Não foi possível calcular o frete para este CEP.',
    }
  }

  const parsed = parsePacFromXml(xml)
  if (parsed.errorMsg) {
    return { ok: false, error: parsed.errorMsg }
  }

  const cents = parsed.cents
  if (cents === null || cents < 50) {
    return {
      ok: false,
      error:
        'Resposta dos Correios sem valor de frete válido. Confira os CEPs ou tente motoboy.',
    }
  }

  return {
    ok: true,
    priceBrlCents: cents,
    prazoEntrega: parsed.prazo,
    servico: 'PAC (Correios)',
  }
}
