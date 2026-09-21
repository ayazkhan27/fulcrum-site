import { readFile, writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const root = new URL('../', import.meta.url);
const master = await readFile(new URL('assets/brand/fulcrum-website-master.svg', root), 'utf8');
// Preserve the approved mountain geometry; omit lettering at favicon sizes.
const icon = master
  .replace('width="595" height="112" viewBox="80 140 595 112"', 'width="256" height="256" viewBox="80 105 185 185"')
  .replace(/<text\b[\s\S]*?<\/text>/, '')
  .replace(/<desc>[\s\S]*?<\/desc>/, '<desc>Fulcrum twin-mountain mark.</desc>');
const render = (size) => sharp(Buffer.from(icon)).resize(size, size).flatten({ background: '#ffffff' }).png().toBuffer();
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
