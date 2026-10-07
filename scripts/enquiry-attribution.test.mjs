import assert from "node:assert/strict"
import { registerHooks } from "node:module"
import { readFile } from "node:fs/promises"
import test from "node:test"

// Node's type stripping does not resolve the extensionless imports used by Next.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (
      specifier === "./enquiry-services" &&
      context.parentURL?.endsWith("/lib/enquiry-attribution.ts")
    ) {
      return nextResolve(
        new URL("./enquiry-services.ts", context.parentURL).href,
        context
      )
    }
    return nextResolve(specifier, context)
  },
})

const {
  buildEnquiryHref,
  readEnquiryAttribution,
  enquiryPageContext,
  enquiryAnalyticsProperties,
  recordEnquiryEvent,
  contactClickEvent,
  stripAnalyticsUrl,
} = await import("../lib/enquiry-attribution.ts")
const {
  enquiryServices,
  enquirySectors,
  enquirySectorLabel,
  enquirySectorFromLabel,
  buildEnquiryMailto,
} = await import("../lib/enquiry-services.ts")

const parse = (query) => readEnquiryAttribution(new URLSearchParams(query))

test("All supported sectors and services round-trip through the enquiry link", () => {
  assert.deepEqual(
    enquirySectors.map(({ id }) => id),
    [
      "aviation",
      "apparel",
      "textiles",
      "commodities",
      "energy",
      "equipment",
      "defense",
    ]
  )
  for (const { id: sector } of enquirySectors) {
    for (const service of [
      ...enquiryServices.map(({ id }) => id),
      "guidance",
    ]) {
      const href = buildEnquiryHref({ sector, service, source: "guide" })
      const url = new URL(href, "https://fulcrumtriad.com")
      assert.equal(url.pathname, "/contact")
      assert.equal(url.hash, "#enquiry-form")
      assert.deepEqual(readEnquiryAttribution(url.searchParams), {
        sector,
        service,
        source: "guide",
      })
      assert.equal(enquirySectorFromLabel(enquirySectorLabel(sector)), sector)
    }
  }
  for (const source of ["guide", "sector", "contact", "home"]) {
    assert.equal(parse(`source=${source}`).source, source)
  }
})

test("Unknown, duplicate and personal URL values cannot prefill the form", () => {
  for (const value of [
    "",
    "AVIATION",
    "unknown",
    "constructor",
    "__proto__",
    "<script>alert(1)</script>",
    "name@example.com",
  ]) {
    const query = new URLSearchParams({
      sector: value,
      service: value,
      source: value,
    })
    assert.deepEqual(readEnquiryAttribution(query), {
      sector: "",
      service: "",
      source: "",
    })
  }
  assert.deepEqual(
    parse(
      "sector=aviation&sector=apparel&service=sourcing&service=sourcing&source=guide&source=home"
    ),
    {
      sector: "",
      service: "",
      source: "",
    }
  )
  assert.deepEqual(
    parse(
      "sector=aviation&name=Private+Person&email=private%40example.com&requirement=confidential&service=sourcing&source=guide"
    ),
    {
      sector: "aviation",
      service: "sourcing",
      source: "guide",
    }
  )
  assert.equal(
    buildEnquiryHref({
      sector: "name@example.com",
      service: "injected",
      source: "https://referrer.example",
    }),
    "/contact#enquiry-form"
  )
})

test("Page and embedded-section attribution only emits fixed categories", () => {
  assert.deepEqual(
    enquiryPageContext("/aviation?email=private@example.com#personal"),
    {
      page: "aviation",
      sector: "aviation",
      source: "sector",
    }
  )
  assert.deepEqual(enquiryPageContext("/", "page-fashion"), {
    page: "apparel",
    sector: "apparel",
    source: "home",
  })
  assert.deepEqual(enquiryPageContext("/", "page-contact"), {
    page: "contact",
    sector: "",
    source: "home",
  })
  assert.deepEqual(enquiryPageContext("/contact", "page-aviation"), {
    page: "contact",
    sector: "",
    source: "contact",
  })
  assert.deepEqual(
    enquiryPageContext("/resources/aircraft-dry-lease-enquiry-checklist"),
    {
      page: "guide",
      sector: "aviation",
      source: "guide",
    }
  )
  assert.deepEqual(
    enquiryPageContext("/resources/bangladesh-garment-sourcing-checklist"),
    {
      page: "guide",
      sector: "apparel",
      source: "guide",
    }
  )
  for (const path of [
    "/resources/private@example.com",
    "/unknown",
    "/constructor",
    "/__proto__",
  ]) {
    assert.deepEqual(enquiryPageContext(path, "page-private@example.com"), {
      page: "other",
      sector: "",
      source: "",
    })
  }
})

