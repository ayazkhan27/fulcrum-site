// Run against a running production preview; this script only makes GET requests.
// SEO_RELEASE_BASE_URL=http://127.0.0.1:3002 node --experimental-strip-types scripts/seo-release-check.mjs
import assert from "node:assert/strict"
import test from "node:test"
import { sitePages, legacyRedirects } from "../lib/site-pages.ts"
import { pageSeo, siteUrl } from "../lib/site-seo.ts"
import { resourcePages, resourceSeo, buyerGuides } from "../lib/buyer-guides.ts"

const preview = new URL(
  process.env.SEO_RELEASE_BASE_URL || "http://127.0.0.1:3002"
)
assert.ok(
  ["http:", "https:"].includes(preview.protocol),
  "Use an HTTP(S) preview origin"
)
assert.equal(preview.pathname, "/", "Use a preview origin without a path")
assert.equal(
  preview.search + preview.hash + preview.username + preview.password,
  "",
  "Use a preview origin without query, fragment or credentials"
)

const pages = [...sitePages, ...resourcePages]
const snippets = { ...pageSeo, ...resourceSeo }
const responses = new Map()

function get(path) {
  const url = new URL(path, preview)
  assert.equal(
    url.origin,
    preview.origin,
    "Checks must remain on the configured preview"
  )
  url.hash = ""
  if (!responses.has(url.href)) {
    responses.set(
      url.href,
      fetch(url, {
        redirect: "manual",
        signal: AbortSignal.timeout(10_000),
      }).then(async (response) => ({
        status: response.status,
        location: response.headers.get("location"),
        type: response.headers.get("content-type") || "",
        // Metadata can appear after the initial head when Next streams a response.
        html: (await response.text()).replace(
          /<script\b[^>]*>[\s\S]*?<\/script\s*>/gi,
          ""
        ),
      }))
    )
  }
  return responses.get(url.href)
}

function decode(value) {
  const named = { amp: "&", quot: '"', apos: "'", lt: "<", gt: ">", nbsp: " " }
  return value.replace(
    /&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi,
    (entity, code) => {
      if (code[0] !== "#") return named[code.toLowerCase()]
      return String.fromCodePoint(
        code[1].toLowerCase() === "x"
          ? parseInt(code.slice(2), 16)
          : parseInt(code.slice(1), 10)
      )
    }
  )
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(
      (match) => [match[1].toLowerCase(), decode(match[2] ?? match[3])]
    )
  )
}

