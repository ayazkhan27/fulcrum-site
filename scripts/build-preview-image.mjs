import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve('next/package.json'))('sharp');
const master = await readFile(new URL('../assets/brand/fulcrum-website-master.svg', import.meta.url));
const wordmark = await sharp(master, { density: 192 }).resize({ width: 1000 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } })
  .composite([{ input: wordmark, gravity: 'centre' }])
  .png()
  .toFile(new URL('../public/fulcrum-masthead-preview.png', import.meta.url).pathname);
