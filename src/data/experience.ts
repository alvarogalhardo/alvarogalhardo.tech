export type Experience = {
  period: string;
  role: string;
  org: string;
  desc: Record<'en' | 'pt', string>;
  stack: string;
};

export const experience: Experience[] = [
  {
    period: 'Jul 2025 — Jul 2026',
    role: 'Software Engineer',
    org: 'Pagô',
    desc: {
      en: 'Architected and built an end-to-end B2B receivables anticipation platform, owning both the NestJS backend and React frontend, including a regulatory-compliant financial calculation engine and fraud-mitigation checks for invoice validation.',
      pt: 'Arquitetou e desenvolveu, ponta a ponta, uma plataforma de antecipação de recebíveis (B2B), responsável pelo back-end em NestJS e front-end em React, incluindo um motor de cálculo financeiro em conformidade regulatória e mecanismos antifraude para validação de NF-e.'
    },
    stack: 'NestJS · React · Azure DevOps · GCP · Docker · Terraform · MongoDB · Redis'
  },
  {
    period: 'Dec 2023 — Jul 2025',
    role: 'Software Engineer',
    org: 'Accon Tech',
    desc: {
      en: 'Built modular React + TypeScript components for a multi-tenant SaaS platform (Accon Facilities, employee/asset management with IoT tracking, messaging, and geolocation) on top of an asynchronous C#/.NET Core backend with PostgreSQL/Entity Framework, and shipped the CI/CD pipeline (Azure DevOps) for production deploys.',
      pt: 'Desenvolveu componentes modulares em React + TypeScript para uma plataforma SaaS multi-tenant (Accon Facilities, gestão de funcionários e ativos com rastreamento IoT, mensageria e geolocalização), sobre um back-end assíncrono em C#/.NET Core com PostgreSQL/Entity Framework, e implementou o pipeline de CI/CD (Azure DevOps) para deploy em produção.'
    },
    stack: 'React · TypeScript · C#/.NET Core · PostgreSQL · Azure DevOps · RabbitMQ'
  },
  {
    period: 'Jul 2023 — Dec 2023',
    role: 'Full-Stack Developer',
    org: 'Spreed AI',
    desc: {
      en: 'Led the front-end migration from React.js to Next.js 13 for the company’s core platform, built RESTful APIs with Express/TypeScript covered by Jest tests, and containerized/deployed the app via Docker with CI/CD across Vercel (frontend) and Heroku (backend).',
      pt: 'Liderou a migração do front-end de React.js para Next.js 13 na plataforma principal da empresa, construiu APIs RESTful com Express/TypeScript cobertas por testes Jest, e containerizou/implantou a aplicação via Docker com CI/CD em Vercel (frontend) e Heroku (backend).'
    },
    stack: 'Next.js · React · Express · TypeScript · Docker · Heroku'
  },
  {
    period: 'Mar 2023 — Jul 2023',
    role: 'Software Engineer Intern',
    org: 'Levty',
    desc: {
      en: 'Designed modular architectures and technical specifications for workflow automation on the Sydle One low-code platform, translating stakeholder business needs into functional/non-functional requirements within an agile (Scrum/Kanban) setup.',
      pt: 'Projetou arquiteturas modulares e especificações técnicas para automação de fluxos de trabalho na plataforma low-code Sydle One, traduzindo necessidades de negócio dos stakeholders em requisitos funcionais e não funcionais em ambiente ágil (Scrum/Kanban).'
    },
    stack: 'Sydle One · Low-code · Scrum/Kanban · JavaScript'
  }
];
