import { describe, it, expect } from 'vitest';
import { toPostCards, toProjectCards } from '../../src/lib/content';

const post = (id: string, lang: 'en' | 'pt', date: string, draft = false) =>
  ({ id, data: { title: id, date: new Date(date), summary: 's', lang, draft } }) as never;

const all = [
  post('en/a', 'en', '2026-07-14'),
  post('en/b', 'en', '2026-01-05'),
  post('pt/c', 'pt', '2026-04-02'),
  post('en/rascunho', 'en', '2026-08-01', true)
];

describe('toPostCards', () => {
  it('retorna apenas posts do idioma pedido', () => {
    expect(toPostCards(all, 'pt').map((p) => p.slug)).toEqual(['c']);
  });

  it('exclui rascunhos', () => {
    expect(toPostCards(all, 'en').map((p) => p.slug)).not.toContain('rascunho');
  });

  it('ordena do mais recente para o mais antigo', () => {
    expect(toPostCards(all, 'en').map((p) => p.slug)).toEqual(['a', 'b']);
  });

  it('respeita o limite quando passado', () => {
    expect(toPostCards(all, 'en', 1)).toHaveLength(1);
  });

  it('deriva o slug removendo o prefixo de idioma', () => {
    expect(toPostCards(all, 'en')[0].slug).toBe('a');
  });

  it('não retorna nada para uma coleção vazia', () => {
    expect(toPostCards([], 'en')).toEqual([]);
  });
});

const proj = (id: string, year: number) =>
  ({ id, data: { name: id, year, summary: 's', stack: ['Go'] } }) as never;

describe('toProjectCards', () => {
  const projects = [proj('en/um', 2024), proj('en/dois', 2026), proj('pt/um', 2024)];

  it('filtra pelo prefixo de idioma', () => {
    expect(toProjectCards(projects, 'pt')).toHaveLength(1);
  });

  it('ordena do ano mais recente para o mais antigo', () => {
    expect(toProjectCards(projects, 'en').map((p) => p.year)).toEqual([2026, 2024]);
  });

  it('preserva a stack', () => {
    expect(toProjectCards(projects, 'en')[0].stack).toEqual(['Go']);
  });
});
