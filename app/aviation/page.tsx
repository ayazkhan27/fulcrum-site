import type { Metadata } from "next"
import PageContent from "@/components/site/pages/aviation"

export const metadata: Metadata = {
  title: "Aviation & Airports | Fulcrum",
  description:
    "Aircraft, engine and spare-parts sourcing, MRO partnerships and airport equipment representation for Bangladesh and international markets.",
  alternates: { canonical: "/aviation" },
}

export default function Page() {
  return <PageContent />
}
