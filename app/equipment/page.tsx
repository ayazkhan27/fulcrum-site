import type { Metadata } from "next"
import PageContent from "@/components/site/pages/equipment"

export const metadata: Metadata = {
  title: "Spares & Equipment | Fulcrum",
  description:
    "Industrial equipment, medical equipment and government or defense procurement support, with distinct requirements, supplier sourcing and specialist review for each assignment.",
  alternates: { canonical: "/equipment" },
}

export default function Page() {
  return <PageContent />
}
