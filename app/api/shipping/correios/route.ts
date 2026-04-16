import { NextResponse } from 'next/server'
import { normalizeCep } from '@/lib/correios-freight'
import { quoteMelhorEnvio } from '@/lib/melhorenvio-freight'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Body = { cepDestino?: string }

export async function POST(request: Request) {
  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  const cep = typeof body.cepDestino === 'string' ? normalizeCep(body.cepDestino) : null
  if (!cep) {
    return NextResponse.json({ error: 'Informe um CEP válido (8 dígitos).' }, { status: 400 })
  }

  const origRaw = process.env.MELHOR_ENVIO_ORIGIN_CEP?.trim() ?? ''
  const orig = normalizeCep(origRaw)
  if (!orig) {
    return NextResponse.json(
      { error: 'Loja sem CEP de origem configurado.' },
      { status: 503 }
    )
  }

  const peso = parseFloat(process.env.CORREIOS_PACKAGE_WEIGHT_KG || '0.3') || 0.3
  const quote = await quoteMelhorEnvio({ cepOrigem: orig, cepDestino: cep, pesoKg: peso })

  if (!quote.ok) {
    return NextResponse.json({ error: quote.error }, { status: 400 })
  }

  return NextResponse.json({
    priceBrlCents: quote.priceBrlCents,
    prazoEntrega: quote.prazoEntrega,
    servico: quote.servico,
  })
}
