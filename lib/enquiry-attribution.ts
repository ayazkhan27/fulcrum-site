import {
  isEnquirySector,
  isEnquiryServiceChoice,
  type EnquirySectorId,
  type EnquiryServiceChoice,
} from "./enquiry-services"

export const enquirySources = ["guide", "sector", "contact", "home"] as const
export type EnquirySource = (typeof enquirySources)[number]

export type EnquiryAttribution = {
  sector: EnquirySectorId | ""
  service: EnquiryServiceChoice
  source: EnquirySource | ""
}

function isEnquirySource(value: unknown): value is EnquirySource {
  return enquirySources.some((source) => source === value)
}

// Only explicitly supported selections may cross the URL/form boundary.
// Ambiguous duplicate parameters are discarded, even if one value is valid.
export function readEnquiryAttribution(
  params: Pick<URLSearchParams, "getAll">
): EnquiryAttribution {
  const one = (key: string) => {
    const values = params.getAll(key)
    return values.length === 1 ? values[0] : ""
  }
  const sector = one("sector")
  const service = one("service")
  const source = one("source")
  return {
    sector: isEnquirySector(sector) ? sector : "",
    service: isEnquiryServiceChoice(service) ? service : "",
    source: isEnquirySource(source) ? source : "",
  }
}

export function buildEnquiryHref(input: Partial<EnquiryAttribution> = {}) {
  const params = new URLSearchParams()
  if (isEnquirySector(input.sector)) params.set("sector", input.sector)
  if (isEnquiryServiceChoice(input.service))
    params.set("service", input.service)
  if (isEnquirySource(input.source)) params.set("source", input.source)
  const query = params.toString()
  return `/contact${query ? `?${query}` : ""}#enquiry-form`
}

const pageByPath = {
  "/": "home",
  "/mission": "mission",
  "/people": "people",
  "/aviation": "aviation",
  "/fashion-and-finery": "apparel",
  "/sectors/textiles": "textiles",
  "/sectors/commodities": "commodities",
  "/energy": "energy",
  "/equipment": "equipment",
  "/defense": "defense",
  "/career": "career",
  "/contact": "contact",
  "/resources": "resources",
  "/resources/aircraft-dry-lease-enquiry-checklist": "guide",
  "/resources/bangladesh-garment-sourcing-checklist": "guide",
} as const

const pageBySection = {
  "page-mission": "mission",
  "page-people": "people",
  "page-aviation": "aviation",
  "page-fashion": "apparel",
  "page-textiles": "textiles",
  "page-commodities": "commodities",
  "page-energy": "energy",
  "page-equipment": "equipment",
  "page-defense": "defense",
  "page-career": "career",
  "page-contact": "contact",
} as const

type AnalyticsPage = (typeof pageByPath)[keyof typeof pageByPath] | "other"
const analyticsPages: readonly string[] = [
  ...Object.values(pageByPath),
  "other",
]

const guideSectorByPath = {
  "/resources/aircraft-dry-lease-enquiry-checklist": "aviation",
  "/resources/bangladesh-garment-sourcing-checklist": "apparel",
} as const

export function enquiryPageContext(pathname: string, sectionId = "") {
  const path = pathname.split(/[?#]/, 1)[0].replace(/\/$/, "") || "/"
  const routePage = Object.hasOwn(pageByPath, path)
    ? pageByPath[path as keyof typeof pageByPath]
    : "other"
  const page: AnalyticsPage =
    path === "/" && Object.hasOwn(pageBySection, sectionId)
      ? pageBySection[sectionId as keyof typeof pageBySection]
      : routePage
  return {
    page,
    sector: isEnquirySector(page)
      ? page
      : Object.hasOwn(guideSectorByPath, path)
        ? guideSectorByPath[path as keyof typeof guideSectorByPath]
        : "",
    source: (path === "/"
      ? "home"
      : page === "guide" || page === "resources"
        ? "guide"
        : isEnquirySector(page)
          ? "sector"
          : page === "contact"
            ? "contact"
            : "") as EnquirySource | "",
  }
}

// This is the complete event payload schema. Never spread form data, a URL,
// referrer, link text or an email address into analytics properties.
export function enquiryAnalyticsProperties(input: {
  page?: unknown
  sector?: unknown
  service?: unknown
  source?: unknown
}) {
  return {
    page:
      typeof input.page === "string" && analyticsPages.includes(input.page)
        ? input.page
        : "other",
    sector: isEnquirySector(input.sector) ? input.sector : "unspecified",
    service: isEnquiryServiceChoice(input.service)
      ? input.service
      : "unspecified",
    source: isEnquirySource(input.source) ? input.source : "unspecified",
  }
}

export const enquiryEvents = [
  "Enquiry prepared",
  "Enquiry draft opened",
  "Business email clicked",
  "Phone link clicked",
  "Career application clicked",
] as const
type EnquiryEvent = (typeof enquiryEvents)[number]
type AnalyticsSender = (
  name: string,
  properties: Record<string, string>
) => unknown

export function recordEnquiryEvent(
  send: AnalyticsSender,
  name: EnquiryEvent,
  context: Parameters<typeof enquiryAnalyticsProperties>[0]
) {
  try {
    // Analytics is optional; a blocked or failing provider must never interrupt
    // preparation of a draft or navigation to the visitor's email app.
    void Promise.resolve(send(name, enquiryAnalyticsProperties(context))).catch(
      () => {}
    )
  } catch {
    // Keep the enquiry usable when analytics is unavailable.
  }
}

export function contactClickEvent(
  href: string,
  context: { draft: boolean; career: boolean }
): EnquiryEvent | null {
  if (/^tel:/i.test(href)) return "Phone link clicked"
  if (!/^mailto:/i.test(href)) return null
  if (context.draft) return "Enquiry draft opened"
  return context.career
    ? "Career application clicked"
    : "Business email clicked"
}

export function stripAnalyticsUrl(value: string): string | null {
  try {
    const url = new URL(value)
    if (url.protocol !== "https:" && url.protocol !== "http:") return null
    url.search = ""
    url.hash = ""
    url.username = ""
    url.password = ""
    return url.toString()
  } catch {
    return null
  }
}
