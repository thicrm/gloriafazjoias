import ImageWithLoading from '@/components/ImageWithLoading'
import { allProducts } from '@/lib/products-data'

type CollectionKey =
  | 'piscina'
  | 'vidro-romano'
  | 'ostra'
  | 'peixinhos'
  | 'domo-do-ceu'
  | 'ceu-estrelado'
  | 'jardins'
  | 'amitis'
  | 'mae'
  | 'ad-astra-ad-amor'

type CollectionSection = {
  key: CollectionKey
  titulo: string
  subtitulo?: string
  descricao: string
  productNameFilters: string[]
}

const colecoes: CollectionSection[] = [
  {
    key: 'piscina',
    titulo: 'Na Água',
    subtitulo: 'Piscina',
    productNameFilters: ['ofurô', 'ofuro', 'onsen', 'caminhos', 'ondas'],
    descricao:
      'Ofurô, Onsen, Caminhos — formas circulares e orgânicas inspiradas na piscina como reservatório de fluidez, leveza e água. O contraste entre polimentos fosco e brilhante evoca o reluzir da água na luz do sol, enquanto a prata crua lembra o corpo deitado na borda aquecida depois de um mergulho refrescante.',
  },
  {
    key: 'vidro-romano',
    titulo: 'Na Água',
    subtitulo: 'Vidro Romano',
    productNameFilters: ['vidro romano'], // futuro: mapear diretamente os produtos dessa coleção
    descricao:
      'Nos fundos de uma loja de antiguidade em Bangkok, um tesouro se escondia: contas de vidro marcadas por séculos no fundo do mar Mediterrâneo. A coleção Vidro Romano dá nova vida a esses fragmentos de história, restaurando sua glória com um olhar contemporâneo e arrojado. Única e irreplicável: cada conta carrega em sua superfície a própria jornada através dos mares do tempo.',
  },
  {
    key: 'ostra',
    titulo: 'Na Água',
    subtitulo: 'Ostra',
    productNameFilters: ['concha'],
    descricao:
      'A coleção Ostra celebra a diversidade de tons e cores das pérolas em designs que amplificam a beleza ímpar de cada uma. Brincos e colares moldam a prata para acolher cada pérola como um pequeno universo luminoso.',
  },
  {
    key: 'peixinhos',
    titulo: 'Na Água',
    subtitulo: 'Peixinhos',
    productNameFilters: ['marca páginas', 'marca paginas'],
    descricao:
      'Um peixinho, dois peixinhos, três peixinhos: navegue pelos mares da literatura com estes marca-páginas encantadores. Divertidos e sofisticados, transformam-se, assim como o leitor, a cada nova aventura — as marcas de manuseio tornam cada peixinho único, assim como quem o acompanha.',
  },
  {
    key: 'domo-do-ceu',
    titulo: 'No Céu',
    subtitulo: 'Domo do Céu',
    productNameFilters: ['domo do céu', 'domo do ceu', 'andorinhas'],
    descricao:
      'No Mundo Antigo, o céu era visto como um domo pontilhado de estrelas, observando em silêncio a história humana. Na coleção Domo do Céu, esse fascínio é trazido às mãos em anéis e brincos que capturam o brilho espelhado da prata e o movimento dos astros.',
  },
  {
    key: 'ceu-estrelado',
    titulo: 'No Céu',
    subtitulo: 'Céu Estrelado',
    productNameFilters: ['céu estrelado', 'ceu estrelado', 'sobreposição ii', 'pingente estrela', 'conjunto martelado estrela'],
    descricao:
      'Hipnotize-se com o brilho dos astros capturado em joias. A coleção Céu Estrelado reúne anéis, brincos, pingentes e conjuntos que traduzem constelações em superfícies marteladas e polidas, sempre em diálogo com a luz.',
  },
  {
    key: 'jardins',
    titulo: 'Na Terra',
    subtitulo: 'Jardins',
    productNameFilters: ['jardins'],
    descricao:
      'Jardins são universos em miniatura: cada flor, folha e textura encontra seu lugar em composições pensadas. Nesta coleção, as joias evocam o gesto paciente de cultivar um jardim, onde o tempo e o cuidado revelam lentamente a sua beleza.',
  },
  {
    key: 'amitis',
    titulo: 'Na Terra',
    subtitulo: 'Amitis',
    productNameFilters: ['amitis'],
    descricao:
      'A coleção Amitis homenageia os jardins suspensos e as narrativas de reinos antigos. Brincos e colares entrelaçam formas e volumes que sugerem arquitetura, folhagens e luz dourada ao entardecer.',
  },
  {
    key: 'mae',
    titulo: 'Seleções Especiais',
    subtitulo: 'Mãe',
    productNameFilters: ['mãe', 'mae'],
    descricao:
      'A coleção Mãe celebra a delicadeza e a força dos laços maternos. Brincos e colares realçam o brilho das pérolas e dos metais em composições que abraçam o colo, o gesto e a memória de quem cuida.',
  },
  {
    key: 'ad-astra-ad-amor',
    titulo: 'Seleções Especiais',
    subtitulo: 'Ad Astra, ad Amor',
    productNameFilters: ['estrela', 'amitis'],
    descricao:
      'Celebre sua união com símbolos eternos de devoção. A coleção Ad Astra, ad Amor combina estrelas e elementos de Amitis para criar joias que apontam para o alto: “Assim é que se chega aos astros.” (Virgílio, Eneida IX 641).',
  },
]

export default function ColecoesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const rawKey = searchParams.colecao
  const key = Array.isArray(rawKey) ? rawKey[0] : rawKey

  const active =
    colecoes.find((c) => c.key === (key as CollectionKey)) ?? colecoes[0]

  const productsForCollection = allProducts.filter((product) => {
    const name = product.name.toLowerCase()
    return active.productNameFilters.some((fragment) =>
      name.includes(fragment.toLowerCase()),
    )
  })

  return (
    <div className="min-h-screen px-4 pb-24">
      <div className="max-w-6xl mx-auto pt-16 md:pt-20 lg:pt-24">
        {/* Título da página */}
        <div className="text-center mb-12">
          <h1 className="font-title text-3xl md:text-4xl lg:text-5xl text-refined-charcoal mb-4">
            Coleções
          </h1>
          <p className="font-body text-sm md:text-base text-refined-charcoal/70">
            Explore universos de joias agrupadas por narrativa, matéria e
            imaginação.
          </p>
        </div>

        {/* Identificação da coleção ativa */}
        <div className="text-center mb-10">
          <p className="font-body text-xs tracking-[0.25em] uppercase text-refined-charcoal/60 mb-2">
            {active.titulo}
          </p>
          {active.subtitulo && (
            <h2 className="font-title text-2xl md:text-3xl text-refined-charcoal">
              {active.subtitulo}
            </h2>
          )}
        </div>

        {/* Grid de imagens da coleção */}
        <section className="w-full mb-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
            {productsForCollection.map((product) => {
              const firstImage = product.images[0]
              if (!firstImage) return null

              return (
                <div
                  key={product.slug}
                  className="relative w-full overflow-hidden group cursor-pointer aspect-[3/4]"
                >
                  <ImageWithLoading
                    src={firstImage}
                    alt={product.name}
                    fill
                    aspectRatio="3/4"
                    className="object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:brightness-110"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
              )
            })}
          </div>
        </section>

        {/* Texto da coleção */}
        <section className="w-full max-w-3xl mx-auto text-center">
          <p className="font-body text-base md:text-lg text-refined-charcoal/80 leading-relaxed">
            {active.descricao}
          </p>
        </section>
      </div>
    </div>
  )
}


