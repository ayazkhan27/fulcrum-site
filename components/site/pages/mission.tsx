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
                  Our mission is to act as a bridge between Bangladesh and the
                  world. As a global sourcing and brokerage company, Fulcrum
                  connects suppliers, buyers and opportunities, facilitating
                  business in Bangladesh and beyond.
                </p>
              </div>
              <ConnectionDiagram />
            </div>
            <div className="mission-statement-copy">
              <p>
                Bangladesh’s strategic location, textile and garment industries,
                and overseas community give it a strong international reach.
                Its need for reliable energy, essential commodities and modern
                infrastructure makes dependable sourcing vital. We help meet
                these needs across petroleum, LNG, edible oils, textile inputs
                and industrial equipment.
              </p>
              <p>
                In aviation, we help airlines source aircraft for lease, engines,
                spare parts, equipment and maintenance providers. We also support
                airport procurement, including ground-support equipment and
                systems for air navigation and air traffic management. When
                appointed to represent bidders, we coordinate tender preparation,
                compliance documentation and commercial requirements.
              </p>
              <p>
                Fulcrum brings together operating, analytical and commercial
                perspectives across aviation and maritime operations.{" "}
                <Link href="/people">Meet the people behind the work</Link>.
              </p>
              <p>
                We are Fulcrum. We make it easy for you, on land, at sea and in
                the air.
                <br />
                The hallmark of our existence is precision in motion.
                Everywhere.
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
