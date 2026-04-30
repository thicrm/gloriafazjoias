import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Confirmação de pedido do carrinho: e-mails são enviados quando o cliente termina o pagamento
 * no checkout (POST /api/payments/checkout-email), após validação no Stripe ou Mercado Pago.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        'A confirmação por e-mail é enviada automaticamente ao finalizar o pagamento no checkout. Se já pagou, verifique a caixa de entrada e o spam.',
    },
    { status: 410 }
  )
}
