# Deploy

Site estático, publicado no Cloudflare Pages a partir de `dist/`.

## Local

```bash
npm run dev      # servidor de desenvolvimento em :4321
npm run build    # gera dist/ e valida todo o conteúdo pelo schema Zod
npm run preview  # serve dist/ como em produção
```

## Antes de publicar

```bash
npm test           # 134 testes, roda em segundos
npm run build
npm run check:seo  # canonical, hreflang, títulos e descriptions
```

A CI roda os três a cada push. O `build` não é redundante: é ele que valida o
frontmatter de todo o conteúdo e o tipo dos componentes `.astro`.

## Primeiro deploy (manual, precisa da conta)

No painel do Cloudflare Pages:

1. Criar projeto e conectar ao repositório no GitHub.
2. Build command `npm run build`, output `dist`, Node 22.
3. Apontar `alvarogalhardo.dev` para o projeto.

O `wrangler.toml` já declara `pages_build_output_dir`, então o Cloudflare
reconhece a saída sem configuração extra.

## Depois do primeiro deploy

Rodar a auditoria contra a URL real, não contra o preview local:

```bash
npx lighthouse https://alvarogalhardo.dev --only-categories=performance,accessibility,best-practices,seo --view
```

E conferir na mão:

- `/pt/` carrega e o seletor de idioma navega entre as duas versões.
- `/rss.xml` e `/pt/rss.xml` abrem e validam.
- O preview de link no LinkedIn mostra a OG image.
- Enviar `https://alvarogalhardo.dev/sitemap-index.xml` ao Google Search Console.

## Domínio

`alvarogalhardo.dev` — assumido no `astro.config.mjs` como `site`. Trocar ali se
for outro; canonical, `hreflang`, sitemap, feeds e OG images derivam desse valor.
