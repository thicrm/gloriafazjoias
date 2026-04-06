import type { Metadata } from 'next'
import Link from 'next/link'
import { FAQ_ITEMS } from './faq-data'

export const metadata: Metadata = {
  title: 'Perguntas frequentes | Glória Faz Jóias',
  description:
    'Respostas sobre prazos, encomendas, tamanhos de anel, frete, pérolas barrocas e cuidados com suas peças.',
}

export default function FaqPage() {
  return (
    <div className="relative z-10 min-h-screen px-4 pb-16 pt-6 md:pb-24 md:pt-8">
      <div className="mx-auto max-w-2xl">
        <header className="mb-10 text-center md:mb-14">
          <h1 className="font-title text-3xl font-bold text-refined-charcoal md:text-4xl">
            Perguntas frequentes
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-body text-base leading-relaxed text-refined-charcoal/90 md:text-lg">
            Aqui reunimos as respostas de dúvidas comuns em relação às nossas peças, serviços e
            experiências. Caso sua dúvida não esteja listada, entre em contato conosco.
          </p>
          <Link
            href="/contato"
            className="mt-6 inline-block border border-refined-gold px-10 py-3 font-body text-base text-refined-gold transition-all duration-500 ease-in-out hover:bg-refined-gold hover:text-refined-ivory hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] md:px-12 md:py-4 md:text-lg"
          >
            Ir para contato
          </Link>
        </header>

        <div className="border border-black bg-transparent px-3 py-8 md:px-8 md:py-10">
          <div className="space-y-6 md:space-y-8">
            {FAQ_ITEMS.map((item) => (
              <article
                key={item.id}
                className="space-y-3 md:space-y-4"
                aria-labelledby={`faq-q-${item.id}`}
              >
                <div className="flex justify-end">
                  <div
                    id={`faq-q-${item.id}`}
                    className="faq-chat-question max-w-[min(100%,26rem)] border border-black bg-refined-ivory px-4 py-3 md:min-w-[12rem] md:px-5 md:py-4"
                  >
                    <p className="text-right font-body text-sm leading-snug text-black md:text-base">
                      {item.question}
                    </p>
                  </div>
                </div>
                <div className="flex justify-start pl-0 md:pl-2">
                  <div className="faq-chat-answer max-w-[min(100%,32rem)] border border-black bg-transparent px-4 py-3 md:px-5 md:py-4">
                    <div className="mb-2 flex items-center gap-2 border-b border-black/20 pb-2">
                      <span
                        className="inline-flex h-7 w-7 shrink-0 items-center justify-center border border-black bg-refined-ivory font-title text-xs font-semibold text-black"
                        aria-hidden
                      >
                        G
                      </span>
                      <span className="font-title text-xs font-semibold uppercase tracking-widest text-black/70">
                        Glória Faz Jóias
                      </span>
                    </div>
                    <div className="space-y-3 font-body text-sm leading-relaxed text-black md:text-base [&_a]:break-words">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
