import type { MetadataRoute } from "next"
import { sitePages } from "@/lib/site-pages"
export default function sitemap(): MetadataRoute.Sitemap {
  return sitePages.map(({ href }) => ({
    url: `https://fulcrumtriad.com${href}`,
  }))
}
