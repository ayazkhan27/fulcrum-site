import type { Metadata } from "next"
import FashionContent from "@/components/site/pages/fashion"

export const metadata: Metadata = {
  title: "Fulcrum Fashion and Finery",
  description: "Developing apparel sourcing connections between garment manufacturers in Bangladesh and US retailers, brands and distributors, including South Asian ethnic wear.",
  alternates: { canonical: "/fashion-and-finery" },
}

export default function Page() { return <FashionContent /> }
