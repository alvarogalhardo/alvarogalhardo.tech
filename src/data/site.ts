/**
 * Chaves de configuração do site que não são conteúdo nem token de design.
 */

/**
 * A seção de writing existe (bloco na home, item de nav, rota `/writing/`,
 * feeds RSS no `<head>`) só quando isto é `true`.
 *
 * Está `false` porque ainda não há post publicado — a home mostraria um bloco
 * "Writing" vazio com um link "All posts →" pra um arquivo vazio.
 *
 * Pra ligar: escrever um post real, tirar o `draft: true` do frontmatter dele
 * (e do par traduzido) e virar isto pra `true`. A numeração das seções se
 * ajusta sozinha, porque `src/lib/sections.ts` lê este mesmo valor.
 */
export const writingLive = false;
