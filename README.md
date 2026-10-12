# P15 — Personal portfolio site without WordPress

> **Status:** In progress · **Priority:** Must · **Build order:** 1 of 40 · **Estimate:** 5 days
> Personal / demo project — not client work.

## Problem
Platform profiles (Upwork, LinkedIn) are not yours. You need one fast, owned home for every case study.

## How it works
A static Astro site. Each case study is a Markdown file; Astro builds static pages served from a CDN, so Core Web Vitals stay above 90.

## Tech stack
- Astro
- HTML/CSS
- Markdown
- Git + GitHub
- GitHub Pages + GitHub Actions

## Project structure
```
01-P15-portfolio-site/
├── .github/workflows/deploy.yml
├── content-templates/
│   └── case-study.md
├── .gitignore
├── CLAUDE.md
└── site-plan.md
```

## Setup
Requires Node.js 22.12+.

```bash
npm create astro@latest site
cd site
npm run dev
```
The Astro project lives in `site/`; planning files stay at the root. `.github/workflows/deploy.yml` builds `site/`, runs the SEO check and publishes to GitHub Pages on every push to `main`.

## Usage
```bash
cd site
npm run dev      # local preview
npm run build    # production build in site/dist
npm run check    # SEO checks on every built page (run after build)
```

## Build checklist
- [ ] Learn Git basics first: init, add, commit, push, branch (2 days)
- [x] Run `npm create astro@latest site` (minimal template); the Astro project lives in `site/`
- [x] Write site-plan.md: pages, menu, one-line positioning
- [x] Add a case-study content collection using content-templates/case-study.md
- [x] Add SEO basics: title/meta per page, sitemap, robots.txt, Person + ProfessionalService schema
- [x] Build the pages from site-plan.md (case-study list + detail, services, about, contact) on BaseLayout
- [ ] Deploy to GitHub Pages (https://matt-g20.github.io) via GitHub Actions
- [ ] Later: buy a domain, connect it and update `site` in astro.config.mjs
- [ ] Measure Lighthouse on mobile and record it in Results

## Results
_TODO: one measurable line, e.g. "Lighthouse mobile performance 9X, LCP X.Xs"._
