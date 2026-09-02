import { describe, it, expect } from 'vitest';
import { wcagContrast, parse } from 'culori';
import { readFileSync } from 'node:fs';
import { THEMES, CONTROL_BORDER } from '../../src/lib/tokens';

const ratio = (a: string, b: string) => wcagContrast(parse(a)!, parse(b)!);

describe.each(['dark', 'light'] as const)('contraste no tema %s', (theme) => {
  const t = THEMES[theme];

  it('corpo sobre fundo atinge 4.5:1', () => {
    expect(ratio(t.fg, t.bg)).toBeGreaterThanOrEqual(4.5);
  });

  it('texto secundário sobre fundo atinge 4.5:1', () => {
    expect(ratio(t.muted, t.bg)).toBeGreaterThanOrEqual(4.5);
  });

  it('accent sobre fundo atinge 4.5:1', () => {
    expect(ratio(t.accent, t.bg)).toBeGreaterThanOrEqual(4.5);
  });

  it('accentSoft sobre fundo atinge 4.5:1', () => {
    expect(ratio(t.accentSoft, t.bg)).toBeGreaterThanOrEqual(4.5);
  });

  it('texto do botão preenchido sobre accent atinge 4.5:1', () => {
    expect(ratio(t.bg, t.accent)).toBeGreaterThanOrEqual(4.5);
  });

  it('a borda de controle atinge 3:1 (WCAG 1.4.11)', () => {
    expect(ratio(CONTROL_BORDER[theme], t.bg)).toBeGreaterThanOrEqual(3);
  });
});

describe('paridade entre tokens.ts e tokens.css', () => {
  const css = readFileSync('src/styles/tokens.css', 'utf8');

  it('todo valor oklch de tokens.ts aparece em tokens.css', () => {
    const declared = [
      ...Object.values(THEMES.dark),
      ...Object.values(THEMES.light),
      ...Object.values(CONTROL_BORDER)
    ];
    const missing = declared.filter((v) => !css.includes(v));
    expect(missing).toEqual([]);
  });

  it('o css define os dois temas', () => {
    expect(css).toContain(':root {');
    expect(css).toContain(":root[data-theme='light']");
  });
});
