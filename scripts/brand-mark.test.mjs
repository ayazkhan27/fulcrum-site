import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const variants = [
  'fulcrum-logo-shadow-dark.svg',
  'fulcrum-logo-shadow-rivet-light.svg',
  'fulcrum-logo-white.svg',
];

const master = await readFile(new URL('../assets/brand/fulcrum-master.svg', import.meta.url), 'utf8');
const websiteMaster = await readFile(new URL('../assets/brand/fulcrum-website-master.svg', import.meta.url), 'utf8');

function points(svg, id) {
  const match = svg.match(new RegExp(`<polygon id="${id}" points="([^"]+)"`));
  assert.ok(match, `${id} must remain identifiable`);
  return match[1].split(' ').map((pair) => pair.split(',').map(Number));
}

function intersections(polygon, y) {
  return polygon.flatMap(([x1, y1], index) => {
    const [x2, y2] = polygon[(index + 1) % polygon.length];
    if (y1 === y2 || y < Math.min(y1, y2) || y > Math.max(y1, y2)) return [];
    return [x1 + ((y - y1) / (y2 - y1)) * (x2 - x1)];
  });
}

for (const filename of variants) {
  test(`${filename} preserves the reference's transparent mountain separation`, async () => {
    const svg = await readFile(new URL(`../public/${filename}`, import.meta.url), 'utf8');
    const primary = points(svg, 'mountain-primary');
    const secondary = points(svg, 'mountain-secondary');
    assert.deepEqual(primary, [[143, 155], [193.5, 240], [90, 240]]);
    // Grow another 5% from the previous version, anchored at the inner base
    // corner so the existing narrow diagonal gap does not collapse.
    const previousSecondary = [[199.3, 180.465], [235, 240], [196.675, 240], [180.4, 211.65]];
    const enlargedSecondary = previousSecondary.map(([x, y]) => [
      Number((196.675 + (x - 196.675) * 1.05).toFixed(5)),
      Number((240 + (y - 240) * 1.05).toFixed(5)),
    ]);
    assert.deepEqual(secondary, enlargedSecondary);
    for (let y = 178; y < 240; y += 0.5) {
      const gap = Math.min(...intersections(secondary, y)) - Math.max(...intersections(primary, y));
      assert.ok(gap >= 3.17, `Mountains must not merge at y=${y}: gap=${gap}`);
    }
    const baseGap = Math.min(...intersections(secondary, 240)) - Math.max(...intersections(primary, 240));
    assert.ok(Math.abs(baseGap - 3.175) < 0.00001, 'Preserve the previous narrow diagonal gap');
    assert.equal((svg.match(/<polygon\b/g) ?? []).length, 2);
    assert.doesNotMatch(svg, /<(?:rect|image)\b/, 'Keep the background and diagonal gap transparent');
    if (filename === 'fulcrum-logo-white.svg') {
      assert.match(svg, /<g transform="translate\(18 0\)">/, 'Leave the bus mountain position unchanged');
      assert.match(svg, /<g id="wordmark"/);
      assert.match(svg, /<g id="signature"/);
      assert.equal((svg.match(/<path\b/g) ?? []).length, 2, 'The bus/livery logo retains the slogan and speed strokes');
      assert.equal(svg, master);
    } else {
      assert.match(svg, /<g transform="translate\(9 0\)">/, 'Move the website mountains eight preview pixels right from the previous placement');
      assert.match(svg, /<text x="255" y="240"/, 'Keep the Fulcrum name fixed');
      assert.doesNotMatch(svg, /signature|precision in motion/i, 'Website logos must omit the bus slogan');
      assert.match(svg, /font-family="Helvetica, Arial, sans-serif"/);
      assert.match(svg, /<text[^>]*>Fulcrum<\/text>/, 'Restore the earlier mixed-case name');
      assert.match(svg, /viewBox="80 140 595 112"/);
      const expected = filename === 'fulcrum-logo-shadow-dark.svg'
        ? websiteMaster
        : websiteMaster.replace('fill="#003b8c"', 'fill="#ffffff"')
          .replace('fill="#003b8c" opacity="0.6375"', 'fill="#b2bdcd" opacity="0.8"')
          .replace(' fill="#003b8c"/>', '/>');
      assert.equal(svg, expected, 'Every website variant derives from the approved homepage master');
      assert.match(svg, /<title>Fulcrum<\/title>/);
      if (filename === 'fulcrum-logo-shadow-rivet-light.svg') {
        assert.match(svg, /id="mountain-secondary"[^>]*fill="#b2bdcd" opacity="0.8"/,
          'The smaller mountain stays visible in silver on dark backgrounds');
      }
    }
  });
}

