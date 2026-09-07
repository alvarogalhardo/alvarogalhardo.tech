import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';

const reveal = readFileSync('src/components/Reveal.astro', 'utf8');
const texture = readFileSync('src/components/Texture.astro', 'utf8');
const textureCss = texture.slice(texture.indexOf('<style>'));

describe('Reveal.astro', () => {
  it('não contém bloco de estilo — o ocultamento é só por JS', () => {
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

  it('fica atrás do conteúdo, não à frente', () => {
    const z = textureCss.match(/z-index:\s*(-?\d+)/)?.[1];
    expect(z).toBeDefined();
    expect(Number(z)).toBeLessThan(0);
  });
});

describe('camada de fundo', () => {
  const css = readFileSync('src/styles/global.css', 'utf8');
  const bloco = (sel: string) => {
    const i = css.indexOf(sel);
    return i < 0 ? '' : css.slice(i, css.indexOf('}', i));
  };

  it('o fundo fica no html', () => {
    expect(bloco('html {')).toContain('background: var(--bg)');
  });

  it('o body não repinta o fundo — esconderia a textura', () => {
    expect(bloco('body {')).not.toContain('background');
  });

  it('o html não transiciona o fundo', () => {
    const h = bloco('html {');
    const trans = h.match(/transition:([^;]*)/)?.[1] ?? '';
    expect(trans).not.toContain('background');
  });

  it('o html ainda transiciona a cor do texto', () => {
    expect(bloco('html {')).toContain('transition: color');
  });

  it('o body não cria contexto de empilhamento', () => {
    const b = bloco('body {');
    for (const prop of ['opacity:', 'transform:', 'filter:', 'isolation:']) {
      expect(b, `body nao pode declarar ${prop}`).not.toContain(prop);
    }
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
