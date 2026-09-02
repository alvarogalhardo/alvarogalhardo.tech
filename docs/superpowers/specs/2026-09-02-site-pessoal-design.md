# Site pessoal — spec de design

Data: 2026-09-02
Referência visual: `docs/design/handoff.md` e `docs/design/prototype.dc.html`
Canvas de origem: https://claude.ai/code/artifact/a8c06b6a-ad2a-4216-9eba-d1c8ddca4e89

## Objetivo

Site pessoal de Álvaro Galhardo cujo propósito é gerar oportunidade de trabalho. O leitor é
recrutador ou tech lead. A leitura pretendida é "pleno que pensa como sênior", e a alavanca disso é
evidência de critério técnico — daí a estrutura de spec numerada e a seção de writing dedicada a
decisões. Posicionamento lidera como **backend**, com fullstack como alcance.

Esta fase entrega só o layout, com lorem ipsum. Conteúdo real e a API `/now` em Go são fases
posteriores.

## Decisões que divergem do handoff, e por quê

O handoff é a referência visual e é seguido de perto. Cinco pontos divergem deliberadamente:

1. **Idioma por rota, não por `localStorage`.** O protótipo troca idioma no cliente. O handoff
   inclusive recomenda a mudança ("prefer localised routes ... better for sharing and SEO").
   Adotado: `/` em inglês, `/pt` em português, com `hreflang` recíproco.

2. **`accent` e `accentSoft` do tema claro escurecidos.** Os valores do handoff reprovam WCAG AA
   medidos contra `--bg` claro: `accent` 3.48:1 e `accentSoft` 3.84:1, contra 4.5:1 exigido. Ambos
   pintam texto de 11–12px. Corrigidos mantendo croma e matiz:

   | token | handoff | usado | contraste |
   |---|---|---|---|
   | `--accent` light | `oklch(0.585 0.155 52)` | `oklch(0.52 0.155 52)` | 4.49:1 |
   | `--accentSoft` light | `oklch(0.555 0.09 52)` | `oklch(0.515 0.09 52)` | 4.50:1 |

   O tema escuro passa em tudo e fica intacto: `fg` 14.5:1, `muted` 7.1:1, `accent` 7.9:1,
   `accentSoft` 5.2:1.

3. **Token separado para borda de controle.** O handoff usa `--line` tanto para hairline decorativa
   quanto para borda de botão. Hairline não precisa de contraste; borda de controle precisa de 3:1
   (WCAG 1.4.11), e `--line` entrega 1.4:1. Adicionado `--lineControl`: dark `oklch(0.49 0.012 250)`,
   light `oklch(0.605 0.008 250)`, ambos 3:1. Usado só em `.chip` e `.btn`.

4. **O hero não recebe `data-reveal`.** O handoff manda revelar "eyebrow, h1, paragraphs, button
   rows". O `<h1>` é o elemento de LCP; nascer em `opacity: 0` com transição de 620ms mais atraso
   escalonado atrasa a métrica em quase um segundo sem ganho perceptível, já que o hero está sempre
   visível no load. A revelação começa da primeira seção, abaixo da dobra.

5. **Rótulo de cargo é "Backend Engineer" / "Engenheiro Backend".** O handoff traz "Software
   Engineer". Decisão do dono do site: liderar como backend, que é onde está a força e a intenção de
   contratação; fullstack aparece no texto do about, não no rótulo.

Foco visível: o handoff especifica `outline: 1px`. Usado `2px` — 1px é fino demais para o critério
de aparência de foco do WCAG 2.2 e é o tipo de detalhe que o axe aponta.

## Estrutura

Página única, coluna de `760px`, `padding-inline` `40px` desktop / `22px` mobile. Ordem: header
sticky, intro, `01` experience, `02` projects, `03` writing, `04` bookshelf, `05` contact, footer.
Rotas adicionais: `/writing` (arquivo), `/writing/<slug>` (post), e os equivalentes sob `/pt`.

Breakpoint único em **700px**. Acima: nav horizontal no header. Abaixo: hambúrguer e drawer
deslizante, com trava de scroll no body, `Escape` para fechar, foco movido para o painel na abertura
e devolvido ao hambúrguer no fechamento, `inert` quando fechado.

Grid de linha: `112px 1fr`, gap `26px`; colapsa para uma coluna abaixo de 700px com gap `7px`.

