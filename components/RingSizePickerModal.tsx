'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { formatRingSizeLabel, getRingSizeOptions } from '@/lib/ring-sizes'

const ringSizeOptions = getRingSizeOptions()

type RingSizePickerModalProps = {
  open: boolean
  loading?: boolean
  selectedRingSize: string
  onSelectChange: (value: string) => void
  onClose: () => void
  onConfirm: () => void
}

export default function RingSizePickerModal({
  open,
  loading = false,
  selectedRingSize,
  onSelectChange,
  onClose,
  onConfirm,
}: RingSizePickerModalProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!open || !mounted) return null

  /* Portal: avoids stacking under <footer z-20> when modal lived inside <main z-10> */
  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/50 p-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ring-size-modal-title"
      onClick={() => !loading && onClose()}
    >
      <div
        className="relative my-auto w-full max-w-md border border-black bg-refined-ivory p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => !loading && onClose()}
          className="absolute right-3 top-3 text-2xl leading-none text-black/50 hover:text-black"
          aria-label="Fechar"
        >
          ×
        </button>
        <h2 id="ring-size-modal-title" className="font-title pr-10 text-2xl text-black">
          Tamanho do anel
        </h2>
        <p className="mt-2 font-body text-sm leading-relaxed text-black/80">
          Escolha o aro (medida brasileira) antes de adicionar ao carrinho. Tamanhos de{' '}
          <strong>7</strong> a <strong>26</strong>, com meios tamanhos (7,5 — 8 — 8,5 …).
        </p>
        <label htmlFor="ring-size-modal-select" className="mt-6 block font-body text-sm text-black">
          Aro (BR)
        </label>
        <select
          id="ring-size-modal-select"
          value={selectedRingSize}
          onChange={(e) => onSelectChange(e.target.value)}
          disabled={loading}
          className="mt-2 box-border w-full border border-black bg-transparent px-4 py-3 font-body text-base text-black focus:outline-none focus:ring-2 focus:ring-black/30"
        >
          {ringSizeOptions.map((n) => {
            const v = String(n)
            return (
              <option key={v} value={v}>
                {formatRingSizeLabel(n)}
              </option>
            )
          })}
        </select>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="border border-black bg-transparent px-6 py-3 font-body text-sm text-black transition-colors hover:bg-black/5 disabled:opacity-50"
          >
            cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="border border-refined-gold bg-refined-gold px-6 py-3 font-body text-sm text-refined-ivory transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] disabled:opacity-50"
          >
            adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
