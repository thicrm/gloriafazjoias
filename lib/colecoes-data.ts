/**
 * Coleções — narrative copy from coleções-site.md; product grids use allProducts name filters.
 */

export type CollectionKey =
  | 'piscina'
  | 'vidro-romano'
  | 'mae'
  | 'peixinhos'
  | 'domo-do-ceu'
  | 'ceu-estrelado'
  | 'jardins'
  | 'amitis'
  | 'abstrata'
  | 'ad-astra-ad-amor'

export type CollectionSection = {
  key: CollectionKey
  titulo: string
  subtitulo?: string
  descricao: string
  productNameFilters: string[]
  /** Explicit store product slugs for the todas-as-coleções carousel (matches storeProducts). */
  storeProductSlugs?: string[]
  /** When true the collection is hidden from the UI but kept in the data. */
  hidden?: true
}

export const colecoes: CollectionSection[] = [
  {
    key: 'piscina',
    titulo: 'Na Água',
    subtitulo: 'Piscina',
    productNameFilters: ['ofurô', 'ofuro', 'onsen', 'ondas', 'reservatório', 'reservatorio', 'caminhos'],
    storeProductSlugs: [
      'anel-ofuro',
      'anel-onsen-cru',
      'anel-onsen-prata',
      'anel-onsen-ouro',
      'anel-ondas-prata',
      'anel-ondas-ouro',
      'anel-ondas-cru',
    ],
    descricao:
      'Que formas usamos para incorporar a natureza? As formas circulares e orgânicas dos anéis são inspiradas na piscina como reservatório de fluidez, leveza e água. O contraste entre polimentos fosco e brilhante — o reluzir da água na luz do sol veraniço. A prata crua — deitar na borda aquecida pelo sol depois de um mergulho refrescante.',
  },
  {
    key: 'vidro-romano',
    titulo: 'Na Água',
    subtitulo: 'Vidro Romano',
    productNameFilters: ['vidro romano'],
    hidden: true,
    descricao:
      'Nos fundos de uma loja de antiguidade em Bangkok, se escondia um tesouro: centenas de contas de vidro, incrustadas de nácar e corais, guardadas em uma caixa frágil de madeira. Esses vidros, marcados por séculos transitando no fundo do mar Mediterrâneo, ainda trazem vivas as cores de quando foram originalmente produzidos na costa do que era o Império Romano. Os designs da coleção Vidro Romano trazem um sopro de vida nova a esses tesouros esquecidos, restaurando sua glória com um olhar contemporâneo e arrojado. Única e irreplicável: cada conta carrega em sua superfície sua própria jornada através dos mares do tempo.',
  },
  {
    key: 'mae',
    titulo: 'Na Água',
    subtitulo: 'Mãe',
    productNameFilters: ['mãe', 'mae'],
    storeProductSlugs: ['brinco-mae', 'colar-mae-prata', 'colar-mae-maior', 'colar-mae-duplo'],
    descricao:
      'Mãe: abrigo para nossa essência, fonte de coragem para o coração. Uma celebração do ninho de onde partimos, mas ao qual sempre retornamos, através dos tons únicos das pérolas barrocas.',
  },
  {
    key: 'peixinhos',
    titulo: 'Na Água',
    subtitulo: 'Peixinhos',
    productNameFilters: ['marca páginas', 'marca paginas'],
    storeProductSlugs: ['marca-pagina-peixinho', 'marca-pagina-pirarucu'],
    descricao:
      'Um peixinho, dois peixinhos, três peixinhos: navegue pelos mares da literatura com estes marca-páginas encantadores. Divertidos e sofisticados, os peixinhos transformam-se, assim como o leitor, a cada nova aventura — as marcas de manuseio conforme transitam de livro em livro tornam cada peixinho único, assim como o leitor que o acompanha.',
  },
  {
    key: 'domo-do-ceu',
    titulo: 'Nos Céus',
    subtitulo: 'Domo do Céu',
    productNameFilters: ['domo do céu', 'domo do ceu', 'andorinhas', 'estrelas'],
    storeProductSlugs: [
      'anel-domo-crescente',
      'anel-domo-do-ceu-i',
      'anel-domo-do-ceu-ii',
      'brinco-andorinhas',
      'brinco-estrelas',
    ],
    descricao:
      'Quando se olhava para o céu do Mundo Antigo, seja ao lado das pirâmides no Vale dos Reis ou de dentro dos muros da Babilônia, entendia-se que o mundo era envolto por domo, pontilhado de estrelas e astros em órbita. Este firmamento continha dentro de si os céus, que se movimentavam dançantes, e a terra, onde o espetáculo de impérios, nascendo e caindo, era encenado como em um palco. O domo do céu assistiu o decorrer da história humana de cima, intocável por meros mortais e acessível apenas aos dignos do alcance divino. Nesta coleção, o fascínio do domo do céu é trazido ao alcance das mãos em anéis encantadores. Descubra de perto o fascínio dos astros no brilho espelhado da prata.',
  },
  {
    key: 'ceu-estrelado',
    titulo: 'Nos Céus',
    subtitulo: 'Céu Estrelado',
    productNameFilters: [
      'céu estrelado',
      'ceu estrelado',
      'explosão',
      'explosao',
      'aliança estrela',
      'alianca estrela',
      'broche estrela',
      'conjunto martelado estrela',
      'pingente estrela',
    ],
    storeProductSlugs: [
      'colar-explosao',
      'alianca-estrela',
      'broche-estrela',
      'colar-em-orbita',
      'anel-ceu-estrelado',
    ],
    descricao:
      'Hipnotize-se com o brilho dos astros, capturado em joias.',
  },
  {
    key: 'jardins',
    titulo: 'Na Terra',
    subtitulo: 'Jardins',
    productNameFilters: ['concha'],
    hidden: true,
    descricao:
      'Jardins são universos em miniatura: cada flor, folha e textura encontra seu lugar em composições pensadas. Nesta coleção, as joias evocam o gesto paciente de cultivar um jardim, onde o tempo e o cuidado revelam lentamente a sua beleza.',
  },
  {
    key: 'amitis',
    titulo: 'Na Terra',
    subtitulo: 'Amitis',
    productNameFilters: ['amitis'],
    storeProductSlugs: ['colar-amitis'],
    descricao:
      'Os Jardins Suspensos da Babilônia, uma das sete maravilhas do mundo antigo, foi um presente do rei Nabucodonosor II para sua rainha Amitis. As plantas tropicais coloriam a cidade milenar, como se flutuando no céu, emaranhando-se nos prédios para que as cores lembrassem a rainha de sua terra natal. Os Jardins eram uma homenagem, fruto da devoção do rei pela sua esposa — um sentimento reverenciado pela coleção Amitis.',
  },
  {
    key: 'abstrata',
    titulo: 'Na Terra',
    subtitulo: 'Abstrata',
    productNameFilters: [
      'vão',
      'vao',
      'sobreposição ii',
      'sobreposicao ii',
      'bracelete oco',
      'bracelete organico',
    ],
    storeProductSlugs: ['brinco-sobreposicao-ii', 'anel-vao', 'bracelete-oco'],
    descricao:
      'Um testamento ao desafio do material à intenção da joalheira: não é o desejo das mãos que criam que determinam estas peças, mas o impulso do próprio material de se auto-determinar, tornar-se si.',
  },
  {
    key: 'ad-astra-ad-amor',
    titulo: 'Seleções Especiais',
    subtitulo: 'Ad Astra, ad Amor',
    productNameFilters: ['aliança estrela', 'alianca estrela', 'broche estrela'],
    storeProductSlugs: ['alianca-estrela', 'broche-estrela'],
    descricao:
      'Celebre sua união com símbolos eternos de devoção. Através do amor — “Assim é que se chega aos astros.” Sic itur ad astra. (Virgílio, Eneida IX 641)',
  },
]

/** Collections visible in the UI — hidden ones stay in the data for product filtering. */
export const visibleColecoes = colecoes.filter((c) => !c.hidden)
