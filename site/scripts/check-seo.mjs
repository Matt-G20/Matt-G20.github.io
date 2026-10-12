// Checks every built HTML page for basic SEO problems.
// Usage: npm run build && npm run check
import fs from 'node:fs';
import path from 'node:path';

const dist = process.argv[2] ?? 'dist';
const pages = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith('.html')) pages.push(p);
  }
})(dist);

let problems = 0;
const fail = (page, msg) => { problems++; console.log(`FAIL ${page}: ${msg}`); };
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');

for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const page = '/' + path.relative(dist, file).replace(/\\/g, '/').replace(/index\.html$/, '');
  const title = decode(html.match(/<title>(.*?)<\/title>/)?.[1] ?? '');
  const desc = decode(html.match(/<meta name="description" content="(.*?)"/)?.[1] ?? '');
  const h1s = (html.match(/<h1[\s>]/g) ?? []).length;
  const canonical = html.match(/<link rel="canonical" href="(.*?)"/)?.[1];
  if (!title || title.length > 60) fail(page, `title length ${title.length}`);
  if (!desc || desc.length > 155) fail(page, `description length ${desc.length}`);
  if (h1s !== 1) fail(page, `${h1s} h1 tags`);
  if (!canonical || !canonical.endsWith(page)) fail(page, `canonical ${canonical}`);
  if (!html.includes('aria-current="page"')) fail(page, 'no active menu item');
  for (const [, href] of html.matchAll(/<a href="(\/[^"#]*)"/g)) {
    const target = path.join(dist, href, href.endsWith('/') ? 'index.html' : '');
    if (!fs.existsSync(target)) fail(page, `broken link ${href}`);
  }
  console.log(`ok   ${page}  title=${title.length} desc=${desc.length}`);
}
console.log(problems ? `${problems} problem(s)` : 'All pages passed');
process.exit(problems ? 1 : 0);
