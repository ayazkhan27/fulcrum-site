import type { Metadata } from "next"
import PageContent from "@/components/site/pages/defense"

export const metadata: Metadata = {
  title: "Defense Supply | Fulcrum",
  description:
    "Provisioning products, uniforms and engineering equipment for defense procurement in Bangladesh. Supplier sourcing, commercial representation and tender coordination.",
  alternates: { canonical: "/defense" },
}

export default function Page() {
  return <PageContent />
}
