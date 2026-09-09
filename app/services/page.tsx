import type { Metadata } from "next"
import {
  CapabilityPage,
  type CapabilityContent,
} from "@/components/site/capability-page"
export const metadata: Metadata = {
  title: "Capabilities | Fulcrum",
  description:
    "Sourcing, representation and commercial coordination across aviation, energy, textiles, industrial supply and healthcare. Connecting international manufacturers with requirements in Bangladesh and beyond.",
  alternates: { canonical: "/services" },
}
const content: CapabilityContent = {
  label: "Capabilities",
  title: "The expertise your next move needs.",
  intro:
    "Sourcing, representation and commercial coordination across aviation, energy, textiles, industrial supply and healthcare. Connecting international manufacturers with requirements in Bangladesh and beyond.",
  heading: "Different sectors. One commercial bridge.",
  items: [
    [
      "Aviation & airports",
      "Aircraft, engines, spares, MRO partnerships and airport systems. We source suppliers, coordinate technical input and support transactions from requirement to delivery.",
    ],
    [
      "Energy & petroleum",
      "Petroleum products, fossil oils and LNG. Producer and buyer introductions, proposal comparison and coordination of commercial terms, documentation and delivery interfaces.",
    ],
    [
      "Textiles & mill supply",
      "Cotton, fabrics and inputs for textile and finishing mills. We connect manufacturers and mills with sources, clarify specifications and coordinate proposals and supply requirements.",
    ],
    [
      "Edible oils & commodities",
      "Supplier sourcing and buyer representation for edible oils and related commodity requirements, with product specifications, quantities and delivery expectations defined at the outset.",
    ],
    [
      "Industrial equipment",
      "Generators, bearings, warehouse equipment and production-support requirements. Manufacturer representation, supplier evaluation and coordination across purchasing and delivery teams.",
    ],
    [
      "Medical equipment",
      "Manufacturer and supplier introductions for medical equipment procurement. Product requirements, documentation and specialist review are coordinated with the purchasing organization.",
    ],
    [
      "Government & defense procurement",
      "Commercial representation and procurement coordination for public-sector and defense equipment requirements. We organize supplier engagement, submissions and milestones within the agreed scope.",
    ],
  ],
  noteTitle: "Built around the assignment.",
  note: "Every assignment starts with the requirement and the party we represent. Consulting, sourcing, brokerage, document review and negotiation support come together in one coordinated workstream. We monitor the details through agreed milestones, with responsibilities and fees or commissions documented before work begins.",
  related: "/contact",
  relatedLabel: "Let’s define your requirement",
}
export default function Page() {
  return <CapabilityPage content={content} />
}
