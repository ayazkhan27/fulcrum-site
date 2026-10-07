import { createPageMetadata } from "@/lib/site-seo"
import PageContent from "@/components/site/pages/contact"

export const metadata = createPageMetadata("/contact")

export default function Page() {
  return <PageContent />
}
