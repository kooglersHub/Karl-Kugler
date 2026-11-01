// Adapted from Case © 2025 Erland (MIT). See LICENSE.
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      slug: z.string().regex(/^[a-z0-9-]+$/),
      title: z.string(),
      description: z.string(),
      category: z.enum([
        'Robotik',
        'Künstliches Leben',
        'Software',
        'Design & Web',
      ]),
      technologies: z.array(z.string()),
      year: z.number().int(),
      status: z.enum([
        'In Entwicklung',
        'Experimentell',
        'Abgeschlossen',
        'Archiviert',
      ]),
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
      visual: z.enum(['hand', 'life', 'shirt']),
    }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/writing' }),
  schema: z.object({
    slug: z.string().regex(/^[a-z0-9-]+$/),
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, writing };