test("Analytics has a closed payload schema and discards personal information", () => {
  assert.deepEqual(
    enquiryAnalyticsProperties({
      page: "contact",
      sector: "apparel",
      service: "sourcing",
      source: "guide",
      name: "Private Person",
      email: "private@example.com",
      requirement: "Confidential request",
      referrer: "https://example.com/?email=private@example.com",
    }),
    { page: "contact", sector: "apparel", service: "sourcing", source: "guide" }
  )
  assert.deepEqual(
    enquiryAnalyticsProperties({
      page: "/contact?name=Private",
      sector: "private@example.com",
      service: {},
      source: "private@example.com",
    }),
    {
      page: "other",
      sector: "unspecified",
      service: "unspecified",
      source: "unspecified",
    }
  )
  assert.equal(enquirySectorFromLabel("Industrial equipment"), "equipment")
  assert.equal(enquirySectorFromLabel("Medical equipment"), "equipment")
  assert.equal(enquirySectorFromLabel("Private Person"), "")
})

test("Drafts, business email, phone and career actions are mutually exclusive", () => {
  const email = "mailto:private@example.com?subject=Private&body=Confidential"
  assert.equal(
    contactClickEvent(email, { draft: false, career: false }),
    "Business email clicked"
  )
  assert.equal(
    contactClickEvent(email, { draft: true, career: false }),
    "Enquiry draft opened"
  )
  assert.equal(
    contactClickEvent(email, { draft: false, career: true }),
    "Career application clicked"
  )
  assert.equal(
    contactClickEvent("tel:+12345678", { draft: false, career: false }),
    "Phone link clicked"
  )
  assert.equal(
    contactClickEvent("/contact", { draft: false, career: false }),
    null
  )
  assert.equal(
    contactClickEvent("https://example.com/?mailto:private@example.com", {
      draft: false,
      career: false,
    }),
    null
  )
})

test("Optional analytics failures cannot interrupt the enquiry action", async () => {
  const payloads = []
  recordEnquiryEvent(
    (name, data) => payloads.push({ name, data }),
    "Enquiry prepared",
    {
      page: "contact",
      sector: "aviation",
      service: "sourcing",
      source: "guide",
      email: "private@example.com",
    }
  )
  assert.deepEqual(payloads, [
    {
      name: "Enquiry prepared",
      data: {
        page: "contact",
        sector: "aviation",
        service: "sourcing",
        source: "guide",
      },
    },
  ])
  assert.doesNotThrow(() =>
    recordEnquiryEvent(
      () => {
        throw new Error("blocked")
      },
      "Enquiry prepared",
      {}
    )
  )
  recordEnquiryEvent(
    () => Promise.reject(new Error("unavailable")),
    "Enquiry draft opened",
    {}
  )
  await new Promise((resolve) => setImmediate(resolve))
})

test("Query strings and fragments are stripped and malformed analytics URLs are dropped", () => {
  assert.equal(
    stripAnalyticsUrl(
      "https://fulcrumtriad.com/contact?name=Private&email=private@example.com#secret"
    ),
    "https://fulcrumtriad.com/contact"
  )
  assert.equal(
    stripAnalyticsUrl(
      "https://user:secret@fulcrumtriad.com/contact?source=guide"
    ),
    "https://fulcrumtriad.com/contact"
  )
  assert.equal(stripAnalyticsUrl("not a URL"), null)
  assert.equal(stripAnalyticsUrl("mailto:private@example.com"), null)
})

test("Draft content includes the selected sector and service without changing the recipient", () => {
  const fields = {
    name: "Example Tester",
    organization: "Sample & Co",
    email: "sample@example.com",
    sector: enquirySectorLabel("apparel"),
    service: "sourcing",
    requirement: "Sizes & samples?\nTiming: Q4",
  }
  const draft = new URL(buildEnquiryMailto(fields))
  assert.equal(draft.protocol, "mailto:")
  assert.equal(draft.pathname, "infobd@fulcrumtriad.com")
  assert.match(
    draft.searchParams.get("body"),
    /Area: Apparel & fashion sourcing\nService: Sourcing/
  )
  assert.ok(draft.searchParams.get("body").endsWith(fields.requirement))
})

test("Changing a field or selected service invalidates a prepared draft", async () => {
  const form = await readFile(
    new URL("../components/site/enquiry-form.tsx", import.meta.url),
    "utf8"
  )
  assert.match(form, /prepared\?\.service === service/)
  assert.match(form, /prepared\.sector === sector/)
  assert.match(form, /onChange=\{\(\) => setPrepared\(null\)\}/)
  assert.match(form, /Nothing has been sent yet/)
  assert.match(form, /data-enquiry-draft/)
  const analytics = await readFile(
    new URL("../components/site/visitor-analytics.tsx", import.meta.url),
    "utf8"
  )
  assert.doesNotMatch(analytics, /Email link clicked/)
  assert.match(analytics, /closest\('\[id\^="page-"\]'\)/)
  assert.match(analytics, /closest\("\.career-page"\)/)
})
