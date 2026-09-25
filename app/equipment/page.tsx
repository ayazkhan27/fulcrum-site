import type { Metadata } from "next"
import PageContent from "@/components/site/pages/equipment"

export const metadata: Metadata = {
  title: "Spares & Equipment | Fulcrum",
  description:
    "Sourcing support for airlines, airport operators and ground handlers: aircraft engines and spares, passenger and baggage systems, ramp equipment and industrial equipment.",
  alternates: { canonical: "/equipment" },
}

export default function Page() {
  return <PageContent />
}
