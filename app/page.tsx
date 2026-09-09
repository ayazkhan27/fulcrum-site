import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { Header, Footer } from "@/components/site/chrome"
import { SharedCapabilities } from "@/components/site/shared-capabilities"
import { PaperFlight } from "@/components/site/paper-flight"
import { AssetVisual } from "@/components/site/asset-visual"
import { sectors } from "@/lib/sectors"
import "./flight.css"
import "./home.css"

export const metadata: Metadata = {
  title: "Fulcrum | Global sourcing. Local representation.",
  description:
    "Connecting international manufacturers and suppliers with Bangladesh. Sourcing, representation and commercial coordination across aviation, energy, textiles, industry and healthcare.",
  alternates: { canonical: "/" },
}
export default function Page() {
  return (
    <div className="home-page">
      <Header home />
      <main id="main">
        <PaperFlight />
        <section
          className="editorial-opening shell"
          id="overview"
          aria-labelledby="overview-title"
        >
          <div className="opening-meta">
            <p className="eyebrow">
              International sources. Bangladesh connections.
            </p>
            <a href="#verticals" aria-label="Explore our sectors">
              <ArrowDown size={20} />
            </a>
          </div>
          <h2 id="overview-title">
            A world of possibilities.
            <br />
            One point of connection.
          </h2>
          <div className="opening-bottom">
            <p>Sourcing. Representation. Follow-through.</p>
            <p>
              We connect manufacturers, suppliers and buyers across borders.
              From aircraft engines to textile inputs, Fulcrum coordinates the
              people, proposals and details that turn a requirement into a
              commercial relationship.
            </p>
          </div>
        </section>
        <section
          className="sector-editorial shell"
          id="verticals"
          aria-labelledby="sector-title"
        >
          <div className="sector-section-heading">
            <p className="eyebrow">01 / Where we work</p>
            <h2 id="sector-title">
              Different industries.
              <br />
              The same attention to detail.
            </h2>
            <Link href="/services" className="text-link">
              All services <ArrowUpRight size={18} />
            </Link>
          </div>
          <div className="sector-feature-grid">
            {[sectors[0], sectors[2]].map((sector, i) => (
              <Link
                href={sector.href}
                className="sector-feature"
                key={sector.slug}
              >
                <AssetVisual asset={sector.asset!} />
                <div className="sector-feature-caption">
                  <div>
                    <p className="eyebrow">
                      0{i + 1} /{" "}
                      {i === 0
                        ? "Infrastructure & operations"
                        : "Materials & manufacturing"}
                    </p>
                    <h3>{sector.name}</h3>
                    <p>{sector.short}</p>
                  </div>
                  <span className="round-arrow">
                    <ArrowUpRight aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="sector-index">
            {[sectors[1], ...sectors.slice(3)].map((sector, i) => (
              <Link
                href={sector.href}
                className="sector-index-row"
                key={sector.slug}
              >
                <span className="sector-index-number">
                  {String(i + 3).padStart(2, "0")}
                </span>
                <div className="sector-index-art">
                  {sector.asset ? (
                    <AssetVisual asset={sector.asset} />
                  ) : (
                    <span className="medical-type" aria-hidden="true">
                      M<span>+</span>
                    </span>
                  )}
                </div>
                <div className="sector-index-copy">
                  <h3>{sector.name}</h3>
                  <p>{sector.intro}</p>
                </div>
                <ArrowUpRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
        <section className="representation-section section" id="perspective">
          <div className="shell representation-grid">
            <div>
              <p className="eyebrow">02 / On your side of the table</p>
              <h2>
                Global supply.
                <br />
                Local understanding.
              </h2>
              <p className="representation-lede">
                Your connection to Bangladesh.
                <br />
                Your coordination across borders.
              </p>
              <p>
                We work on behalf of an agreed party: a manufacturer entering a
                market, a supplier developing a relationship, or a buyer seeking
                the right source. We stay close to the commercial details, from
                the first brief to the agreed delivery milestones.
              </p>
              <Link href="/brokerage" className="text-link">
                How representation works <ArrowUpRight size={18} />
              </Link>
            </div>
            <div className="materials-pair">
              <AssetVisual asset="cotton" caption="The raw material." />
              <AssetVisual asset="fibre" caption="The next possibility." />
            </div>
          </div>
        </section>
        <section className="shared-section section" id="capabilities">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">03 / From the first brief onward</p>
                <h2>
                  The detail makes
                  <br />
                  the difference.
                </h2>
              </div>
              <p className="section-note">
                One coordinated commercial process, shaped around your
                assignment.
              </p>
            </div>
            <div className="shared-layout">
              <div className="process-intro">
                <span className="process-word">
                  Connect.
                  <br />
                  Coordinate.
                  <br />
                  Complete.
                </span>
                <p>
                  Sources, specifications, proposals, documents and deadlines.
                  We keep the moving parts in view.
                </p>
                <Link href="/services" className="text-link">
                  Explore our capabilities <ArrowUpRight size={18} />
                </Link>
              </div>
              <SharedCapabilities />
            </div>
          </div>
        </section>
        <section className="section shell ways-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">04 / A clear mandate</p>
              <h2>
                One relationship.
                <br />
                An agreed responsibility.
              </h2>
            </div>
            <p className="section-note">
              We define whom we represent, what we will do, and how our fees or
              commissions work before the assignment begins.
            </p>
          </div>
          <div className="engagement-grid">
            <Link href="/consulting" className="engagement-card">
              <span className="eyebrow">Consulting</span>
              <h3>
                Clarity before
                <br />
                commitment.
              </h3>
              <p>
                Frame requirements, compare options and coordinate specialist
                input for a better-informed decision.
              </p>
              <span className="text-link">
                Explore consulting <ArrowUpRight size={18} />
              </span>
            </Link>
            <Link href="/brokerage" className="engagement-card">
              <span className="eyebrow">Representation & brokerage</span>
              <h3>
                The right people.
                <br />
                Working together.
              </h3>
              <p>
                Connect counterparties, coordinate proposals and maintain
                momentum through the commercial process.
              </p>
              <span className="text-link">
                Explore brokerage <ArrowUpRight size={18} />
              </span>
            </Link>
          </div>
        </section>
        <section className="section shell people-preview">
          <div>
            <p className="eyebrow">05 / The people behind the work</p>
            <h2>
              Experience at work.
              <br />
              Perspective that connects.
            </h2>
          </div>
          <div>
            <p>
              Operating experience, analytical discipline and commercial
              coordination come together in the Fulcrum team. Meet the people
              who bring those perspectives to your assignment.
            </p>
            <Link href="/people" className="text-link">
              Meet our people <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
