import type { Metadata } from "next"
import {
  CapabilityPage,
  type CapabilityContent,
} from "@/components/site/capability-page"
export const metadata: Metadata = {
  title: "Consulting | Fulcrum",
  description:
    "Practical advice for complex commercial, operational and procurement decisions. We start with your priorities and build the assignment around the work that matters.",
  alternates: { canonical: "/consulting" },
}
const content: CapabilityContent = {
  label: "Consulting",
  title: "Perspective that moves a decision forward.",
  intro:
    "Practical advice for complex commercial, operational and procurement decisions. We start with your priorities and build the assignment around the work that matters.",
  heading: "From strategic questions to operational detail.",
  items: [
    [
      "Strategy & market development",
      "Opportunity assessment, market entry, partnerships and commercial planning across aviation and energy.",
    ],
    [
      "Operations",
      "Process review, capability planning and practical support for airlines, airports and operating subsidiaries.",
    ],
    [
      "Procurement & requirements",
      "Requirement definition, market engagement, evaluation support and coordination through selection.",
    ],
    [
      "Technical & transaction advisory",
      "Structured review of assets, documentation, counterparties and commercial terms with appropriate specialists.",
    ],
    [
      "Subsidiary development",
      "Advisory for catering, cargo, ground handling, training and related aviation businesses.",
    ],
    [
      "Project coordination",
      "An organized workstream across vendors, specialists, milestones, documents and decisions.",
    ],
  ],
  noteTitle: "Clarity before commitment.",
  note: "Each engagement begins with a defined question, scope and deliverable. We bring operating experience and analytical discipline to the assignment, coordinating qualified specialists where the work requires deeper technical expertise.",
  related: "/contact",
  relatedLabel: "Discuss a consulting assignment",
}
export default function Page() {
  return <CapabilityPage content={content} />
}
