import ImageWithLoading from '@/components/ImageWithLoading'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen -mt-28">
      {/* Hero GIF Section */}
      <section className="w-full relative z-10">
        <div className="relative w-full">
          <Image
            src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/viI%CC%80%C2%81deo_com_objetos.gif"
            alt="Glória Faz Jóias - Objetos"
            width={1920}
            height={1080}
            unoptimized
            className="w-full h-auto"
            sizes="100vw"
            priority
          />
        </div>
      </section>

      {/* Text Section */}
      <section className="w-full pt-16 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12 md:space-y-16">
            <div>
              <h1 className="font-title text-4xl md:text-5xl mb-8 text-refined-charcoal text-center">
                Sobre
              </h1>
              <div className="space-y-8">
                <p className="font-body text-lg md:text-xl text-refined-charcoal/80 leading-relaxed text-justify">
                  Glória Nogueira é uma joalheira de bancada baseada em São Paulo, Brasil. Formada em Artes Visuais e Filosofia pela Bard College Berlin, passou grande parte de sua carreira artística entre o Brasil e a Alemanha.
                </p>
                <p className="font-body text-lg md:text-xl text-refined-charcoal/80 leading-relaxed text-justify">
                  Na bancada, o metal é moldado à visão artística da joalheira, transformando-se de matéria bruta em obra de arte. O calor das mãos que a criam é imbuído na joia, tornando-a um objeto vivo. As suas formas, a sensação do metal na pele, o brilho das pedras que saltam aos olhos comunicam, além da beleza, a história de joia, tornando cada uma um tesouro único e singular.
                </p>
                <p className="font-body text-lg md:text-xl text-refined-charcoal/80 leading-relaxed text-justify">
                  As mãos da artista pensam e produzem cada joia, celebrando o tempo e cuidado que cada uma precisa para nascer. Na Glória faz Jóias, cultiva-se tesouros à mão.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-title text-4xl md:text-5xl mb-8 text-refined-charcoal text-center">
                O joalheiro como aventureiro
              </h2>
              <div className="space-y-8">
                <p className="font-body text-lg md:text-xl text-refined-charcoal/80 leading-relaxed text-justify">
                  Em suas aventuras na Europa, Ásia, e América Latina, a coleção mais preciosa adquirida pela Glória como artista foi a que seus olhos capturaram. Ao longo dos anos, o caos dos museus com alas vastas e arrebatadas de artefatos, calçadas pisadas por milhares de sapatos estrangeiros todos os dias, e o relevo do interior populado por espécies inimaginavelmente diversas de fauna e flora, foram lentamente destilados em um olhar apurado para a beleza que se esconde nos detalhes. Do estrangeiro ao cotidiano, a vida artística da Glória é guiada por um instinto curioso que informa todos os elementos do seu processo criativo.
                </p>
                <p className="font-body text-lg md:text-xl text-refined-charcoal/80 leading-relaxed text-justify">
                  A riqueza de impressões, intelectuais e sensoriais, trazidas pela vida de viajante despertou na Glória um repertório rico de referências que se traduz, na bancada de joalheria, em joias infinitamente imaginativas: a fluidez da caligrafia persa pode ser traduzido na disposição de ornamentos em um anel; os círculos concêntricos em um pingente podem remeter à pintura de cerâmicas centenárias; a escolha de cores e formas em um conjunto podem ter nascido da sobreposição de obras contemporâneas e clássicas. Quanto maior a riqueza do olhar da artista, mais abundantes e transformadores se tornam suas criações.
                </p>
              </div>
            </div>

            <div>
              <h2 className="font-title text-4xl md:text-5xl mb-8 text-refined-charcoal text-center">
                O joalheiro como jardineiro
              </h2>
              <div className="space-y-8">
                <p className="font-body text-lg md:text-xl text-refined-charcoal/80 leading-relaxed text-justify">
                  Uma boa coleção nasce não apenas da quantidade dos artefatos que contém, mas de sua curadoria — somente assim podem meros objetos transformarem-se em tesouros. No jardim bem cuidado, as melhores flores são aquelas que juntam-se em harmonia para criar uma visão única: um dente-de-leão pode ser intrusivo e desagradável quando cresce em um tapete de grama imaculadamente arrumado, ou um lindo ornamento em um jardim cheio de florzinhas silvestres. O dever do jardineiro é o de selecionar, dentre a impressionante diversidade de plantas do mundo, apenas aquelas que servem a sua visão para certo jardim. Cultivar um jardim é, desta maneira, construir um universo.
                </p>
                <p className="font-body text-lg md:text-xl text-refined-charcoal/80 leading-relaxed text-justify">
                  A investigação artística da Glória, como joalheira, foca na criação de universos vestíveis: como pode uma joia criar e conter, dentro de si, um mundo precioso? Como um jardim, que contém na sua particularidade a beleza universal da natureza selvagem, cada joia é um receptáculo para sua história. Cada elemento contido nela carrega em si parte da visão contemplada na joia como um todo. As cores das gemas, a forma dos metais, os detalhes que formam a joia trabalham em harmonia para que venha à vida um mundo impressionante. A preciosidade da joia está na beleza do universo vislumbrado quando é vestida.
                </p>
                <p className="font-body text-lg md:text-xl text-refined-charcoal/80 leading-relaxed text-justify">
                  A Glória Faz Jóias celebra a preciosidade do mundo com joias que criam histórias.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-16">
              <Link
                href="/colecoes"
                className="inline-block mt-4 px-12 py-4 border border-refined-gold text-refined-gold hover:bg-refined-gold hover:text-refined-ivory hover:shadow-[0_0_30px_rgba(212,175,55,0.8)] transition-all duration-500 ease-in-out font-body tracking-wide text-base md:text-lg"
              >
                conheça nossas coleções
              </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
