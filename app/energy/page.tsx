import type { Metadata } from "next"
import PageContent from "@/components/site/pages/energy"

export const metadata: Metadata = {
  title: "Energy & Petroleum | Fulcrum",
  description:
    "Petroleum products, fossil fuels and LNG sourcing, supplier representation and transaction coordination for Bangladesh and international markets.",
  alternates: { canonical: "/energy" },
}

export default function Page() {
  return <PageContent />
}
