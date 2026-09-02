import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const reveal = readFileSync('src/components/Reveal.astro', 'utf8');
const texture = readFileSync('src/components/Texture.astro', 'utf8');
// Só o bloco <style>: o frontmatter comenta o porquê de evitar mix-blend-mode,
// e uma busca no arquivo inteiro casaria com a própria explicação.
const textureCss = texture.slice(texture.indexOf('<style>'));

describe('Reveal.astro', () => {
  it('não contém bloco de estilo — o ocultamento é só por JS', () => {
    // Se opacity:0 morasse no CSS, uma falha de JS deixaria a pagina em branco.
    expect(reveal).not.toContain('<style');
  });

  it('checa prefers-reduced-motion antes de esconder', () => {
    const guard = reveal.indexOf('prefers-reduced-motion');
    const hide = reveal.indexOf("opacity = '0'");
    expect(guard).toBeGreaterThan(-1);
    expect(hide).toBeGreaterThan(-1);
    expect(guard).toBeLessThan(hide);
  });

  it('só esconde quando IntersectionObserver existe', () => {
    expect(reveal).toContain("'IntersectionObserver' in window");
  });

  it('para de observar depois de revelar', () => {
    expect(reveal).toContain('io.unobserve(entry.target)');
  });
});

describe('Texture.astro', () => {
  it('usa a variante dots escolhida no handoff', () => {
    expect(texture).toContain('radial-gradient');
    expect(texture).toContain('20px 20px');
  });

  it('não intercepta cliques', () => {
    expect(texture).toContain('pointer-events: none');
  });

  it('está escondida de leitores de tela', () => {
    expect(texture).toContain('aria-hidden="true"');
  });

  it('não usa mix-blend-mode, que escureceria o texto', () => {
    expect(textureCss).not.toContain('mix-blend-mode');
  });

  it('a opacidade vem do token, que muda por tema', () => {
    expect(texture).toContain('var(--texture-opacity)');
  });
});

describe('Reveal — rede de segurança', () => {
  const src = readFileSync('src/components/Reveal.astro', 'utf8');

  it('marca que o observer deu sinal de vida', () => {
    expect(src).toContain('alive = true');
  });

  it('tem um timeout que restaura tudo se o observer nunca disparar', () => {
    expect(src).toContain('setTimeout');
    expect(src).toContain('io.disconnect()');
    expect(src).toContain('restore(el)');
  });

  it('a restauração limpa opacity, transform e transition', () => {
    const fn = src.slice(src.indexOf('function restore'), src.indexOf('if (!reduce'));
    expect(fn).toContain("el.style.opacity = ''");
    expect(fn).toContain("el.style.transform = ''");
    expect(fn).toContain("el.style.transition = ''");
  });
});
