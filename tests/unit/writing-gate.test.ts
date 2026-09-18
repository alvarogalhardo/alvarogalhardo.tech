import { describe, it, expect } from 'vitest';
import ShelfSection from '../../src/components/ShelfSection.astro';
import ContactSection from '../../src/components/ContactSection.astro';
import WritingArchive from '../../src/components/WritingArchive.astro';
import { writingLive } from '../../src/data/site';
import { sectionNum } from '../../src/lib/sections';
import { renderComponent, SITE } from './helpers';

const at = (Comp: unknown, path = '/', props: Record<string, unknown> = {}) =>
  renderComponent(Comp, { url: `${SITE}${path}`, props });

// Enquanto não há post publicado, writingLive é false: a seção de writing some
// da home e estante/contato sobem um número. A ordem canônica vive em
// src/lib/sections.ts, e o que estes testes checam é que o componente
// renderiza exatamente o número que aquela ordem calcula.
describe('numeração das seções segue writingLive', () => {
  it('estante renderiza o número da ordem', async () => {
    const num = (await at(ShelfSection)).match(/class="num"[^>]*>(\d\d)</)?.[1];
    expect(num).toBe(sectionNum('shelf'));
    expect(num).toBe(writingLive ? '05' : '04');
  });

  it('contato renderiza o número da ordem', async () => {
    const num = (await at(ContactSection)).match(/class="num"[^>]*>(\d\d)</)?.[1];
    expect(num).toBe(sectionNum('contact'));
    expect(num).toBe(writingLive ? '06' : '05');
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
