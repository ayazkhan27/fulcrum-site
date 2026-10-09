import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('Main page titles share the existing Edible Oil responsive size', async () => {
  const cases = [
    ['app/editorial.css', /\.detail-hero h1\s*\{([^}]+)\}/g],
    ['app/people/people-editorial.module.css', /\.headingBlock \.title\s*\{([^}]+)\}/g],
    ['app/fashion-and-finery/fashion.css', /\.fashion-page \.fashion-hero h1\s*\{([^}]+)\}/g],
    ['app/resources/resources.module.css', /\.guideHeader h1\s*\{([^}]+)\}/g],
    ['app/career/career.css', /\.career-title\s*\{([^}]+)\}/g],
    ['app/contact/contact.css', /\.contact-page \.contact-layout > div:first-child > h2\s*\{([^}]+)\}/g],
  ];
  for (const [path, selector] of cases) {
    const rules = [...(await read(path)).matchAll(selector)];
    const sizes = rules.map((match) => match[1].match(/font-size:\s*([^;]+);/)?.[1]).filter(Boolean);
    assert.ok(sizes.length, `No main-title size found in ${path}`);
    assert.ok(sizes.every((size) => size === 'var(--section-title-size)'), `Independent title-size override in ${path}`);
  }
});

test('The reference size and its mobile breakpoint remain unchanged', async () => {
  const css = await read('app/editorial.css');
  assert.match(css, /--section-title-size: clamp\(2\.193408rem, 3\.368448vw, 3\.446784rem\);/);
  assert.match(css, /@media \(max-width: 520px\)\s*\{\s*:root\s*\{\s*--section-title-size: 2\.232576rem;/);
});
