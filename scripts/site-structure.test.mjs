import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import test from 'node:test';
import { sitePages, legacyRedirects } from '../lib/site-pages.ts';
import { sectors } from '../lib/sectors.ts';

const root = new URL('../', import.meta.url);
const read = (file) => readFile(new URL(file, root), 'utf8');

test('The site has exactly the eleven pages approved by the owner, in order', () => {
  assert.deepEqual(sitePages.map((page) => page.label), [
    'Home', 'Mission', 'Our People', 'Aviation & Airports', 'Spares & Equipment', 'Defense Supply',
    'Energy & Petroleum', 'Textile & Mill Supply', 'Edible Oil & Commodities',
    'Career', 'Contact',
  ]);
  assert.equal(new Set(sitePages.map((page) => page.href)).size, 11);
});

test('Only approved content routes remain, including exactly two sector pages', async () => {
  async function pages(directory) {
    const entries = await readdir(new URL(directory, root), { withFileTypes: true });
    const nested = await Promise.all(entries.map((entry) => entry.isDirectory()
      ? pages(`${directory}${entry.name}/`)
      : /^page\.(tsx|ts|jsx|js)$/.test(entry.name) ? [`${directory}${entry.name}`] : []));
    return nested.flat();
  }
  assert.deepEqual((await pages('app/')).sort(), [
    'app/page.tsx', 'app/mission/page.tsx', 'app/aviation/page.tsx',
    'app/equipment/page.tsx', 'app/defense/page.tsx', 'app/energy/page.tsx', 'app/people/page.tsx',
    'app/career/page.tsx', 'app/contact/page.tsx', 'app/sectors/[slug]/page.tsx',
  ].sort());
  assert.deepEqual(sectors.filter((sector) => sector.href.startsWith('/sectors/')).map((sector) => sector.slug), ['textiles', 'commodities']);
  assert.match(await read('app/sectors/[slug]/page.tsx'), /export const dynamicParams = false/);
});

test('Navigation and sitemap use the same canonical page list', async () => {
  for (const file of ['app/sitemap.ts', 'components/site/navigation.tsx', 'components/site/chrome.tsx']) {
    assert.match(await read(file), /import \{ sitePages \} from "@\/lib\/site-pages"/);
  }
  const config = await read('next.config.ts');
  assert.match(config, /legacyRedirects\.map/);
  assert.match(config, /permanent: true/);
});

test('Retired URLs redirect directly to the appropriate sections without loops', () => {
  assert.equal(legacyRedirects.length, 8);
  const canonical = new Set(sitePages.map((page) => page.href));
  const sources = new Set(legacyRedirects.map((redirect) => redirect.source));
  assert.equal(sources.size, legacyRedirects.length);
  for (const { source, destination } of legacyRedirects) {
    assert.ok(!canonical.has(source));
    assert.ok(canonical.has(destination.split('#')[0]));
    assert.ok(!sources.has(destination.split('#')[0]));
  }
  for (const sector of sectors) assert.ok(canonical.has(sector.href.split('#')[0]));
});

test('Approved pages retain their hero-only presentation', async () => {
  const mission = await read('components/site/pages/mission.tsx');
  assert.match(mission, /id="purpose"/);
  assert.doesNotMatch(mission, /<SharedCapabilities|page-section-nav/);
  const aviation = await read('components/site/pages/aviation.tsx');
  assert.match(aviation, /heroOnly/);
  assert.match(await read('components/site/pages/energy.tsx'), /heroOnly/);
  assert.match(await read('components/site/capability-page.tsx'), /!heroOnly && <Footer/);
});

test('Home presents the approved pages in scroll order', async () => {
  const home = await read('app/page.tsx');
  assert.deepEqual([...home.matchAll(/<section id="(page-[^"]+)"/g)].map(match => match[1]), [
    'page-mission', 'page-people', 'page-aviation', 'page-equipment', 'page-defense', 'page-energy',
    'page-textiles', 'page-commodities', 'page-contact',
  ]);
  assert.equal((home.match(/ embedded/g) || []).length, 9);
  assert.doesNotMatch(home, /CareerContent|page-career/);
  assert.match(home, /<PaperFlight/);
});

test('People has ordered person headings and no repeated team-note sentence', async () => {
  const people = await read('components/site/pages/people.tsx');
  assert.match(people, /<h2>\{person\.name\}<\/h2>/);
  assert.doesNotMatch(people, /<h3>\{person\.name\}/);
  assert.doesNotMatch(people, /The assignment shapes the team\./);
});

test('The www host redirects to the established apex canonical host', async () => {
  const config = await read('next.config.ts');
  assert.match(config, /type: "host" as const, value: "www\.fulcrumtriad\.com"/);
  assert.match(config, /destination: "https:\/\/fulcrumtriad\.com\/:path\*"/);
});
