import { describe, it, expect } from 'vitest';
import ExperienceSection from '../../src/components/ExperienceSection.astro';
import ProjectsSection from '../../src/components/ProjectsSection.astro';
import WritingSection from '../../src/components/WritingSection.astro';
import ShelfSection from '../../src/components/ShelfSection.astro';
import ContactSection from '../../src/components/ContactSection.astro';
import SkillsSection from '../../src/components/SkillsSection.astro';
import Footer from '../../src/components/Footer.astro';
import { experience } from '../../src/data/experience';
import { books } from '../../src/data/books';
import { skills } from '../../src/data/skills';
import { sectionNum } from '../../src/lib/sections';
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

describe('SkillsSection', () => {
  it('renderiza uma linha por grupo', async () => {
    expect(countRows(await at(SkillsSection, '/'))).toBe(skills.length);
  });
  it('expõe a âncora #skills', async () => {
    expect(await at(SkillsSection, '/')).toContain('id="skills"');
  });
  it('renderiza um chip por item do grupo', async () => {
    const html = await at(SkillsSection, '/');
    for (const item of skills[0].items) {
      expect(html).toContain(`>${item.name}</li>`);
    }
  });
  it('marca com a classe core só os itens principais', async () => {
    const html = await at(SkillsSection, '/');
    const core = skills.flatMap((g) => g.items).filter((i) => i.core);
    expect((html.match(/class="chip core"/g) ?? []).length).toBe(core.length);
  });
  it('põe os principais antes do resto dentro do grupo', () => {
    for (const g of skills) {
      const flags = g.items.map((i) => Boolean(i.core));
      expect(flags).toEqual([...flags].sort((a, b) => Number(b) - Number(a)));
    }
  });
  it('traduz o rótulo do grupo', async () => {
    expect(await at(SkillsSection, '/pt')).toContain(skills[0].label.pt);
    expect(await at(SkillsSection, '/')).toContain(skills[0].label.en);
  });
  it('usa o número que vem da ordem das seções', async () => {
    const html = await at(SkillsSection, '/');
    expect(html.match(/class="num"[^>]*>(\d\d)</)?.[1]).toBe(sectionNum('skills'));
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
  it('o link externo do projeto abre em nova aba com rel de segurança', async () => {
    const html = await at(ProjectsSection, '/', { projects });
    expect((html.match(/target="_blank"/g) ?? []).length).toBe(1);
    expect(html).toContain('rel="noopener noreferrer"');
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
  it('os links internos continuam na mesma aba', async () => {
    expect(await at(WritingSection, '/', { posts })).not.toContain('target="_blank"');
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
    expect((html.match(/rel="me noopener noreferrer"/g) ?? []).length).toBe(2);
  });
  it('email, linkedin e github abrem em nova aba', async () => {
    const html = await at(ContactSection, '/');
    expect((html.match(/target="_blank"/g) ?? []).length).toBe(3);
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
