import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Header, Footer } from "@/components/site/chrome"
import { ConnectionDiagram } from "@/components/site/connection-diagram"
import { SharedCapabilities } from "@/components/site/shared-capabilities"
import { EngagementDisclosure } from "@/components/site/engagement-disclosure"
import { consultingContent, brokerageContent } from "@/lib/advisory-content"
import { sitePages } from "@/lib/site-pages"
import "../structure.css"
import "./mission.css"

export const metadata: Metadata = {
  title: "Our Mission | Fulcrum",
  description:
    "Fulcrum is a global sourcing and brokerage company, facilitating business between Bangladesh and the world and beyond.",
  alternates: { canonical: "/mission" },
}

export default function MissionPage() {
  return (
    <>
      <Header />
      <main id="main">
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
        <nav className="page-section-nav shell" aria-label="On this Mission page">
          <a href="#purpose">Our mission</a>
          <a href="#capabilities">Our capabilities</a>
          <a href="#consulting">Consulting</a>
          <a href="#brokerage">Representation &amp; brokerage</a>
        </nav>
        <section
          className="section shared-section"
          id="capabilities"
          aria-labelledby="mission-capabilities-title"
        >
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">From purpose to practice</p>
                <h2 id="mission-capabilities-title">
                  The expertise behind
                  <br />
                  every assignment.
                </h2>
              </div>
              <p className="section-note">
                Consulting, sourcing and representation work together around the
                requirement, rather than as isolated services.
              </p>
            </div>
            <SharedCapabilities />
            <nav className="service-directory" aria-label="Explore our sectors">
              {sitePages.slice(3, 8).map(({ href, label }) => (
                <Link href={href} key={href}>
                  {label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </nav>
          </div>
        </section>
        <div className="section shell mission-advisory-grid">
          {[
            { id: "consulting", content: consultingContent },
            { id: "brokerage", content: brokerageContent },
          ].map(({ id, content }) => (
            <section id={id} aria-labelledby={`${id}-title`} key={id}>
              <p className="eyebrow">
                {id === "brokerage"
                  ? "Representation & brokerage"
                  : content.label}
              </p>
              <h2 id={`${id}-title`}>{content.title}</h2>
              <p className="section-note">{content.intro}</p>
              <h3 className="advisory-subheading">{content.heading}</h3>
              <div className="faq-list">
                {content.items.map(([name, body]) => (
                  <details key={name}>
                    <summary>{name}</summary>
                    <p>{body}</p>
                  </details>
                ))}
              </div>
              <div className="advisory-note">
                <h3>{content.noteTitle}</h3>
                <p>{content.note}</p>
              </div>
              {id === "brokerage" && <EngagementDisclosure />}
              <Link href={content.related} className="text-link">
                {content.relatedLabel}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
