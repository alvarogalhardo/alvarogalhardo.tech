import type { Lang } from '../i18n/ui';

type PageMeta = { title: string; description: string };

export const meta: Record<Lang, { home: PageMeta; writing: PageMeta; notFound: PageMeta }> = {
  en: {
    home: {
      title: 'Alvaro Galhardo — Backend Engineer',
      description: 'Lorem ipsum dolor sit amet — backend engineer, APIs, data models and systems.'
    },
    writing: {
      title: 'Writing — Alvaro Galhardo',
      description: 'Lorem ipsum — notes on the decisions behind the systems I build.'
    },
    notFound: {
      title: 'Page not found — Alvaro Galhardo',
      description: 'This page doesn’t exist. Head back to the homepage.'
    }
  },
  pt: {
    home: {
      title: 'Alvaro Galhardo — Engenheiro Backend',
      description: 'Lorem ipsum dolor sit amet — engenheiro backend, APIs, modelos de dados e sistemas.'
    },
    writing: {
      title: 'Escritos — Alvaro Galhardo',
      description: 'Lorem ipsum — notas sobre as decisões por trás dos sistemas que construo.'
    },
    notFound: {
      title: 'Página não encontrada — Alvaro Galhardo',
      description: 'Essa página não existe. Volte para a página inicial.'
    }
  }
};
