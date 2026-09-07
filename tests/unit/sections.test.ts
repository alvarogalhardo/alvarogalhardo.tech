import { describe, it, expect } from 'vitest';
import ExperienceSection from '../../src/components/ExperienceSection.astro';
import ProjectsSection from '../../src/components/ProjectsSection.astro';
import WritingSection from '../../src/components/WritingSection.astro';
import ShelfSection from '../../src/components/ShelfSection.astro';
import ContactSection from '../../src/components/ContactSection.astro';
import Footer from '../../src/components/Footer.astro';
import { experience } from '../../src/data/experience';
import { books } from '../../src/data/books';
import { renderComponent, SITE } from './helpers';

const at = (Comp: unknown, path: string, props: Record<string, unknown> = {}) =>
  renderComponent(Comp, { url: `${SITE}${path}`, props });

const countRows = (html: string) => (html.match(/class="[^"]*\brow\b/g) ?? []).length;

const projects = [
  {
    slug: 'lorem-service',
    name: '[Project One]',
    year: 2026,
    summary: 'Ipsum.',
    stack: ['Go', 'SQLite'],
    url: 'https://example.com/one'
  },
  { slug: 'outro', name: '[Project Two]', year: 2024, summary: 'Dolor.', stack: ['C#'] }
];

const posts = [
  { slug: 'a', title: 'Post A', date: new Date('2026-07-14'), summary: 'Ipsum.' },
  { slug: 'b', title: 'Post B', date: new Date('2026-04-02'), summary: 'Dolor.' }
];

describe('ExperienceSection', () => {
  it('lista todas as posições', async () => {
    expect(countRows(await at(ExperienceSection, '/'))).toBe(experience.length);
  });
  it('expõe a âncora #work', async () => {
    expect(await at(ExperienceSection, '/')).toContain('id="work"');
  });
  it('traduz o rótulo da seção', async () => {
    expect(await at(ExperienceSection, '/pt')).toContain('Experiência');
  });
});

describe('ProjectsSection', () => {
  it('renderiza um card por projeto recebido', async () => {
    const html = await at(ProjectsSection, '/', { projects });
    expect(html).toContain('[Project One]');
    expect(html).toContain('[Project Two]');
  });
  it('mostra a stack separada por ponto médio', async () => {
    expect(await at(ProjectsSection, '/', { projects })).toContain('Go · SQLite');
  });
  it('usa a url externa quando o projeto tem uma', async () => {
    expect(await at(ProjectsSection, '/', { projects })).toContain('href="https://example.com/one"');
  });
  it('projeto sem url não vira link nem mostra a seta', async () => {
    const html = await at(ProjectsSection, '/', { projects });
    expect(html).not.toContain('/projects/');
    expect((html.match(/class="mono arrow"/g) ?? []).length).toBe(1);
  });
  it('esconde a seta decorativa de leitores de tela', async () => {
    const html = await at(ProjectsSection, '/', { projects });
    expect(html).toMatch(/class="mono arrow" aria-hidden="true"/);
  });
  it('não quebra com lista vazia', async () => {
    expect(await at(ProjectsSection, '/', { projects: [] })).toContain('id="projects"');
  });
});

describe('WritingSection', () => {
  it('renderiza uma linha por post recebido', async () => {
    const html = await at(WritingSection, '/', { posts });
    expect(html).toContain('Post A');
    expect(html).toContain('Post B');
  });
  it('formata a data no locale do idioma', async () => {
    expect(await at(WritingSection, '/', { posts })).toContain('Jul 2026');
  });
  it('o link para o arquivo é prefixado em pt', async () => {
    const html = await at(WritingSection, '/pt', { posts });
    expect(html).toContain('href="/pt/writing/"');
    expect(html).toContain('Todos os textos');
  });
});

describe('ShelfSection', () => {
  it('lista todos os livros', async () => {
    expect(countRows(await at(ShelfSection, '/'))).toBe(books.length);
  });
  it('usa o status traduzido em pt', async () => {
    expect(await at(ShelfSection, '/pt')).toContain('Lendo');
  });
  it('usa o status em inglês na raiz', async () => {
    expect(await at(ShelfSection, '/')).toContain('Reading');
  });
});

describe('ContactSection', () => {
  it('traz um mailto e a âncora #contact', async () => {
    const html = await at(ContactSection, '/');
    expect(html).toContain('mailto:alvaromgfernandes@gmail.com');
    expect(html).toContain('id="contact"');
  });
  it('os links externos têm rel de segurança', async () => {
    const html = await at(ContactSection, '/');
    expect((html.match(/rel="me noopener"/g) ?? []).length).toBe(2);
  });
});

describe('Footer', () => {
  it('traduz o crédito', async () => {
    expect(await at(Footer, '/pt')).toContain('feito à mão');
    expect(await at(Footer, '/')).toContain('built by hand');
  });
  it('o link de topo é prefixado em pt', async () => {
    expect(await at(Footer, '/pt')).toContain('href="/pt/#top"');
  });
});
