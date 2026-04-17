'use client'

import Image from 'next/image'
import { useState } from 'react'

const CARTA_IMAGE_URL =
  'https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/pa%CC%81gina_contato.png'

/** Letter art zoom — desktop slightly lower so the bitmap matches the frame; mobile unchanged. */
const CARTA_IMAGE_SCALE =
  'scale-[1.78] sm:scale-[1.85] md:scale-[1.58] lg:scale-[1.54]'

export default function ContatoPage() {
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

  const fieldClass =
    'w-full max-w-full px-3 py-3 md:px-4 md:py-3 border border-black bg-transparent font-body text-black text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-black/30 transition-all duration-500 ease-in-out box-border'

  return (
    <div className="w-full min-w-0 max-w-full overflow-x-hidden px-4 pt-4 pb-8 box-border md:pt-6">
      <div className="relative mx-auto w-full max-w-2xl mt-2 md:mt-8">
        {/* Container always enforces aspect ratio — form can never overflow the image */}
        <div className="relative w-full overflow-hidden aspect-[4/5] max-h-[min(88vh,820px)]">

          {/* Background letter image */}
          <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
            <Image
              src={CARTA_IMAGE_URL}
              alt=""
              fill
              className={`object-contain object-center select-none ${CARTA_IMAGE_SCALE}`}
              sizes="(max-width: 768px) 100vw, 672px"
              priority
              unoptimized
            />
          </div>

          {/* Form — absolutely fills the container, padded to sit inside the paper artwork.
              Scale steps down progressively from desktop (lg) to mobile so the form always
              stays within the paper's visible area at every viewport size. */}
          <div className="absolute inset-0 z-10 flex flex-col origin-top scale-[0.68] p-[8%] pt-[10%] pb-[6%] sm:scale-[0.72] sm:p-[10%] sm:pt-[12%] sm:pb-[7%] md:scale-[0.78] md:p-[9%] md:pt-[9%] md:pb-[6%] lg:scale-[0.8] lg:p-[10%] lg:pt-[10%]">

            <h1 className="font-title shrink-0 text-center text-2xl font-bold text-black mb-2 sm:text-4xl sm:mb-3 md:text-5xl md:mb-4">
              contato
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 gap-[3%] sm:gap-[3.5%] md:gap-[3%]">
              <div className="shrink-0">
                <label htmlFor="name" className="mb-1 block font-body text-xs text-black sm:text-sm">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                />
              </div>

              <div className="shrink-0">
                <label htmlFor="email" className="mb-1 block font-body text-xs text-black sm:text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={fieldClass}
                />
              </div>

              {/* Textarea grows to fill remaining vertical space */}
              <div className="flex flex-1 min-h-0 flex-col">
                <label htmlFor="message" className="mb-1 block font-body text-xs text-black sm:text-sm">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={`${fieldClass} resize-none flex-1 min-h-0`}
                />
              </div>

              <div className="shrink-0">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="box-border w-full max-w-full border border-black px-4 py-2 font-body text-xs text-black transition-all duration-500 ease-in-out hover:border-refined-gold hover:bg-refined-gold hover:text-refined-ivory disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-black disabled:hover:bg-transparent disabled:hover:text-black sm:px-6 sm:py-2.5 sm:text-sm md:px-8 md:py-3 md:text-lg"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar'}
                </button>

                {submitStatus === 'success' && (
                  <p className="mt-2 text-center font-body text-xs text-green-600 sm:text-sm">
                    Mensagem enviada com sucesso!
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="mt-2 text-center font-body text-xs text-red-600 sm:text-sm">
                    Erro ao enviar mensagem. Por favor, tente novamente.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
