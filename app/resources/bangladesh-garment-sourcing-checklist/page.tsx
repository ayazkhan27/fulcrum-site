import { BuyerGuidePage } from "@/components/site/buyer-guide"
import { bangladeshGarmentGuide, createResourceMetadata } from "@/lib/buyer-guides"

export const metadata = createResourceMetadata("/resources/bangladesh-garment-sourcing-checklist")

export default function BangladeshGarmentChecklistPage() {
  return <BuyerGuidePage guide={bangladeshGarmentGuide} />
}
