---
title: "Pre-Launch QA: Checklist and Automated Runner"
description: "A 50-item WordPress launch checklist and a Python runner that checks 21 of the items automatically and blocks a launch when one fails."
project_id: "Q1"
stage: "qa"
published: true
date: 2026-10-19
tools: ["Python", "requests", "BeautifulSoup", "pytest"]
metrics:
  - { label: "checks passed on my live site (0 fail)", value: "23 / 25" }
  - { label: "checklist items automated", value: "21 of 50" }
  - { label: "automated tests", value: "27" }
order: 40
---

## Problem
The most damaging launch bugs are boring: a `noindex` left over from staging, a robots.txt that still blocks everything, broken links after a content move, a "soft 404" that answers 200. They are easy to check and easy to forget.

## Approach
1. Rewrote the launch checklist around my own delivery process and marked each item **[auto]** (a script can check it) or **[manual]** (a person must).
2. Built a runner that crawls only the site's own pages, once, and shares that crawl between all checks.
3. Gave every check four honest outcomes — PASS, FAIL, WARN and N/A — so a local test site without HTTPS shows "N/A", not a fake pass.
4. The runner exits with an error on any FAIL, so it can block a deploy.
5. Tested each check against a local website with exactly one planted problem.

## Key decisions
- **Broken links name the page that links to them** — "404 on /old-page/, linked from /contact/" is a fix; "404 on /old-page/" is homework.
- **Crawl once, check many times** — five checks don't mean five crawls of the client's server.
- **N/A instead of a false PASS** — a report that pretends to check what it can't would hide real problems.

## Results
Run on my own site, https://matt-g20.github.io (19 October 2026):

| Outcome | Checks |
|---|---|
| Pass | **23** |
| Fail | 0 |
| Warn | 1 — security headers, which GitHub Pages doesn't let you set |
| N/A | 1 — no separate www host |

## Lessons
- The first real run crashed *after* every check had passed: the Windows console couldn't print "→". Tests didn't catch it because they capture output as UTF-8. Real runs on the real platform find bugs tests miss — now there is a regression test for it.
- A start URL that redirects made the crawler parse the home page twice and report a duplicate title. Pages are now de-duplicated by their final URL.
