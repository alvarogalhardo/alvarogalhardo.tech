import { describe, it, expect } from 'vitest';
import { writingSchema, projectSchema } from '../../src/content.config';

describe('writingSchema', () => {
  it('aceita frontmatter válido e assume draft false', () => {
    const r = writingSchema.safeParse({
      title: 'Lorem ipsum',
      date: new Date('2026-07-01'),
      summary: 'Dolor sit amet.',
      lang: 'en'
    });
    expect(r.success).toBe(true);
    expect(r.success && r.data.draft).toBe(false);
  });

  it('rejeita lang fora do conjunto', () => {
    const r = writingSchema.safeParse({ title: 'x', date: new Date(), summary: 'y', lang: 'es' });
    expect(r.success).toBe(false);
  });

  it('rejeita title vazio', () => {
    const r = writingSchema.safeParse({ title: '', date: new Date(), summary: 'y', lang: 'en' });
    expect(r.success).toBe(false);
  });

  it('converte data em string para Date', () => {
    const r = writingSchema.safeParse({ title: 'x', date: '2026-07-01', summary: 'y', lang: 'pt' });
    expect(r.success && r.data.date instanceof Date).toBe(true);
  });
});

describe('projectSchema', () => {
  it('aceita projeto com stack', () => {
    const r = projectSchema.safeParse({
      name: 'Lorem', year: 2026, summary: 'Ipsum.', stack: ['Go', 'SQLite']
    });
    expect(r.success).toBe(true);
  });

  it('rejeita stack vazia', () => {
    const r = projectSchema.safeParse({ name: 'Lorem', year: 2026, summary: 'Ipsum.', stack: [] });
    expect(r.success).toBe(false);
  });

  it('rejeita url malformada', () => {
    const r = projectSchema.safeParse({
      name: 'Lorem', year: 2026, summary: 'Ipsum.', stack: ['Go'], url: 'nao-e-url'
    });
    expect(r.success).toBe(false);
  });
});
