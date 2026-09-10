import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alvarogalhardo.tech',
  build: {
    // site de 2 páginas: inline todo o CSS — sem request bloqueante nem cadeia crítica
    inlineStylesheets: 'always'
  },
  vite: {
    build: {
      // não inline asset como data: URI — mantém `font-src 'self'` da CSP intacto.
      // Sem isto o Vite embute o subset cyrillic-ext da JetBrains Mono (<4 KB, nunca
      // usado num site EN/PT) como data:font/woff2, que a CSP então bloqueia.
      assetsInlineLimit: 0
    }
  },
  integrations: [
    mdx(),
    sitemap({
      // hreflang codes must match the on-page <link rel="alternate"> in Base.astro
      // (language-only: targets every English / Portuguese reader, not one region).
      // A mismatch makes Google discard the annotations.
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', pt: 'pt' }
      }
    })
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt'],
    routing: { prefixDefaultLocale: false }
  }
});
