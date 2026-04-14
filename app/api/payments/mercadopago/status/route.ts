import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim()
  if (!token) {
    return NextResponse.json({ error: 'Mercado Pago não configurado.' }, { status: 503 })
  }

  const id = new URL(request.url).searchParams.get('id')
  if (!id || !/^\d+$/.test(id)) {
    return NextResponse.json({ error: 'id numérico obrigatório' }, { status: 400 })
  }

  const client = new MercadoPagoConfig({ accessToken: token })
  const paymentApi = new Payment(client)

  try {
    const data = await paymentApi.get({ id: Number(id) })
    return NextResponse.json({
      id: data.id,
      status: data.status,
      status_detail: data.status_detail,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erro ao consultar pagamento'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
