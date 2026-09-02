# Auditoria — 2026-09-02

Executada sobre o build de produção (`npm run build && astro preview`), na v1
de layout com lorem ipsum.

## Lighthouse

| rota | performance | acessibilidade | boas práticas | SEO |
|---|---|---|---|---|
| `/` | 100 | 100 | 100 | 100 |
| `/pt/` | 100 | 100 | 100 | 100 |
| `/writing/` | 100 | 100 | 100 | 100 |
| `/writing/lorem-transactions/` | 100 | 100 | 100 | 100 |

Zero auditorias reprovadas em todas as rotas.

Métricas em `/`: FCP 1.5s, LCP 1.5s, TBT 0ms, **CLS 0**, Speed Index 1.5s.

O LCP baixo é consequência direta de não animar o hero: o `<h1>` é o elemento
de LCP e é pintado imediatamente. O CLS zero vem das fontes auto-hospedadas via
`@fontsource-variable`, sem troca tardia de família.

## SEO estrutural

`python scripts/check-seo.py` — roda na CI a cada push.

- 7 páginas, canonical idêntico ao `hreflang` do próprio idioma em todas.
- Pares `/` ↔ `/pt/` e `/writing/` ↔ `/pt/writing/` recíprocos.
- Páginas de post não declaram `hreflang` (existem em um idioma só) — correto:
  declarar uma tradução inexistente faz o Google descartar o par.
- 7 títulos únicos, 7 descriptions únicas.
- Sitemap com `i18n`, relacionando as traduções via `xhtml:link`.
- JSON-LD `Person` em toda página e `BlogPosting` em cada post.

## Verificado no browser

- Alternância de tema: troca e **persiste através de navegação de página inteira**.
- Alternância de idioma: navega para a rota, traduz tudo, preserva o tema.
- Sem flash de tema: o script inline é o primeiro executável do `<head>`.
- Drawer mobile: `inert` e `aria-hidden` corretos, `Escape` fecha, foco entra no
  painel ao abrir e volta ao hambúrguer ao fechar.
- Trava de scroll: confirmado que o CSS destrava acima de 700px mesmo quando o
  JS não limpa o estado.
- Reveal: com o observer inoperante, a rede de segurança restaura os 18
  elementos — nenhum conteúdo fica invisível.
- Sem rolagem horizontal.

## Pendências

Nenhuma bloqueia o deploy; todas são conteúdo, não código.

- `/cv.pdf` está linkado no hero e ainda não existe (404 se clicado). Colocar o
  arquivo em `public/` ou remover o botão.
- Todo o texto visível é lorem ipsum.
- Os placeholders `[Company]`, `[Project One]`, `[Book title]`, `[Author]`
  precisam dos valores reais.
- `docs/design/handoff.md` lembra que o texto em português deve ser escrito como
  texto próprio, não traduzido automaticamente do inglês.

## Como repetir

```bash
npm run build
npx astro preview --port 4322 &
python scripts/check-seo.py
npx lighthouse http://localhost:4322/ --only-categories=performance,accessibility,best-practices,seo --view
```
