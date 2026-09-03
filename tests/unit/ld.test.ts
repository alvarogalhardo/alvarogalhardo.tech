import { describe, it, expect } from 'vitest';
import { ldJson } from '../../src/lib/ld';

describe('ldJson', () => {
  it('escapa < > & para não fechar a tag <script>', () => {
    const out = ldJson({ headline: 'quebra </script><script>alert(1)</script>' });
    expect(out).not.toMatch(/[<>]/);
    expect(out).toContain('\\u003c');
    expect(out).toContain('\\u003e');
  });

  it('escapa & fora de um contexto de entidade', () => {
    expect(ldJson({ x: 'a & b' })).toContain('\\u0026');
  });

  it('continua sendo JSON válido e preserva o valor original', () => {
    const data = { headline: '</script>', nested: { s: 'a & b < c > d' } };
    const parsed = JSON.parse(ldJson(data));
    expect(parsed).toEqual(data);
  });
});
