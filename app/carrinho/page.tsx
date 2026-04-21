'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import {
  cartProductsSubtotalCents,
  cartHasInvalidPrices,
  formatBrlFromCents,
  lineUnitCents,
} from '@/lib/cart-pricing-client'
import { formatRingSizeLabel } from '@/lib/ring-sizes'

export default function CarrinhoPage() {
  const { items, hydrated, removeLine, setQuantity, clearCart } = useCart()

  if (!hydrated) {
    return (
      <div className="min-h-screen px-4 py-16 text-center font-body text-refined-charcoal">
        Carregando carrinho…
      </div>
    )
  }

  const subtotal = cartProductsSubtotalCents(items)
  const invalid = cartHasInvalidPrices(items)

  return (
    <div className="min-h-screen px-4 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <header className="text-center">
          <h1 className="font-title text-3xl text-refined-gold md:text-4xl drop-shadow-[0_0_20px_rgba(212,175,55,0.25)]">
            carrinho
          </h1>
          <p className="mx-auto mt-3 max-w-xl font-body text-refined-charcoal/80">
            Revise os itens antes de finalizar. O frete e o pagamento são escolhidos na próxima etapa.
          </p>
        </header>

        {invalid && (
          <div
            className="mt-6 border border-red-700/40 bg-red-50 px-4 py-3 font-body text-sm text-red-800"
            role="alert"
          >
            Algum item não está disponível para compra online (preço não cadastrado). Remova-o ou
            volte à vitrine.
          </div>
        )}

        {items.length === 0 ? (
          <div className="mt-10 border border-refined-gold/40 bg-refined-ivory/80 px-6 py-10 text-center">
            <p className="font-body text-refined-charcoal">Seu carrinho está vazio.</p>
            <Link
              href="/products"
              className="mt-6 inline-block border border-refined-gold bg-refined-gold px-8 py-3 font-body text-refined-ivory transition-all hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]"
            >
              ver joias
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-8 space-y-6">
              {items.map((line) => {
                const unit = lineUnitCents(line.sku)
                const lineTotal = unit != null ? unit * line.quantity : 0
                return (
                  <li
                    key={line.id}
                    className="flex flex-col gap-4 border border-refined-gold/35 bg-refined-ivory/60 p-4 md:flex-row md:items-center md:justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-title text-lg text-refined-charcoal">{line.productName}</p>
                      {line.acabamento ? (
                        <p className="mt-1 font-body text-sm text-refined-charcoal/75">
                          acabamento {line.acabamento}
                        </p>
                      ) : null}
                      {line.formato ? (
                        <p className="mt-1 font-body text-sm text-refined-charcoal/75">
                          formato {line.formato}
                        </p>
                      ) : null}
                      {line.ringSizeBr ? (
                        <p className="mt-1 font-body text-sm text-refined-charcoal/75">
                          Aro {formatRingSizeLabel(parseFloat(line.ringSizeBr.replace(',', '.')))}{' '}
                          (BR)
                        </p>
                      ) : null}
                      <p className="mt-2 font-body text-sm text-refined-charcoal/80">
                        {unit != null ? (
                          <>
                            {formatBrlFromCents(unit)} cada · linha:{' '}
                            <span className="font-medium text-refined-charcoal">
                              {formatBrlFromCents(lineTotal)}
                            </span>
                          </>
                        ) : (
                          <span className="text-red-700">indisponível online</span>
                        )}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <label className="flex items-center gap-2 font-body text-sm text-refined-charcoal">
                        Qtd
                        <input
                          type="number"
                          min={1}
                          max={99}
                          value={line.quantity}
                          onChange={(e) => {
                            const n = parseInt(e.target.value, 10)
                            if (!Number.isFinite(n)) return
                            setQuantity(line.id, n)
                          }}
                          className="w-16 border border-refined-charcoal/30 bg-white px-2 py-1 text-center"
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        className="font-body text-sm text-red-800 underline-offset-2 hover:underline"
                      >
                        remover
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-10 flex flex-col gap-4 border-t border-refined-gold/30 pt-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-body text-refined-charcoal/80">Subtotal (sem frete)</p>
                <p className="font-title text-2xl text-refined-charcoal">{formatBrlFromCents(subtotal)}</p>
                <button
                  type="button"
                  onClick={() => clearCart()}
                  className="mt-3 font-body text-sm text-refined-charcoal/60 underline-offset-2 hover:text-refined-charcoal hover:underline"
                >
                  esvaziar carrinho
                </button>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/products"
                  className="border border-refined-charcoal/35 px-6 py-3 text-center font-body text-refined-charcoal transition-colors hover:bg-refined-charcoal/5"
                >
                  continuar comprando
                </Link>
                {invalid ? (
                  <span className="border border-refined-charcoal/20 bg-refined-charcoal/10 px-8 py-3 text-center font-body text-base text-refined-charcoal/40 md:text-lg">
                    finalizar compra
                  </span>
                ) : (
                  <Link
                    href="/checkout"
                    className="border border-refined-gold bg-refined-gold px-8 py-3 text-center font-body text-base text-refined-ivory transition-all hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] md:text-lg"
                  >
                    finalizar compra
                  </Link>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
