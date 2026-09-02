import satori from 'satori';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

/**
 * Hex fixos em vez dos tokens oklch: satori não resolve variáveis CSS nem
 * oklch. Estes valores são a conversão sRGB de --bg e --accent do tema
 * escuro. Se os tokens mudarem, converta e atualize aqui.
 */
const BG = '#151a21';
const FG = '#e4e4e5';
const ACCENT = '#e79a4f';

export async function getStaticPaths() {
  const posts = await getCollection('writing', ({ data }) => !data.draft);
  return [
    { params: { slug: 'home' }, props: { title: 'Alvaro Galhardo', kicker: 'Backend Engineer' } },
    ...posts.map((p) => ({
      params: { slug: p.id.split('/').pop()! },
      props: { title: p.data.title, kicker: p.data.lang === 'pt' ? 'Escritos' : 'Writing' }
    }))
  ];
}

export async function GET({ props }: APIContext) {
  const { title, kicker } = props as { title: string; kicker: string };

  const [serif, mono] = await Promise.all([
    readFile('src/assets/fonts/Newsreader-Regular.ttf'),
    readFile('src/assets/fonts/JetBrainsMono-Regular.ttf')
  ]);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BG,
          color: FG,
          padding: 80,
          fontFamily: 'Newsreader'
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontFamily: 'JetBrains Mono',
                fontSize: 22,
                letterSpacing: 4,
                textTransform: 'uppercase',
                color: ACCENT
              },
              children: kicker
            }
          },
          {
            type: 'div',
            props: {
              style: { fontSize: 64, lineHeight: 1.15, maxWidth: 1000 },
              children: title
            }
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'JetBrains Mono',
                fontSize: 24,
                color: '#a8a8aa'
              },
              children: [
                { type: 'span', props: { children: 'alvarogalhardo.dev' } },
                { type: 'span', props: { children: 'Alvaro Galhardo' } }
              ]
            }
          }
        ]
      }
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Newsreader', data: serif, weight: 400, style: 'normal' },
        { name: 'JetBrains Mono', data: mono, weight: 400, style: 'normal' }
      ]
    }
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' }
  });
}
