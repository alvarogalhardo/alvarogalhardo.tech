# Handoff: Personal site / portfolio — Alvaro

## Overview
A single-page personal site for a software engineer. One long scroll: intro (greeting + about), experience, projects, writing index, bookshelf, contact, footer. Bilingual (English / Portuguese) with a light and a dark theme, both user-toggleable and persisted. Fully responsive: below 700px the layout collapses to a single column and the header nav becomes a slide-in drawer. Deliberately minimal and text-first — no imagery, no cards-with-gradients, no illustrations. The visual interest comes from type, hairline rules, one accent colour and a faint dotted background texture.

## About the Design Files
The file in this bundle (`Alvaro Portfolio.dc.html`) is a **design reference created in HTML** — a prototype showing intended look and behaviour, not production code to copy directly. The task is to **recreate this design in the target codebase's environment** using its established patterns (Next.js / Astro / SvelteKit / plain HTML+CSS — whatever exists). If no codebase exists yet, pick the most appropriate stack; for a static personal site with a blog, Astro or Next.js with MDX are both good fits.

Two things in the prototype are artifacts of the prototyping environment and should NOT be reproduced as-is:
- All styling is written as **inline styles**. In the real implementation use a stylesheet / CSS modules / Tailwind — whatever the codebase uses. The CSS custom properties described below are the intended real mechanism.
- Section content lives in two big JS objects (`EN`, `PT`). In the real implementation this should be a proper i18n setup (dictionary files, or route-based `/en` `/pt`) and the blog should be file-based content (MDX/Markdown), not hardcoded arrays.

## Fidelity
**High-fidelity.** Colours, type, spacing, and interaction details are final and should be matched closely. Exact values are in Design Tokens below. Copy is final in structure and tone but contains bracketed placeholders (`[Company]`, `[Project One]`, `[Book title]`) — the site owner will supply real content.

## Screens / Views

There is one page. Sections are described in document order.

### Global shell

**Page background:** `--bg`, set on `html` so overscroll and the scrollbar gutter match the theme. Do not set the background only on an inner wrapper — that causes a dark flash in light mode.

