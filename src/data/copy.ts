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
      greeting: 'Hi, I’m Alvaro.',
      lead: 'I’m a full-stack software engineer with a stronger interest in the back-end. My expertise covers the full development flow, from requirements to maintenance. I work mainly on data modeling, API and system design, and infrastructure decisions, delivering robust and scalable solutions.',
      p1: 'With three years of professional experience and currently studying Software Engineering at FIAP, I’m fascinated by systems that are complex, reliable, and that add value to the business.',
      p2: 'In my most recent role, I worked on a B2B receivables anticipation platform (Risco Sacado) at Pagô. The biggest challenge there was modeling a financial calculation engine compliant with regulatory requirements, while keeping the product consistent and reliable.'
    },
    contactLine: 'Open to backend and full-stack roles. Get in touch.',
    shelfNote: 'What I’m reading currently:'
  },
  pt: {
    hero: {
      greeting: 'Oi, eu sou o Alvaro.',
      lead: 'Sou um engenheiro de software full-stack, com maior interesse no back-end. Minha expertise contempla o fluxo completo do desenvolvimento, desde os requisitos até a manutenção. Atuo principalmente na modelagem de dados, design de APIs e sistemas, e decisões de infraestrutura, entregando soluções robustas e escaláveis.',
      p1: 'Com três anos de experiência profissional e cursando Engenharia de Software na FIAP, sou fascinado por sistemas complexos, confiáveis e que agregam valor para o negócio.',
      p2: 'Em minha experiência mais recente, trabalhei no desenvolvimento de uma plataforma de antecipação de recebíveis (Risco Sacado) B2B na Pagô. Nesse projeto, o maior desafio foi modelar um motor de cálculo financeiro em conformidade com os requisitos regulatórios, mantendo a consistência e confiabilidade do produto.'
    },
    contactLine: 'Estou aberto a vagas para backend e full-stack. Entre em contato.',
    shelfNote: 'O que estou lendo agora:'
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
