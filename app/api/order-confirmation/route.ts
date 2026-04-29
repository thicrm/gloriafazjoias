import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Pedido do carrinho: e-mails são enviados pelo servidor após pagamento aprovado
 * (webhooks Stripe / Mercado Pago). Este endpoint não aceita mais POST público.
 */
export async function POST() {
  return NextResponse.json(
    {
      error:
        'Confirmação por e-mail é enviada automaticamente após o pagamento aprovado. Se você já pagou, verifique a caixa de entrada e o spam.',
    },
    { status: 410 }
  )
}
