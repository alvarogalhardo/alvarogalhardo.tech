import { describe, it, expect } from 'vitest';
import SectionHeading from '../../src/components/SectionHeading.astro';
import MetaRow from '../../src/components/MetaRow.astro';
import { renderComponent } from './helpers';

describe('SectionHeading', () => {
  it('renderiza número, rótulo e um h2', async () => {
    const html = await renderComponent(SectionHeading, {
      props: { num: '01', label: 'Experience' }
    });
    expect(html).toContain('01');
    expect(html).toContain('Experience');
    expect(html).toContain('<h2');
  });

  it('esconde o número e a régua de leitores de tela', async () => {
    const html = await renderComponent(SectionHeading, {
      props: { num: '02', label: 'Projects' }
    });
    const num = html.match(/<span class="num"[^>]*>/)?.[0] ?? '';
    expect(num).toContain('aria-hidden="true"');
  });
});

describe('MetaRow', () => {
  it('renderiza a coluna de metadados e o slot', async () => {
    const html = await renderComponent(MetaRow, {
      props: { meta: '2023 — now' },
      slots: { default: '<p>Lorem ipsum</p>' }
    });
    expect(html).toContain('2023 — now');
    expect(html).toContain('Lorem ipsum');
  });

  it('vira um link quando href é passado', async () => {
    const html = await renderComponent(MetaRow, {
      props: { meta: '2026', href: '/writing/x/' },
      slots: { default: '<span>Title</span>' }
    });
    expect(html).toContain('href="/writing/x/"');
    expect(html).toContain('<a');
  });

  it('é uma div quando não há href', async () => {
    const html = await renderComponent(MetaRow, {
      props: { meta: '2026' },
      slots: { default: '<span>x</span>' }
    });
    expect(html).not.toContain('<a');
  });

  it('aplica as variantes de alinhamento e espaçamento', async () => {
    const html = await renderComponent(MetaRow, {
      props: { meta: 'x', align: 'baseline', pad: 'sm' },
      slots: { default: '<span>y</span>' }
    });
    expect(html).toContain('align-baseline');
    expect(html).toContain('pad-sm');
  });
});
