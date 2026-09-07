// Pós-build: garante o 404 em português no Cloudflare Workers.
//
// O Workers (static assets) com `not_found_handling = "404-page"` serve o
// `404.html` mais próximo subindo a árvore de diretórios. O Astro gera o 404 PT
// como `pt/404/index.html` (build em formato de diretório), que essa subida
// nunca encontra — então uma rota `/pt/*` inexistente cairia no `dist/404.html`
// da raiz, que está em inglês.
//
// No Cloudflare Pages isso era resolvido por `public/_redirects`
// (`/pt/*  /pt/404/  404`). O Workers rejeita esse arquivo — status 404 não é
// válido em `_redirects` lá. Por isso copiamos o 404 PT para `dist/pt/404.html`,
// onde a subida da árvore o encontra: `/pt/qualquer-coisa` -> 404 em português,
// com status HTTP 404.
//
// Roda dentro de `npm run build`, então vale igual em local e no Workers Builds.

import { access, copyFile } from 'node:fs/promises';

const src = 'dist/pt/404/index.html';
const dest = 'dist/pt/404.html';

try {
  await access(src);
} catch {
  console.error(
    `postbuild: ${src} não existe. O build rodou? A rota src/pages/pt/404.astro mudou de lugar?`
  );
  process.exit(1);
}

await copyFile(src, dest);
console.log(`postbuild: ${dest} escrito (fallback de 404 /pt/* no Workers)`);
