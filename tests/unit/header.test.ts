import { describe, it, expect } from 'vitest';
import Header from '../../src/components/Header.astro';
import { renderComponent, SITE } from './helpers';

const render = (path: string) => renderComponent(Header, { url: `${SITE}${path}` });

describe('Header — idioma', () => {
  it('traduz os rótulos de navegação em pt', async () => {
    const html = await render('/pt');
    expect(html).toContain('Experiência');
    expect(html).toContain('Escritos');
    expect(html).toContain('Estante');
  });

  it('usa os rótulos em inglês na raiz', async () => {
    const html = await render('/');
    expect(html).toContain('Experience');
    expect(html).toContain('Bookshelf');
  });

  it('o seletor de idioma aponta para /pt/ quando em en', async () => {
    expect(await render('/')).toContain('href="/pt/"');
  });

  it('o seletor de idioma volta para a raiz quando em pt', async () => {
    const html = await render('/pt');
    expect(html).toMatch(/data-lang-switch[^>]*>|href="\/"/);
    expect(html).toContain('EN');
  });

  it('as âncoras de nav são prefixadas em pt', async () => {
    expect(await render('/pt')).toContain('href="/pt/#work"');
  });

  it('as âncoras de nav não são prefixadas em en', async () => {
    expect(await render('/')).toContain('href="/#work"');
  });
});

describe('Header — acessibilidade', () => {
  it('o botão de tema tem nome acessível', async () => {
    expect(await render('/')).toContain('aria-label="Toggle theme"');
  });

  it('o botão de tema tem nome acessível traduzido', async () => {
    expect(await render('/pt')).toContain('aria-label="Alternar tema"');
  });

  it('o hambúrguer declara estado e alvo', async () => {
    const html = await render('/');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('aria-controls="menu-panel"');
  });

  it('o drawer nasce fechado, inert e escondido de leitores', async () => {
    const html = await render('/');
    expect(html).toMatch(/id="menu-panel"[^>]*/);
    expect(html).toContain('aria-hidden="true"');
    expect(html).toContain('inert');
  });

  it('os glifos decorativos estão escondidos de leitores', async () => {
    const html = await render('/');
    const dot = html.match(/<span class="dot"[^>]*>/)?.[0] ?? '';
    expect(dot).toContain('aria-hidden="true"');
  });
});

describe('Header — drawer mobile', () => {
  it('o drawer repete os links do nav mais contato', async () => {
    const html = await render('/');
    const links = html.match(/data-menu-link/g) ?? [];
    expect(links).toHaveLength(5);
    expect(html).toContain('Contact');
  });

  it('a linha de idioma do drawer mostra o idioma corrente', async () => {
    expect(await render('/pt')).toContain('Português');
    expect(await render('/')).toContain('English');
  });
});