function tags(html, name) {
  return [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(
    (match) => attributes(match[0])
  )
}

function one(values, label) {
  assert.equal(values.length, 1, `${label}: expected exactly one value`)
  assert.ok(values[0], `${label}: must not be empty`)
  return values[0]
}

function metadata(html, path) {
  const meta = tags(html, "meta")
  const byMeta = (key, value) =>
    one(
      meta.filter((item) => item[key] === value).map((item) => item.content),
      `${path} ${value}`
    )
  return {
    title: one(
      [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((match) =>
        decode(match[1])
      ),
      `${path} title`
    ),
    description: byMeta("name", "description"),
    canonical: new URL(
      one(
        tags(html, "link")
          .filter((item) => item.rel === "canonical")
          .map((item) => item.href),
        `${path} canonical`
      )
    ).href,
    ogTitle: byMeta("property", "og:title"),
    ogDescription: byMeta("property", "og:description"),
    ogUrl: new URL(byMeta("property", "og:url")).href,
    twitterTitle: byMeta("name", "twitter:title"),
    twitterDescription: byMeta("name", "twitter:description"),
  }
}

test("release inventory contains 15 distinct canonical pages", () => {
  assert.equal(pages.length, 15)
  assert.equal(new Set(pages.map(({ href }) => href)).size, 15)
})

for (const { href } of pages) {
  test(`${href}: direct HTTP 200 with the expected production metadata`, async () => {
    const response = await get(href)
    assert.equal(response.status, 200, href)
    assert.match(response.type, /text\/html/)
    const actual = metadata(response.html, href)
    assert.equal(actual.title, snippets[href].title, `${href} title`)
    assert.equal(
      actual.description,
      snippets[href].description,
      `${href} description`
    )
    assert.equal(
      actual.canonical,
      new URL(href, siteUrl).href,
      `${href} canonical must use the production origin`
    )
    assert.equal(actual.ogUrl, actual.canonical)
    assert.equal(actual.ogTitle, actual.title)
    assert.equal(actual.ogDescription, actual.description)
    assert.equal(actual.twitterTitle, actual.title)
    assert.equal(actual.twitterDescription, actual.description)
    const robots = tags(response.html, "meta")
      .filter((item) => item.name === "robots")
      .map((item) => item.content)
      .join(",")
    assert.doesNotMatch(robots, /\bnoindex\b/i, `${href} must remain indexable`)
  })
}

test("served titles, descriptions and canonicals are distinct across all 15 pages", async () => {
  const delivered = await Promise.all(
    pages.map(async ({ href }) => metadata((await get(href)).html, href))
  )
  for (const key of ["title", "description", "canonical"]) {
    assert.equal(
      new Set(delivered.map((item) => item[key])).size,
      15,
      `Duplicate served ${key}`
    )
  }
})

test("sitemap returns exactly the 15 production canonical URLs", async () => {
  const response = await get("/sitemap.xml")
  assert.equal(response.status, 200)
  assert.match(response.type, /xml/)
  const locations = [...response.html.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => new URL(decode(match[1])).href
  )
  assert.equal(locations.length, 15)
  assert.deepEqual(
    locations.sort(),
    pages.map(({ href }) => new URL(href, siteUrl).href).sort()
  )
})

for (const { source, destination } of legacyRedirects) {
  test(`${source}: direct 308 to the intended page and existing fragment`, async () => {
    const redirect = await get(source)
    assert.equal(redirect.status, 308, source)
    assert.ok(redirect.location, `${source} is missing Location`)
    const expected = new URL(destination, preview)
    const target = new URL(redirect.location, preview)
    assert.equal(target.origin, preview.origin)
    assert.equal(target.pathname, expected.pathname)
    assert.equal(target.search, expected.search)
    assert.equal(target.hash, expected.hash)
    const landing = await get(target.href)
    assert.equal(landing.status, 200, `${source} must resolve in one redirect`)
    if (target.hash) {
      const ids = [
        ...landing.html.matchAll(
          /<[a-z][^>]*\bid=(?:"([^"]*)"|'([^']*)')[^>]*>/gi
        ),
      ].map((match) => decode(match[1] ?? match[2]))
      assert.ok(
        ids.includes(decodeURIComponent(target.hash.slice(1))),
        `${source} has missing target ${target.hash}`
      )
    }
  })
}

const sectorPages = [
  ["/aviation", "aviation"],
  ["/energy", "energy"],
  ["/sectors/textiles", "textiles"],
  ["/sectors/commodities", "commodities"],
  ["/equipment", "equipment"],
  ["/defense", "defense"],
  ["/fashion-and-finery", "apparel"],
]

function enquiryLinks(html) {
  return tags(html, "a")
    .filter((item) => item.href)
    .map((item) => new URL(item.href, preview))
    .filter(
      (url) =>
        url.origin === preview.origin &&
        url.pathname === "/contact" &&
        url.searchParams.has("sector")
    )
}

function assertEnquiry(url, { sector, source, service = "" }, label) {
  assert.equal(url.hash, "#enquiry-form", `${label} form target`)
  assert.deepEqual(
    [...url.searchParams.keys()].sort(),
    ["sector", "source", ...(service ? ["service"] : [])].sort(),
    `${label} contains only intended prefill keys`
  )
  assert.equal(url.searchParams.get("sector"), sector, `${label} sector`)
  assert.equal(url.searchParams.get("source"), source, `${label} source`)
  assert.equal(
    url.searchParams.get("service") || "",
    service,
    `${label} service`
  )
}

test("seven sector CTAs preserve the intended fixed prefill choices", async () => {
  for (const [href, sector] of sectorPages) {
    const links = enquiryLinks((await get(href)).html)
    assert.ok(links.length, `${href} needs a targeted enquiry CTA`)
    for (const link of links)
      assertEnquiry(
        link,
        {
          sector,
          source: "sector",
          service: sector === "apparel" ? "sourcing" : "",
        },
        href
      )
  }
})

test("homepage preserves its existing CTA destinations, image sizing and embedded Contact content", async () => {
  for (const path of ["/", "/?sector=apparel&service=sourcing&source=guide"]) {
    const { html } = await get(path)
    assert.equal(enquiryLinks(html).length, 0)
    const discussions = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)]
      .filter((match) => /^Discuss\b/.test(decode(match[2].replace(/<[^>]+>/g, " ")).trim()))
      .map((match) => attributes(match[0]))
    assert.equal(discussions.length, sectorPages.length)
    for (const link of discussions) assert.equal(link.href, "/contact")
    assert.ok(!tags(html, "a").some((link) => link.href?.startsWith("/resources")))
    assert.doesNotMatch(html, /Buyer guides for your sourcing brief/)
    assert.doesNotMatch(html, /<option[^>]*>Apparel &amp; fashion sourcing<\/option>/)
    const form = one(tags(html, "form").filter((item) => item.id === "enquiry-form"), "homepage form")
    for (const field of ["sector", "service", "source"]) assert.equal(form[`data-enquiry-${field}`], "")
    const airport = one(
      tags(html, "img").filter((item) => item.src?.includes("stocksnap-building-2603781")),
      "homepage airport image"
    )
    assert.equal(airport.sizes, "(max-width: 800px) 100vw, 50vw")
  }
})

