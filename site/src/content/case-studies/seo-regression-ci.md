---
title: "SEO Regression Tests That Run on Every Deploy"
description: "Daily and on-push checks that catch a noindex, a wrong canonical or a blocked robots.txt the day it ships, with a GitHub issue as the alert."
project_id: "P13"
stage: "qa"
published: true
date: 2026-10-19
tools: ["Python", "pytest", "PyYAML", "GitHub Actions"]
metrics:
  - { label: "live checks green on my site", value: "9 / 9" }
  - { label: "for a full live run", value: "~12 s" }
  - { label: "offline tests, incl. a broken deploy", value: "22" }
order: 50
---

## Problem
A deploy can silently switch a site to `noindex`, point canonicals at staging or block everything in robots.txt. Traffic drops days later, and by then nobody remembers which deploy did it.

## Approach
1. Wrote down what the live site must look like in one YAML file: status, indexability, canonical, title, H1 count, redirects and sitemap membership per URL, plus robots.txt and sitemap rules.
2. A small checker reads each live page's head tags and describes every difference as a readable sentence.
3. Offline tests against a local test site — including a deliberately broken deploy — and `live` tests against the real site.
4. GitHub Actions runs everything on every push and every morning, and opens or updates a GitHub issue when something fails. No secrets needed.

## Key decisions
- **Check the first response, not the final one** — so the config can require "http:// answers 301", and a URL that suddenly redirects is noticed.
- **"Not indexable" is an expectation too** — the 404 page must be noindex; only checking for the absence of noindex would miss half the story.
- **Strict config validation** — a typo like `canonicl:` would otherwise check nothing at all.
- **Readable failures** — `canonical is 'https://staging…', expected 'https://…'` makes the GitHub issue actionable.

## Results
| Measurement | Result |
|---|---|
| Watched on https://matt-g20.github.io | 7 URLs + robots.txt + sitemap |
| Live run (19 October 2026) | **9 / 9 green in about 12 s** |
| After the site's redesign | 9 / 9 green again |
| Offline tests | 22, including a simulated broken deploy that must fail |

## Lessons
- PyYAML reads the GitHub Actions key `on:` as the boolean `True` (YAML 1.1), so the workflow test has to look up both.
- In Python, `True` is an integer, so `status: true` passes a naive type check — the config needs an explicit rule.
