import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().trim().min(1),
    pubDatetime: z.coerce.date(),
    description: z.string().trim().min(1).optional(),
    tags: z.array(z.string().trim().min(1)).default([]),
    draft: z.boolean().default(false),
    permalink: z.string().regex(/^\//).optional(),
  }),
});

export const collections = { blog };