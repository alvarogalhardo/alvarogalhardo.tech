import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Toda seção nova tem que entrar nas duas home pages. Sem isto, a página em
// português fica para trás sem ninguém perceber até o deploy.
const read = (rel: string) =>
  readFileSync(fileURLToPath(new URL(`../../src/pages/${rel}`, import.meta.url)), 'utf-8');

const sectionsOf = (src: string) =>
  [...src.matchAll(/<([A-Z][A-Za-z]*(?:Section|Hero))\b/g)].map((m) => m[1]).sort();

describe('paridade entre a home em en e em pt', () => {
  it('as duas páginas montam as mesmas seções', () => {
    expect(sectionsOf(read('pt/index.astro'))).toEqual(sectionsOf(read('index.astro')));
  });

  it('as duas páginas incluem a seção de skills', () => {
    expect(sectionsOf(read('index.astro'))).toContain('SkillsSection');
    expect(sectionsOf(read('pt/index.astro'))).toContain('SkillsSection');
  });
});
