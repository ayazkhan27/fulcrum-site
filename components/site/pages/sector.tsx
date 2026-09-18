import "@/app/sectors/[slug]/sectors.css"
import { notFound } from "next/navigation"
import { CapabilityPage, type CapabilityContent } from "@/components/site/capability-page"
import { sectors } from "@/lib/sectors"
import { sectorDetails } from "@/lib/sector-details"
const available = sectors.filter((s) => s.href.startsWith("/sectors/"))
export default function SectorContent({ slug, embedded = false }: { slug: string; embedded?: boolean }) {
  const sector = available.find((s) => s.slug === slug)
  if (!sector) notFound()
  const content: CapabilityContent = {
    label: sector.name,
    title: sector.short,
    intro:
      slug === "textiles"
        ? "From cotton and fibre to fabrics and finishing inputs, we connect mills with suppliers suited to their specifications, volumes and delivery needs. We coordinate samples, quotations, capacity and lead times to support informed purchasing, with visits to cotton farms and fields when needed. We follow sample and specification decisions through commercial documentation, production updates and agreed shipment milestones, keeping mills and suppliers informed."
        : slug === "commodities"
          ? "We help buyers source edible oils and related commodities from suppliers suited to their specifications, quantities and market requirements. Acting under an agreed mandate, we represent buyers or suppliers and coordinate introductions, quotations and commercial discussions. We organise product specifications, packaging details and requested certificates for review by buyers and appointed inspection specialists. We also coordinate delivery schedules and shipment documentation, following up on agreed milestones and outstanding information."
          : sector.intro,
    tagline:
      slug === "textiles"
        ? "We aim to source cotton primarily from the United States to meet the needs of our buyers in Bangladesh and beyond."
        : undefined,
    heading:
      slug === "textiles"
        ? "Connected detail from fibre to shipment."
        : slug === "commodities"
          ? "Specification first. Coordination throughout."
          : "Your requirement. Our coordinated response.",
    items: sector.scope.map((name, i) => [name, sectorDetails[slug][i]]),
    noteTitle:
      slug === "textiles"
        ? "A mill requirement. A connected supply path."
        : slug === "commodities"
          ? "A defined product. A documented transaction."
          : "A local connection. A wider reach.",
    note:
      slug === "textiles"
        ? "We coordinate the mill’s requirement with suitable suppliers, keeping samples, specifications, production updates and shipment milestones connected. The mill and supplier remain responsible for product acceptance, technical decisions and agreed commercial obligations."
        : slug === "commodities"
          ? "We work under an agreed buyer or supplier mandate, coordinating product information, commercial terms and shipment follow-through between the responsible counterparties. Product acceptance, inspection conclusions and regulatory decisions remain with the appointed parties."
          : "We connect international manufacturers and suppliers with requirements in Bangladesh and other markets. Each mandate defines the party we represent, the scope of work and our fees or commissions. Product acceptance and specialist approvals remain with the responsible parties.",
    related: "/contact",
    relatedLabel: "Discuss your requirement",
  }
  if (slug === "textiles") {
    return (
      <div className="textile-page">
        <CapabilityPage content={content} embedded={embedded} heroOnly />
      </div>
    )
  }
  return <CapabilityPage content={content} embedded={embedded} heroOnly={slug === "commodities"} />
}
