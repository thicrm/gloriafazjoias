import Image from 'next/image'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Picture Grid Section */}
      <section className="w-full -mt-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-2 w-full">
          <div className="relative w-full aspect-[1/0.8] overflow-hidden group cursor-pointer">
            <Image
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/%20galeira%20%5Bgfj%5D/brutalita-autoral-83.JPEG"
              alt="Brutalita Autoral 83"
              fill
              className="object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
              sizes="50vw"
            />
          </div>
          <div className="relative w-full aspect-[1/0.8] overflow-hidden group cursor-pointer">
            <Image
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/%20galeira%20%5Bgfj%5D/brutalita-autoral-39.JPEG"
              alt="Brutalita Autoral 39"
              fill
              className="object-cover transition-all duration-500 ease-out group-hover:scale-110 group-hover:brightness-110"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div>
              <div className="aspect-square bg-refined-cream mb-8">
                {/* Placeholder for profile image */}
                <div className="w-full h-full flex items-center justify-center text-refined-charcoal/30">
                  <span className="font-body text-lg">Imagem de Perfil</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-title text-3xl md:text-4xl mb-6 text-refined-charcoal">
                Gloria
              </h2>
              <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed mb-4">
                Sou uma artesã apaixonada por transformar histórias em joias. Minha jornada começou
                com a paixão pela literatura e pelas artes plásticas, e descobri que poderia
                expressar essa paixão através da ourivesaria.
              </p>
              <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed">
                Cada peça que crio é inspirada em narrativas, poemas e obras de arte que tocaram
                minha alma. Acredito que as joias devem contar histórias e evocar emoções, assim
                como a literatura e a arte fazem.
              </p>
            </div>
          </div>

          {/* Philosophy Section */}
          <div className="mb-16">
            <h2 className="font-title text-3xl md:text-4xl mb-8 text-refined-charcoal text-center">
              Minha Filosofia
            </h2>
            <div className="space-y-6">
              <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed">
                Acredito que cada joia deve ser única, assim como cada pessoa. Minha abordagem
                combina técnicas tradicionais de ourivesaria com uma sensibilidade artística
                contemporânea, criando peças que são ao mesmo tempo atemporais e modernas.
              </p>
              <p className="font-body text-lg text-refined-charcoal/80 leading-relaxed">
                Trabalho com materiais de alta qualidade, selecionando cuidadosamente cada pedra
                preciosa e cada grama de metal. O processo de criação é meticuloso e pessoal,
                garantindo que cada peça seja uma verdadeira obra de arte.
              </p>
            </div>
          </div>

          {/* Process Section */}
          <div className="bg-refined-cream/30 p-12">
            <h2 className="font-title text-3xl md:text-4xl mb-8 text-refined-charcoal text-center">
              O Processo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Inspiração',
                  description: 'Cada peça começa com uma história, um poema ou uma obra de arte que me inspira.',
                },
                {
                  title: 'Design',
                  description: 'Transformo a inspiração em um design único, considerando forma, textura e significado.',
                },
                {
                  title: 'Criação',
                  description: 'Com técnicas tradicionais e atenção aos detalhes, dou vida à peça em materiais preciosos.',
                },
              ].map((step, index) => (
                <div key={index} className="text-center">
                  <div className="font-title text-2xl mb-4 text-refined-charcoal">
                    {step.title}
                  </div>
                  <p className="font-body text-refined-charcoal/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

