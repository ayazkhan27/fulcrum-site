import type { MetadataRoute } from "next"
import { sitePages } from "@/lib/site-pages"
import { resourcePages } from "@/lib/buyer-guides"
export default function sitemap(): MetadataRoute.Sitemap {
  return [...sitePages, ...resourcePages].map(({ href }) => ({
    url: `https://fulcrumtriad.com${href}`,
  }))
}
