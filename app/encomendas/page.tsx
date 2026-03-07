'use client'

import Image from 'next/image'
import { useState } from 'react'

const CARTA_IMAGE_URL = 'https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/carta-p%C3%A1gina-encomendas.png'

export default function EncomendasPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 pb-0">
      {/* Background image - centered, scaled so form fits within it */}
      <div className="relative w-full max-w-2xl flex items-center justify-center mt-[10.5rem]">
        <div className="relative w-full min-h-[500px] max-h-[85vh]">
          <svg className="absolute w-0 h-0" aria-hidden="true">
            <defs>
              <filter id="carta-filter-encomendas" x="0" y="0">
                <feComponentTransfer in="SourceGraphic" result="darkened">
                  <feFuncR type="linear" slope="0.82" intercept="0"/>
                  <feFuncG type="linear" slope="0.82" intercept="0"/>
                  <feFuncB type="linear" slope="0.82" intercept="0"/>
                </feComponentTransfer>
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" result="noise"/>
                <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.06 0" result="noiseAlpha"/>
                <feBlend in="darkened" in2="noiseAlpha" mode="multiply"/>
              </filter>
            </defs>
          </svg>
          <Image
            src={CARTA_IMAGE_URL}
            alt=""
            fill
            className="object-contain scale-[1.85]"
            style={{ filter: 'url(#carta-filter-encomendas)' }}
            sizes="(max-width: 768px) 100vw, 672px"
            priority
          />
          {/* Form overlay - positioned within the letter area */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-[12%] sm:p-[14%] md:p-[16%]">
            <h1 className="font-title text-4xl md:text-5xl mb-12 text-refined-gold text-center" style={{ textShadow: '0 0 15px rgba(212,175,55,0.9), 0 0 30px rgba(212,175,55,0.6), 0 0 45px rgba(212,175,55,0.4)' }}>
              Encomendas
            </h1>
            <form onSubmit={handleSubmit} className="w-full max-w-2xl space-y-6">
            <div>
              <label htmlFor="name" className="block font-body text-sm text-refined-gold mb-2 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-refined-gold bg-transparent font-body text-refined-gold shadow-[0_0_20px_rgba(212,175,55,0.5)] focus:outline-none focus:shadow-[0_0_25px_rgba(212,175,55,0.7)] transition-all duration-500 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-body text-sm text-refined-gold mb-2 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-refined-gold bg-transparent font-body text-refined-gold shadow-[0_0_20px_rgba(212,175,55,0.5)] focus:outline-none focus:shadow-[0_0_25px_rgba(212,175,55,0.7)] transition-all duration-500 ease-in-out"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-body text-sm text-refined-gold mb-2 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-4 py-3 border border-refined-gold bg-transparent font-body text-refined-gold shadow-[0_0_20px_rgba(212,175,55,0.5)] focus:outline-none focus:shadow-[0_0_25px_rgba(212,175,55,0.7)] transition-all duration-500 ease-in-out resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 border border-refined-gold text-refined-gold shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:bg-refined-gold hover:text-refined-ivory hover:shadow-[0_0_35px_rgba(212,175,55,0.9)] transition-all duration-500 ease-in-out font-body text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-refined-gold disabled:shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>

            {submitStatus === 'success' && (
              <p className="font-body text-sm text-green-600 text-center">
                Mensagem enviada com sucesso!
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="font-body text-sm text-red-600 text-center">
                Erro ao enviar mensagem. Por favor, tente novamente.
              </p>
            )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
