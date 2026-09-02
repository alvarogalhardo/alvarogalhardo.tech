import { describe, it, expect } from 'vitest';
import Base from '../../src/layouts/Base.astro';
import { renderComponent, SITE } from './helpers';

const render = (path: string) =>
  renderComponent(Base, {
    url: `${SITE}${path}`,
    props: { title: 'Título', description: 'Descrição' }
  });

describe('Base.astro', () => {
  it('declara lang en na raiz', async () => {
    expect(await render('/')).toContain('<html lang="en"');
  });

  it('declara lang pt sob /pt', async () => {
    expect(await render('/pt')).toContain('<html lang="pt"');
  });

  it('emite hreflang para os dois idiomas mais x-default', async () => {
    const html = await render('/');
    expect(html).toContain('hreflang="en"');
    expect(html).toContain('hreflang="pt"');
    expect(html).toContain('hreflang="x-default"');
  });

  it('aponta o hreflang pt para a rota prefixada', async () => {
    expect(await render("/")).toContain(`hreflang="pt" href="${SITE}/pt/"`);
  });

  it('o hreflang é recíproco a partir de /pt', async () => {
    expect(await render('/pt')).toContain(`hreflang="en" href="${SITE}/"`);
  });

  it('emite canonical da própria rota', async () => {
    expect(await render("/pt")).toContain(`rel="canonical" href="${SITE}/pt/"`);
  });

  it('aplica o tema antes do body para não piscar', async () => {
    const html = await render('/');
    const script = html.indexOf('av-theme');
    const body = html.indexOf('<body');
    expect(script).toBeGreaterThan(-1);
    expect(script).toBeLessThan(body);
  });
});

describe('coerência entre canonical, hreflang e sitemap', () => {
  const hrefOf = (html: string, re: RegExp) => html.match(re)?.[1] ?? null;

  it('o canonical de uma rota é idêntico ao hreflang do próprio idioma', async () => {
    for (const [path, lang] of [
      ['/', 'en'],
      ['/pt', 'pt']
    ] as const) {
      const html = await render(path);
      const canonical = hrefOf(html, /rel="canonical" href="([^"]+)"/);
      const self = hrefOf(html, new RegExp(`hreflang="${lang}" href="([^"]+)"`));
      expect(canonical, `canonical ausente em ${path}`).not.toBeNull();
      expect(self, `hreflang ${lang} ausente em ${path}`).toBe(canonical);
    }
  });

  it('as duas rotas apontam uma para a outra com a mesma forma de URL', async () => {
    const en = await render('/');
    const pt = await render('/pt');
    expect(hrefOf(en, /hreflang="pt" href="([^"]+)"/)).toBe(
      hrefOf(pt, /rel="canonical" href="([^"]+)"/)
    );
    expect(hrefOf(pt, /hreflang="en" href="([^"]+)"/)).toBe(
      hrefOf(en, /rel="canonical" href="([^"]+)"/)
    );
  });
});
