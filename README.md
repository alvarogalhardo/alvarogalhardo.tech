# alvarogalhardo.tech

Site pessoal. Astro, estático, bilíngue por rota (`/` em inglês, `/pt` em
português), tema claro e escuro.

## Estado

v1 de layout. A estrutura está completa e auditada — Lighthouse 100 em
performance, acessibilidade, boas práticas e SEO nas quatro rotas principais —
mas **todo o texto visível ainda é lorem ipsum**. O próximo passo é conteúdo
real.

## Comandos

```bash
npm run dev        # desenvolvimento
npm test           # 140 testes em Vitest
npm run build      # build + validação de conteúdo
npm run check:seo  # auditoria de SEO sobre dist/
```

## Como está organizado

```
src/
├── content/          posts e projetos em MDX, por idioma
├── content.config.ts schemas Zod — o build falha com frontmatter inválido
├── data/             texto tipado em TS: experiência, estante, prosa da home
│                     (copy.ts) e title/description das páginas (meta.ts)
├── i18n/             dicionário de rótulos e resolução de rota por idioma
├── lib/
│   ├── tokens.ts     cores; espelhado em styles/tokens.css e testado
│   └── content.ts    conversão coleção → props de componente
├── components/       apresentação; recebem dados por props
├── layouts/          Base (head, SEO) e Post
└── pages/            rotas em en, espelhadas sob /pt
```

Componentes de seção não chamam `getCollection` — quem busca é a página. Isso os
mantém puros, testáveis sem browser e sem conhecer a fonte dos dados.

## Testes

Vitest apenas, sem browser: contraste dos tokens (`culori`), utilitários de i18n,
schemas Zod e render de componente pelo Container API do Astro. Acessibilidade e
responsividade são auditoria manual.

O teste de contraste é o mais útil: ele calcula o contraste WCAG de cada par
texto/fundo nos dois temas e falhou de verdade quando as cores do design não
passavam.

## Design

Minimalista e text-first: sem imagens, coluna única de 760px, uma cor de
destaque, hairlines de 1px e uma textura de pontos discreta. Serif (Newsreader)
para prosa, mono (JetBrains Mono) para metadados — ambas auto-hospedadas, nunca
por CDN. Cores em `oklch`, com contraste AA verificado por teste nos dois temas.
Um único breakpoint em 700px; abaixo dele a navegação vira um drawer.

## Deploy

Site estático no Cloudflare Pages: build `npm run build`, saída `dist`, Node
fixado em `.nvmrc`. Cada merge no `main` publica; cada PR ganha um preview.
`public/_headers` e `public/_redirects` são aplicados pela edge. O domínio vive
em `astro.config.mjs` como `site` — canonical, `hreflang`, sitemap, feeds e OG
images derivam desse valor.
