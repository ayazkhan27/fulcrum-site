import { createPageMetadata } from "@/lib/site-seo"
import CareerContent from "@/components/site/pages/career"

export const metadata = createPageMetadata("/career")

export default function Page() {
  return <CareerContent />
}
