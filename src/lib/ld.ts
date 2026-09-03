/**
 * Serializa um objeto para embutir em `<script type="application/ld+json">`.
 *
 * `JSON.stringify` sozinho nao escapa `<`, `>`, `&` nem os separadores de linha
 * U+2028 / U+2029 — um titulo com `</script>` fecharia a tag e quebraria a
 * pagina. Hoje so entram literais e frontmatter validado por Zod, mas o custo
 * de blindar e uma linha.
 */
const LINE_SEPARATOR = new RegExp('\\u2028', 'g');
const PARAGRAPH_SEPARATOR = new RegExp('\\u2029', 'g');

export function ldJson(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(LINE_SEPARATOR, '\\u2028')
    .replace(PARAGRAPH_SEPARATOR, '\\u2029');
}
