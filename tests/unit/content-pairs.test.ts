import { describe, it, expect } from 'vitest';
import { readdirSync } from 'node:fs';

const slugs = (dir: 'en' | 'pt') =>
  readdirSync(`src/content/writing/${dir}`)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
    .sort();

describe('pares de tradução dos posts', () => {
  it('todo post en tem par pt com o mesmo slug e vice-versa', () => {
    expect(slugs('en')).toEqual(slugs('pt'));
  });
});
