import type { Metadata } from "next"
import {
  CapabilityPage,
  type CapabilityContent,
} from "@/components/site/capability-page"
export const metadata: Metadata = {
  title: "Energy | Fulcrum",
  description:
    "Independent consulting and brokerage for petroleum products and liquefied natural gas (LNG), serving buyers, sellers and project partners, including clients outside aviation.",
  alternates: { canonical: "/energy" },
}
const content: CapabilityContent = {
  label: "Energy",
  title: "A clearer path through energy markets.",
  intro:
    "Independent advisory and transaction intermediation for petroleum products and liquefied natural gas (LNG). A distinct energy practice for commercial, government and infrastructure-related requirements, including those outside aviation.",
  heading: "Commercial clarity across the energy value chain.",
  items: [
    [
      "Petroleum products",
      "Requirement definition, buyer or supplier identification, counterparty introductions and commercial coordination.",
    ],
    [
      "Liquefied natural gas",
      "Opportunity assessment, participant introductions and transaction support for defined LNG requirements.",
    ],
    [
      "Supplier & buyer introductions",
      "Identification and introductions against an agreed brief, with counterparty review and specialist checks scoped to the proposed transaction.",
    ],
    [
      "Negotiation & documentation support",
      "Proposal comparison, commercial terms, questions and documentation coordination. Representation and negotiating authority are defined for each engagement.",
    ],
    [
      "Logistics & delivery interfaces",
      "Coordination around storage, transport, delivery terms and the specialist partners required to move a transaction forward.",
    ],
    [
      "Commercial & infrastructure advisory",
      "Opportunity assessment, market-entry questions and coordination with potential storage, transport and infrastructure partners, subject to scope and specialist review.",
    ],
  ],
  noteTitle: "A clear role. A defined requirement.",
  note: "Our starting role is independent advisor and transaction intermediary. An initial discussion establishes the product, origin, destination, counterparties, delivery expectations and work required. Any assignment proceeds only with an agreed scope, responsibilities and appropriate review.",
  related: "/brokerage",
  relatedLabel: "How our brokerage mandates work",
}
export default function Page() {
  return <CapabilityPage content={content} />
}
