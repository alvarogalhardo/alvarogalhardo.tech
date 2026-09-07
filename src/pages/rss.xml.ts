import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { toPostCards } from '../lib/content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = toPostCards(await getCollection('writing'), 'en');
  const self = new URL('/rss.xml', context.site).href;

  return rss({
    title: 'Alvaro Galhardo',
    description: 'Notes on the technical decisions behind the systems Alvaro Galhardo builds.',
    site: context.site!,
    xmlns: { atom: 'http://www.w3.org/2005/Atom' },
    customData: [
      '<language>en-us</language>',
      `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
      `<atom:link href="${self}" rel="self" type="application/rss+xml"/>`
    ].join(''),
    items: posts.map((p) => ({
      title: p.title,
      description: p.summary,
      pubDate: p.date,
      link: `/writing/${p.slug}/`
    }))
  });
}
