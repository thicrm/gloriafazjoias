export default function EncomendasPage() {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-title text-4xl md:text-5xl mb-12 text-refined-charcoal text-center">
            Encomendas
          </h1>
          
          <div className="space-y-8 mb-16">
            <div>
              <h2 className="font-title text-2xl md:text-3xl mb-4 text-refined-charcoal">
                Como Funciona
              </h2>
              <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed">
                Aceitamos encomendas de peças personalizadas. Cada joia é criada especialmente para você,
                seguindo suas preferências e inspirações.
              </p>
            </div>

            <div>
              <h2 className="font-title text-2xl md:text-3xl mb-4 text-refined-charcoal">
                Processo de Encomenda
              </h2>
              <div className="space-y-4">
                <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed">
                  1. Entre em contato conosco para discutir sua ideia
                </p>
                <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed">
                  2. Apresentamos um design personalizado para sua aprovação
                </p>
                <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed">
                  3. Após aprovação, iniciamos a criação da peça
                </p>
                <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed">
                  4. Entrega em prazo combinado
                </p>
              </div>
            </div>

            <div className="bg-refined-cream/30 p-12">
              <h2 className="font-title text-2xl md:text-3xl mb-4 text-refined-charcoal text-center">
                Informações Importantes
              </h2>
              <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed text-center">
                Prazo de produção varia conforme a complexidade da peça. 
                Entre em contato para mais detalhes sobre valores e prazos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


