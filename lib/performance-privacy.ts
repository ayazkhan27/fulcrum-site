// Only published, fixed paths may appear in performance reports. Never report
// arbitrary URL segments, query parameters, fragments, or form values.
const publicPerformancePaths = new Set([
  "/",
  "/mission",
  "/people",
  "/aviation",
  "/equipment",
  "/defense",
  "/energy",
  "/sectors/textiles",
  "/fashion-and-finery",
  "/sectors/commodities",
  "/career",
  "/contact",
  "/resources",
  "/resources/aircraft-dry-lease-enquiry-checklist",
  "/resources/bangladesh-garment-sourcing-checklist",
])

const publicOrigin = "https://fulcrumtriad.com"
const publicOrigins = new Set([publicOrigin, "https://www.fulcrumtriad.com"])

export type PerformanceEvent = {
  type: "vital"
  url: string
  route?: string
}

export function isProductionPerformanceEnabled(
  nodeEnvironment: string | undefined,
  vercelEnvironment: string | undefined
) {
  return nodeEnvironment === "production" && vercelEnvironment === "production"
}

export function publicPerformancePath(pathname: string | null): string | null {
  return pathname !== null && publicPerformancePaths.has(pathname)
    ? pathname
    : null
}

export function publicPerformanceUrl(value: string): string | null {
  try {
    const url = new URL(value)
    if (!publicOrigins.has(url.origin) || url.username || url.password) return null
    const path = publicPerformancePath(url.pathname)
    return path === null ? null : `${publicOrigin}${path}`
  } catch {
    return null
  }
}

// The SDK's hook exposes URL metadata, not the underlying vital/DOM entries.
// Reject unexpected payload fields instead of forwarding arbitrary data.
export function sanitizePerformanceEvent(event: PerformanceEvent): PerformanceEvent | null {
  if (
    event.type !== "vital" ||
    typeof event.url !== "string" ||
    Object.keys(event).some((key) => !["type", "url", "route"].includes(key))
  ) return null

  const url = publicPerformanceUrl(event.url)
  if (url === null) return null
  const route = new URL(url).pathname
  if (event.route !== undefined && event.route !== route) return null
  return { type: "vital", url, route }
}
