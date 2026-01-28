# Gloria Faz Joias

Website e-commerce para a joalheria refinada "Gloria Faz Joias", inspirado na literatura e nas artes plásticas.

## Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização utilitária
- **Nuvemshop** - Integração de produtos (a ser configurada)

## Estrutura do Projeto

```
GloriaFazJoias/
├── app/
│   ├── layout.tsx          # Layout principal com fontes
│   ├── page.tsx            # Página inicial
│   ├── globals.css         # Estilos globais
│   ├── products/
│   │   └── page.tsx        # Página de produtos com filtros
│   └── about/
│       └── page.tsx        # Página sobre
├── components/
│   ├── Navigation.tsx     # Navegação principal
│   ├── Footer.tsx          # Rodapé
│   ├── ProductCard.tsx    # Card de produto
│   └── ProductFilters.tsx # Filtros de produtos
├── image-links.txt        # Armazenamento de links de imagens na nuvem
└── package.json
```

## Fontes

- **Títulos**: Old Baskerville
- **Texto secundário e corpo**: Amasis MT Pro Light

### Instalação de Fontes Personalizadas

As fontes especificadas não estão disponíveis no Google Fonts. Para usar as fontes exatas:

1. Adquira os arquivos de fonte (.woff2 recomendado)
2. Coloque os arquivos em `public/fonts/`:
   - `OldBaskerville.woff2` (ou .woff, .ttf, .otf)
   - `AmasisMTPro-Light.woff2` (ou .woff, .ttf, .otf)
3. Descomente as declarações `@font-face` em `app/globals.css`

Atualmente, o projeto usa Baskervville (do Google Fonts) como fallback, que é similar às fontes desejadas.

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

3. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Integração com Nuvemshop

Para integrar os produtos do Nuvemshop:

1. Obtenha as credenciais da API do Nuvemshop
2. Crie um arquivo `.env.local` com as credenciais:
```
NUVEMSHOP_API_KEY=your_api_key
NUVEMSHOP_STORE_ID=your_store_id
```

3. Atualize o componente `app/products/page.tsx` para buscar produtos da API do Nuvemshop

## Imagens

As imagens locais estão em: `/Users/thiago/Downloads/Gloria faz joias logos e imagens./`

Links de imagens na nuvem devem ser armazenados em `image-links.txt`.

## Próximos Passos

- [ ] Configurar integração com API do Nuvemshop
- [ ] Adicionar imagens reais dos produtos
- [ ] Implementar carrinho de compras
- [ ] Adicionar página de detalhes do produto
- [ ] Configurar SEO e metadados
- [ ] Adicionar animações e transições
- [ ] Implementar busca de produtos

