// Product descriptions mapping from Textos Site.txt
// Maps database product names to their descriptions

export interface ProductDescription {
  shortDescription: string
  longDescription?: string
  collection?: string
  availability?: string
  notes?: string
}

// Helper function to normalize product names for matching
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

// Product descriptions mapped to database product names
// Updated from Textos Site.txt
export const productDescriptions: Record<string, ProductDescription> = {
  // 1. Anel Reservatório - NOT IN DATABASE
  
  // 2. Bracelete Oco
  'bracelete oco': {
    shortDescription: 'Elegante e sofisticado, o bracelete Oco é construído em prata 925.',
    availability: 'Sob encomenda. Selecione "encomendar" para fazer seu pedido.',
    notes: 'A joalheria de bancada é um processo artesanal onde cada peça é cuidadosamente feita à mão. Devido à natureza deste processo, o prazo de confecção e envio de encomendas é de até 15 dias úteis.',
  },

  // 3. Aliança Estrela - NOT IN DATABASE
  
  // 4. Broche Estrela - NOT IN DATABASE
  
  // 5. Pingente Em Órbita - NOT IN DATABASE (but there's "pingente estrela" in database)
  
  // 6. Anel Céu Estrelado
  'anel ceu estrelado': {
    shortDescription: 'Vista-se com a lua e as estrelas com este clássico da Glória Faz Jóias. O anel Céu Estrelado foi um dos primeiros designs da marca e segue como um favorito entre colecionadores.',
    availability: 'Anel com aro ajustável. Ao comprar, mande uma mensagem especificando o seu tamanho de preferência.',
  },

  // 7. Anel Domo do Céu II
  'anel domo do ceu ii': {
    shortDescription: 'Carregue o céu estrelado em suas mãos. O anel Domo do Céu II é uma homenagem à cúpula do universo que nos envolve e fascina. Construído em prata 925, possui três estrelas dentro de um domo adornado, na parte interna, com galáxias gravadas à mão e, na parte externa, com estrelinhas de latão douradas.',
    availability: 'Anel com aro ajustável. Ao comprar, mande uma mensagem especificando o seu tamanho de preferência.',
  },

  // 8. Anel Onsen (cru) - NOT IN DATABASE
  
  // 9. Anel Onsen (prata)
  'anel onsen prata': {
    collection: 'Coleção Piscina',
    shortDescription: 'O anel Onsen veio com a proposta de refletir e conter os olhares que caem nele. Seu recôncavo bilhante é polido para maximizar seu brilho, criando, para alguns, a ilusão de uma pedra fugaz em seu centro.',
    longDescription: 'Versátil, este anel se encaixa em diferentes propostas de look: a versão fosca apresenta um contraste entre o brilho do centro e a sobriedade do exterior escovado; já a versão polida por inteiro traz o efeito espelho do anel Onsen à sua potência máxima. Feito em prata 950.',
    availability: 'Disponível em pronta-entrega no tamanho 18. Para um tamanho específico, selecione "encomendar" e nos informe o tamanho desejado por mensagem.',
    notes: 'A joalheria de bancada é um processo artesanal onde cada peça é cuidadosamente feita à mão. Devido à natureza deste processo, o prazo de confecção e envio de encomendas é de até 15 dias úteis.',
  },

  // 10. Anel Onsen (dourado/ouro)
  'anel onsen ouro': {
    collection: 'Coleção Piscina',
    shortDescription: 'O anel Onsen veio com a proposta de refletir e conter os olhares que caem nele. Seu recôncavo bilhante é polido para maximizar seu brilho, criando, para alguns, a ilusão de uma pedra fugaz em seu centro.',
    longDescription: 'Versátil, este anel se encaixa em diferentes propostas de look: a versão fosca apresenta um contraste entre o brilho do centro e a sobriedade do exterior escovado; já a versão polida por inteiro traz o efeito espelho do anel Onsen à sua potência máxima. Feito em latão.',
    availability: 'Disponível em pronta-entrega no tamanho 17. Para um tamanho específico, selecione "encomendar" e nos informe o tamanho desejado por mensagem.',
    notes: 'A joalheria de bancada é um processo artesanal onde cada peça é cuidadosamente feita à mão. Devido à natureza deste processo, o prazo de confecção e envio de encomendas é de até 15 dias úteis.',
  },

  // 11. Anel Ondas (prata)
  'anel ondas prata': {
    collection: 'Coleção Piscina',
    shortDescription: 'Os movimentos da maré imortalizados na prata 950. A superfície polida do anel Ondas evoca o brilho da crista das ondas, o sol batendo nos olhos, o sal e a calma do litoral brasileiro.',
    longDescription: 'Desfrute do design dinâmico e moderno do anel Ondas em duas versões: com acabamento fosco por fora, aumentando o contraste com a superfície polida e evocando a espuma das ondas em volta da água reluzente; ou com acabamento polido por inteiro para maximizar o brilho de suas ondulações.',
    availability: 'Disponível em pronta-entrega no tamanho 16. Para um tamanho específico, selecione "encomendar" e nos informe o tamanho desejado por mensagem.',
    notes: 'A joalheria de bancada é um processo artesanal onde cada peça é cuidadosamente feita à mão. Devido à natureza deste processo, o prazo de confecção e envio de encomendas é de até 15 dias úteis.',
  },

  // 12. Anel Ondas (dourado/ouro)
  'anel ondas ouro': {
    collection: 'Coleção Piscina',
    shortDescription: 'Os movimentos da maré imortalizados no latão dourado. A superfície polida do anel Ondas evoca o brilho da crista das ondas, o sol batendo nos olhos, o sal e a calma do litoral brasileiro.',
    longDescription: 'Desfrute do design dinâmico e moderno do anel Ondas em duas versões: com acabamento fosco por fora, aumentando o contraste com a superfície polida e evocando a espuma das ondas em volta da água reluzente; ou com acabamento polido por inteiro para maximizar o brilho de suas ondulações.',
    availability: 'Disponível em pronta-entrega no tamanho 16-17. Para um tamanho específico, selecione "encomendar" e nos informe o tamanho desejado por mensagem.',
    notes: 'A joalheria de bancada é um processo artesanal onde cada peça é cuidadosamente feita à mão. Devido à natureza deste processo, o prazo de confecção e envio de encomendas é de até 15 dias úteis.',
  },

  // 13. Anel Ondas (cru) - NOT IN DATABASE
  
  // 14. Brinco Andorinhas
  'brinco andorinhas': {
    shortDescription: 'Um domo com estrelas sobrevoado por um par de andorinhas. O par de brinco Andorinhas e o anel Domo do Céu I homenageiam o a coreografia dançada das andorinhas pelo céu. Com seu vôo certeiro, as andorinhas sabem exatamente onde devem chegar, porém sem medo de apreciar passeios nos seus caminhos. Uma celebração da liberdade, construída em prata 925.',
    availability: 'Sob encomenda. Selecione "encomendar" para fazer seu pedido.',
    notes: 'A joalheria de bancada é um processo artesanal onde cada peça é cuidadosamente feita à mão. Devido à natureza deste processo, o prazo de confecção e envio de encomendas é de até 15 dias úteis.',
  },

  // 15. Brinco Mãe
  'brinco mae': {
    shortDescription: 'Mãe: abrigo para nossa essência, fonte de coragem para o coração. A superfície redonda do brinco Mãe, polida como um espelho, protege a pérola barroca e reverbera sua cor rosada. O tom singular de cada pérola é, ao mesmo tempo, acolhido e amplificado, criando um visual único. Uma celebração do ninho de onde partimos, mas ao qual sempre retornamos.',
    notes: 'Pode ser usado em conjunto com o colar Mãe.\nEsta peça apresenta variações de cor, tom e tamanho devido ao uso de materiais naturais (pérola barroca).',
  },

  // 16. Brinco Sobreposição II
  'brinco sobreposicao ii': {
    shortDescription: 'A série Sobreposição brinca com ângulos, formas e tamanhos para criar peças únicas. Fruto do processo da joalheria artesanal, cada peça é composta de retalhos únicos de prata 925, surgidos espontaneamente da construção do anel Céu Estrelado. Os retalhos são sobrepostos e rebitados, mantendo-se móveis. Frutos abstratos de um processo que mirava no figurativo. A série Sobreposição, desde sua origem, é um testamento do desafio do material à intenção da joalheira: não é o desejo das mão que criam que determinam estas peças, mas o impulso do próprio material de se auto-determinar, de tornar-se si.',
    notes: 'Devido ao uso de materiais idiossincráticos ao processo de produção, esta peça é única.',
  },

  // 17. Colar Concha
  'colar concha': {
    shortDescription: 'O colar Concha nasceu como um presente, do mar maranhense ao mar da Bahia, que desaguaram seu amor na selva paulistana. Este design é uma homenagem ao design único deste encomenda, que marcou o encontro de um casal apaixonado. Na concha de prata 950, esculpida à mão, repousa o brilho de uma pérola barroca.',
  },

  // 18. Colar Mãe (prata)
  'colar mae prata': {
    shortDescription: 'Mãe: abrigo para nossa essência, fonte de coragem para o coração. A superfície redonda do pingente Mãe, polida como um espelho, protege a pérola barroca e reverbera sua cor rosada. O tom singular de cada pérola é, ao mesmo tempo, acolhido e amplificado, criando um visual único. Uma celebração do ninho de onde partimos, mas ao qual sempre retornamos.',
    notes: 'Pode ser usado em conjunto com o brinco Mãe.\nEsta peça apresenta variações de cor, tom e tamanho devido ao uso de materiais naturais (pérola barroca).',
  },

  // 18. Colar Mãe (ouro)
  'colar mae ouro': {
    shortDescription: 'Mãe: abrigo para nossa essência, fonte de coragem para o coração. A superfície redonda do pingente Mãe, polida como um espelho, protege a pérola barroca e reverbera sua cor rosada. O tom singular de cada pérola é, ao mesmo tempo, acolhido e amplificado, criando um visual único. Uma celebração do ninho de onde partimos, mas ao qual sempre retornamos.',
    notes: 'Pode ser usado em conjunto com o brinco Mãe.\nEsta peça apresenta variações de cor, tom e tamanho devido ao uso de materiais naturais (pérola barroca).',
  },

  // 19. Marca-página Peixinho - NOT IN DATABASE (but there's "marca páginas" in database)
  
  // 20. Marca-página Pirarucu - NOT IN DATABASE (but there's "marca páginas" in database)
}

// Get description for a product by its database name
export function getProductDescription(productName: string): ProductDescription | undefined {
  const normalized = normalizeName(productName)
  return productDescriptions[normalized]
}

// Format description for display
export function formatProductDescription(description: ProductDescription): string {
  const parts: string[] = []
  
  if (description.collection) {
    parts.push(description.collection)
  }
  
  if (description.shortDescription) {
    parts.push(description.shortDescription)
  }
  
  if (description.longDescription) {
    parts.push(description.longDescription)
  }
  
  if (description.availability) {
    parts.push(description.availability)
  }
  
  if (description.notes) {
    parts.push(description.notes)
  }
  
  return parts.join('\n\n')
}

