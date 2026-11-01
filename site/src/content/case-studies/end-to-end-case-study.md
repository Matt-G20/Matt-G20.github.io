---
title: "End to End: One Site Through Every Tool"
description: "A demo B2B site built with my WordPress kit, then checked by my QA, SEO-test and Lighthouse tools in one run — and fixed where they found problems."
project_id: "F1"
stage: "qa"
published: true
date: 2026-11-01
tools: ["WordPress", "Elementor", "Python", "Lighthouse", "Node.js"]
metrics:
  - { label: "stages passed (first run: 3 / 6)", value: "5 / 6" }
  - { label: "QA bugs found and fixed at the source", value: "1 / 1" }
  - { label: "Lighthouse performance, 4 pages", value: "90–91" }
order: 5
---

## Problem
Clients buy a finished website with results, not separate tools. One project had to show the whole chain on one site: design, build, speed, SEO and QA — and what happens when the tools find something.

> Steadyline Maintenance is a **fictional demo business**. No real company, logo or testimonial is used.

## Approach
One command (`npm run e2e`) runs everything with the real tools of my other projects:

| Stage | From | What happens |
|---|---|---|
| Design | UI kit, landing design | Design tokens and components; researched keyword for the services page |
| Build | Elementor site kit | A fresh WordPress becomes the finished 4-page site in 316 s |
| Speed | Speed lab | Every page served from a page cache |
| SEO | SEO playbook | Keyword map and internal-linking map validated; every "live" link checked on the pages |
| QA | Pre-launch QA runner | 25 automated checks |
| SEO tests | Regression tests | Status, indexability, canonical, title, H1, sitemap, robots.txt, real 404 |
| Speed budgets | Core Web Vitals monitor | Lighthouse mobile, median of 3 per page, budgets written before the first run |

## What the tools found
- **A soft 404.** The first run failed QA and one SEO test: every unknown URL was served the front page and redirected to `/`, which hides broken links from Search Console. I fixed it in the site kit itself — so every future site gets the fix — and added a check for it. Second run: QA 0 fails, SEO tests 7 / 7.
- **LCP over budget.** Performance is 90–91 on all four pages and CLS is 0, but LCP is 2.9–3.0 s against a 2.5 s budget. Lighthouse traces it to 13 small render-blocking CSS files. Deferring the scripts was tested and rejected: it saved 0.1 s and caused a layout shift. The real fix — combining CSS with a caching plugin — will be measured on real hosting; the budget stays where it was set.

## Results
Local run, 1 November 2026:

| Check | Result |
|---|---|
| Stages | **5 / 6** (first run 3 / 6) |
| Pre-launch QA | 19 pass · 0 fail · 1 warning (security headers, set on the host) |
| SEO regression tests | 7 / 7 |
| Lighthouse mobile | performance 90–91 · accessibility 96–98 · best practices 100 · SEO 100 · LCP 2.9–3.0 s |

## Lessons
- Running every tool on one site finds what each tool alone can't — and the fix belongs at the source, not in the one site.
- Keep budgets fixed. "Over budget, cause known" is an honest result; a loosened budget isn't.
