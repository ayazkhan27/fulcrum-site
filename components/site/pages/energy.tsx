import "@/app/energy/energy.css"
import {
  CapabilityPage,
  type CapabilityContent,
} from "@/components/site/capability-page"

const content: CapabilityContent = {
  label: "Energy",
  pageLabel: "Energy & Petroleum",
  title: "A clearer path through energy markets.",
  intro:
    "Connecting energy requirements with producers, suppliers and commercial partners. We support petroleum products, fossil fuels and LNG assignments for commercial buyers, public-sector procurement and infrastructure projects in Bangladesh and international markets.",
  heading: "Commercial clarity across the energy value chain.",
  tagline: "Moving heaven and earth to ease your burden.\nWith precision. Everywhere.",
  items: [
    [
      "Petroleum products",
      "Sourcing and commercial coordination for petroleum products and fossil fuels. Product specification, quantity, origin and delivery requirements shape the supplier search.",
    ],
    [
      "Liquefied natural gas",
      "Opportunity assessment, participant introductions and transaction support for defined LNG requirements.",
    ],
    [
      "Producer & supplier representation",
      "Market engagement and buyer introductions for producers and suppliers, with the represented party, negotiating authority and commission arrangements agreed for each assignment.",
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
      "Public-sector & infrastructure requirements",
      "Requirement review, tender-document coordination and supplier engagement for energy procurement and supporting infrastructure. We track questions, submissions and commercial milestones with the parties.",
    ],
  ],
  noteTitle: "A clear role. A defined requirement.",
  note: "Our starting role is independent advisor and transaction intermediary. An initial discussion establishes the product, origin, destination, counterparties, delivery expectations and work required. Any assignment proceeds only with an agreed scope, responsibilities and appropriate review.",
  related: "/mission#brokerage",
  relatedLabel: "How our brokerage mandates work",
}
export default function PageContent({ embedded = false }: { embedded?: boolean }) {
  return <CapabilityPage content={content} embedded={embedded} heroOnly />
}
