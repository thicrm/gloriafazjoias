'use client'

import { useState } from 'react'
import Image from 'next/image'

function SerraAnimation() {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px] cursor-pointer flex-shrink-0 transition-all duration-700 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)]"
      style={{ transform: 'rotate(-15deg)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/serra-fechada.png"
        alt="Serra"
        fill
        className={`object-contain ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
      />
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/serra-aberta.png"
        alt="Serra"
        fill
        className={`object-contain scale-125 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        unoptimized
      />
    </div>
  )
}

function Alicate02Animation() {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px] cursor-pointer flex-shrink-0 sm:-ml-3 md:-ml-5 transition-all duration-700 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)]"
      style={{ transform: 'rotate(-90deg)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/alicate02-fechado.png"
        alt="Alicate"
        fill
        className={`object-contain ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
      />
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/alicate02-aberto.png"
        alt="Alicate"
        fill
        className={`object-contain ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        unoptimized
      />
    </div>
  )
}

function MacaricoAnimation() {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px] cursor-pointer flex-shrink-0 transition-all duration-700 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)]"
      style={{ transform: 'rotate(-20deg) translateY(0px)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/ma%C3%A7arico-fechado.png"
        alt="Maçarico"
        fill
        className={`object-contain ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
      />
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/ma%C3%A7arico-aberto.png"
        alt="Maçarico"
        fill
        className={`object-contain ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        unoptimized
      />
    </div>
  )
}

function PincaAnimation() {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="relative w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px] cursor-pointer flex-shrink-0 transition-all duration-700 ease-in-out hover:scale-110 hover:drop-shadow-[0_0_50px_rgba(212,175,55,0.7)]"
      style={{ transform: 'rotate(-10deg)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/pin%C3%A7a-fechada.png"
        alt="Pinça"
        fill
        className={`object-contain ${isHovered ? 'opacity-0' : 'opacity-100'}`}
        unoptimized
      />
      <Image
        src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/ferramentas%20pb/pin%C3%A7a-aberta.png"
        alt="Pinça"
        fill
        className={`object-contain ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        unoptimized
      />
    </div>
  )
}

export default function EncomendasPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    afirmacao: '',
    tipoPeça: [] as string[],
    tipoPeçaOutro: '',
    ocasiao: [] as string[],
    ocasiaoOutro: '',
    materiais: [] as string[],
    materiaisOutro: '',
    mensagem: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    const formatList = (arr: string[], outro: string) =>
      arr.map((x) => (x === 'Outro' && outro ? `Outro: ${outro}` : x)).join(', ')

    const message = `
Encomenda - Formulário

1. Com qual afirmação você mais se identifica?
${formData.afirmacao}

2. Que tipo de peça você gostaria de criar?
${formatList(formData.tipoPeça, formData.tipoPeçaOutro)}

3. Está celebrando alguma ocasião especial?
${formatList(formData.ocasiao, formData.ocasiaoOutro)}

4. Quais materiais fazem seus olhos brilharem?
${formatList(formData.materiais, formData.materiaisOutro)}

5. Nos conte mais…
${formData.mensagem}
`.trim()

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message,
        }),
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          name: '',
          email: '',
          afirmacao: '',
          tipoPeça: [],
          tipoPeçaOutro: '',
          ocasiao: [],
          ocasiaoOutro: '',
          materiais: [],
          materiaisOutro: '',
          mensagem: '',
        })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCheckboxChange = (field: 'tipoPeça' | 'ocasiao' | 'materiais', value: string, checked: boolean) => {
    setFormData((prev) => {
      const arr = [...prev[field]]
      if (checked) {
        arr.push(value)
      } else {
        arr.splice(arr.indexOf(value), 1)
      }
      return { ...prev, [field]: arr }
    })
  }

  const inputClass = 'w-full px-4 py-3 border border-refined-gold bg-transparent font-body text-base md:text-lg text-black shadow-[0_0_20px_rgba(212,175,55,0.5)] focus:outline-none focus:ring-2 focus:ring-refined-gold/50 focus:shadow-[0_0_25px_rgba(212,175,55,0.7)] transition-all duration-500 ease-in-out'
  const labelClass = 'block font-body text-base md:text-lg text-black mb-2 hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300'
  const questionLabelClass = 'block font-body text-base md:text-lg text-black mb-2 font-bold'
  const checkboxClass = 'w-4 h-4 border border-refined-gold rounded accent-[#D4AF37]'

  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-4 pb-6">
      <div className="w-full max-w-4xl mx-auto">
        {/* Title with Serra and Alicate02 Animations - always in a row, centered */}
        <div className="flex flex-row flex-nowrap items-center justify-center mb-16 overflow-visible w-full">
          <div className="flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-8 scale-[0.75] sm:scale-90 md:scale-100 origin-center">
            <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px] flex items-center justify-center flex-shrink-0">
              <SerraAnimation />
            </div>
            <div className="flex flex-col items-center text-center flex-shrink-0 w-[220px] sm:w-auto">
              <h1 className="font-title text-4xl md:text-5xl text-black font-bold group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.9)] transition-all duration-300">
                encomendas
              </h1>
              <h2 className="font-title text-xl md:text-2xl text-refined-gold mt-2 md:whitespace-nowrap" style={{ textShadow: '0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.4)' }}>
                jóias que criam histórias
              </h2>
            </div>
            <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-[240px] md:h-[240px] lg:w-[300px] lg:h-[300px] flex items-center justify-center flex-shrink-0">
              <Alicate02Animation />
            </div>
          </div>
        </div>

        {/* Como funciona? */}
        <section className="mb-6 md:mb-10">
          <h3 className="font-title text-2xl md:text-3xl text-black mb-8 font-bold">como funciona?</h3>

          <div className="space-y-12 md:space-y-16">
            <div>
              <h4 className="font-title text-xl text-black mb-3 font-bold">1. co-criação</h4>
              <p className="font-body text-lg md:text-xl text-black leading-relaxed text-justify">
                Preencha o formulário abaixo. Em alguns dias, você será convidado para um encontro com a designer, onde vocês discutirão mais profundamente sobre suas ideias e sentimentos sobre o que a peça vai representar, sendo eles dos mais definidos aos mais abstratos. Falaremos sobre o que mais combina com seu estilo (ou de quem você vai presentear), do que faz seus olhos brilharem, inspirações e desejos — afinal, com a encomenda personalizada queremos criar a expressão certa para você.
              </p>
            </div>

            <div>
              <h4 className="font-title text-xl text-black mb-3 font-bold">2. desenhando um mapa</h4>
              <p className="font-body text-lg md:text-xl text-black leading-relaxed text-justify">
                Depois de definir o design, o orçamento será discutido. Consideram-se os materiais, horas de trabalho, complexidade do design, e suas expectativas para chegar em um número que represente o valor da sua visão. Uma entrada de 30% é requerida para passarmos para a próxima etapa.
              </p>
            </div>

            <div>
              <h4 className="font-title text-xl text-black mb-3 font-bold">3. mãos na massa</h4>
              <p className="font-body text-lg md:text-xl text-black leading-relaxed text-justify">
                O prazo de produção é acordado, dependendo da complexidade da peça e da agenda de produção. Cada etapa do nascimento da sua jóia será documentada e compartilhada com você, para que possa experienciar de perto a tradução da sua intenção no metal. A produção vai à todo vapor nesta fase mais intensa de derreter metais, cravar pedras, polir e dar toques finais. Para melhor adequar a peça aos seus desejos, possíveis revisões que surgirem no processo de criação serão atendidas, estando sujeitas a alterações de prazo e valor. Afinal, a encomenda personalizada é um processo colaborativo entre você e a Glória.
              </p>
            </div>

            <div>
              <h4 className="font-title text-xl text-black mb-3 font-bold">4. da bancada, ao presente</h4>
              <p className="font-body text-lg md:text-xl text-black leading-relaxed text-justify">
                Com a sua joia finalizada, o restante do pagamento será feito e a entrega combinada. Sua visão é imortalizada em uma joia que se entrelaça na sua história. Será uma honra te acompanhar neste marco tão significativo.
              </p>
            </div>
          </div>
        </section>

        {/* Comece sua encomenda with Pinça Animation */}
        <section className="mb-6 md:mb-10">
          <div className="flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-4 md:gap-8 py-4 sm:py-6 md:py-8 overflow-hidden">
            <PincaAnimation />
            <h2 className="font-title text-base sm:text-lg md:text-2xl lg:text-3xl text-refined-gold text-center flex-shrink min-w-0" style={{ textShadow: '0 0 20px rgba(212,175,55,0.6), 0 0 40px rgba(212,175,55,0.4)' }}>
              comece sua encomenda aqui
            </h2>
            <MacaricoAnimation />
          </div>

          <form onSubmit={handleSubmit} className="space-y-8 mt-6 sm:mt-8 md:mt-10">
            {/* Name and Email */}
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="name" className={labelClass}>Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Q1 - Afirmação (radio) */}
            <div>
              <label className={questionLabelClass}>1. Com qual afirmação você mais se identifica?</label>
              <div className="space-y-3">
                {[
                  'Tenho uma visão clara da minha joia',
                  'Tive algumas ideias, mas ainda não tenho tudo definido',
                  'Preciso de ajuda para imaginar minha joia ideal',
                ].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 font-body text-base md:text-lg text-black cursor-pointer hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300">
                    <input
                      type="radio"
                      name="afirmacao"
                      value={opt}
                      checked={formData.afirmacao === opt}
                      onChange={(e) => setFormData({ ...formData, afirmacao: e.target.value })}
                      required
                      className="w-4 h-4 border border-refined-gold accent-[#D4AF37]"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* Q2 - Tipo de peça (checkboxes) */}
            <div>
              <label className={questionLabelClass}>2. Que tipo de peça você gostaria de criar?</label>
              <div className="space-y-3">
                {['Anéis', 'Bracelete ou Pulseira', 'Brincos', 'Broche', 'Colar', 'Pingente'].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 font-body text-base md:text-lg text-black cursor-pointer hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={formData.tipoPeça.includes(opt)}
                      onChange={(e) => handleCheckboxChange('tipoPeça', opt, e.target.checked)}
                      className={checkboxClass}
                    />
                    {opt}
                  </label>
                ))}
                <label className="flex items-center gap-3 font-body text-base md:text-lg text-black cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.tipoPeça.includes('Outro')}
                    onChange={(e) => handleCheckboxChange('tipoPeça', 'Outro', e.target.checked)}
                    className={checkboxClass}
                  />
                  Outro:
                  <input
                    type="text"
                    value={formData.tipoPeçaOutro}
                    onChange={(e) => setFormData({ ...formData, tipoPeçaOutro: e.target.value })}
                    placeholder=""
                    className={`flex-1 ${inputClass} py-2`}
                    disabled={!formData.tipoPeça.includes('Outro')}
                  />
                </label>
                <label className="flex items-center gap-3 font-body text-base md:text-lg text-black cursor-pointer hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300">
                  <input
                    type="checkbox"
                    checked={formData.tipoPeça.includes('Ainda não sei')}
                    onChange={(e) => handleCheckboxChange('tipoPeça', 'Ainda não sei', e.target.checked)}
                    className={checkboxClass}
                  />
                  Ainda não sei
                </label>
              </div>
            </div>

            {/* Q3 - Ocasiao (checkboxes) */}
            <div>
              <label className={questionLabelClass}>3. Está celebrando alguma ocasião especial?</label>
              <div className="space-y-3">
                {['Aniversário', 'Noivado', 'Casamento', 'Dia das Mães'].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 font-body text-base md:text-lg text-black cursor-pointer hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={formData.ocasiao.includes(opt)}
                      onChange={(e) => handleCheckboxChange('ocasiao', opt, e.target.checked)}
                      className={checkboxClass}
                    />
                    {opt}
                  </label>
                ))}
                <label className="flex items-center gap-3 font-body text-base md:text-lg text-black cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.ocasiao.includes('Outro')}
                    onChange={(e) => handleCheckboxChange('ocasiao', 'Outro', e.target.checked)}
                    className={checkboxClass}
                  />
                  Outro:
                  <input
                    type="text"
                    value={formData.ocasiaoOutro}
                    onChange={(e) => setFormData({ ...formData, ocasiaoOutro: e.target.value })}
                    className={`flex-1 ${inputClass} py-2`}
                    disabled={!formData.ocasiao.includes('Outro')}
                  />
                </label>
              </div>
            </div>

            {/* Q4 - Materiais (checkboxes) */}
            <div>
              <label className={questionLabelClass}>4. Quais materiais fazem seus olhos brilharem?</label>
              <div className="space-y-3">
                {['Ouro', 'Prata', 'Pedras preciosas', 'Pérolas'].map((opt) => (
                  <label key={opt} className="flex items-center gap-3 font-body text-base md:text-lg text-black cursor-pointer hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300">
                    <input
                      type="checkbox"
                      checked={formData.materiais.includes(opt)}
                      onChange={(e) => handleCheckboxChange('materiais', opt, e.target.checked)}
                      className={checkboxClass}
                    />
                    {opt}
                  </label>
                ))}
                <label className="flex items-center gap-3 font-body text-base md:text-lg text-black cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.materiais.includes('Outro')}
                    onChange={(e) => handleCheckboxChange('materiais', 'Outro', e.target.checked)}
                    className={checkboxClass}
                  />
                  Outro:
                  <input
                    type="text"
                    value={formData.materiaisOutro}
                    onChange={(e) => setFormData({ ...formData, materiaisOutro: e.target.value })}
                    className={`flex-1 ${inputClass} py-2`}
                    disabled={!formData.materiais.includes('Outro')}
                  />
                </label>
                <label className="flex items-center gap-3 font-body text-base md:text-lg text-black cursor-pointer hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.6)] transition-all duration-300">
                  <input
                    type="checkbox"
                    checked={formData.materiais.includes('Ainda não sei')}
                    onChange={(e) => handleCheckboxChange('materiais', 'Ainda não sei', e.target.checked)}
                    className={checkboxClass}
                  />
                  Ainda não sei
                </label>
              </div>
            </div>

            {/* Q5 - Mensagem */}
            <div>
              <label htmlFor="mensagem" className={questionLabelClass}>
                5. Nos conte mais…
              </label>
              <p className="font-body text-base md:text-lg text-black/80 mb-2 italic">
                referências, ideias, desejos…
              </p>
              <p className="font-body text-sm md:text-base text-black/70 mb-3">
                (p.s.: não se preocupe se não tiver muitas ideias definidas; o trabalho da designer é ajudar você a trazer sua intenção à vida, por mais abstrata que seja.)
              </p>
              <textarea
                id="mensagem"
                name="mensagem"
                value={formData.mensagem}
                onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                rows={6}
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-3 border border-refined-gold text-refined-gold shadow-[0_0_20px_rgba(212,175,55,0.5)] hover:bg-refined-gold hover:text-refined-ivory hover:shadow-[0_0_35px_rgba(212,175,55,0.9)] transition-all duration-500 ease-in-out font-body text-base md:text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-refined-gold"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar'}
            </button>

            {submitStatus === 'success' && (
              <p className="font-body text-base md:text-lg text-green-600 text-center">
                Mensagem enviada com sucesso!
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="font-body text-base md:text-lg text-red-600 text-center">
                Erro ao enviar mensagem. Por favor, tente novamente.
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  )
}