test("standalone Contact retains guide discovery and the additional apparel enquiry option", async () => {
  const { html } = await get("/contact")
  assert.ok(tags(html, "a").some((link) => link.href === "/resources"))
  assert.match(html, /Buyer guides for your sourcing brief/)
  assert.match(html, /<option[^>]*>Apparel &amp; fashion sourcing<\/option>/)
})

test("both guide CTAs retain sector and source attribution", async () => {
  for (const guide of buyerGuides) {
    const href = `/resources/${guide.slug}`
    const expected = new URL(guide.contactHref, preview)
    const guideLinks = enquiryLinks((await get(href)).html)
    assert.ok(guideLinks.length, `${href} needs a targeted enquiry CTA`)
    for (const link of guideLinks) {
      assertEnquiry(
        link,
        {
          sector: expected.searchParams.get("sector"),
          source: "guide",
          service: "sourcing",
        },
        href
      )
    }
  }
})

test("Contact offers email preparation and never claims a sent enquiry from URL flags", async () => {
  // HTTP sees the prerendered fallback. Hydrated selections and edit/reset behavior
  // require a separate browser check; GET requests cannot demonstrate delivery.
  for (const path of [
    "/contact",
    "/contact?sector=aviation&service=sourcing&source=guide&sent=1&success=true",
  ]) {
    const response = await get(path)
    assert.equal(response.status, 200)
    const form = one(
      [
        ...response.html.matchAll(
          /<form\b[^>]*\bid="enquiry-form"[^>]*>[\s\S]*?<\/form>/gi
        ),
      ].map((match) => match[0]),
      `${path} enquiry form`
    )
    const text = decode(form.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ")
    assert.match(text, /Prepare an enquiry, then send it from your email app\./)
    assert.match(text, /Prepare enquiry/)
    assert.doesNotMatch(
      text,
      /(?:enquiry|message|request)\s+(?:(?:has been|was|is)\s+)?(?:successfully\s+)?(?:sent|received|submitted|delivered)\b/i
    )
    assert.doesNotMatch(
      form,
      /\baction\s*=/i,
      "The email-draft fallback must not pretend to submit to a delivery endpoint"
    )
    assert.ok(
      tags(response.html, "a").some(
        (link) => link.href === "mailto:infobd@fulcrumtriad.com"
      )
    )
  }
})
