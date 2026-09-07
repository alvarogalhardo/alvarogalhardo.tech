import type { Lang } from '../i18n/ui';

type HomeCopy = {
  hero: {
    greeting: string;
    lead: string;
    p1: string;
    p2: string;
  };
  contactLine: string;
  shelfNote: string;
};

type NotFoundCopy = {
  role: string;
  title: string;
  lead: string;
  ctaHome: string;
};

export const home: Record<Lang, HomeCopy> = {
  en: {
    hero: {
      greeting: 'Hey, I’m Alvaro.',
      lead: 'I’m a backend-leaning full-stack engineer who cares about the APIs, data models, and infrastructure choices that decide whether a system holds up once real users and real money touch it.',
      p1: 'Right now I’m building the backend for a B2B invoice-anticipation platform at Pagô: a financial calculation engine that has to match regulatory rules exactly, plus the fraud checks that sit in front of it. Before that I worked across full-stack SaaS products in C#, TypeScript, and React, mostly on the parts other people didn’t want to touch: async job processing, multi-tenant data models, CI/CD pipelines.',
      p2: 'Most of what I read these days is systems books instead of blog posts: right now that’s Designing Data-Intensive Applications and Introduction to Algorithms. engram, one of the projects below, is where that reading turns into real decisions.'
    },
    contactLine: 'Open to backend and full-stack roles right now. Get in touch.',
    shelfNote: 'What I’m actually reading right now, not a curated highlight reel.'
  },
  pt: {
    hero: {
      greeting: 'Oi, eu sou o Alvaro.',
      lead: 'Sou engenheiro backend que também atua full-stack, focado nas APIs, modelos de dados e decisões de infraestrutura que definem se um sistema aguenta o uso real, não só a demonstração.',
      p1: 'Hoje trabalho no back-end de uma plataforma de antecipação de recebíveis B2B na Pagô: um motor de cálculo financeiro que precisa bater exatamente com as regras regulatórias, além dos mecanismos antifraude na frente dele. Antes disso passei por produtos SaaS full-stack em C#, TypeScript e React, principalmente nas partes que ninguém mais queria mexer: processamento assíncrono, modelos de dados multi-tenant, pipelines de CI/CD.',
      p2: 'A maior parte do que leio hoje em dia é livro de sistemas em vez de post de blog: agora é Designing Data-Intensive Applications e Introduction to Algorithms. O engram, um dos projetos abaixo, é onde essa leitura vira decisão de verdade.'
    },
    contactLine: 'Estou aberto a vagas de backend ou full-stack agora. Entre em contato.',
    shelfNote: 'O que eu realmente estou lendo agora, não uma lista só para inglês ver.'
  }
};

export const notFound: Record<Lang, NotFoundCopy> = {
  en: {
    role: '404',
    title: 'This route doesn’t exist.',
    lead: 'Could be a typo, could be a page that never shipped. Either way, there’s nothing here.',
    ctaHome: 'Back to home'
  },
  pt: {
    role: '404',
    title: 'Essa rota não existe.',
    lead: 'Pode ter sido erro de digitação, pode ser uma página que nunca foi ao ar. De um jeito ou de outro, não tem nada aqui.',
    ctaHome: 'Voltar para o início'
  }
};
