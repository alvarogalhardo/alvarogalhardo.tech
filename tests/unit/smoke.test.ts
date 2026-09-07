import { describe, it, expect } from 'vitest';
import config from '../../astro.config.mjs';

describe('astro config', () => {
  it('define en como locale padrão sem prefixo', () => {
    expect(config.i18n?.defaultLocale).toBe('en');
    expect(config.i18n?.locales).toEqual(['en', 'pt']);
    expect(config.i18n?.routing).toMatchObject({ prefixDefaultLocale: false });
  });

  it('define o site para geração de sitemap e canonical', () => {
    expect(config.site).toBe('https://alvarogalhardo.tech');
  });
});
