import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    permalink: z.string().regex(/^\//),
    tags: z.array(z.string()).default([]),
    categories: z.array(z.string()).default([]),
    author: z.string().default('fabiocozzolino'),
    published: z.boolean().default(true),
    description: z.string().optional(),
    legacyLayout: z.string().optional(),
    legacyId: z.union([z.string(), z.number()]).optional(),
  }),
});

export const collections = { blog };