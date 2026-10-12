// Content collections: Astro reads these Markdown files and checks
// each file's front matter against the schema below at build time.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const caseStudies = defineCollection({
  // Every .md file in src/content/case-studies/ becomes one entry.
  // The file name (without .md) becomes the entry id and the URL slug.
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  // Same fields as content-templates/case-study.md.
  schema: z.object({
    title: z.string().min(1).max(60),
    description: z.string().min(1).max(155),
    project_id: z.string().min(1),
    stage: z.enum(['design', 'wordpress', 'seo', 'qa']),
    published: z.boolean().default(false),
  }),
});

export const collections = { 'case-studies': caseStudies };
