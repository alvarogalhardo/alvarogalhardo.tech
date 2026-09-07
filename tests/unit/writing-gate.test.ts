import { describe, it, expect } from 'vitest';
import ShelfSection from '../../src/components/ShelfSection.astro';
import ContactSection from '../../src/components/ContactSection.astro';
import WritingArchive from '../../src/components/WritingArchive.astro';
import { writingLive } from '../../src/data/site';
import { renderComponent, SITE } from './helpers';

const at = (Comp: unknown, path = '/', props: Record<string, unknown> = {}) =>
  renderComponent(Comp, { url: `${SITE}${path}`, props });

// Enquanto não há post publicado, writingLive é false: a seção 03 some da home
// e estante/contato sobem um número. Ao publicar o primeiro post, virar
// src/data/site.ts e estes números voltam para 04/05.
describe('numeração das seções segue writingLive', () => {
  it('estante é 03 sem writing, 04 com', async () => {
    const num = (await at(ShelfSection)).match(/class="num"[^>]*>(\d\d)</)?.[1];
    expect(num).toBe(writingLive ? '04' : '03');
  });

  it('contato é 04 sem writing, 05 com', async () => {
    const num = (await at(ContactSection)).match(/class="num"[^>]*>(\d\d)</)?.[1];
    expect(num).toBe(writingLive ? '05' : '04');
  });
});

describe('WritingArchive', () => {
  const posts = [
    { slug: 'a', title: 'Post A', date: new Date('2026-07-14'), summary: 'Resumo A.' },
    { slug: 'b', title: 'Post B', date: new Date('2026-04-02'), summary: 'Resumo B.' }
  ];

  it('lista uma linha por post, com link prefixado no idioma', async () => {
    const html = await at(WritingArchive, '/pt', { posts, lang: 'pt' });
    expect(html).toContain('Post A');
    expect(html).toContain('Resumo B.');
    expect(html).toContain('href="/pt/writing/a/"');
  });

  it('tem um h1 para a rota de arquivo', async () => {
    const html = await at(WritingArchive, '/', { posts, lang: 'en' });
    expect(html).toMatch(/<h1[^>]*>Writing<\/h1>/);
  });
});
