import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Header } from "@/components/site/chrome"
import { ConnectionDiagram } from "@/components/site/connection-diagram"
import "@/app/structure.css"
import "@/app/mission/mission.css"



export default function PageContent({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? "div" : "main"
  return (
    <>
      {!embedded && <Header />}
      <Container id={embedded ? undefined : "main"}>
        <section className="detail-hero mission-statement" id="purpose" aria-labelledby="mission-title">
          <div className="shell">
            <div className="mission-opening">
              <div className="mission-opening-copy">
                <p className="eyebrow">Fulcrum / Mission</p>
                <h1 id="mission-title">Our Mission</h1>
                <p className="mission-lead">Connecting needs with capabilities.</p>
                <p className="mission-lead">
                  Our mission is to connect businesses and institutions in Bangladesh
                  with international suppliers, manufacturers and service providers
                  who can meet their operational needs. Through sourcing,
                  representation and commercial coordination, we help turn business
                  opportunities into practical agreements and lasting relationships.
                </p>
              </div>
              <ConnectionDiagram />
            </div>
            <div className="mission-statement-copy">
              <p>
                We work across aviation, maritime services, energy, commodities,
                industrial equipment, defense supply, textile and mill supply, and
                fashion and finery. Our role is to understand each requirement,
                identify suitable partners and support discussions on specifications,
                pricing, delivery and commercial terms.
              </p>
              <p>
                In aviation, this includes aircraft leasing, engines and spare parts,
                maintenance partnerships, and airport and ground support equipment.
                Across our other sectors, we help buyers access essential products
                and services while supporting international companies seeking
                business opportunities in Bangladesh.
              </p>
              <p>
                Where appointed, we represent suppliers and coordinate tender
                submissions, documentation and negotiations. We aim to keep buyers
                and suppliers informed, clarify responsibilities and support each
                transaction from the initial enquiry through agreed delivery milestones.
              </p>
              <p>
                Our approach is grounded in integrity, clear communication and
                attention to detail. We seek to build trust through realistic
                commitments, responsive service and a practical understanding of
                the industries we serve.
              </p>
              <p>
                We are Fulcrum. We make business easier—on land, at sea and in
                the air.
              </p>
            </div>
            <Link href="/contact" className="text-link">
              Start a conversation <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </Container>
    </>
  )
}
