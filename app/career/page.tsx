import type { Metadata } from "next"
import CareerContent from "@/components/site/pages/career"

export const metadata: Metadata = {
  title: "Career | Fulcrum",
  description: "Career enquiries at Fulcrum. Get in touch about opportunities in sourcing, commercial coordination and international business.",
  alternates: { canonical: "/career" },
}

export default function Page() {
  return <CareerContent />
}
