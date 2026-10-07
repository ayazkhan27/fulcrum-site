import { createPageMetadata } from "@/lib/site-seo"
import PageContent from "@/components/site/pages/energy"

export const metadata = createPageMetadata("/energy")

export default function Page() {
  return <PageContent />
}
