import { createPageMetadata } from "@/lib/site-seo"
import { PEOPLE } from "@/components/site/pages/people"
import { PeopleEditorial } from "@/components/site/people-editorial"

export const metadata = createPageMetadata("/people")

export default function Page() {
  return <PeopleEditorial people={PEOPLE} />
}
