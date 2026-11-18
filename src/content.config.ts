// Adapted from Case © 2025 Erland (MIT). See LICENSE.
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// Keep the public slug common to both languages while giving Astro distinct entry IDs.
const entryId = ({ entry }: { entry: string }) => entry.replace(/\.mdx$/, '');

const localizedEntry = {
  locale: z.enum(['de', 'en']).default('de'),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string(),
  description: z.string(),
};

const projects = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    generateId: entryId,
    base: './src/content/projects',
  }),
  schema: ({ image }) =>
    z.object({
      ...localizedEntry,
      category: z.string().min(1),
      technologies: z.array(z.string()),
      year: z.number().int(),
      status: z.string().min(1),
      contribution: z.string().min(1),
      featuredOrder: z.number().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      demoUrl: z.url().optional(),
      repositoryUrl: z.url().optional(),
      links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
      visual: z.enum(['hand', 'life', 'shirt', 'print']),
    }),
});

const writing = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    generateId: entryId,
    base: './src/content/writing',
  }),
  schema: z.object({
    ...localizedEntry,
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, writing };
