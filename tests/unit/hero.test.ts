import { describe, it, expect } from 'vitest';
import Hero from '../../src/components/Hero.astro';
import { renderComponent, SITE } from './helpers';

const render = (path: string) => renderComponent(Hero, { url: `${SITE}${path}` });

describe('Hero.astro', () => {
  it('renderiza exatamente um h1', async () => {
    const html = await render('/');
    expect(html.match(/<h1[\s>]/g) ?? []).toHaveLength(1);
  });

  it('mostra o cargo em inglês na raiz', async () => {
    expect(await render('/')).toContain('Backend Engineer');
  });

  it('mostra o cargo em português sob /pt', async () => {
    expect(await render('/pt')).toContain('Engenheiro Backend');
  });

  it('traduz a saudação', async () => {
    expect(await render('/pt')).toContain('Oi, eu sou o Alvaro.');
    expect(await render('/')).toContain('Hey, I');
  });

  it('o cta de email é um mailto', async () => {
    expect(await render('/')).toContain('href="mailto:alvaromgfernandes@gmail.com"');
  });

  it('o link externo do github tem rel de segurança', async () => {
    expect(await render('/')).toMatch(/rel="me noopener"/);
  });

  it('não usa data-reveal — protege o LCP', async () => {
    expect(await render('/')).not.toContain('data-reveal');
  });
});