test('The shared header/footer component reserves the restored masthead aspect ratio', async () => {
  const component = await readFile(new URL('../components/site/wordmark.tsx', import.meta.url), 'utf8');
  assert.match(component, /width=\{595\}/);
  assert.match(component, /height=\{112\}/);
  assert.match(component, /alt="Fulcrum"/);
});

test('Only the closing footer uses a black masthead; the standard footer remains unchanged', async () => {
  const chrome = await readFile(new URL('../components/site/chrome.tsx', import.meta.url), 'utf8');
  const [header, footer] = chrome.split('export function Footer(');
  assert.doesNotMatch(header, /footer-tagline|Precision in motion\./);
  assert.match(footer, /src=\{closing \? "\/fulcrum-logo-footer-black\.svg" : "\/fulcrum-logo-footer-cobalt\.svg"\}/);
  const cobalt = await readFile(new URL('../public/fulcrum-logo-footer-cobalt.svg', import.meta.url), 'utf8');
  const black = await readFile(new URL('../public/fulcrum-logo-footer-black.svg', import.meta.url), 'utf8');
  assert.equal(black, cobalt.replaceAll('#003d91', '#000000'), 'Change only the closing masthead colour, never its geometry');
  assert.match(footer, /src="\/fulcrum-signature-white\.svg"/);
  assert.match(footer, /alt="Precision in motion\."/);
  assert.match(footer, /className="footer-tagline"/);
  assert.doesNotMatch(footer, /footer-description/);
  const [branding, scope] = footer.split('<p className="footer-scope">');
  assert.doesNotMatch(branding, /Global sourcing and representation\.|Bangladesh and beyond\./);
  const scopeText = scope.replace(/\s+/g, ' ');
  assert.match(scopeText, /Fulcrum is registered in the United States as Fulcrum Triad LLC\./);
  assert.match(scopeText, /We provide global sourcing, representation, advisory and transaction-intermediary support in Bangladesh and beyond\./);
  assert.match(scopeText, /Scope, representation and remuneration are agreed upon for each engagement\./);
  assert.match(scopeText, /Images are illustrative and do not depict assets or facilities owned by Fulcrum\./);
});

test('The footer signature preserves the bus lettering and speed strokes exactly', async () => {
  const signature = await readFile(new URL('../public/fulcrum-signature-white.svg', import.meta.url), 'utf8');
  const original = master.match(/<g id="signature"[^>]*>([\s\S]*?)<\/g>/)?.[1].trim();
  assert.ok(original);
  assert.ok(signature.includes(original), 'Reuse the exact outlined bus signature');
  assert.equal((signature.match(/<path\b/g) ?? []).length, 1);
  assert.doesNotMatch(signature, /<(?:text|image|rect)\b/);
  assert.match(signature, /viewBox="22 7 610 48"/);
});

test('The footer logo grows by ten percent at both established sizes', async () => {
  const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8');
  const widths = [...css.matchAll(/--footer-brand-width: (\d+)px/g)].map((match) => Number(match[1]));
  assert.deepEqual(widths, [240, 200].map((width) => Math.round(width * 1.1)));
});

test('The Contact closing logo gains five percent from its approved size and keeps its vertical offset', async () => {
  const css = await readFile(new URL('../app/contact/contact.css', import.meta.url), 'utf8');
  const scale = css.match(/\.contact-closing \.footer-brand\s*\{[^}]*transform:\s*translateY\(4px\) scale\(([\d.]+)\)/)?.[1];
  assert.ok(scale);
  assert.equal(Number(scale), Number((1.0815 * 1.05).toFixed(6)));
});
