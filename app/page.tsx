import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import airportImage from "@/public/fulcrum-airport-hero.png"
import { ArrowDown, ArrowUpRight } from "lucide-react"
import { Header, Footer } from "@/components/site/chrome"
import { SharedCapabilities } from "@/components/site/shared-capabilities"
import { ConnectionDiagram } from "@/components/site/connection-diagram"
import { PaperFlight } from "@/components/site/paper-flight"
import "./flight.css"
import "./home.css"

export const metadata: Metadata = {
  title: "Fulcrum | Global aviation and energy advisory & brokerage",
  description:
    "Global advisory and brokerage across aviation and energy. Connecting expertise, assets, suppliers and opportunities across aviation, petroleum products and LNG.",
  alternates: { canonical: "/" },
}

const sectors = [
  {
    name: "Aviation",
    number: "01",
    href: "/aviation",
    image: airportImage,
    alt: "Illustrative passenger aircraft at an airport terminal",
    line: "From terminal to tarmac.",
    text: "Aircraft and engines. Maintenance and parts. The equipment, systems and services behind airlines and airports.",
  },
  {
    name: "Energy",
    number: "02",
    href: "/energy",
    image: "/energy-terminal.png",
    alt: "Illustrative aerial view of a coastal LNG terminal and vessel",
    line: "From requirement to opportunity.",
    text: "Petroleum products and LNG. Commercial advisory, introductions and coordination across the energy value chain.",
  },
]

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
            <p className="eyebrow">Independent perspective. Global ambition.</p>
            <a href="#verticals" aria-label="Explore our two verticals">
              <ArrowDown size={20} aria-hidden="true" />
            </a>
          </div>
          <h2 id="overview-title">
            Two distinct verticals.
            <br />
            One considered approach.
          </h2>
          <div className="opening-bottom">
            <p>Expertise. Assets. Opportunity.</p>
            <p>
              Fulcrum connects expertise, assets, suppliers and opportunities
              across global aviation, petroleum products and LNG, supporting
              commercial, government and defense-sector requirements from
              initial assessment through transaction execution.
            </p>
          </div>
        </section>
        <section
          id="verticals"
          className="verticals"
          aria-label="Our two verticals"
        >
          {sectors.map((sector) => (
            <Link
              key={sector.name}
              href={sector.href}
              className={`vertical-panel vertical-${sector.name.toLowerCase()}`}
              data-reactive
            >
              <div className="vertical-image">
                <Image
                  src={sector.image}
                  alt={sector.alt}
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                />
              </div>
              <div className="vertical-top">
                <span className="eyebrow">
                  {sector.number} / {sector.name}
                </span>
                <span className="round-arrow">
                  <ArrowUpRight size={23} aria-hidden="true" />
                </span>
              </div>
              <div className="vertical-copy">
                <h2>{sector.name}</h2>
                <p>{sector.line}</p>
                <span className="vertical-explore">
                  Explore {sector.name.toLowerCase()}{" "}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </section>
        <div className="visual-caption shell">
          <span>Aviation & energy / Two connected perspectives</span>
          <span>Illustrative imagery</span>
        </div>
        <section className="section shell positioning-section" id="perspective">
          <p className="eyebrow">01 / A wider perspective</p>
          <div>
            <h2>
              Separate industries.
              <br />
              Connected thinking.
            </h2>
            <p className="positioning-lede">
              A clear requirement is the beginning.
              <br />
              The right connections make it move.
            </p>
            <div className="positioning-columns">
              {sectors.map((sector) => (
                <div key={sector.name}>
                  <h3>{sector.name}</h3>
                  <p>{sector.text}</p>
                </div>
              ))}
            </div>
            <Link href="/people" className="text-link">
              Meet Fulcrum <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
        <section className="shared-section section" id="capabilities">
          <div className="shell">
            <div className="section-heading">
              <div>
                <p className="eyebrow">02 / Shared capabilities</p>
                <h2>
                  The work between
                  <br />
                  ambition and execution.
                </h2>
              </div>
              <p className="section-note">
                Explore the support that can be brought together around your
                assignment.
              </p>
            </div>
            <div className="shared-layout">
              <ConnectionDiagram />
              <SharedCapabilities />
            </div>
            <Link href="/services" className="text-link">
              Explore all capabilities{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
        <section className="section shell ways-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">03 / How we engage</p>
              <h2>
                A defined role.
                <br />A clearer way forward.
              </h2>
            </div>
            <p className="section-note">
              Advice and intermediation are different responsibilities. We
              establish which role fits before the work begins.
            </p>
          </div>
          <div className="engagement-grid">
            <Link href="/consulting" className="engagement-card" data-reactive>
              <span className="eyebrow">01 / Consulting</span>
              <h3>
                Clarity before
                <br />
                commitment.
              </h3>
              <p>
                Frame the question. Assess options. Coordinate specialist input
                so a decision has a sound basis.
              </p>
              <span className="text-link">
                Explore consulting <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </Link>
            <Link href="/brokerage" className="engagement-card" data-reactive>
              <span className="eyebrow">02 / Brokerage</span>
              <h3>
                Connections with
                <br />a clear purpose.
              </h3>
              <p>
                Identify counterparties and support the commercial process, with
                representation and remuneration agreed in advance.
              </p>
              <span className="text-link">
                Explore brokerage <ArrowUpRight size={18} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </section>
        <section className="section shell people-preview">
          <div>
            <p className="eyebrow">04 / People, not promises</p>
            <h2>
              A new firm.
              <br />
              Experienced perspectives.
            </h2>
          </div>
          <div>
            <p>
              Fulcrum is developing its practice around the operating experience
              and specialist perspectives of its people. Individual experience
              is not presented as a corporate transaction record.
            </p>
            <Link href="/people" className="text-link">
              Meet our people <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
        <section className="role-band shell">
          <p className="eyebrow">Clear from the outset</p>
          <p>
            Independent advisory and transaction intermediation. Each assignment
            is subject to an agreed scope, appropriate checks and the expertise
            it requires.
          </p>
          <Link
            href="/brokerage#role"
            aria-label="Read about Fulcrum’s role and boundaries"
          >
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
