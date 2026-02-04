'use client'

import { useState } from 'react'

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
      // Replace with your form submission endpoint
      // Example: Formspree, EmailJS, or your own API
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
    <div className="min-h-screen">
      {/* Main Content */}
      <section className="py-24 px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-title text-4xl md:text-5xl mb-12 text-refined-charcoal text-center">
            Contato
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block font-body text-sm text-refined-charcoal/80 mb-2">
                Nome
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-refined-charcoal/20 bg-white font-body text-refined-charcoal focus:outline-none focus:border-refined-charcoal transition-colors"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-body text-sm text-refined-charcoal/80 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-refined-charcoal/20 bg-white font-body text-refined-charcoal focus:outline-none focus:border-refined-charcoal transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block font-body text-sm text-refined-charcoal/80 mb-2">
                Mensagem
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={8}
                className="w-full px-4 py-3 border border-refined-charcoal/20 bg-white font-body text-refined-charcoal focus:outline-none focus:border-refined-charcoal transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 border border-refined-charcoal text-refined-charcoal hover:bg-refined-charcoal hover:text-white transition-all duration-500 ease-in-out font-body disabled:opacity-50 disabled:cursor-not-allowed"
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
      </section>
    </div>
  )
}

