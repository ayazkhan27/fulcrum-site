import type { Metadata } from "next"
import PageContent from "@/components/site/pages/people"

export const metadata: Metadata = {
  title: "Our People | Fulcrum",
  description:
    "Meet the operating, analytical and commercial experience behind Fulcrum.",
  alternates: { canonical: "/people" },
}

export default function Page() {
  return <PageContent />
}
