/**
 * Chaves de configuração do site que não são conteúdo nem token de design.
 */

/**
 * A seção de writing existe (seção `03` da home, item de nav, rota `/writing/`,
 * feeds RSS no `<head>`) só quando isto é `true`.
 *
 * Está `false` porque ainda não há post publicado — a home mostraria um bloco
 * "03 — Writing" vazio com um link "All posts →" pra um arquivo vazio.
 *
 * Pra ligar: escrever um post real, tirar o `draft: true` do frontmatter dele
 * (e do par traduzido) e virar isto pra `true`. Aí a seção volta ao lugar,
 * `ShelfSection` volta a ser `04` e `ContactSection` `05`.
 */
export const writingLive = false;
