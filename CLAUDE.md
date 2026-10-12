# P15 — Personal portfolio site without WordPress

Read README.md first: it holds the goal, setup and the Build checklist.

## What this project is
A static Astro site. Each case study is a Markdown file; Astro builds static pages served from a CDN, so Core Web Vitals stay above 90.

Priority: Must · build order 1 of 40 · estimate 5 days. Personal / demo project, not client work.

## Related projects
Every finished case study is published here.

## Commands
Setup:
Requires Node.js 22.12+.

```bash
npm create astro@latest site
cd site
npm run dev
```
The Astro project lives in `site/`; planning files stay at the root. `.github/workflows/deploy.yml` builds `site/`, runs the SEO check and publishes to GitHub Pages on every push to `main`.

Run:
```bash
cd site
npm run dev      # local preview
npm run build    # production build in site/dist
npm run check    # SEO checks on every built page (run after build)
```

## How to work in this project
- Follow the Build checklist in README.md in order; work on one unchecked item at a time.
- When an item is finished, tick it in README.md (`- [ ]` → `- [x]`).
- Keep the existing function names and signatures; each one maps to a checklist step. Ask before renaming.
- Write or update a test for every function you implement, and run the tests before calling a step done.
- Ask before adding a dependency; list every dependency in requirements.txt or package.json.
- Secrets go only in `.env` (git-ignored). Never add client data.
- When the project is done, fill the Results section of README.md with one measurable line from a real run.
