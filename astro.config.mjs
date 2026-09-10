import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://alvarogalhardo.tech',
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
