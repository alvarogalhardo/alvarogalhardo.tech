export type Book = {
  status: Record<'en' | 'pt', string>;
  title: string;
  author: string;
};

export const books: Book[] = [
  { status: { en: 'Reading', pt: 'Lendo' }, title: '[Book title]', author: '[Author]' },
  { status: { en: 'Finished', pt: 'Lido' }, title: '[Book title]', author: '[Author]' },
  { status: { en: 'Next', pt: 'Próximo' }, title: '[Book title]', author: '[Author]' }
];
