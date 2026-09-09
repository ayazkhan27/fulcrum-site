import type { Metadata } from "next"
import {
  CapabilityPage,
  type CapabilityContent,
} from "@/components/site/capability-page"
export const metadata: Metadata = {
  title: "Brokerage | Fulcrum",
  description:
    "A commercial bridge between buyers and international manufacturers, suppliers and service providers. We coordinate opportunities across aviation, energy, textiles, commodities and equipment, with a focus on Bangladesh and cross-border requirements.",
  alternates: { canonical: "/brokerage" },
}
const content: CapabilityContent = {
  label: "Brokerage",
  title: "The right connections. A purposeful process.",
  intro:
    "A commercial bridge between buyers and international manufacturers, suppliers and service providers. We coordinate opportunities across aviation, energy, textiles, commodities and equipment, with a focus on Bangladesh and cross-border requirements.",
  heading: "A structured path from requirement to execution.",
  items: [
    [
      "Define",
      "Agree the requirement, represented party, authority, timeline and fees or commissions in a written mandate.",
    ],
    [
      "Identify",
      "Locate relevant buyers, sellers, operators, providers or partners for the asset, product or service.",
    ],
    [
      "Evaluate",
      "Review fit, documentation, capability and commercial alignment before the opportunity advances.",
    ],
    [
      "Coordinate",
      "Bring together information, questions, specialist input and negotiation support.",
    ],
    [
      "Advance",
      "Track submissions, open questions, delivery interfaces and agreed milestones with the parties and their advisers through completion.",
    ],
  ],
  noteTitle: "Independent. Accountable. Aligned.",
  note: "Our role and compensation are disclosed before the work begins. We coordinate the transaction while legal, engineering, inspection, financing and regulatory conclusions remain with the appropriately qualified professionals.",
  related: "/contact",
  relatedLabel: "Discuss a brokerage mandate",
}
export default function Page() {
  return <CapabilityPage content={content} />
}
