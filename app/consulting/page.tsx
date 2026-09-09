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
      "Opportunity assessment, Bangladesh market entry, supplier partnerships and commercial planning across aviation, energy, textiles and equipment procurement.",
    ],
    [
      "Operations",
      "Requirement mapping, supplier interfaces and practical coordination for operators, purchasing organizations and manufacturers.",
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
      "Manufacturer market entry",
      "Clarify target buyers, procurement routes and the local commercial work required to connect international manufacturers with opportunities in Bangladesh.",
    ],
    [
      "Project coordination",
      "An organized workstream across vendors, specialists, milestones, documents and decisions.",
    ],
  ],
  noteTitle: "Clarity before commitment.",
  note: "Each engagement begins with a defined question, scope and deliverable. We combine operating experience with commercial coordination, bringing in qualified specialists where the assignment requires technical expertise.",
  related: "/contact",
  relatedLabel: "Discuss a consulting assignment",
}
export default function Page() {
  return <CapabilityPage content={content} />
}
