// Builds the PNG and ICO favicons from site/public/favicon.svg (no dependencies
// besides the Playwright CLI for rendering):
//   node design/make-icons.mjs
// Writes site/public/apple-touch-icon.png (180x180) and site/public/favicon.ico (32x32 PNG inside an ICO).

import { execFileSync } from 'node:child_process';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const publicDir = resolve(here, '../site/public');
const work = resolve(here, '.icons');
mkdirSync(work, { recursive: true });

// iOS rounds the touch icon itself and old browsers show the .ico on any tab colour,
// so both PNGs use a full square (no rounded corners, no transparency).
const svg = readFileSync(join(publicDir, 'favicon.svg'), 'utf8').replace('rx="9"', 'rx="0"');

function render(size, file, padding = 0) {
  // A page exactly the size of the icon, screenshotted by Playwright.
  const html = `<!doctype html><html><body style="margin:0;width:${size}px;height:${size}px;background:#4f46e5">
    <div style="width:${size - 2 * padding}px;height:${size - 2 * padding}px;margin:${padding}px">${svg.replace('<svg ', '<svg width="100%" height="100%" ')}</div></body></html>`;
  const page = join(work, `icon-${size}.html`);
  writeFileSync(page, html);
  // npx is a .cmd file on Windows, which Node only starts through a shell. A shell
  // splits arguments at spaces ("Techno Tehran"), so every argument is quoted.
  const args = ['-y', 'playwright@1.58.0', 'screenshot', '--channel', 'chrome', '--viewport-size', `${size},${size}`, pathToFileURL(page).href, file];
  execFileSync('npx', args.map((arg) => `"${arg}"`), { stdio: 'ignore', shell: true });
}

render(180, join(publicDir, 'apple-touch-icon.png'), 0);
const png32 = join(work, 'favicon-32.png');
render(32, png32);

// An .ico file can hold a PNG: 6-byte header + one 16-byte directory entry + the PNG bytes.
const png = readFileSync(png32);
const header = Buffer.alloc(22);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type 1 = icon
header.writeUInt16LE(1, 4); // one image
header.writeUInt8(32, 6); // width
header.writeUInt8(32, 7); // height
header.writeUInt8(0, 8); // no palette
header.writeUInt8(0, 9); // reserved
header.writeUInt16LE(1, 10); // colour planes
header.writeUInt16LE(32, 12); // bits per pixel
header.writeUInt32LE(png.length, 14); // image size
header.writeUInt32LE(22, 18); // offset of the image data
writeFileSync(join(publicDir, 'favicon.ico'), Buffer.concat([header, png]));
console.log('Wrote apple-touch-icon.png and favicon.ico');
