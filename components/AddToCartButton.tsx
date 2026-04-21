'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import RingSizePickerModal from '@/components/RingSizePickerModal'
import AcabamentoPickerModal from '@/components/AcabamentoPickerModal'
import FormatoPickerModal from '@/components/FormatoPickerModal'
import { useCart } from '@/contexts/CartContext'
import type { Acabamento, Formato } from '@/lib/cart-types'

type AddToCartButtonProps = {
  productSlug: string
  productName: string
  requiresRingSize?: boolean
  requiresAcabamento?: boolean
  requiresFormato?: boolean
}

export default function AddToCartButton({
  productSlug,
  productName,
  requiresRingSize = false,
  requiresAcabamento = false,
  requiresFormato = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart()
  const [acabamentoModalOpen, setAcabamentoModalOpen] = useState(false)
  const [selectedAcabamento, setSelectedAcabamento] = useState<Acabamento>('fosco')
  const [formatoModalOpen, setFormatoModalOpen] = useState(false)
  const [selectedFormato, setSelectedFormato] = useState<Formato>('redondo')
  const [ringModalOpen, setRingModalOpen] = useState(false)
  const [selectedRingSize, setSelectedRingSize] = useState('18')
  const [addedPulse, setAddedPulse] = useState(false)

  const pulse = useCallback(() => {
    setAddedPulse(true)
    window.setTimeout(() => setAddedPulse(false), 1200)
  }, [])

  const pushLine = useCallback(
    (ringSizeBr: string | null, acabamento: Acabamento | null, formato: Formato | null) => {
      addItem({
        sku: productSlug,
        productName,
        quantity: 1,
        ringSizeBr,
        acabamento,
        formato,
      })
      pulse()
    },
    [addItem, productSlug, productName, pulse]
  )

  const handleClick = () => {
    if (requiresFormato) {
      setFormatoModalOpen(true)
      return
    }
    if (requiresAcabamento) {
      setAcabamentoModalOpen(true)
      return
    }
    if (requiresRingSize) {
      setRingModalOpen(true)
      return
    }
    pushLine(null, null, null)
  }

  const handleFormatoConfirm = () => {
    setFormatoModalOpen(false)
    pushLine(null, null, selectedFormato)
  }

  const handleAcabamentoConfirm = () => {
    setAcabamentoModalOpen(false)
    if (requiresRingSize) {
      setRingModalOpen(true)
      return
    }
    pushLine(null, selectedAcabamento, null)
  }

  const handleRingConfirm = () => {
    const v = selectedRingSize.trim()
    if (!v) return
    setRingModalOpen(false)
    pushLine(v, requiresAcabamento ? selectedAcabamento : null, null)
  }

  return (
    <>
      <div className="pt-4 w-full space-y-3">
        <button
          type="button"
          onClick={handleClick}
          className={`block w-full text-center px-12 py-4 bg-refined-gold text-refined-ivory border border-refined-gold hover:shadow-[0_0_25px_rgba(212,175,55,0.8),0_0_50px_rgba(212,175,55,0.5)] transition-all duration-500 ease-in-out font-body text-base md:text-lg ${
            addedPulse ? 'ring-2 ring-refined-charcoal/40 scale-[1.02]' : ''
          }`}
        >
          adicionar ao carrinho
        </button>
        <Link
          href="/carrinho"
          className="block w-full text-center px-8 py-3 font-body text-sm text-refined-charcoal border border-refined-charcoal/35 hover:bg-refined-charcoal/5 transition-colors"
        >
          ver carrinho
        </Link>
      </div>

      <FormatoPickerModal
        open={formatoModalOpen}
        selected={selectedFormato}
        onSelectChange={setSelectedFormato}
        onClose={() => setFormatoModalOpen(false)}
        onConfirm={handleFormatoConfirm}
      />

      <AcabamentoPickerModal
        open={acabamentoModalOpen}
        selected={selectedAcabamento}
        onSelectChange={setSelectedAcabamento}
        onClose={() => setAcabamentoModalOpen(false)}
        onConfirm={handleAcabamentoConfirm}
      />

      <RingSizePickerModal
        open={ringModalOpen}
        selectedRingSize={selectedRingSize}
        onSelectChange={setSelectedRingSize}
        onClose={() => setRingModalOpen(false)}
        onConfirm={handleRingConfirm}
      />
    </>
  )
}
