'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Acabamento } from '@/lib/cart-types'

type AcabamentoPickerModalProps = {
  open: boolean
  selected: Acabamento
  onSelectChange: (value: Acabamento) => void
  onClose: () => void
  onConfirm: () => void
}

export default function AcabamentoPickerModal({
  open,
  selected,
  onSelectChange,
  onClose,
  onConfirm,
}: AcabamentoPickerModalProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!open || !mounted) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-black/50 p-4 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="acabamento-modal-title"
      onClick={onClose}
    >
      <div
        className="relative my-auto w-full max-w-md border border-black bg-refined-ivory p-6 shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 text-2xl leading-none text-black/50 hover:text-black"
          aria-label="Fechar"
        >
          ×
        </button>

        <h2 id="acabamento-modal-title" className="font-title pr-10 text-2xl text-black">
          acabamento
        </h2>
        <p className="mt-2 font-body text-sm leading-relaxed text-black/80">
          Escolha o tipo de acabamento da superfície do anel antes de adicionar ao carrinho.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          {(['fosco', 'brilhante'] as Acabamento[]).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onSelectChange(opt)}
              className={`w-full border px-6 py-4 font-body text-base text-left transition-all duration-200 ${
                selected === opt
                  ? 'border-refined-gold bg-refined-gold/10 text-black font-medium'
                  : 'border-black/30 bg-transparent text-black hover:border-black hover:bg-black/5'
              }`}
            >
              <span className="block text-base">acabamento {opt}</span>
              <span className="block text-xs text-black/60 mt-0.5">
                {opt === 'fosco'
                  ? 'superfície aveludada, sem reflexo'
                  : 'superfície polida, com brilho espelhado'}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="border border-black bg-transparent px-6 py-3 font-body text-sm text-black transition-colors hover:bg-black/5"
          >
            cancelar
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="border border-refined-gold bg-refined-gold px-6 py-3 font-body text-sm text-refined-ivory transition-all hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]"
          >
            continuar
          </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
