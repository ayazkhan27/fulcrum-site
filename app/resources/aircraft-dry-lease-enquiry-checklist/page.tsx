import { BuyerGuidePage } from "@/components/site/buyer-guide"
import { aircraftDryLeaseGuide, createResourceMetadata } from "@/lib/buyer-guides"

export const metadata = createResourceMetadata("/resources/aircraft-dry-lease-enquiry-checklist")

export default function AircraftDryLeaseChecklistPage() {
  return <BuyerGuidePage guide={aircraftDryLeaseGuide} />
}
