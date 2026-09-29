// Content schemas. If an agent writes a file that doesn't match these,
// `astro build` fails and the PR can't merge. That's the point.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const services = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string().max(60),
    order: z.number().int(),
    summary: z.string().max(260),
    bullets: z.array(z.string().max(90)).min(3).max(9),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string().max(70),
    owner: z.string(),               // the public agency / project owner
    contractor: z.string().optional(), // Choice's employer at the time, if named
    value: z.string(),
    role: z.string(),
    sectors: z.array(z.enum(['Marine', 'Federal', 'Transit', 'Tunnel', 'Bridge', 'Highway', 'Rail', 'Other'])),
    location: z.string(),
    order: z.number().int(),
    hidden: z.boolean().default(false),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/insights' }),
  schema: z.object({
    title: z.string().max(90),
    description: z.string().max(200),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Choice Sterling, PLS'),
    draft: z.boolean().default(true), // agents create drafts; only Choice flips this
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { services, projects, insights };
