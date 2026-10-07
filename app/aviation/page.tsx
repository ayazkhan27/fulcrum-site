import { createPageMetadata } from "@/lib/site-seo"
import PageContent from "@/components/site/pages/aviation"

export const metadata = createPageMetadata("/aviation")

export default function Page() {
  return <PageContent />
}
