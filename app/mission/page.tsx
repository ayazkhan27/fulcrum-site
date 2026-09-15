import type { Metadata } from "next"
import PageContent from "@/components/site/pages/mission"

export const metadata: Metadata = {
  title: "Our Mission | Fulcrum",
  description:
    "Fulcrum is a global sourcing and brokerage company, facilitating business between Bangladesh and the world and beyond.",
  alternates: { canonical: "/mission" },
}

export default function Page() {
  return <PageContent />
}
