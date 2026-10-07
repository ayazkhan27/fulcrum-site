import { createPageMetadata } from "@/lib/site-seo"
import PageContent from "@/components/site/pages/people"

export const metadata = createPageMetadata("/people")

export default function Page() {
  return <PageContent />
}
