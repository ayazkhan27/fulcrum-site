import type { Metadata } from "next"
import {
  CapabilityPage,
  type CapabilityContent,
} from "@/components/site/capability-page"
export const metadata: Metadata = {
  title: "Aviation | Fulcrum",
  description:
    "Global consulting and brokerage across aircraft, engines, maintenance and the equipment that keeps operations moving. For airlines, airports, their subsidiaries and civil and military clients.",
  alternates: { canonical: "/aviation" },
}
const content: CapabilityContent = {
  label: "Aviation",
  title: "From terminal to tarmac.",
  intro:
    "Advisory, sourcing and brokerage across aircraft, engines, maintenance and the systems behind aviation. For airlines, airports, their subsidiaries, and civil and defense-sector requirements.",
  heading: "Expertise across assets, infrastructure and operations.",
  items: [
    [
      "Aircraft transactions",
      "Sourcing, acquisition, sale and leasing support. Connecting operators, owners and lessors around a defined asset and commercial requirement.",
    ],
    [
      "Engines",
      "Sourcing and placement, records review coordination, commercial support and shop-visit planning.",
    ],
    [
      "Maintenance & MRO",
      "Provider identification, maintenance planning, technical workscoping and coordination with qualified specialists.",
    ],
    [
      "Ground support & airport systems",
      "Ground-support equipment, vehicles, tooling, airport systems and operational infrastructure requirements.",
    ],
    [
      "Airline subsidiaries",
      "Flight catering, cargo, ground handling, training, security and the businesses behind the passenger experience.",
    ],
    [
      "Parts & manufacturer representation",
      "Parts, components, tooling and consumables. Potential manufacturer or supplier representation is subject to a specific agreed mandate.",
    ],
  ],
  noteTitle: "The whole operation comes into view.",
  note: "An aircraft is one part of a much wider system. We consider the commercial requirement alongside maintenance, equipment and operational dependencies. Civil and military assignments are scoped around the relevant technical, regulatory and end-user requirements.",
  related: "/aviation/aircraft-engine-transactions",
  relatedLabel: "Explore aircraft & engine transactions",
}
export default function Page() {
  return <CapabilityPage content={content} />
}
