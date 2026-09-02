export const defaultLang = 'en' as const;

export const ui = {
  en: {
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.writing': 'Writing',
    'nav.books': 'Bookshelf',
    'nav.contact': 'Contact',
    'hero.role': 'Backend Engineer',
    'hero.cta.email': 'Email',
    'hero.cta.resume': 'Résumé',
    'writing.all': 'All posts',
    'writing.back': 'All posts',
    'footer.credit': 'built by hand',
    'footer.top': 'Back to top',
    'lang.toggle': 'PT',
    'lang.label': 'Language',
    'lang.current': 'English',
    'theme.toggle': 'Toggle theme',
    'theme.label': 'Theme',
    'theme.dark': 'Dark',
    'theme.light': 'Light',
    'menu.open': 'Menu',
    'menu.close': 'Close menu',
    'menu.title': 'Menu'
  },
  pt: {
    'nav.experience': 'Experiência',
    'nav.projects': 'Projetos',
    'nav.writing': 'Escritos',
    'nav.books': 'Estante',
    'nav.contact': 'Contato',
    'hero.role': 'Engenheiro Backend',
    'hero.cta.email': 'Email',
    'hero.cta.resume': 'Currículo',
    'writing.all': 'Todos os textos',
    'writing.back': 'Todos os textos',
    'footer.credit': 'feito à mão',
    'footer.top': 'Voltar ao topo',
    'lang.toggle': 'EN',
    'lang.label': 'Idioma',
    'lang.current': 'Português',
    'theme.toggle': 'Alternar tema',
    'theme.label': 'Tema',
    'theme.dark': 'Escuro',
    'theme.light': 'Claro',
    'menu.open': 'Menu',
    'menu.close': 'Fechar menu',
    'menu.title': 'Menu'
  }
} as const;

export type Lang = keyof typeof ui;
export type UIKey = keyof (typeof ui)['en'];
