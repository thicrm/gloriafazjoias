import { NextResponse } from 'next/server'
import { MercadoPagoConfig, Payment } from 'mercadopago'
import {
  trimCustomer,
  validateAndComputeOrderTotals,
  type CheckoutCustomer,
} from '@/lib/checkout/order-totals'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

type Body = {
  items?: unknown
  shippingMethod?: string
  cepDestino?: string
  customer?: Partial<CheckoutCustomer>
  productLabel?: string
}

function buildLabel(body: Body, lineCount: number): string {
  if (typeof body.productLabel === 'string' && body.productLabel.trim()) {
    return body.productLabel.slice(0, 200).trim()
  }
  return `Pedido Glória Faz Jóias (${lineCount} tipo(s))`
}

export async function POST(request: Request) {
  const token = process.env.MERCADOPAGO_ACCESS_TOKEN?.trim()
  if (!token) {
    return NextResponse.json(
      { error: 'Mercado Pago não configurado (MERCADOPAGO_ACCESS_TOKEN).' },
      { status: 503 }
    )
  }

  let body: Body
  try {
    body = (await request.json()) as Body
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const itemArr = Array.isArray(body.items) ? body.items : []
  if (itemArr.length === 0) {
    return NextResponse.json({ error: 'Carrinho vazio.' }, { status: 400 })
  }

  const shippingMethod = body.shippingMethod === 'correios' ? 'correios' : 'motoboy'
  const totals = await validateAndComputeOrderTotals({
    items: body.items,
    shippingMethod,
    cepDestino: typeof body.cepDestino === 'string' ? body.cepDestino : undefined,
  })
  if (!totals.ok) {
    return NextResponse.json({ error: totals.error }, { status: totals.status })
  }

  const customer: CheckoutCustomer = {
    fullName: String(body.customer?.fullName ?? '').trim(),
    email: String(body.customer?.email ?? '').trim(),
    phone: String(body.customer?.phone ?? '').trim(),
    address: String(body.customer?.address ?? '').trim(),
    cep: body.customer?.cep != null ? String(body.customer.cep) : undefined,
  }

  if (customer.fullName.length < 3 || !customer.email.includes('@')) {
    return NextResponse.json(
      { error: 'Preencha nome completo e um e-mail válido.' },
      { status: 400 }
    )
  }

  const label = buildLabel(body, itemArr.length)
  const parts = customer.fullName.split(/\s+/).filter(Boolean)
  const firstName = (parts[0] ?? 'Cliente').slice(0, 50)
  const lastName = (parts.slice(1).join(' ') || firstName).slice(0, 50)

  const meta = trimCustomer(customer)
  const metadata: Record<string, string> = {
    source: 'gloria-faz-joias',
    order_type: 'cart',
    shipping_method: shippingMethod,
    products_cents: String(totals.productsCents),
    shipping_cents: String(totals.shippingCents),
    ...meta,
  }

  const client = new MercadoPagoConfig({ accessToken: token })
  const paymentApi = new Payment(client)

  try {
    const amount = Math.round(totals.amountBrlCents) / 100

    const created = await paymentApi.create({
      body: {
        transaction_amount: amount,
        description: label.slice(0, 255),
        payment_method_id: 'pix',
        payer: {
          email: customer.email,
          first_name: firstName,
          last_name: lastName,
        },
        metadata,
        external_reference: `gloria-${Date.now()}`,
      },
    })

    const pix = created.point_of_interaction?.transaction_data

    return NextResponse.json({
      id: created.id,
      status: created.status,
      qr_code: pix?.qr_code ?? null,
      qr_code_base64: pix?.qr_code_base64 ?? null,
      ticket_url: pix?.ticket_url ?? null,
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Mercado Pago error'
    return NextResponse.json({ error: message }, { status: 400 })
  }
}