**Texture overlay:** a `position: fixed; inset: 0; pointer-events: none; z-index: 30` element above the background but below nothing interactive (it can't receive events). Chosen texture: **dots**.
- `background-image: radial-gradient(var(--line) 1px, transparent 1px)`
- `background-size: 20px 20px`
- `opacity: 0.65` in dark, `0.7` in light
- `aria-hidden="true"`

The prototype also contains alternative textures (grain via an inline SVG `feTurbulence` data-URI, 72px grid, 48° hatch, grain+grid, none) used for exploration. **Only `dots` needs to be implemented.** Others are documented in the source if wanted later.

**Content column:** `max-width: 760px; margin: 0 auto; padding-inline: 40px` on desktop; `padding-inline: 22px` below the 700px breakpoint. Every section (header row, main, footer row) shares this column.

**Breakpoint:** a single breakpoint at **700px**. In the prototype it is evaluated in JS (`window.innerWidth`) because the prototype is inline-styled; **implement it as a `@media (max-width: 700px)` block**, not with JS. Every value that differs between the two states is listed per component below as `desktop / mobile`.

### Header (sticky)
- `position: sticky; top: 0; z-index: 20`
- Background `--bgFade` (the theme background at 84% alpha) + `backdrop-filter: blur(10px)`
- `border-bottom: 1px solid --line`
- Inner row: same 760px column, `padding: 16px 40px`, `display: flex; justify-content: space-between; align-items: center; gap: 24px`
- Font: JetBrains Mono 12px, `letter-spacing: 0.04em`
- **Left:** a 6px accent-coloured dot (`border-radius: 50%`, `background: --accent`) + the word "Alvaro", `gap: 9px`, colour `--fg`, links to `#top`
- **Right nav:** `display: flex; align-items: center; gap: 18px`, colour `--muted`. Links: Experience, Projects, Writing, Bookshelf (localised). Each has `border-bottom: 1px solid transparent`; on hover the border becomes `--accent`. Then a `1px × 14px` `--line` divider, then two buttons.
- **Buttons** (language + theme): `background: transparent; border: 1px solid --line; color: --muted; padding: 4px 8px; border-radius: 3px; transition: all 160ms ease`. Hover: border and text become `--accent`.
  - Language button label is the *other* language: shows `PT` when in English, `EN` when in Portuguese.
  - Theme button label is a glyph: `☀` when dark (click → light), `☾` when light (click → dark).
  - On mobile these two buttons are `min-height/min-width: 44px`, `padding: 0 12px`, `display: inline-flex` and centred.

**Mobile header (≤700px):** row padding `12px 22px`, `gap: 12px`. The four section links, the divider, and the two toggle buttons are all hidden (`display: none`) and replaced by a single hamburger button on the right:
- `44 × 44px`, `border: 1px solid --line`, `border-radius: 3px`, `background: transparent`, `display: inline-flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px`
- Three bars, each `16 × 1px`, `background: --muted`
- Hover/active: border → `--accent`
- `aria-label` = "Menu" (localised)

### Mobile drawer (≤700px only)
Opened by the hamburger. Two elements:

**Backdrop:** `position: fixed; inset: 0; background: oklch(0.12 0.02 252 / 0.5); backdrop-filter: blur(2px); z-index: 38`. `opacity` 0 → 1 with `transition: opacity 240ms ease`; `pointer-events: none` when closed. Clicking it closes the drawer.

**Panel** (`<aside>`): `position: fixed; top/right/bottom: 0; width: 82%; max-width: 320px; z-index: 39; background: --bg; border-left: 1px solid --line; padding: 18px 22px 30px; display: flex; flex-direction: column`.
- Closed: `transform: translateX(103%)`, `visibility: hidden`, `aria-hidden="true"`, `inert`.
- Open: `transform: translateX(0)`, `visibility: visible`, `box-shadow: -24px 0 70px oklch(0 0 0 / 0.32)`.
- `transition: transform 300ms cubic-bezier(.22,.61,.36,1)`. Visibility is delayed on close (`visibility 0s linear 300ms`) so the slide-out still animates; on open it applies immediately.
- Body scroll is locked (`overflow: hidden` on `body`) while open.

**Panel contents, top to bottom:**
1. Head row: `display: flex; justify-content: space-between; align-items: center; padding-bottom: 14px; margin-bottom: 10px; border-bottom: 1px solid --line`. Left: the word "Menu" / "Menu" in JetBrains Mono 11px, `letter-spacing: 0.18em`, uppercase, `--muted`. Right: a `44 × 44px` ✕ close button, same border/radius treatment as the hamburger.
2. Five section links (Experience, Projects, Writing, Bookshelf, Contact): `display: flex; align-items: center; min-height: 50px; font-size: 21px` (Newsreader), `border-bottom: 1px solid --line`. Tapping one closes the drawer and jumps to the section.
3. Two setting rows, same 1px divider, `min-height: 52px`, `display: flex; justify-content: space-between; align-items: center`. Left label Newsreader 17px `--fg`; right value JetBrains Mono 12px `--accent`, `letter-spacing: 0.06em`. Rows are buttons that toggle in place and update their own value:
   - `Language` / `Idioma` → value is the *current* language name: `English` / `Português`
   - `Theme` / `Tema` → value is the current theme name: `Dark`/`Light`, `Escuro`/`Claro`
4. Footer line pinned to the bottom (`margin-top: auto; padding-top: 20px`): the copyright string, JetBrains Mono 11px `--muted`.

Keyboard/AX requirements: focus should move into the panel on open and return to the hamburger on close; `Escape` should close it (not implemented in the prototype — please add).

### Intro
`padding: 110px 0 76px`
1. Eyebrow: role label. JetBrains Mono 11px, `letter-spacing: 0.2em`, uppercase, colour `--accent`. Text: "Software Engineer" / "Engenheiro de Software". `margin-bottom: 22px`.
2. `h1`: Newsreader 56px, weight 400, `line-height: 1.04`, `letter-spacing: -0.02em`, `text-wrap: balance`. Text: "Hey, I'm Alvaro." / "Oi, eu sou o Alvaro." `margin-bottom: 30px`.
3. Lead paragraph: Newsreader 20px, `line-height: 1.58`, colour `--fg`, `max-width: 54ch`.
4. Two about paragraphs: Newsreader 17px, `line-height: 1.74`, colour `--muted`, `max-width: 58ch`. Column `gap: 18px`, `text-wrap: pretty` on all three.
5. Button row, `margin-top: 34px`, `gap: 10px`, JetBrains Mono 12px, wraps:
   - Primary: `border: 1px solid --accent; color: --accent; padding: 10px 16px; border-radius: 3px`. Hover: `background: --accent; color: --bg`. Label is the email address.
   - Secondary ×2 (Resume PDF, GitHub): `border: 1px solid --line; color: --muted`, same padding/radius. Hover: border and text → `--fg`.

### Section headers (Experience / Projects / Writing / Bookshelf / Contact)
A consistent row: `display: flex; align-items: center; gap: 14px`, JetBrains Mono 11px, `letter-spacing: 0.2em`, uppercase, colour `--muted`. Contents: a two-digit index in `--accent` (`01`–`05`), the section label, then a `flex: 1; height: 1px; background: --line` rule filling the remaining width.

### Experience (`#work`)
`padding: 16px 0 72px`. Each of 3 entries:
- `display: grid; grid-template-columns: 112px 1fr; gap: 26px; padding: 22px 0; border-bottom: 1px solid --line`
- Left cell: period, JetBrains Mono 12px, `font-variant-numeric: tabular-nums`, `--muted`, `padding-top: 7px`. Format `2023 — now`.
- Right cell, `gap: 8px`:
  - Title line: Newsreader 21px, `line-height: 1.25` — `{role}` + a `--muted` middot + `{org}` in italic.
  - Description: Newsreader 16px, `line-height: 1.66`, `--muted`, `max-width: 54ch`, `text-wrap: pretty`.
  - Stack line: JetBrains Mono 11px, `letter-spacing: 0.06em`, colour `--accentSoft`, items separated by ` · `.

### Projects (`#projects`)
Same 112px / 1fr grid as Experience; each row is an `<a>`. Left cell is the year. Right cell:
- Name line: Newsreader 21px, name with `border-bottom: 1px solid --line`, followed by an `↗` in JetBrains Mono 12px `--accent`, `gap: 9px`, baseline aligned.
- Description and stack line identical to Experience.

### Writing (`#writing`)
Same grid, tighter: `padding: 16px 0`, `align-items: baseline`. Left cell date (`Jul 2026`), mono 12px tabular, `--muted`. Right cell title, Newsreader 19px, `line-height: 1.4`. Rows are links to the post.
Below the list, `margin-top: 20px`: "All posts →" / "Todos os textos →", JetBrains Mono 12px `--muted`, with `border-bottom: 1px solid --line`.

### Bookshelf (`#shelf`)
Intro line under the header: Newsreader 16px *italic*, `--muted`, `max-width: 56ch`.
Each entry: same grid, `padding: 14px 0`, `align-items: baseline`.
- Left cell: reading status, JetBrains Mono 11px, `letter-spacing: 0.12em`, uppercase, colour `--accentSoft`. Values: Reading / Finished / Next (Lendo / Lido / Próximo).
- Right cell: Newsreader 18px — title, then author in `--muted` italic.

### Contact (`#contact`)
`padding: 26px 0 40px`. Section header, then a statement: Newsreader 32px, `line-height: 1.28`, `letter-spacing: -0.015em`, `max-width: 40ch`, `text-wrap: pretty`. Then the same button row as the intro (email primary, LinkedIn + GitHub secondary).

### Footer
`border-top: 1px solid --line`. Same 760px column, `padding: 22px 40px 40px`, `display: flex; justify-content: space-between`, JetBrains Mono 11px, `--muted`. Left: `© 2026 Alvaro — built by hand` / `feito à mão`. Right: "Back to top ↑" linking to `#top`.

## Interactions & Behavior

**Theme toggle** — swaps the whole custom-property map. Persisted to `localStorage`. Applied to `document.documentElement` so `html`'s background follows. `body`/`html` carry `transition: background 220ms ease, color 220ms ease`.

**Language toggle** — swaps the content dictionary. Persisted to `localStorage`. In a real implementation prefer localised routes (`/` and `/pt`) with `<link rel="alternate" hreflang>` and a `lang` attribute on `<html>` — better for sharing and SEO than a client-only toggle. Defaults: **dark theme, English**, unless a stored preference exists.

**Scroll reveal** — every revealable element (`[data-reveal]`: eyebrow, h1, paragraphs, button rows, section headers, and each list row) starts at `opacity: 0; transform: translateY(10px)` and animates to `opacity: 1; transform: none` when it enters the viewport.
- `transition: opacity 620ms cubic-bezier(.22,.61,.36,1), transform 620ms cubic-bezier(.22,.61,.36,1)`
- Stagger: `min(index * 45ms, 260ms)` delay
- `IntersectionObserver` with `rootMargin: '0px 0px -8% 0px'`, `threshold: 0.05`, unobserved after firing (reveal once, never re-hide)
- **Skipped entirely** when `prefers-reduced-motion: reduce` — elements render fully visible, no observer created. Important: the initial hidden state must be applied by script, not in the stylesheet, so a no-JS visitor still sees all content.

**Anchor nav** — `html { scroll-behavior: smooth }`. Because the header is sticky and ~53px tall, add `scroll-margin-top` (≈70px) to each section so headings aren't hidden under it. (Not present in the prototype — please add.)

**Hover states** — enumerated per component above. All transitions `160ms ease` except the reveal.

**Selection** — `::selection { background: var(--accent); color: var(--bg) }`.

**Responsive** — single breakpoint at 700px. Desktop / mobile values:
- Content padding `40px / 22px`; header row padding `16px / 12px`.
- All four `112px 1fr` grids collapse to `1fr`, meta cell above the content, `gap: 26px / 7px`; the meta cell loses its `padding-top: 7px`. Row padding: experience & projects `22px / 20px`, writing `16px / 14px`, books `14px / 13px`.
- Type: h1 `56px / 38px` (line-height `1.04 / 1.10`); lead `20px / 18px`; about body `17px / 16px`; entry titles `21px / 19px`; descriptions `16px / 15.5px`; post titles `19px / 17.5px`; book titles `18px / 17px`; contact statement `32px / 25px`; meta `12px / 11px` (mobile meta gains `letter-spacing: 0.06em`).
- Section rhythm: intro `110px 0 76px / 62px 0 52px`; other sections `16px 0 72px / 12px 0 52px`; contact `26px 0 40px / 12px 0 34px`.
- Buttons: padding `10px 16px / 13px 16px` (≥44px tall on mobile). Footer row switches to `flex-direction: column`, `gap: 20px / 10px`.
- Header nav → hamburger + drawer (see above). `scroll-margin-top: 70px / 62px`.
- If you prefer fluid type over the step change, `clamp(2.375rem, 6vw, 3.5rem)` matches the h1 endpoints.

## State Management
- `theme: 'dark' | 'light'` — default `'dark'`, hydrated from `localStorage`. To avoid a flash of the wrong theme on load, read it in a small blocking inline script in `<head>` and set the attribute/vars before first paint.
- `lang: 'en' | 'pt'` — default `'en'`, hydrated from `localStorage` (or from the route, if route-based).
- `menu: boolean` — mobile drawer open state; only meaningful below the breakpoint. Reset it to closed if the viewport crosses back above 700px.
- No data fetching. Experience, projects, posts and books are content: posts should be MDX/Markdown files; experience, projects and the bookshelf are fine as typed data files (JSON/TS), each entry needing both language variants.

## Design Tokens

Colours are authored in `oklch`. Hex equivalents are approximate sRGB conversions for reference — prefer the `oklch` values.

### Dark theme (default)
| Token | oklch | ≈ hex | Use |
|---|---|---|---|
| `--bg` | `oklch(0.185 0.019 252)` | `#151a21` | page background (deep navy) |
| `--bgFade` | `oklch(0.185 0.019 252 / 0.84)` | — | sticky header behind blur |
| `--fg` | `oklch(0.915 0.003 250)` | `#e4e4e5` | body text (near-neutral light gray) |
| `--muted` | `oklch(0.705 0.006 250)` | `#a8a8aa` | secondary text, meta |
| `--line` | `oklch(0.315 0.012 250)` | `#333940` | hairlines, borders, dots |
| `--accent` | `oklch(0.745 0.145 58)` | `#e79a4f` | accent (orange) |
| `--accentSoft` | `oklch(0.63 0.072 58)` | `#b3855f` | stack lines, book status |

### Light theme
| Token | oklch | ≈ hex | Use |
|---|---|---|---|
| `--bg` | `oklch(0.918 0.004 250)` | `#e6e6e7` | page background (gray) |
| `--bgFade` | `oklch(0.918 0.004 250 / 0.84)` | — | sticky header behind blur |
| `--fg` | `oklch(0.335 0.062 254)` | `#2c3f5c` | body text (blue) |
| `--muted` | `oklch(0.505 0.042 254)` | `#5e6b81` | secondary text |
| `--line` | `oklch(0.825 0.008 250)` | `#cbcbcd` | hairlines, dots |
| `--accent` | `oklch(0.585 0.155 52)` | `#b26a2a` | accent (orange, darkened for contrast) |
| `--accentSoft` | `oklch(0.555 0.09 52)` | `#96704e` | stack lines, book status |

### Typography
- **Serif — Newsreader** (Google Fonts), weights 300/400/500 + italic 400/500, variable optical size `6..72`. Used for all prose, headings, titles.
- **Mono — JetBrains Mono** (Google Fonts), weights 400/500. Used for meta, labels, nav, buttons, stack lines, dates.
- Scale (px): 56 h1 / 32 contact statement / 21 entry titles / 20 lead / 19 post titles / 18 book titles / 17 about body / 16 descriptions / 12 mono nav+meta / 11 mono labels.
- Letter-spacing: `-0.02em` h1, `-0.015em` contact statement, `0.2em` uppercase section labels, `0.12em` book status, `0.06em` stack lines, `0.04em` header nav.
- Line-height: `1.04` h1, `1.28` contact statement, `1.25` entry titles, `1.58` lead, `1.74` about body, `1.66` descriptions, `1.4` post titles.
- `font-variant-numeric: tabular-nums` on all dates and years.
- `text-wrap: balance` on the h1; `text-wrap: pretty` on paragraphs.

### Spacing & shape
- Content column `760px`; column padding `40px`.
- Section rhythm: intro `110px` top / `76px` bottom; other sections `16px` top / `72px` bottom.
- Row padding: `22px` (experience, projects), `16px` (writing), `14px` (books).
- Grid: `112px 1fr`, `gap: 26px`.
- Border radius: `3px` on buttons, `50%` on the two dots. Nothing else is rounded.
- No shadows anywhere except the open mobile drawer (`-24px 0 70px oklch(0 0 0 / 0.32)`). Depth otherwise comes from the 1px `--line` hairlines only.

## Assets
None. No images, no icon library. The only non-text glyphs are Unicode characters: `↗` (project link), `↑` (back to top), `☀` / `☾` (theme toggle), `✕` (drawer close), `·` and `—` in copy. The hamburger is three 16×1px divs, not an icon. If the theme toggle glyphs render inconsistently across platforms, swap them for two small inline SVG icons.

Fonts load from Google Fonts:
`https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500&family=JetBrains+Mono:wght@400;500&display=swap`
Self-hosting both (subset to latin + latin-ext for Portuguese diacritics) is recommended.

## Content notes
All copy in the prototype is final in tone and structure. Bracketed values are placeholders for the owner to fill: `[Company]`, `[City]`, `[product area]`, `[domain]`, `[n]`, `[Project One…Three]` / `[Projeto Um…Três]`, `[Book title]` / `[Título do livro]`, `[Author]` / `[Autor]`, plus `you@email.com`. Both languages must be kept in sync — Portuguese is not a machine translation of the English and should be edited as its own copy.

## Files
- `Alvaro Portfolio.dc.html` — the design reference. Open it in a browser: the theme and language toggles work, scroll reveals fire, and the layout switches at 700px (narrow the window, or set the `preview` prop to `mobile` to force it). All six texture options exist in the source (`texture()` in the script) though only `dots` is part of the design. The `styles(n, …)` function in the script is the authoritative source for every desktop/mobile value — `n` is true on mobile.

A cursor-following orange light was prototyped and **removed** at the client's request. Do not implement it.

Accessibility to preserve when rebuilding: real landmark elements (`header`, `main`, `footer`, `section`), a single `h1`, `aria-hidden` on the texture overlay, `title`/`aria-label` on the two icon-only toggle buttons, visible focus rings (`:focus-visible { outline: 1px solid var(--accent); outline-offset: 3px }`), `aria-hidden` + `inert` on the closed drawer, and the reduced-motion path.
