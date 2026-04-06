import type { ReactNode } from 'react'

export type FaqItem = {
  id: string
  question: string
  answer: ReactNode
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'encomendar',
    question:
      'A peça que quero está disponível apenas na opção "encomendar". O que isto significa?',
    answer: (
      <>
        <p>
          Nossos produtos existem em duas categorias, à pronta entrega ou disponível por encomenda.
        </p>
        <p>
          Se a(s) peça(s) escolhida(s) está disponível <strong>à pronta entrega</strong>, significa que
          ela já foi confeccionada e está guardada em nosso estoque. Sua compra será imediatamente
          separada e embalada. Você receberá sua compra de acordo com o frete escolhido.
        </p>
        <p>
          Se a(s) peça(s) escolhida(s) estiver disponível <strong>sob encomenda</strong>, o prazo de
          produção da(s) sua(s) peça(s) será <strong>adicionado</strong> ao prazo do frete escolhido.
          O prazo de produção padrão é de <strong>5 a 10 dias úteis</strong>, podendo variar de
          acordo com a complexidade da peça e a agenda de produção. Para evitar atrasos e respeitar
          a expectativa de recebimento em datas especiais, <strong>estaremos em contato</strong> com
          você o tempo todo sobre o status da sua compra.
        </p>
      </>
    ),
  },
  {
    id: 'prazo-encomenda',
    question: 'Minha peça encomendada vai chegar em quanto tempo?',
    answer: (
      <p>
        A joalheria de bancada é um processo artesanal onde cada peça é cuidadosamente feita à mão.
        Devido à natureza deste processo, o prazo de confecção de peças encomendadas é de{' '}
        <strong>5 a 10 dias úteis</strong>, podendo variar de acordo com a complexidade da peça e
        agenda de produção.
      </p>
    ),
  },
  {
    id: 'presente-data',
    question:
      'Minha peça encomendada é um presente para uma data comemorativa. Ela chegará a tempo?',
    answer: (
      <p>
        Em datas comemorativas, divulgaremos a <strong>data limite</strong> para compras incluindo
        peças por encomenda. Assim, podemos garantir que sua compra estará pronta e entregue até lá.
      </p>
    ),
  },
  {
    id: 'anel-tamanho',
    question: 'Eu quero um anel em um tamanho específico. Como faço para informar vocês?',
    answer: (
      <p>
        Quando for adicionar o anel ao carrinho, você pode escolher um dos tamanhos disponíveis à
        pronta entrega ou clicar em &quot;encomendar&quot; e selecionar o tamanho desejado entre 7 e
        26. Para tamanhos fora desta faixa, por favor entre em contato conosco através do e-mail{' '}
        <a
          href="mailto:contato@gloriafazjoias.com"
          className="font-medium text-black underline underline-offset-2 transition-colors duration-500 hover:text-refined-gold"
        >
          contato@gloriafazjoias.com
        </a>
        . Nos informe seu <strong>número de pedido e o tamanho desejado</strong> e logo te
        responderemos.
      </p>
    ),
  },
  {
    id: 'tamanho-anel',
    question: 'Como descubro meu tamanho de anel?',
    answer: (
      <>
        <p>Há vários métodos para descobrir o tamanho certo de anel em casa.</p>
        <p>
          Se você já tem um anel que cabe direitinho no dedo que você quer vestir, nós recomendamos o
          aplicativo <strong>Ring Sizer by Jason Withers</strong>, disponível em smartphones. Ao
          abrir o app, coloque seu anel na tela e alinhe o círculo com o aro do anel para descobrir
          seu diâmetro e tamanho.
        </p>
        <p>
          Se você precisa medir seu dedo, recomendamos o <strong>método da tira de papel</strong>.
          Enrole uma tira de papel no dedo escolhido. Com uma caneta, marque ambos os lados da tira
          de papel e estique a tira. Com uma régua, meça a distância entre os dois pontos marcados no
          papel. Correlacione a medida obtida com uma tabela de tamanhos de anel.
        </p>
        <p>
          Acesse o vídeo para um passo a passo de como medir o tamanho de anel pelo dedo:{' '}
          <a
            href="https://youtu.be/1bF0AifqyDE?si=CZghgXzOJ_Dwzkg8"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-black underline underline-offset-2 break-all transition-colors duration-500 hover:text-refined-gold"
          >
            youtube.com/watch
          </a>
        </p>
      </>
    ),
  },
  {
    id: 'frete',
    question: 'Para onde vocês entregam? Quais tipos de frete estão disponíveis?',
    answer: (
      <p>
        Nós enviamos para todo o Brasil e para destinos internacionais através dos Correios. Dentro
        da cidade de São Paulo, é possível optar pela entrega por motoboy ou retirada no nosso
        ateliê na Vila Mariana.
      </p>
    ),
  },
  {
    id: 'perola-barroca',
    question: 'Minha peça com pérola barroca não está igual à foto. Houve algum erro?',
    answer: (
      <p>
        Cada peça com pérola barroca é única, assim como este material. Pérolas barrocas são
        orgânicas, produzidas por ostras de água doce. Por natureza, cada pérola é única e
        irreplicável. Na produção de cada peça, seja ela um anel, pingente, ou par de brincos, nós
        selecionamos as pérolas mais parecidas entre si, na cor e formato, para compor um resultado
        fiel ao design original. Contudo, devido à natureza deste material, pequenas variações podem
        estar presentes.
      </p>
    ),
  },
  {
    id: 'cuidados-garantia',
    question: 'Minha peça escureceu, foi danificada, ou se quebrou. E agora?',
    answer: (
      <>
        <p>
          Cada pedido na Glória Faz Jóias vem acompanhado de uma <strong>cartilha de cuidados</strong>
          , onde explicamos como limpar e cuidar de sua peça para que seu brilho seja preservado.
          Também temos mais informações no <strong>destaque &quot;Cuidados&quot; no nosso Instagram</strong>.
          Se tiver alguma dúvida sobre o material de sua peça ou o processo de cuidados,{' '}
          <strong>entre em contato conosco</strong>.
        </p>
        <p>
          Todas as nossas peças possuem garantia para <strong>danos de produção</strong>, sejam eles
          estruturais ou de acabamento. Se sua peça veio danificada ou apresentou sinais de dano nos
          primeiros usos, <strong>entre em contato conosco</strong> para combinarmos o retorno da
          peça ao ateliê para reparos, sem custo adicional. A garantia{' '}
          <strong>não cobre danos causados por mau uso da peça pelo cliente em geral</strong>. Nestes
          casos, podemos combinar o reparo da peça mediante <strong>custos adicionais</strong>.
        </p>
        <p>
          Ficou na dúvida sobre seu caso? Nos mande uma foto ou vídeo da peça pelo e-mail{' '}
          <a
            href="mailto:contato@gloriafazjoias.com"
            className="font-medium text-black underline underline-offset-2 transition-colors duration-500 hover:text-refined-gold"
          >
            contato@gloriafazjoias.com
          </a>{' '}
          para uma avaliação.
        </p>
      </>
    ),
  },
]