## Tokens

Autorados em `oklch`. Fonte única de verdade: `src/lib/tokens.ts`, espelhado em
`src/styles/tokens.css`. O teste de contraste em `tests/unit/contrast.test.ts` falha se os dois
divergirem em legibilidade.

### Dark (padrão)
`--bg` `oklch(0.185 0.019 252)` · `--fg` `oklch(0.915 0.003 250)` · `--muted` `oklch(0.705 0.006 250)`
· `--line` `oklch(0.315 0.012 250)` · `--lineControl` `oklch(0.49 0.012 250)` · `--accent`
`oklch(0.745 0.145 58)` · `--accentSoft` `oklch(0.63 0.072 58)`

### Light
`--bg` `oklch(0.918 0.004 250)` · `--fg` `oklch(0.335 0.062 254)` · `--muted` `oklch(0.505 0.042 254)`
· `--line` `oklch(0.825 0.008 250)` · `--lineControl` `oklch(0.605 0.008 250)` · `--accent`
`oklch(0.52 0.155 52)` · `--accentSoft` `oklch(0.515 0.09 52)`

## Tipografia

`Newsreader` (serif) para toda prosa; `JetBrains Mono` para metadados, rótulos, nav, botões, datas e
linhas de stack. Auto-hospedadas via `@fontsource-variable`, nunca por CDN.

Escala desktop / mobile (px): h1 `56 / 38` (ou `clamp(2.375rem, 6vw, 3.5rem)`), contato `32 / 25`,
títulos de entrada `21 / 19`, lead `20 / 18`, títulos de post `19 / 17.5`, títulos de livro `18 / 17`,
about `17 / 16`, descrições `16 / 15.5`, mono nav e meta `12 / 11`, rótulos mono `11`.

`tabular-nums` em todas as datas e anos. `text-wrap: balance` no h1, `pretty` nos parágrafos.

## Textura

**Dots** — a única das seis variantes do protótipo que faz parte do design.
`radial-gradient(var(--line) 1px, transparent 1px)`, `background-size: 20px 20px`, opacidade `0.65`
dark / `0.7` light. `position: fixed; inset: 0; pointer-events: none; z-index: 30`,
`aria-hidden="true"`. Sem `mix-blend-mode` — o blend existia só na variante grain, que não é usada.

## Comportamento

**Tema** — `dark` por padrão, persistido em `localStorage` sob `av-theme`, aplicado em
`document.documentElement` por script inline síncrono no `<head>`, antes do primeiro paint. O
background vai no `html`, não num wrapper interno, para que overscroll e a calha da barra de rolagem
acompanhem o tema.

**Revelação no scroll** — `IntersectionObserver`, `rootMargin: '0px 0px -8% 0px'`, `threshold: 0.05`,
`unobserve` após disparar. Transição de `620ms cubic-bezier(.22,.61,.36,1)`, atraso
`min(index * 45ms, 260ms)`. O estado inicial oculto é aplicado **por script, nunca por CSS**, para
que visitante sem JS veja tudo. Pulado inteiramente sob `prefers-reduced-motion: reduce`.

**Âncoras** — `scroll-behavior: smooth` (desligado sob reduced-motion) e `scroll-margin-top` de
`70px` desktop / `62px` mobile nas seções, para o header sticky não cobrir o título.

Efeito de luz laranja seguindo o cursor: prototipado e removido a pedido. Não implementar.

## SEO

Meta de 100 em SEO e acessibilidade no Lighthouse. Cada página emite `<title>` e `description`
únicos, canonical, `hreflang` recíproco mais `x-default`, Open Graph completo (`og:url`, `og:locale`,
`og:locale:alternate`, `og:image` gerada por rota) e JSON-LD — `Person` no layout base, `BlogPosting`
em cada post. Sitemap com config `i18n` para que as traduções sejam relacionadas em vez de tratadas
como páginas concorrentes. `robots.txt` apontando o sitemap.

## Acessibilidade

Landmarks reais (`header`, `main`, `footer`, `section`), um único `h1` por página, `aria-hidden` na
textura e no glifo `↗`, `aria-label` nos botões só-ícone, anel de foco visível em todo controle,
`aria-hidden` e `inert` no drawer fechado, e o caminho de movimento reduzido. Contraste AA nos dois
temas, verificado por teste.
