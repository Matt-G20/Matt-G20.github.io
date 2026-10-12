# P15 — Personal portfolio site without WordPress

> **Status:** Live (only Git branch practice left) · **Priority:** Must · **Build order:** 1 of 40 · **Estimate:** 5 days
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
- [x] Deploy to GitHub Pages (https://matt-g20.github.io) via GitHub Actions
- [ ] Later: buy a domain, connect it and update `site` in astro.config.mjs
- [x] Site styling: one global stylesheet with design tokens (colours, type, spacing), responsive header menu
- [x] Full home page: services summary, featured case studies, call to action
- [x] 404 page and default Open Graph image
- [x] Re-measure Lighthouse on mobile after styling and update Results

## Results
Lighthouse mobile on the live site with full design (2026-10-12, median of 3 runs): Performance 100, Accessibility 100, Best Practices 100, SEO 100 · LCP 1.3 s, CLS 0, TBT 30 ms. Live at https://matt-g20.github.io.
