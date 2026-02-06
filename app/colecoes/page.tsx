export default function ColecoesPage() {
  return (
    <div className="min-h-screen">
      {/* Main Content */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-title text-4xl md:text-5xl mb-12 text-refined-charcoal text-center">
            Coleções
          </h1>
          
          <div className="space-y-8 mb-16">
            <div>
              <h2 className="font-title text-2xl md:text-3xl mb-4 text-refined-charcoal">
                Nossas Coleções
              </h2>
              <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed">
                Descubra nossas coleções exclusivas de joias, cada uma inspirada em diferentes temas
                e histórias da literatura e das artes.
              </p>
            </div>

            <div className="bg-refined-cream/30 p-12">
              <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed text-center">
                Em breve, você poderá explorar nossas coleções temáticas de joias.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

