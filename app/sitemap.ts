import type { MetadataRoute } from "next"
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/aviation",
    "/energy",
    "/services",
    "/consulting",
    "/brokerage",
    "/people",
    "/aviation/aircraft-engine-transactions",
    "/contact",
  ].map((path) => ({ url: `https://fulcrumtriad.com${path}` }))
}
