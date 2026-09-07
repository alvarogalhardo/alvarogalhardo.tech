import { describe, it, expect } from 'vitest';
import NotFoundSection from '../../src/components/NotFoundSection.astro';
import { renderComponent, SITE } from './helpers';

const render = (path: string) => renderComponent(NotFoundSection, { url: `${SITE}${path}` });

describe('NotFoundSection.astro', () => {
  it('renderiza exatamente um h1', async () => {
    const html = await render('/');
    expect(html.match(/<h1[\s>]/g) ?? []).toHaveLength(1);
  });

  it('mostra o título em inglês na raiz e em português sob /pt', async () => {
    expect(await render('/')).toContain('This route doesn');
    expect(await render('/pt')).toContain('Essa rota não existe.');
  });

  it('o link de volta aponta pra home de cada idioma', async () => {
    expect(await render('/')).toMatch(/href="\/"[^>]*class="btn primary"/);
    expect(await render('/pt')).toMatch(/href="\/pt\/"[^>]*class="btn primary"/);
  });

  it('o cta de email é um mailto', async () => {
    expect(await render('/')).toContain('href="mailto:alvaromgfernandes@gmail.com"');
  });
});
