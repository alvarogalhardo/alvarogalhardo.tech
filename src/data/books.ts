export type Book = {
  status: Record<'en' | 'pt', string>;
  title: string;
  author: string;
};

export const books: Book[] = [
  {
    status: { en: 'Reading', pt: 'Lendo' },
    title: 'Designing Data-Intensive Applications (2nd ed.)',
    author: 'Martin Kleppmann'
  },
  {
    status: { en: 'Reading', pt: 'Lendo' },
    title: 'Introduction to Algorithms',
    author: 'Cormen, Leiserson, Rivest & Stein'
  },
  {
    status: { en: 'Finished', pt: 'Lido' },
    title: 'Domain-Driven Design',
    author: 'Eric Evans'
  },
  {
    status: { en: 'Finished', pt: 'Lido' },
    title: 'Design Patterns',
    author: 'Gamma, Helm, Johnson & Vlissides'
  },
  {
    status: { en: 'Finished', pt: 'Lido' },
    title: 'The Pragmatic Programmer',
    author: 'David Thomas & Andrew Hunt'
  },
  {
    status: { en: 'Finished', pt: 'Lido' },
    title: 'Implementing Domain-Driven Design',
    author: 'Vaughn Vernon'
  },
  {
    status: { en: 'Next', pt: 'Próximo' },
    title: 'Artificial Intelligence: A Modern Approach',
    author: 'Stuart Russell & Peter Norvig'
  }
];
