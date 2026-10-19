// Site-wide settings used by the layout and pages. Change them here only.

export const SITE_NAME = 'Matin';
export const POSITIONING = 'SEO-first WordPress websites for B2B companies — design, build, SEO and QA.';

export const CONTACT_EMAIL = 'mtnghani88@gmail.com';

// Public profiles. Links appear in the footer and the Person schema (sameAs)
// only when they are set.
export const GITHUB_URL = 'https://github.com/Matt-G20';
// TODO (Matin): paste your LinkedIn profile URL (e.g. https://www.linkedin.com/in/your-name/).
export const LINKEDIN_URL = '';
// TODO (Matin): paste your Upwork profile URL (e.g. https://www.upwork.com/freelancers/~...).
export const UPWORK_URL = '';

// TODO (Matin): add a square photo (at least 600×600 px) to site/public/ (e.g. matin.jpg)
// and put its path here: '/matin.jpg'. Until then the About page shows a monogram.
export const PHOTO = '';

// TODO (Matin): Search Console → Add property → URL prefix https://matt-g20.github.io/
// → HTML tag method → paste only the content="..." value here, then deploy and click Verify.
export const GOOGLE_SITE_VERIFICATION = '';

// Main menu, in the order from site-plan.md.
export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/case-studies/', label: 'Case studies' },
  { href: '/services/', label: 'Services' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
];

// Every profile that is set, for the footer and schema.org sameAs.
export const PROFILES = [
  { label: 'GitHub', href: GITHUB_URL, icon: 'github' },
  { label: 'LinkedIn', href: LINKEDIN_URL, icon: 'linkedin' },
  { label: 'Upwork', href: UPWORK_URL, icon: 'briefcase' },
].filter((profile) => profile.href);
