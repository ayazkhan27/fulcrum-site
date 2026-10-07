import assert from 'node:assert/strict'
import test from 'node:test'
import { sitePages } from '../lib/site-pages.ts'
import { pageSeo, createPageMetadata, organizationStructuredData, siteUrl } from '../lib/site-seo.ts'

test('Every public sitemap route has a unique descriptive search snippet and canonical URL', () => {
  assert.deepEqual(Object.keys(pageSeo).sort(), sitePages.map(p => p.href).sort())
  assert.equal(new Set(Object.values(pageSeo).map(p => p.title)).size, sitePages.length)
  assert.equal(new Set(Object.values(pageSeo).map(p => p.description)).size, sitePages.length)
  for (const { href } of sitePages) {
    const metadata = createPageMetadata(href)
    assert.equal(metadata.alternates.canonical, href)
    assert.equal(new URL(href, siteUrl).origin, siteUrl)
    assert.ok(metadata.title.includes('Fulcrum'))
    assert.ok(metadata.title.length <= 70)
    assert.ok(metadata.description.length >= 80 && metadata.description.length <= 180)
    assert.equal(metadata.openGraph.title, metadata.title)
    assert.equal(metadata.openGraph.description, metadata.description)
    assert.equal(metadata.openGraph.url, href)
    assert.equal(metadata.openGraph.images[0].width, 1200)
    assert.equal(metadata.twitter.card, 'summary_large_image')
  }
})

test('Organization and website data identify the real business without invented rich-result claims', () => {
  const [organization, website] = organizationStructuredData['@graph']
  assert.equal(organization.legalName, 'Fulcrum Triad LLC')
  assert.equal(organization.url, siteUrl)
  assert.equal(organization.address.length, 2)
  assert.equal(website.publisher['@id'], organization['@id'])
  assert.equal(website.url, siteUrl)
  const serialized = JSON.stringify(organizationStructuredData)
  assert.doesNotMatch(serialized, /aggregateRating|reviewRating|SearchAction|award|certification/)
})
