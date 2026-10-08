import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), 'utf8');

test('Team profiles use the approved full names', async () => {
  const shared = await read('components/site/pages/people.tsx');
  assert.match(shared, /name: "Fatin A Khan"/);
  assert.match(shared, /name: "Ayaz A Khan"/);
  assert.doesNotMatch(shared, /name: "(?:Fatin|Ayaz) Khan"/);
});

test('The editorial redesign is restricted to the standalone People route', async () => {
  const route = await read('app/people/page.tsx');
  const home = await read('app/page.tsx');
  assert.match(route, /<PeopleEditorial people=\{PEOPLE\}/);
  assert.match(route, /createPageMetadata\("\/people"\)/);
  assert.doesNotMatch(home, /PeopleEditorial|people-editorial/);
  assert.match(home, /<PeopleContent embedded/);
});

test('Editorial profiles reuse the approved team data and native accessible disclosures', async () => {
  const source = await read('components/site/people-editorial.tsx');
  assert.match(source, /people\.map/);
  for (const field of ['name', 'role', 'summary', 'bio', 'expertise', 'email']) {
    assert.ok(source.includes(`person.${field}`), `Missing approved person field: ${field}`);
  }
  assert.match(source, /<h1 id="people-title"/);
  assert.match(source, /<h2 id="team-title"/);
  assert.match(source, /<h3 id=\{`team-person-/);
  assert.match(source, /<details className=\{styles\.biography\}/);
  assert.match(source, /aria-label=\{`Read biography of \$\{person\.name\}`\}/);
  assert.doesNotMatch(source, /use client|dangerouslySetInnerHTML/);
});

test('People styling is scoped and supports mobile reflow and keyboard focus', async () => {
  const styles = await read('app/people/people-editorial.module.css');
  assert.doesNotMatch(styles, /:global|person-card|people-hero/);
  assert.match(styles, /:focus-visible/);
  assert.match(styles, /@media \(max-width: 700px\)/);
  assert.match(styles, /grid-template-columns: minmax\(0, 1fr\)/);
  assert.match(styles, /min-height: 44px/);
});

test('Confirmed education and training are preserved but not rendered', async () => {
  const shared = await read('components/site/pages/people.tsx');
  const editorial = await read('components/site/people-editorial.tsx');
  assert.match(shared, /educationAndTraining: "Khan holds an M\.A\. in Mass Communication and Journalism from the University of Dhaka/);
  assert.match(shared, /educationAndTraining: "Engineer Wadud graduated in Mechanical Engineering from Bangladesh University of Engineering and Technology\./);
  assert.doesNotMatch(shared, /civil and electrical engineering/i);
  assert.match(shared, /professional training programmes with IATA and ICAO, among other organisations/);
  assert.match(shared, /Fatin graduated in Computer Science and Engineering from North South University in Dhaka\./);
  assert.match(shared, /studied at Stony Brook University on Long Island/);
  assert.match(shared, /professional training from Google and other organisations/);
  assert.match(shared, /Ayaz earned an M\.A\. in Statistics from Columbia University, New York, in 2026\./);
  assert.match(shared, /graduated with honours from Hunter College, New York, where he studied Data Science and Machine Learning/);
  for (const institution of ['George Washington University', 'Royal Institute of Public Administration', 'Boeing Marketing Academy']) {
    assert.ok(shared.includes(institution));
  }
  assert.doesNotMatch(editorial, /person\.educationAndTraining/);
  assert.doesNotMatch(shared.split('export default function')[1], /educationAndTraining/);
});

test('Editorial biographies show experience while education stays saved and embedded biographies stay unchanged', async () => {
  const shared = await read('components/site/pages/people.tsx');
  const editorial = await read('components/site/people-editorial.tsx');
  const styles = await read('app/people/people-editorial.module.css');
  assert.equal((shared.match(/educationAndTraining:/g) || []).length, 5);
  assert.match(editorial, /<p>\{person\.experienceBio \?\? person\.bio\}<\/p>/);
  assert.doesNotMatch(editorial, /person\.educationAndTraining/);
  assert.match(styles, /\.bioContent p \+ p\s*\{\s*margin-top: 16px;/);
  const embedded = shared.split('export default function')[1];
  assert.match(embedded, /<p>\{person\.bio\}<\/p>/);
  assert.doesNotMatch(embedded, /experienceBio|educationAndTraining/);
});

test('Final editorial polish keeps the introduction consistent and smaller labels readable', async () => {
  const editorial = await read('components/site/people-editorial.tsx');
  const styles = await read('app/people/people-editorial.module.css');
  assert.match(editorial, /safety and compliance, commercial coordination and data analysis/);
  assert.doesNotMatch(editorial, /Three members each|academic backgrounds span|Ivy League/);
  assert.ok(editorial.includes('person.role.replace(/\\s*–\\s*/g, " – ")'));
  assert.match(styles, /\.role\s*\{[^}]*font-size: 0\.72rem/s);
  assert.match(styles, /\.expertise\s*\{[^}]*font-size: 0\.78rem/s);
  assert.doesNotMatch(styles, /\.role\s*\{[^}]*font-size: 0\.63rem/s);
  assert.doesNotMatch(styles, /\.eyebrow::before/);
});
