import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { enquiryServices, isEnquiryService, enquiryServiceLabel, buildEnquiryMailto } from '../lib/enquiry-services.ts';
import { sitePages } from '../lib/site-pages.ts';

const read = (file) => readFile(new URL(`../${file}`, import.meta.url), 'utf8');

test('The explorer covers five shared services, not aviation disciplines', () => {
  assert.deepEqual(enquiryServices.map(({ name }) => name), [
    'Consulting', 'Sourcing', 'Representation', 'Negotiation', 'Coordination',
  ]);
  assert.equal(new Set(enquiryServices.map(({ id }) => id)).size, 5);
  for (const item of enquiryServices) {
    assert.ok(item.heading && item.body && item.detail);
    assert.ok(isEnquiryService(item.id));
    assert.equal(enquiryServiceLabel(item.id), item.name);
    assert.doesNotMatch(item.body, /aircraft|MRO|tarmac|—/i);
  }
  assert.equal(isEnquiryService('unknown'), false);
  assert.equal(enquiryServiceLabel('guidance'), 'I would like guidance');
});

test('The explorer is paired with the form on Contact and removed from Aviation', async () => {
  const contact = await read('components/site/pages/contact.tsx');
  const capability = await read('components/site/capability-page.tsx');
  const paired = await read('components/site/service-enquiry.tsx');
  assert.match(contact, /<ServiceEnquiry embedded=\{embedded\}>/);
  assert.doesNotMatch(capability, /AviationExplorer|ServiceExplorer/);
  assert.match(paired, /<ServiceExplorer/);
  assert.match(paired, /<EnquiryForm\s+service=\{service\}/);
  assert.match(paired, /if \(isEnquiryService\(value\)\) setActive\(value\)/);
  assert.equal(sitePages.length, 12);
  assert.ok(sitePages.some(({ href }) => href === '/contact'));
});

test('Each service is included in a safely encoded, unsent email draft', () => {
  for (const { id, name } of enquiryServices) {
    const fields = {
      name: 'Example Tester', organization: 'Sample & Co.', email: 'test@example.com',
      sector: 'Energy, petroleum & LNG', service: id,
      requirement: 'Need A&B parts + specifications?\nDelivery: Q4 / 100% confirmed quote.',
    };
    const draft = new URL(buildEnquiryMailto(fields));
    assert.equal(draft.protocol, 'mailto:');
    assert.equal(draft.pathname, 'infobd@fulcrumtriad.com');
    assert.equal(draft.searchParams.get('subject'), 'Fulcrum enquiry, Energy, petroleum & LNG');
    const body = draft.searchParams.get('body');
    assert.ok(body.includes(`Service: ${name}`));
    assert.ok(body.includes('Organization: Sample & Co.'));
    assert.ok(body.endsWith(fields.requirement));
  }
});

test('Tabs retain keyboard support and prepared drafts track the selected service', async () => {
  const explorer = await read('components/site/service-explorer.tsx');
  for (const key of ['ArrowRight', 'ArrowLeft', 'Home', 'End']) assert.ok(explorer.includes(key));
  assert.match(explorer, /role="tablist"/);
  assert.match(explorer, /role="tabpanel"/);
  assert.match(explorer, /href="#enquiry-form"/);
  const form = await read('components/site/enquiry-form.tsx');
  assert.match(form, /prepared\?\.service === service/);
  assert.match(form, /Nothing has been sent yet/);
  assert.match(form, /onChange=\{\(\) => setPrepared\(null\)\}/);
});

test('The embedded homepage form bypasses URL prefill and preserves its original choices', async () => {
  const paired = await read('components/site/service-enquiry.tsx');
  assert.match(paired, /if \(embedded\) return \(\s*<ServiceEnquiryContent attribution=\{emptyAttribution\} embedded>/);
  assert.match(paired, /<EnquiryForm[\s\S]*?embedded=\{embedded\}/);
  const form = await read('components/site/enquiry-form.tsx');
  assert.match(form, /\{!embedded && <option>Apparel & fashion sourcing<\/option>\}/);
  for (const file of ['components/site/capability-page.tsx', 'components/site/pages/defense.tsx', 'components/site/pages/equipment.tsx', 'components/site/pages/fashion.tsx']) {
    assert.match(await read(file), /href=\{embedded \? "\/contact" : buildEnquiryHref/);
  }
});
