# Lighthouse after the redesign (local preview)

- Date: 2026-10-19
- Command: `npx lighthouse@12 <url> --chrome-flags="--headless=new"` against `npx astro preview` (mobile emulation, simulated throttling), 3 runs per page; the table shows the median run
- Machine: Windows 10 laptop, Lighthouse benchmark index ~620–890 (slower than an average desktop, so CPU-bound numbers are on the pessimistic side)

| Page | Performance (runs) | Accessibility | Best practices | SEO | LCP | CLS | TBT | Weight |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Home `/` | 97 (91, 97, 99) | 100 | 100 | 100 | 1.2 s | 0 | 150 ms | 38 KB |
| Case study `/case-studies/portfolio-site/` | 100 (96, 100, 100) | 100 | 100 | 100 | 1.2 s | 0 | 0 ms | 36 KB |

## What changed the numbers
A controlled test (6 copies of the home page, each with one feature switched off, 3 runs each) showed no single expensive CSS feature; the cost was the first layout of the whole long page on a slow CPU. `content-visibility: auto` on below-the-fold sections fixed it:

| Home page variant (median of 3) | Performance | TBT |
|---|---:|---:|
| Before the fix | 93 | 281 ms |
| + `content-visibility: auto` on sections | 98 | 107 ms |
| + also without the hero background | 96 | 172 ms (no extra gain — hero kept) |

The live-site numbers after deploying are measured by P14 (Lighthouse CI).
