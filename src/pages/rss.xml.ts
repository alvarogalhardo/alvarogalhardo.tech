import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { toPostCards } from '../lib/content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = toPostCards(await getCollection('writing'), 'en');

  return rss({
    title: 'Alvaro Galhardo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    site: context.site!,
    items: posts.map((p) => ({
      title: p.title,
      description: p.summary,
      pubDate: p.date,
      link: `/writing/${p.slug}/`
    }))
  });
}
