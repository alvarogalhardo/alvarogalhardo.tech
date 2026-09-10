import { describe, it, expect } from 'vitest';
import Base from '../../src/layouts/Base.astro';
import { writingLive } from '../../src/data/site';
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
    expect(await render('/', { ogSlug: 'en/lorem-transactions' })).toContain(
      '/og/en/lorem-transactions.png'
    );
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

describe('og:type e article:published_time', () => {
  it('é website por padrão, sem article:published_time', async () => {
    const html = await render('/');
    expect(html).toContain('property="og:type" content="website"');
    expect(html).not.toContain('article:published_time');
  });

  it('vira article com a data quando a página é um post', async () => {
    const html = await render('/writing/lorem-transactions', {
      ogType: 'article',
      publishedTime: '2026-01-02T00:00:00.000Z'
    });
    expect(html).toContain('property="og:type" content="article"');
    expect(html).toContain(
      'property="article:published_time" content="2026-01-02T00:00:00.000Z"'
    );
  });
});

describe('robots', () => {
  it('não emite meta robots quando a prop não é passada', async () => {
    expect(await render('/')).not.toContain('name="robots"');
  });

  it('emite o valor recebido (404 fica fora do índice)', async () => {
    expect(await render('/404', { robots: 'noindex, follow' })).toContain(
      '<meta name="robots" content="noindex, follow"'
    );
  });
});

describe('preload de fonte', () => {
  it('faz preload dos subsets latin de Newsreader e JetBrains Mono', async () => {
    const html = await render('/');
    const preloads = [...html.matchAll(/<link rel="preload"[^>]*as="font"[^>]*>/g)].map(
      (m) => m[0]
    );
    expect(preloads).toHaveLength(2);
    expect(preloads.every((p) => p.includes('crossorigin'))).toBe(true);
    expect(preloads.every((p) => p.includes('type="font/woff2"'))).toBe(true);
    expect(preloads.some((p) => /newsreader-latin-wght-normal[^"]*\.woff2/.test(p))).toBe(true);
    expect(preloads.some((p) => /jetbrains-mono-latin-wght-normal[^"]*\.woff2/.test(p))).toBe(true);
  });
});

describe('feed', () => {
  it('anuncia o feed do idioma só quando writingLive', async () => {
    const en = await render('/');
    expect(en.includes('application/rss+xml')).toBe(writingLive);
    if (writingLive) {
      expect(en).toContain(`href="${SITE}/rss.xml"`);
      expect(await render('/pt')).toContain(`href="${SITE}/pt/rss.xml"`);
    }
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
