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
                <p className="mission-lead">
                  Our mission is to connect Bangladesh’s needs and opportunities
                  with the capabilities of suppliers around the world. Through
                  dependable sourcing, informed representation and careful
                  commercial coordination, we help buyers and suppliers build
                  productive, lasting relationships grounded in clear commitments,
                  practical expertise and reliable execution.
                </p>
              </div>
              <ConnectionDiagram />
            </div>
            <div className="mission-statement-copy">
              <p>
                With a population of more than 175 million, Bangladesh is a
                substantial market for consumer goods, food and everyday
                necessities. Its strategic location, established textile and
                garment industries, and overseas community strengthen its
                connections to international trade. For suppliers able to offer
                consistent quality, competitive pricing and reliable delivery,
                these strengths create significant commercial opportunities.
              </p>
              <p>
                Fulcrum helps translate this potential into practical business
                relationships. We support sourcing and supplier representation
                across petroleum, LNG, edible oils, textile inputs and industrial
                equipment, connecting international capabilities with local
                requirements for essential supplies, energy and infrastructure.
              </p>
              <p>
                In aviation, we help airlines identify aircraft leasing options
                and source engines, spare parts, equipment and maintenance
                services. We also support airport procurement, from ground
                support equipment to air navigation and air traffic management
                systems. When appointed to represent bidders, we coordinate
                tender preparation, compliance documentation and commercial
                requirements.
              </p>
              <p>
                Our team combines operational experience in aviation and maritime
                services with analytical and commercial expertise, bringing a
                practical understanding of the industries we serve.{" "}
                <Link href="/people">Meet the people behind the work</Link>.
              </p>
              <p>
                We are Fulcrum. We make business easier—on land, at sea and in
                the air.
                <br />
                Precision in motion. In every connection.
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
