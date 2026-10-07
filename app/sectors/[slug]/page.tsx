import SectorContent from "@/components/site/pages/sector"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { createPageMetadata } from "@/lib/site-seo"
import "./sectors.css"
import { sectors } from "@/lib/sectors"
const available = sectors.filter((s) => s.href.startsWith("/sectors/"))
export const dynamicParams = false
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
  if (!sector || (slug !== "textiles" && slug !== "commodities")) notFound()
  return createPageMetadata(`/sectors/${slug}`)
}
export default async function SectorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return <SectorContent slug={slug} />
}
