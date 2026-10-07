import { createPageMetadata } from "@/lib/site-seo"
import FashionContent from "@/components/site/pages/fashion"

export const metadata = createPageMetadata("/fashion-and-finery")

export default function Page() { return <FashionContent /> }
