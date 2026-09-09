import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {
  CapabilityPage,
  type CapabilityContent,
} from "@/components/site/capability-page"
import { sectors } from "@/lib/sectors"
import { sectorDetails } from "@/lib/sector-details"
const available = sectors.filter((s) => s.href.startsWith("/sectors/"))
export function generateStaticParams() {
  return available.map(({ slug }) => ({ slug }))
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const sector = available.find((s) => s.slug === slug)
  return {
    title: `${sector?.name ?? "Sector"} | Fulcrum`,
    description: sector?.intro,
    alternates: { canonical: `/sectors/${slug}` },
  }
}
export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const sector = available.find((s) => s.slug === slug)
  if (!sector) notFound()
  const content: CapabilityContent = {
    label: sector.name,
    title: sector.short,
    intro: sector.intro,
    heading: "Your requirement. Our coordinated response.",
    items: sector.scope.map((name, i) => [name, sectorDetails[slug][i]]),
    noteTitle: "A local connection. A wider reach.",
    note: "We connect international manufacturers and suppliers with requirements in Bangladesh and other markets. Each mandate defines the party we represent, the scope of work and our fees or commissions. Product acceptance and specialist approvals remain with the responsible parties.",
    related: "/contact",
    relatedLabel: "Discuss your requirement",
  }
  return <CapabilityPage content={content} />
}
