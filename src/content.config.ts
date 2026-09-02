import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const writingSchema = z.object({
  title: z.string().min(1),
  date: z.coerce.date(),
  summary: z.string().min(1),
  lang: z.enum(['en', 'pt']),
  draft: z.boolean().default(false)
});

export const projectSchema = z.object({
  name: z.string().min(1),
  year: z.number().int().min(2015),
  summary: z.string().min(1),
  stack: z.array(z.string()).min(1),
  url: z.string().url().optional()
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: writingSchema
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: projectSchema
});

export const collections = { writing, projects };
