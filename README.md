# alvarogalhardo.dev

Site pessoal. Astro, estático, bilíngue por rota (`/` em inglês, `/pt` em
português), tema claro e escuro.

## Estado

v1 de layout. A estrutura está completa e auditada; **todo o texto visível ainda
é lorem ipsum**. Ver as pendências em [docs/auditoria.md](docs/auditoria.md).

## Comandos

```bash
npm run dev        # desenvolvimento
npm test           # 134 testes em Vitest
npm run build      # build + validação de conteúdo
npm run check:seo  # auditoria de SEO sobre dist/
```

## Como está organizado

```
src/
├── content/          posts e projetos em MDX, por idioma
├── content.config.ts schemas Zod — o build falha com frontmatter inválido
├── data/             experiência e estante (dados tipados, não conteúdo)
├── i18n/             dicionário e resolução de rota por idioma
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
responsividade são auditoria manual, registrada em `docs/auditoria.md`.

O teste de contraste é o mais útil: ele calcula o contraste WCAG de cada par
texto/fundo nos dois temas e falhou de verdade quando as cores do design não
passavam.

## Design

O design vive em [docs/design/handoff.md](docs/design/handoff.md) e no protótipo
em `docs/design/prototype.dc.html`. As divergências deliberadas entre o handoff e
a implementação estão em
[docs/superpowers/specs/2026-09-02-site-pessoal-design.md](docs/superpowers/specs/2026-09-02-site-pessoal-design.md).

## Deploy

Cloudflare Pages. Ver [docs/deploy.md](docs/deploy.md).
