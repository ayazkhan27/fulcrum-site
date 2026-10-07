import { createPageMetadata } from "@/lib/site-seo"
import PageContent from "@/components/site/pages/mission"

export const metadata = createPageMetadata("/mission")

export default function Page() {
  return <PageContent />
}
