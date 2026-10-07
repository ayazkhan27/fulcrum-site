import assert from "node:assert/strict"
import { existsSync, readFileSync } from "node:fs"
import test from "node:test"
import { buyerGuides, resourcePages, resourceSeo, createResourceMetadata } from "../lib/buyer-guides.ts"

test("resource navigation and metadata cover real, independently addressable pages", () => {
  assert.deepEqual(resourcePages.map((page) => page.href).sort(), Object.keys(resourceSeo).sort())
  assert.equal(new Set(Object.values(resourceSeo).map((page) => page.title)).size, resourcePages.length)
  for (const { href } of resourcePages) {
    assert.ok(existsSync(new URL(`../app${href}/page.tsx`, import.meta.url)), href)
    const metadata = createResourceMetadata(href)
    assert.equal(metadata.alternates.canonical, href)
    assert.equal(metadata.openGraph.url, href)
    assert.equal(metadata.openGraph.title, metadata.title)
    assert.equal(metadata.twitter.description, metadata.description)
    assert.equal(metadata.twitter.card, "summary_large_image")
    assert.ok(metadata.title.length < 70)
    assert.ok(metadata.description.length >= 80 && metadata.description.length <= 180)
  }
})

test("every guide has resolvable contents, source references and a targeted enquiry", () => {
  for (const guide of buyerGuides) {
    assert.ok(guide.sections.length >= 5)
    assert.equal(new Set(guide.sections.map((section) => section.id)).size, guide.sections.length)
    const sourceIds = new Set(guide.sources.map((source) => source.id))
    for (const section of guide.sections) {
      assert.match(section.id, /^[a-z]+(?:-[a-z]+)*$/)
      assert.ok(section.checklist.length >= 3)
      for (const id of section.reference?.sourceIds ?? []) assert.ok(sourceIds.has(id), id)
    }
    for (const source of guide.sources) {
      assert.equal(new URL(source.href).protocol, "https:")
      assert.match(new URL(source.href).hostname, /(?:^|\.)(?:faa\.gov|caab\.gov\.bd|bgmea\.com\.bd|ftc\.gov|cpsc\.gov|cbp\.gov)$/)
    }
    const enquiry = new URL(guide.contactHref, "https://fulcrumtriad.com")
    assert.equal(enquiry.pathname, "/contact")
    assert.ok(["aviation", "apparel"].includes(enquiry.searchParams.get("sector")))
    assert.equal(enquiry.searchParams.get("service"), "sourcing")
    assert.equal(enquiry.searchParams.get("source"), "guide")
    assert.equal(enquiry.hash, "#enquiry-form")
    assert.ok(existsSync(new URL(`../app${guide.sectorHref}/page.tsx`, import.meta.url)))
  }
})

test("resource routes stay out of the approved homepage sequence and use locally scoped styling", () => {
  const homepage = readFileSync(new URL("../app/page.tsx", import.meta.url), "utf8")
  assert.doesNotMatch(homepage, /BuyerGuidePage|buyer-guides|resources\/resources/)
  const layout = readFileSync(new URL("../app/resources/layout.tsx", import.meta.url), "utf8")
  assert.match(layout, /<Header \/>/)
  const component = readFileSync(new URL("../components/site/buyer-guide.tsx", import.meta.url), "utf8")
  assert.match(component, /resources\.module\.css/)
  assert.match(component, /<main id="main"/)
  assert.equal((component.match(/<h1>/g) ?? []).length, 1)
  assert.doesNotMatch(component, /dangerouslySetInnerHTML/)
})
