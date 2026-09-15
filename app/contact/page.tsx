import type { Metadata } from "next"
import PageContent from "@/components/site/pages/contact"

export const metadata: Metadata = {
  title: "Contact Us | Fulcrum",
  description:
    "Discuss sourcing, manufacturer representation or procurement across aviation, energy, textiles, commodities, industrial and medical equipment.",
  alternates: { canonical: "/contact" },
}

export default function Page() {
  return <PageContent />
}
