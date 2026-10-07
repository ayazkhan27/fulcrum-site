import { createPageMetadata } from "@/lib/site-seo"
import PageContent from "@/components/site/pages/defense"

export const metadata = createPageMetadata("/defense")

export default function Page() {
  return <PageContent />
}
