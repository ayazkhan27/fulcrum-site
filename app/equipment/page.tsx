import { createPageMetadata } from "@/lib/site-seo"
import PageContent from "@/components/site/pages/equipment"

export const metadata = createPageMetadata("/equipment")

export default function Page() {
  return <PageContent />
}
