import type { Metadata } from "next"
import {
  CapabilityPage,
  type CapabilityContent,
} from "@/components/site/capability-page"
export const metadata: Metadata = {
  title: "Brokerage | Fulcrum",
  description:
    "Independent intermediary support across aviation assets, maintenance, equipment, petroleum products and LNG. A clear mandate connects the requirement to the right commercial opportunity.",
  alternates: { canonical: "/brokerage" },
}
const content: CapabilityContent = {
  label: "Brokerage",
  title: "The right connections. A purposeful process.",
  intro:
    "Independent intermediary support across aviation assets, maintenance, equipment, petroleum products and LNG. A clear mandate connects the requirement to the right commercial opportunity.",
  heading: "A structured path from requirement to execution.",
  items: [
    [
      "Define",
      "Agree the requirement, scope, representation, timeline and commercial terms in a written mandate.",
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
      "Support the parties and their professional advisers through documentation, milestones and completion.",
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
