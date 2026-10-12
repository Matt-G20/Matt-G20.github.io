import { getCollection } from 'astro:content';

// Case studies to show. Drafts (published: false) appear only in
// `npm run dev`, so they can be previewed but never reach the live site.
export async function getVisibleCaseStudies() {
  return getCollection(
    'case-studies',
    ({ data }) => data.published || import.meta.env.DEV,
  );
}
