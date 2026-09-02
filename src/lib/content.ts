import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type ProjectCardData = {
  slug: string;
  name: string;
  year: number;
  summary: string;
  stack: string[];
  url?: string;
};

export type PostCardData = {
  slug: string;
  title: string;
  date: Date;
  summary: string;
};

export function toProjectCards(
  entries: CollectionEntry<'projects'>[],
  lang: Lang
): ProjectCardData[] {
  return entries
    .filter((e) => e.id.startsWith(`${lang}/`))
    .map((e) => ({ slug: e.id.split('/').pop()!, ...e.data }))
    .sort((a, b) => b.year - a.year);
}

export function toPostCards(
  entries: CollectionEntry<'writing'>[],
  lang: Lang,
  limit?: number
): PostCardData[] {
  const list = entries
    .filter((e) => !e.data.draft && e.data.lang === lang)
    .map((e) => ({
      slug: e.id.split('/').pop()!,
      title: e.data.title,
      date: e.data.date,
      summary: e.data.summary
    }))
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
  return limit ? list.slice(0, limit) : list;
}
