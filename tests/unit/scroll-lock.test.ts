import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const css = readFileSync('src/styles/global.css', 'utf8');
const header = readFileSync('src/components/Header.astro', 'utf8');

describe('trava de scroll do drawer', () => {
  it('a regra vive dentro do media query de mobile', () => {
    const mobileBlock = css.slice(css.indexOf('@media (max-width: 700px)'));
    expect(mobileBlock).toContain('body.menu-open');
    expect(mobileBlock).toContain('overflow: hidden');
  });

  it('não existe body.menu-open fora do media query', () => {
    const before = css.slice(0, css.indexOf('@media (max-width: 700px)'));
    expect(before).not.toContain('body.menu-open');
  });

  it('o script não trava o scroll por estilo inline', () => {
    // Estilo inline sobrevive ao viewport crescer e deixa a pagina sem
    // rolagem se o JS nao limpar. O CSS destrava sozinho acima de 700px.
    expect(header).not.toContain('body.style.overflow');
  });

  it('o script alterna a classe em vez do estilo', () => {
    expect(header).toContain("classList.toggle('menu-open'");
  });
});
