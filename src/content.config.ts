import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blogCollection = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    author: z.string().default('Richard Jair'),
    category: z.string(),
    thumbnail: z.string().optional(),
    description: z.string().optional()
  })
});

export const collections = {
  blog: blogCollection,
};
