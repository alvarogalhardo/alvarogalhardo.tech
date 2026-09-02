export type Experience = {
  period: string;
  role: string;
  org: string;
  desc: Record<'en' | 'pt', string>;
  stack: string;
};

export const experience: Experience[] = [
  {
    period: '2023 — now',
    role: 'Backend Engineer',
    org: '[Company]',
    desc: {
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.',
      pt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore.'
    },
    stack: 'C# · .NET · PostgreSQL · Docker'
  },
  {
    period: '2021 — 2023',
    role: 'Full-stack Engineer',
    org: '[Company]',
    desc: {
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.',
      pt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do eiusmod tempor.'
    },
    stack: 'TypeScript · React · Next.js'
  },
  {
    period: '2019 — 2021',
    role: 'Software Engineer',
    org: '[Company]',
    desc: {
      en: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      pt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    stack: 'C# · SQL Server'
  }
];
