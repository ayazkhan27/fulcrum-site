import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const root = new URL('../', import.meta.url);
const master = await readFile(new URL('assets/brand/fulcrum-website-master.svg', root), 'utf8');
// Preserve the approved mountain geometry and raise it above the brand name.
const mountains = master.match(/<g transform="translate\(9 0\)">([\s\S]*?)<\/g>/)?.[1];
if (!mountains) throw new Error('Canonical mountain artwork is missing');
const icon = `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <title>Fulcrum</title>
  <desc>Approved twin-mountain mark above the Fulcrum name.</desc>
  <g transform="translate(32 40) scale(1.307) translate(-90 -155)">${mountains}</g>
  <text x="128" y="211" text-anchor="middle" fill="#101f26" font-family="Helvetica, Arial, sans-serif" font-size="46" font-weight="700">Fulcrum</text>
</svg>`;
// Sampled beneath the homepage masthead from sky-padrinan-trial.jpg,
// including the homepage's translucent light overlay.
const render = (size) => sharp(Buffer.from(icon)).resize(size, size).flatten({ background: '#4a99b5' }).png().toBuffer();
await writeFile(new URL('public/fulcrum-site-icon.png', root), await render(192));
await writeFile(new URL('app/apple-icon.png', root), await render(180));
await writeFile(new URL('public/apple-touch-icon.png', root), await render(180));
const sizes = [16, 32, 48, 256];
const images = await Promise.all(sizes.map(async (size) =>
  sharp(await render(size)).ensureAlpha().png().toBuffer(),
));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, index) => {
  const entry = 6 + 16 * index;
  header[entry] = header[entry + 1] = size === 256 ? 0 : size;
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(images[index].length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += images[index].length;
});
await writeFile(new URL('app/favicon.ico', root), Buffer.concat([header, ...images]));
