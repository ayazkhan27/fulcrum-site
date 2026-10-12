// The website uses its restored Helvetica masthead; the bus/livery logo keeps
// the separate uppercase artwork and signature. Do not conflate these masters.
import { readFile, writeFile } from 'node:fs/promises';

const master = await readFile(new URL('../assets/brand/fulcrum-master.svg', import.meta.url), 'utf8');
if (!master.includes('fill="#ffffff"')) throw new Error('The canonical master must use white fill');

const websiteLogo = await readFile(new URL('../assets/brand/fulcrum-website-master.svg', import.meta.url), 'utf8');

// The owner-selected homepage artwork is the canonical website logo.
// Only colours change for navy backgrounds; geometry and lettering stay exact.
const lightWebsiteLogo = websiteLogo
  .replace('fill="#003b8c"', 'fill="#ffffff"')
  .replace('fill="#003b8c" opacity="0.6375"', 'fill="#b2bdcd" opacity="0.8"')
  .replace(' fill="#003b8c"/>', '/>');

for (const [filename, variant] of [
  ['fulcrum-logo-shadow-dark.svg', websiteLogo],
  ['fulcrum-logo-shadow-rivet-light.svg', lightWebsiteLogo],
  ['fulcrum-logo-white.svg', master],
]) {
  await writeFile(new URL(`../public/${filename}`, import.meta.url), variant);
  console.log(`Updated ${filename}`);
}

// Reuse only the bus's exact outlined signature in the website footer. The
// mixed-case website name and header artwork must remain separate and unchanged.
const signature = master.match(/<g id="signature"[^>]*>([\s\S]*?)<\/g>/)?.[1];
if (!signature) throw new Error('The bus master must contain its signature artwork');
const footerSignature = `<svg xmlns="http://www.w3.org/2000/svg" width="610" height="48" viewBox="22 7 610 48" fill="#ffffff" role="img">
  <title>Precision in motion.</title>
  <desc>The original italic Fulcrum signature with three speed strokes.</desc>
  ${signature.trim()}
</svg>
`;
await writeFile(new URL('../public/fulcrum-signature-white.svg', import.meta.url), footerSignature);
console.log('Updated fulcrum-signature-white.svg');
