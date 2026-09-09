import type { MetadataRoute } from "next"
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/aviation",
    "/energy",
    "/services",
    "/sectors/textiles",
    "/sectors/commodities",
    "/sectors/industrial",
    "/sectors/healthcare",
    "/sectors/defense",
    "/consulting",
    "/brokerage",
    "/people",
    "/aviation/aircraft-engine-transactions",
    "/contact",
  ].map((path) => ({ url: `https://fulcrumtriad.com${path}` }))
}
