import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
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
  'blog': blogCollection,
};
