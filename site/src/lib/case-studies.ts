import { getCollection } from 'astro:content';

// Case studies to show, best first: by `order`, then newest first.
// Drafts (published: false) appear only in `npm run dev`, so they can be
// previewed but never reach the live site.
export async function getVisibleCaseStudies() {
  const studies = await getCollection(
    'case-studies',
    ({ data }) => data.published || import.meta.env.DEV,
  );
  return studies.sort(
    (a, b) =>
      a.data.order - b.data.order ||
      (b.data.date?.getTime() ?? 0) - (a.data.date?.getTime() ?? 0),
  );
}

// The featured ones for the home page; falls back to the first few.
export async function getFeaturedCaseStudies(limit = 3) {
  const studies = await getVisibleCaseStudies();
  const featured = studies.filter((study) => study.data.featured);
  return (featured.length ? featured : studies).slice(0, limit);
}
