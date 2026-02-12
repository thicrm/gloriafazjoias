import ImageWithLoading from '@/components/ImageWithLoading'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Picture Grid Section */}
      <section className="w-full -mt-8 relative" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-2 w-full">
          <div className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/%20galeira%20%5Bgfj%5D/brutalita-autoral-83.JPEG"
              alt="Brutalita Autoral 83"
              fill
              aspectRatio="1/0.8"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="50vw"
            />
          </div>
          <div className="relative w-full overflow-hidden group cursor-pointer">
            <ImageWithLoading
              src="https://pub-5d1481d6cba449089a45cbcb47b01ed9.r2.dev/%20galeira%20%5Bgfj%5D/brutalita-autoral-39.JPEG"
              alt="Brutalita Autoral 39"
              fill
              aspectRatio="1/0.8"
              className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
              sizes="50vw"
            />
          </div>
        </div>
      </section>

      {/* Text Section */}
      <section className="w-full pt-16 px-4 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            <h1 className="font-title text-4xl md:text-5xl mb-8 text-refined-charcoal text-center">
              Sobre
            </h1>
            <div className="font-body text-lg md:text-xl text-refined-charcoal/80 leading-relaxed space-y-6">
              <p>
                Eu sou a Glória, uma artista com um pé no Brasil e o outro no mundo, formada em Artes Visuais e Filosofia na Bard College Berlin, Alemanha. Minha jornada no mundo das joias começou em 2024, com um curso de joalheria de bancada, despretensioso e livre para experimentações. O que era para ser apenas um hiato entre o bacharelado na Alemanha e o mestrado na Holanda logo se tornou algo muito mais profundo e gratificante do que era possível imaginar naquele começo, traçado entre a intimidação do maçarico e o fascínio de ver o espelho líquido do metal derretido.
              </p>
              <p>
                Minha formação acadêmica havia começado anos antes com a manualidade da argila na pele, do pincel nas mãos, mas logo percebi que minha busca era por algo mais profundo, que precedia o objeto de arte. Eu me aventurei na filosofia e na história procurando a origem do processo criativo, as mensagens e sentimentos que afetam nossa experiência tão fortemente que precisamos manifestá-los em um objeto físico. Quando, sem querer, esbarrei na joalheria, o cadinho coberto por metal líquido, espelhado, dançando sob as luzes baixas da área de fundição, tive uma epifania.
              </p>
              <p>
                O fogo abriu para mim um caminho capaz de unir minha pesquisa material à intelectual. A joia, mais do que um objeto, é um veículo de significados usado desde os primórdios da criatividade humana. Com elas, nos adornamos de nossas histórias, vestimos o que acreditamos, comunicamos quem somos e quem queremos ser. Nossos sonhos tomam a forma do metal, nossos amores as cores das pedras. As joias mais preciosas para nós são aquelas que mais puramente destilam e carregam nossa identidade, seja ela feita dos materiais mais raros ou mais mundanos.
              </p>
              <p>
                Minha prática artística é fundamentalmente manual. Os materiais chegam a mim brutos e puros, e sua jornada até a obra final é guiada pelas minhas mãos, na bancada. O processo artesanal me permite trabalhar com ternura cada peça, da maneira mais cuidadosa possível, dando atenção às necessidades únicas de cada projeto. Que maneira mais bela há, de manusear algo tão precioso como memórias, afetos e ideias que fazem de nós, nós?
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

