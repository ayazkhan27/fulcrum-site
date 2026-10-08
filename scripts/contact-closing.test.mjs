import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('The closing footer uses a plain-text slogan without speed strokes and retains the original bus asset', async () => {
  const chrome = await read('components/site/chrome.tsx');
  const slogan = await read('components/site/footer-slogan.tsx');
  assert.doesNotMatch(chrome, /footer-bus|fulcrum-bus-slogan-only/);
  assert.match(chrome, /closing && <FooterSlogan \/>/);
  assert.match(slogan, /<p className="footer-statement" ref=\{containerRef\}>\s*<span ref=\{textRef\}>precision in motion\.<\/span>\s*<\/p>/);
  assert.doesNotMatch(chrome, /fulcrum-signature-editorial\.svg|speed-strokes/);
  await access(new URL('../public/assets/fulcrum-bus-slogan-only-v4.png', import.meta.url));
});

test('The fitted closing slogan retains right breathing room and aligns left with the column below', async () => {
  const css = await read('app/contact/contact.css');
  const statement = css.match(/\.contact-closing \.footer-statement\s*\{([^}]+)\}/)?.[1];
  assert.ok(statement);
  for (const rule of [
    'color: #0047ab;', 'font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;',
    'grid-column: 3 / -1;', 'grid-row: 1;', 'justify-self: start;',
    'align-items: baseline;', 'text-align: left;', 'font-style: normal;',
    'width: calc(100% - 32px);', 'min-width: 0;', 'container-type: inline-size;',
    'font-weight: 100;',
    'white-space: nowrap;',
  ]) assert.ok(statement.includes(rule), `Missing slogan rule: ${rule}`);
  assert.match(css, /\.contact-closing \.footer-statement span\s*\{[^}]*flex: 0 0 auto;\s*font-size: 13cqw;\s*letter-spacing: normal;\s*word-spacing: normal;/);
  assert.match(css, /\.footer-statement::before\s*\{[^}]*height: calc\([^;]*var\(--closing-brand-width\) \* 0\.071217 \+ 4px\);/);
  assert.match(css, /@media \(max-width: 900px\)[\s\S]*\.footer-statement\s*\{\s*grid-column: 2 \/ -1;/);
  assert.doesNotMatch(css, /0\.2977305882/);
  assert.match(css, /--closing-brand-width: 264px/);
  assert.match(css, /--closing-brand-width: 220px/);
});

test('The slogan refits to width changes and loaded fonts without stretching the text', async () => {
  const source = await read('components/site/footer-slogan.tsx');
  assert.match(source, /new ResizeObserver/);
  assert.match(source, /entry\.contentRect\.width === lastWidth/);
  assert.match(source, /document\.fonts\.ready\.then\(schedule\)/);
  assert.match(source, /currentSize \* available \/ measured/);
  assert.match(source, /text\.style\.fontSize =/);
  assert.match(source, /observer\.disconnect\(\)/);
  assert.match(source, /cancelAnimationFrame\(frame\)/);
  assert.doesNotMatch(source, /scaleX|letterSpacing|wordSpacing|innerHTML/);
});

test('The compact slogan keeps contact text readable without an empty mobile branding row', async () => {
  const css = await read('app/contact/contact.css');
  assert.match(css, /\.contact-closing \.footer-office\s*\{[^}]*font-size: 0\.875rem;/);
  const narrow = css.split('@media (max-width: 600px)')[1].split('@media (max-width: 520px)')[0];
  assert.match(narrow, /\.footer-brand\s*\{\s*grid-column: 1 \/ -1;/);
  assert.match(narrow, /\.footer-statement\s*\{[^}]*grid-row: 2;\s*min-height: 0;/);
  assert.match(narrow, /\.footer-statement::before\s*\{\s*display: none;/);
  assert.match(narrow, /\.footer-grid::after\s*\{\s*grid-row: 3;/);
  assert.match(narrow, /\.footer-office \+ \.footer-office\s*\{\s*grid-row: 4;/);
  assert.match(narrow, /\.footer-link-stack > nav\s*\{\s*grid-row: 5;/);
  const phone = css.split('@media (max-width: 520px)')[1].split('@media')[0];
  assert.match(phone, /\.footer-office \+ \.footer-office\s*\{\s*grid-column: 1 \/ -1;/);
  assert.match(phone, /\.footer-office \+ \.footer-office\s*\{\s*grid-row: 5;/);
  assert.match(phone, /\.footer-link-stack > nav\s*\{\s*grid-row: 6;/);
});

test('The closing footer preserves office contact details and company navigation', async () => {
  const chrome = await read('components/site/chrome.tsx');
  for (const detail of [
    '107-21 93rd Street, Ozone Park,', 'New York, NY 11417, USA',
    'House 426, Unit 3A, Road 06,', 'Mirpur DOHS, Dhaka 1216 Bangladesh',
    'tel:+19173294170', 'tel:+15614407168', 'mailto:infobd@fulcrumtriad.com',
    '"/", "/mission", "/people", "/career"',
    'Independent advice. Disclosed representation.',
  ]) assert.ok(chrome.includes(detail), `Preserve ${detail}`);
  assert.match(chrome, /const NavigationGroup = closing \? "nav" : "div"/);
  assert.match(chrome, /aria-label=\{closing \? `\$\{title\} footer links` : undefined\}/);
  assert.match(chrome, /sitePages\.filter/);
});

test('The USA office lists the CEO email directly below the phone numbers', async () => {
  const chrome = await read('components/site/chrome.tsx');
  assert.match(chrome, /<a href="tel:\+15614407168">\+1 \(561\) 440-7168<\/a>\s*<br \/>\s*<a href="mailto:khanhussein@fulcrumtriad\.com">khanhussein@fulcrumtriad\.com<\/a>\s*<\/div>/);
  const usaOffice = chrome.split('<span className="eyebrow">USA Office</span>')[1].split('</address>')[0];
  assert.doesNotMatch(usaOffice, /infobd@/);
});

test('The Bangladesh office has an inline phone label and number followed by the general email', async () => {
  const chrome = await read('components/site/chrome.tsx');
  assert.match(chrome, /House 426, Unit 3A, Road 06,\s*<br \/>\s*Mirpur DOHS, Dhaka 1216 Bangladesh\s*<div className="footer-office-phones">\s*Phone:\{" "\}\s*<a href="tel:\+8801770392001">\+880 1770-392001<\/a>\s*<br \/>\s*<a href="mailto:infobd@fulcrumtriad\.com">infobd@fulcrumtriad\.com<\/a>/);
});

test('Closing layout remains scoped, responsive and keyboard accessible', async () => {
  const css = await read('app/contact/contact.css');
  assert.match(css, /\.contact-closing \.footer-grid\s*\{[^}]*grid-template-columns: 1\.2fr 1\.2fr 0\.8fr 1\.25fr/);
  assert.match(css, /@media \(max-width: 900px\)/);
  assert.match(css, /@media \(max-width: 520px\)/);
  assert.match(css, /grid-template-columns: repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(css, /\.contact-closing a:focus-visible/);
  assert.doesNotMatch(css, /footer-bus/);
  for (const selector of css.matchAll(/([^{}]+)\{/g)) {
    if (selector[1].includes('.footer-')) {
      for (const item of selector[1].trim().split(',')) {
        assert.ok(item.trim().startsWith('.contact-closing'), `Unscoped footer rule: ${item}`);
      }
    }
  }
});
