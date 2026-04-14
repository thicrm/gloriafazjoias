'use client'

import Image from 'next/image'
import { useState } from 'react'

const CARTA_IMAGE_URL =
  'https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/pa%CC%81gina_contato.png'

/** Letter art zoom — desktop slightly lower so the bitmap matches the frame; mobile unchanged. */
const CARTA_IMAGE_SCALE =
  'scale-[1.48] sm:scale-[1.54] md:scale-[1.32] lg:scale-[1.28]'

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
    <div
      className={
        'w-full min-w-0 max-w-full overflow-x-hidden ' +
        'max-md:pt-6 pt-1.5 md:pt-6 ' +
        'max-md:pb-0 md:pb-8 ' +
        'px-4 box-border'
      }
    >
      <div className="relative mx-auto w-full max-w-2xl min-w-0 max-md:mt-0 mt-2 md:mt-8">
        {/*
          Letter frame: no overflow-y-auto (avoids inner scrollbar). overflow-hidden clips scaled image
          inside the box — does not extend under the fixed header (no negative insets).
        */}
        <div className="relative w-full max-md:overflow-visible md:overflow-hidden max-md:max-h-none max-md:mb-0 md:mb-0 md:aspect-[4/5] md:max-h-[min(88vh,820px)]">
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
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

          <div className="group relative z-10 overflow-x-hidden overflow-y-visible p-[8%] pb-[7%] pt-[12%] sm:p-[10%] sm:pb-[8%] sm:pt-[12%] md:absolute md:inset-0 md:p-[11%] md:pb-[8%] md:pt-[10%] lg:p-[12%] lg:pb-[9%] lg:pt-[11%]">
            <div className="mx-auto flex w-full max-w-lg origin-top flex-col max-md:gap-[434px] md:gap-0 max-md:scale-100 md:max-w-2xl md:scale-100">
              <h1 className="font-title mb-0 shrink-0 max-md:hidden md:block text-center text-4xl font-bold text-black transition-all duration-300 max-sm:-translate-y-1 sm:-translate-y-[40px] md:mb-5 md:-translate-y-[36px] md:text-5xl lg:-translate-y-[32px]">
                Contato
              </h1>

              <div className="contato-form-mobile-wrap w-full shrink-0">
                <form
                  onSubmit={handleSubmit}
                  className="block w-full"
                >
                <div className="mb-4 md:mb-6">
                  <label
                    htmlFor="name"
                    className="mb-2 block font-body text-sm text-black transition-all duration-300"
                  >
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

                <div className="mb-4 md:mb-6">
                  <label
                    htmlFor="email"
                    className="mb-2 block font-body text-sm text-black transition-all duration-300"
                  >
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

                <div className="mb-4 md:mb-6">
                  <label
                    htmlFor="message"
                    className="mb-2 block font-body text-sm text-black transition-all duration-300"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className={`${fieldClass} resize-none max-md:min-h-[11rem] md:min-h-0`}
                  />
                </div>

                <div className="mb-0">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="box-border w-full max-w-full border border-black px-6 py-3 font-body text-sm text-black transition-all duration-500 ease-in-out hover:border-refined-gold hover:bg-refined-gold hover:text-refined-ivory disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-black disabled:hover:bg-transparent disabled:hover:text-black md:px-8 md:py-3 md:text-lg"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>

                {submitStatus === 'success' && (
                  <p className="mt-3 text-center font-body text-sm text-green-600">Mensagem enviada com sucesso!</p>
                )}

                {submitStatus === 'error' && (
                  <p className="mt-3 text-center font-body text-sm text-red-600">
                    Erro ao enviar mensagem. Por favor, tente novamente.
                  </p>
                )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
