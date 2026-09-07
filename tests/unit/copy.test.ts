import { describe, it, expect } from 'vitest';
import { home, notFound } from '../../src/data/copy';
import { meta } from '../../src/data/meta';

// Achata um objeto aninhado em pares [caminho, string]. A prosa da home e o SEO
// crescem por idioma; um `en` com uma chave a mais que o `pt` (ou uma string
// vazia deixada como lembrete) passa despercebido até alguém abrir a página.
const flat = (obj: unknown, prefix = ''): [string, string][] =>
  typeof obj === 'string'
    ? [[prefix, obj]]
    : Object.entries(obj as Record<string, unknown>).flatMap(([k, v]) =>
        flat(v, prefix ? `${prefix}.${k}` : k)
      );

const keys = (o: unknown) => flat(o).map(([k]) => k).sort();
const empties = (byLang: Record<'en' | 'pt', unknown>) =>
  (['en', 'pt'] as const).flatMap((lang) =>
    flat(byLang[lang])
      .filter(([, v]) => !v.trim())
      .map(([k]) => `${lang}.${k}`)
  );

describe('copy.ts — prosa da home', () => {
  it('en e pt têm exatamente as mesmas chaves', () => {
    expect(keys(home.pt)).toEqual(keys(home.en));
  });

  it('nenhuma string está vazia', () => {
    expect(empties(home)).toEqual([]);
  });
});

describe('copy.ts — prosa do 404', () => {
  it('en e pt têm exatamente as mesmas chaves', () => {
    expect(keys(notFound.pt)).toEqual(keys(notFound.en));
  });

  it('nenhuma string está vazia', () => {
    expect(empties(notFound)).toEqual([]);
  });
});

describe('meta.ts — SEO das páginas', () => {
  it('en e pt têm exatamente as mesmas chaves', () => {
    expect(keys(meta.pt)).toEqual(keys(meta.en));
  });

  it('nenhuma string está vazia', () => {
    expect(empties(meta)).toEqual([]);
  });

  it('todo title e description é único — check-seo.py falha o build se colidirem', () => {
    const all = [...flat(meta.en), ...flat(meta.pt)].map(([, v]) => v);
    expect(new Set(all).size).toBe(all.length);
  });
});
