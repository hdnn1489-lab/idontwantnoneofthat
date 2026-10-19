import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SERIES_KEYS, TAG_KEYS } from './data/taxonomy';

// Posts live in src/content/posts/en/ and src/content/posts/vi/.
// The folder decides the language; the file name becomes the URL.
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    series: z.enum(SERIES_KEYS as [string, ...string[]]).optional(),
    tags: z.array(z.enum(TAG_KEYS as [string, ...string[]])).default([]),
    authors: z.array(z.string()).default(['you']),
    illustrator: z.string().optional(),
    // Give a post and its translation the same key to link them.
    translationKey: z.string().optional(),
    // Short warning shown above heavy posts, e.g. "grief" or "emotional abuse".
    contentNote: z.string().optional(),
    // One standout line, used for the shareable story card.
    quote: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    furtherReading: z
      .array(z.object({ title: z.string(), author: z.string().optional(), url: z.string().optional() }))
      .default([]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    initial: z.string().max(2),
    bio: z.object({ en: z.string(), vi: z.string() }),
    instagram: z.string().optional(),
  }),
});

export const collections = { posts, authors };
