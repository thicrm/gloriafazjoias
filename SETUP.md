# Guia de Configuração - Gloria Faz Joias

## Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Conta Nuvemshop (para integração de produtos)

## Passo a Passo

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NUVEMSHOP_STORE_ID=seu_store_id
NUVEMSHOP_ACCESS_TOKEN=seu_access_token
```

Para obter essas credenciais:
1. Acesse o [DevHub Nuvemshop](https://dev.nuvemshop.com.br)
2. Crie uma aplicação
3. Obtenha o Store ID e Access Token

### 3. Adicionar Fontes Personalizadas (Opcional)

Se você tem os arquivos das fontes:
1. Coloque `OldBaskerville.woff2` em `public/fonts/`
2. Coloque `AmasisMTPro-Light.woff2` em `public/fonts/`
3. Descomente as declarações `@font-face` em `app/globals.css`

### 4. Adicionar Imagens

- **Logos**: Coloque em `public/images/` ou adicione links na nuvem em `image-links.txt`
- **Produtos**: As imagens serão carregadas via Nuvemshop API ou você pode adicionar manualmente

### 5. Executar o Projeto

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## Estrutura de Pastas

```
GloriaFazJoias/
├── app/                    # Páginas e rotas (Next.js App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   ├── products/          # Página de produtos
│   └── about/             # Página sobre
├── components/            # Componentes reutilizáveis
├── lib/                   # Utilitários e integrações
├── public/                # Arquivos estáticos
│   ├── fonts/            # Fontes personalizadas
│   └── images/           # Imagens estáticas
└── image-links.txt       # Links de imagens na nuvem
```

## Próximos Passos

1. **Integrar Nuvemshop**: Atualize `app/products/page.tsx` para usar a API
2. **Adicionar Imagens**: Substitua placeholders por imagens reais
3. **Personalizar Conteúdo**: Atualize textos e informações nas páginas
4. **Configurar SEO**: Adicione metadados e Open Graph tags
5. **Deploy**: Configure para produção (Vercel recomendado)

## Comandos Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa linter

## Suporte

Para dúvidas sobre:
- **Next.js**: [Documentação Next.js](https://nextjs.org/docs)
- **Nuvemshop API**: [Documentação Nuvemshop](https://tiendanube.github.io/api-documentation)
- **Tailwind CSS**: [Documentação Tailwind](https://tailwindcss.com/docs)

