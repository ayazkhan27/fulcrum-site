import type { Metadata } from "next"
import { sharedCapabilities } from "@/lib/shared-capabilities"
import {
  CapabilityPage,
  type CapabilityContent,
} from "@/components/site/capability-page"
export const metadata: Metadata = {
  title: "Capabilities | Fulcrum",
  description:
    "Advice, connections and execution support across aviation and energy. Our services come together around your requirement, from the first question to the final milestone.",
  alternates: { canonical: "/services" },
}
const content: CapabilityContent = {
  label: "Capabilities",
  title: "The expertise your next move needs.",
  intro:
    "Advice, connections and execution support across aviation and energy. Our services come together around your requirement, from the first question to the final milestone.",
  heading: "One coordinated approach. Multiple disciplines.",
  items: sharedCapabilities.map((item) => [item.title, item.body]),
  noteTitle: "Built around the assignment.",
  note: "Some decisions need focused advice. Others require a coordinated commercial process across organizations and jurisdictions. We define the work first, then align the appropriate mix of capabilities and expertise.",
  related: "/contact",
  relatedLabel: "Let’s define your requirement",
}
export default function Page() {
  return <CapabilityPage content={content} />
}
