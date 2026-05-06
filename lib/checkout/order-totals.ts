import 'server-only'

import { getStoreProductBySlug } from '@/lib/products-data'
import { isValidRingSizeString } from '@/lib/ring-sizes'
import { MOTOBOY_SHIPPING_BRL_CENTS, type ShippingMethodId } from '@/lib/shipping/constants'
import { normalizeCep } from '@/lib/correios-freight'
import { quoteMelhorEnvio } from '@/lib/melhorenvio-freight'
import { calculateTotalBrlCents } from '@/lib/stripe/pricing'

export type CheckoutCustomer = {
  fullName: string
  email: string
  phone: string
  cpf: string
  address: string
  cep?: string
}

/** Validates rings, prices products, adds server-side shipping (never trust client freight amounts). */
export async function validateAndComputeOrderTotals(params: {
  items: unknown
  shippingMethod: ShippingMethodId
  /** Required when shippingMethod === 'correios' */
  cepDestino?: string
}): Promise<
   | {
      ok: true
      amountBrlCents: number
      productsCents: number
      shippingCents: number
      currency: 'brl'
      storeSlugSample: string
    }
  | { ok: false; error: string; status: number }
> {
  if (!Array.isArray(params.items)) {
    return { ok: false, error: 'items must be an array', status: 400 }
  }

  const priced = calculateTotalBrlCents(params.items)
  if (!priced.ok) {
    return { ok: false, error: priced.error, status: 400 }
  }

  const lines = params.items
  for (const raw of lines) {
    if (!raw || typeof raw !== 'object') {
      return { ok: false, error: 'each item must be an object', status: 400 }
    }
    const sku = (raw as { sku?: unknown }).sku
    if (typeof sku !== 'string' || !sku.trim()) {
      return { ok: false, error: 'each item needs sku', status: 400 }
    }
    const product = getStoreProductBySlug(sku)
    const needsRing = product?.category === 'Anéis'
    const ringRaw =
      typeof (raw as { ringSize?: unknown }).ringSize === 'string'
        ? (raw as { ringSize: string }).ringSize.trim().replace(',', '.')
        : ''
    if (needsRing) {
      if (!ringRaw || !isValidRingSizeString(ringRaw)) {
        return {
          ok: false,
          error: 'Cada anel precisa de um tamanho de aro válido (7 a 26, meios permitidos).',
          status: 400,
        }
      }
    } else if (ringRaw) {
      return { ok: false, error: 'Tamanho de anel não se aplica a um item do carrinho.', status: 400 }
    }
  }

  let shippingCents: number
  if (params.shippingMethod === 'motoboy') {
    shippingCents = MOTOBOY_SHIPPING_BRL_CENTS
  } else {
    const cep = params.cepDestino ? normalizeCep(params.cepDestino) : null
    if (!cep) {
      return { ok: false, error: 'Informe um CEP válido para envio pelos Correios.', status: 400 }
    }
    const orig = process.env.MELHOR_ENVIO_ORIGIN_CEP?.trim() ?? ''
    const origNorm = normalizeCep(orig)
    if (!origNorm) {
      return {
        ok: false,
        error: 'Frete não está configurado. Use motoboy ou contate a loja.',
        status: 503,
      }
    }
    const peso = parseFloat(process.env.CORREIOS_PACKAGE_WEIGHT_KG || '0.3') || 0.3
    const quote = await quoteMelhorEnvio({
      cepOrigem: origNorm,
      cepDestino: cep,
      pesoKg: peso,
    })
    if (!quote.ok) {
      return { ok: false, error: quote.error, status: 400 }
    }
    shippingCents = quote.priceBrlCents
  }

  const productsCents = priced.amountBrlCents
  const amountBrlCents = productsCents + shippingCents
  const first = lines[0] as { sku?: string }
  const storeSlugSample = typeof first?.sku === 'string' ? first.sku : ''

  return {
    ok: true,
    amountBrlCents,
    productsCents,
    shippingCents,
    currency: priced.currency,
    storeSlugSample,
  }
}

export function trimCustomer(c: CheckoutCustomer | undefined): Record<string, string> {
  if (!c) return {}
  return {
    customer_name: (c.fullName ?? '').slice(0, 120).trim(),
    customer_email: (c.email ?? '').slice(0, 120).trim(),
    customer_phone: (c.phone ?? '').slice(0, 40).trim(),
    customer_cpf: (c.cpf ?? '').replace(/\D/g, '').slice(0, 11),
    customer_address: (c.address ?? '').slice(0, 450).trim(),
    customer_cep: (c.cep ?? '').replace(/\D/g, '').slice(0, 8),
  }
}
