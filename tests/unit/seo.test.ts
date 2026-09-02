import { describe, it, expect } from 'vitest';
import Base from '../../src/layouts/Base.astro';
import { renderComponent, SITE } from './helpers';

const render = (path: string, props: Record<string, unknown> = {}) =>
  renderComponent(Base, {
    url: `${SITE}${path}`,
    props: { title: 'T', description: 'D', ...props }
  });

describe('Open Graph', () => {
  it('usa a imagem home por padrão', async () => {
    expect(await render('/')).toContain(`og:image" content="${SITE}/og/home.png"`);
  });

  it('usa a imagem do post quando ogSlug é passado', async () => {
    expect(await render('/', { ogSlug: 'lorem-transactions' })).toContain('/og/lorem-transactions.png');
  });

  it('declara twitter:card grande', async () => {
    expect(await render('/')).toContain('name="twitter:card" content="summary_large_image"');
  });

  it('og:url acompanha a rota e bate com o canonical', async () => {
    const html = await render('/pt');
    const og = html.match(/og:url" content="([^"]+)"/)?.[1];
    const canonical = html.match(/rel="canonical" href="([^"]+)"/)?.[1];
    expect(og).toBe(canonical);
  });

  it('og:locale reflete o idioma da rota', async () => {
    expect(await render('/pt')).toContain('og:locale" content="pt_BR"');
    expect(await render('/pt')).toContain('og:locale:alternate" content="en_US"');
    expect(await render('/')).toContain('og:locale" content="en_US"');
  });
});

describe('feed', () => {
  it('a raiz aponta para /rss.xml', async () => {
    const html = await render('/');
    expect(html).toContain('application/rss+xml');
    expect(html).toContain(`href="${SITE}/rss.xml"`);
  });

  it('a rota pt aponta para /pt/rss.xml', async () => {
    expect(await render('/pt')).toContain(`href="${SITE}/pt/rss.xml"`);
  });
});

describe('dados estruturados', () => {
  const parseLd = (html: string) => {
    const m = html.match(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/);
    return m ? JSON.parse(m[1]) : null;
  };

  it('emite um Person válido', async () => {
    const data = parseLd(await render('/'));
    expect(data).not.toBeNull();
    expect(data['@context']).toBe('https://schema.org');
    expect(data['@type']).toBe('Person');
    expect(data.name).toBe('Alvaro Galhardo');
  });

  it('conecta os perfis externos via sameAs', async () => {
    const data = parseLd(await render('/'));
    expect(data.sameAs).toContain('https://github.com/alvarogalhardo');
    expect(data.sameAs).toContain('https://www.linkedin.com/in/alvarogalhardo');
  });

  it('o cargo é traduzido', async () => {
    expect(parseLd(await render('/pt')).jobTitle).toBe('Engenheiro Backend');
    expect(parseLd(await render('/')).jobTitle).toBe('Backend Engineer');
  });

  it('o JSON-LD é parseável nas duas rotas', async () => {
    for (const path of ['/', '/pt']) {
      const html = await render(path);
      expect(() => parseLd(html), `JSON-LD inválido em ${path}`).not.toThrow();
      expect(parseLd(html)).toBeTruthy();
    }
  });
});
