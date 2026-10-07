import test from "node:test"
import assert from "node:assert/strict"
import {
  isProductionPerformanceEnabled,
  publicPerformancePath,
  publicPerformanceUrl,
  sanitizePerformanceEvent,
} from "../lib/performance-privacy.ts"

test("performance collection is enabled only for a Vercel production build", () => {
  assert.equal(isProductionPerformanceEnabled("production", "production"), true)
  for (const environment of ["preview", "development", undefined]) {
    assert.equal(isProductionPerformanceEnabled("production", environment), false)
  }
  assert.equal(isProductionPerformanceEnabled("development", "production"), false)
  assert.equal(isProductionPerformanceEnabled("test", "production"), false)
})

test("only exact public route paths are accepted", () => {
  for (const path of ["/", "/contact", "/aviation", "/sectors/textiles", "/resources/bangladesh-garment-sourcing-checklist"]) {
    assert.equal(publicPerformancePath(path), path)
  }
  for (const path of [null, "/contact/alice@example.com", "/contact?name=Alice", "/contact#Alice", "/sectors/private", "/resources/private", "/api/enquiry", "/contact/"]) {
    assert.equal(publicPerformancePath(path), null)
  }
})

test("public URLs lose all query values and fragments", () => {
  assert.equal(
    publicPerformanceUrl("https://fulcrumtriad.com/contact?email=alice%40example.com&requirement=private#enquiry-form"),
    "https://fulcrumtriad.com/contact"
  )
  assert.equal(publicPerformanceUrl("https://www.fulcrumtriad.com/?name=Alice#private"), "https://fulcrumtriad.com/")
})

test("foreign, preview, local, credential-bearing, malformed and unknown URLs are dropped", () => {
  for (const url of [
    "https://fulcrum-preview.vercel.app/contact",
    "https://example.com/contact",
    "http://localhost:3000/contact",
    "http://fulcrumtriad.com/contact",
    "https://fulcrumtriad.com:8443/contact",
    "https://alice:secret@fulcrumtriad.com/contact",
    "https://fulcrumtriad.com/contact/alice@example.com",
    "https://fulcrumtriad.com/unknown",
    "mailto:alice@example.com",
    "not a URL",
  ]) assert.equal(publicPerformanceUrl(url), null)
})

test("vital metadata is rebuilt from a public path without mutating the original event", () => {
  const event = { type: "vital", url: "https://fulcrumtriad.com/contact?email=alice@example.com#private", route: "/contact" }
  assert.deepEqual(sanitizePerformanceEvent(event), { type: "vital", url: "https://fulcrumtriad.com/contact", route: "/contact" })
  assert.match(event.url, /alice@example\.com/)
})

test("input-derived payload fields and dynamic route labels are never forwarded", () => {
  const event = { type: "vital", url: "https://fulcrumtriad.com/contact" }
  for (const extra of [{ name: "Alice" }, { input: "private" }, { attribution: { value: "private" } }, { properties: { email: "alice@example.com" } }]) {
    assert.equal(sanitizePerformanceEvent({ ...event, ...extra }), null)
  }
  for (const route of ["/[email]", "/contact/alice@example.com", "/contact?private", "/aviation"]) {
    assert.equal(sanitizePerformanceEvent({ ...event, route }), null)
  }
  assert.equal(sanitizePerformanceEvent({ ...event, type: "input" }), null)
})
