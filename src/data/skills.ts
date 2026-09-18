export type Skill = {
  name: string;
  /** Item que o Alvaro defende de imediato: ganha peso visual no chip. */
  core?: boolean;
};

export type SkillGroup = {
  label: Record<'en' | 'pt', string>;
  items: Skill[];
};

/**
 * Pré-preenchido com o que já aparece em `data/experience.ts`, nos projetos e
 * neste repo, com `core` marcado a partir dos dois cargos mais recentes. Nome
 * de linguagem, framework e serviço não se traduz, só o rótulo do grupo. Dentro
 * de cada grupo os `core` vêm primeiro.
 */
export const skills: SkillGroup[] = [
  {
    label: { en: 'Languages', pt: 'Linguagens' },
    items: [
      { name: 'TypeScript', core: true },
      { name: 'C#', core: true },
      { name: 'JavaScript' },
      { name: 'Java' },
      { name: 'Python' },
      { name: 'Go' },
      { name: 'Kotlin' }
    ]
  },
  {
    label: { en: 'Backend', pt: 'Back-end' },
    items: [
      { name: 'NestJS', core: true },
      { name: '.NET Core', core: true },
      { name: 'Express' },
      { name: 'Spring Boot' },
      { name: 'DDD' },
      { name: 'Design Patterns' }
    ]
  },
  {
    label: { en: 'Data and messaging', pt: 'Dados e mensageria' },
    items: [
      { name: 'PostgreSQL', core: true },
      { name: 'MongoDB', core: true },
      { name: 'MySQL' },
      { name: 'Redis' },
      { name: 'RabbitMQ' },
      { name: 'Google Pub/Sub' },
      { name: 'Azure Service Bus' }
    ]
  },
  {
    label: { en: 'Frontend', pt: 'Front-end' },
    items: [
      { name: 'React', core: true },
      { name: 'Next.js' },
      { name: 'Astro' },
      { name: 'Jetpack Compose' },
      { name: 'shadcn/ui' },
      { name: 'Material UI' },
      { name: 'Figma' },
      { name: 'Claude Design' }
    ]
  },
  {
    label: { en: 'Infrastructure', pt: 'Infraestrutura' },
    items: [
      { name: 'Docker', core: true },
      { name: 'Azure DevOps', core: true },
      { name: 'Terraform' },
      { name: 'GCP' },
      { name: 'GitHub Actions' },
      { name: 'AWS' },
      { name: 'Cloudflare' },
      { name: 'Nginx' },
      { name: 'IIS' },
      { name: 'Vercel' }
    ]
  },
  {
    label: { en: 'Testing', pt: 'Testes' },
    items: [
      { name: 'Jest' },
      { name: 'Vitest' },
      { name: 'xUnit' },
      { name: 'Playwright' }
    ]
  }
];
