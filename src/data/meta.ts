import type { Lang } from '../i18n/ui';

type PageMeta = { title: string; description: string };

export const meta: Record<Lang, { home: PageMeta; writing: PageMeta; notFound: PageMeta }> = {
  en: {
    home: {
      title: 'Alvaro Galhardo — Backend Engineer',
      description:
        'Backend-leaning full-stack engineer focused on the APIs, data models, and infrastructure that decide whether a system holds up under real users and real money.'
    },
    writing: {
      title: 'Writing — Alvaro Galhardo',
      description:
        'Notes on the technical decisions behind the systems I build: data models, APIs, and the trade-offs that never show up in the diff.'
    },
    notFound: {
      title: 'Page not found — Alvaro Galhardo',
      description: 'This page doesn’t exist. Head back to the homepage.'
    }
  },
  pt: {
    home: {
      title: 'Alvaro Galhardo — Engenheiro Backend',
      description:
        'Engenheiro backend que também atua full-stack, focado nas APIs, modelos de dados e infraestrutura que definem se um sistema aguenta uso real.'
    },
    writing: {
      title: 'Escritos — Alvaro Galhardo',
      description:
        'Notas sobre as decisões técnicas por trás dos sistemas que construo: modelos de dados, APIs e os trade-offs que não aparecem no diff.'
    },
    notFound: {
      title: 'Página não encontrada — Alvaro Galhardo',
      description: 'Essa página não existe. Volte para a página inicial.'
    }
  }
};
