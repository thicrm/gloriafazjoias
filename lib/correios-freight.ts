import 'server-only'

const CORREIOS_CALC_URL =
  'https://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo'

/** PAC sem contrato — código dos Correios */
const SERVICO_PAC = '04510'

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

function parseValorFromXml(xml: string): number | null {
  const m = xml.match(/<Valor>([^<]+)<\/Valor>/i)
  if (!m) return null
  const raw = m[1].trim().replace(/\./g, '').replace(',', '.')
  const n = parseFloat(raw)
  if (!Number.isFinite(n)) return null
  return Math.round(n * 100)
}

function parsePrazoFromXml(xml: string): string | null {
  const m = xml.match(/<PrazoEntrega>([^<]+)<\/PrazoEntrega>/i)
  return m ? m[1].trim() : null
}

/**
 * Cota PAC via webservice público dos Correios (sem contrato).
 * Peso e dimensões são padrão para envio de joias em caixa pequena.
 */
export async function quoteCorreiosPac(params: {
  cepOrigem: string
  cepDestino: string
  /** Peso em kg (ex.: 0.3) */
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
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), 12_000)

  try {
    const res = await fetch(url, {
      method: 'GET',
      signal: ctrl.signal,
      headers: { Accept: 'text/xml' },
      cache: 'no-store',
    })
    if (!res.ok) {
      return { ok: false, error: 'Correios não respondeu. Tente novamente ou escolha motoboy.' }
    }
    const xml = await res.text()
    if (/<Erro>-?\d+<\/Erro>/i.test(xml) && !/<Valor>/i.test(xml)) {
      const em = xml.match(/<MsgErro>([^<]*)<\/MsgErro>/i)
      return {
        ok: false,
        error: em?.[1]?.trim() || 'Não foi possível calcular o frete para este CEP.',
      }
    }
    const cents = parseValorFromXml(xml)
    if (cents === null || cents < 50) {
      return { ok: false, error: 'Resposta inválida dos Correios. Tente outro CEP ou motoboy.' }
    }
    return {
      ok: true,
      priceBrlCents: cents,
      prazoEntrega: parsePrazoFromXml(xml),
      servico: 'PAC (Correios)',
    }
  } catch {
    return { ok: false, error: 'Falha ao consultar Correios. Tente novamente ou escolha motoboy.' }
  } finally {
    clearTimeout(t)
  }
}
