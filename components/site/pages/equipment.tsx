import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Plane, Building2, Factory } from "lucide-react"
import { Header } from "@/components/site/chrome"
import { AssetVisual } from "@/components/site/asset-visual"
import { sectors } from "@/lib/sectors"
import { sectorDetails } from "@/lib/sector-details"
import "@/app/structure.css"
import "@/app/equipment/equipment.css"

export default function PageContent({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? "div" : "main"
  const defense = sectors.find((sector) => sector.slug === "defense")!
  return (
    <>
      {!embedded && <Header />}
      <Container id={embedded ? undefined : "main"}>
        <section className="equipment-renewed">
          <div className="shell">
            <p className="eyebrow equipment-kicker">Fulcrum / Spares &amp; Equipment</p>
            <div className="equipment-opening">
              <div className="equipment-copy">
                <h1>Spares &amp; Equipment</h1>
                <p className="equipment-lead">For aircraft. For airports.<br />For the operation ahead.</p>
                <p className="equipment-intro">We help airlines, airport operators and ground handlers source the engines, spares and equipment that keep aircraft and airports operating. From aircraft components to passenger, baggage and ramp equipment, we coordinate suitable suppliers, specifications, quotations and delivery requirements.</p>
                <p className="equipment-intro">We clarify operating capacity, compatibility, availability and documentation with buyers and suppliers. From the first enquiry to agreed delivery milestones, we keep the commercial process moving and the parties informed.</p>
                <Link href="/contact" className="text-link equipment-contact">Discuss your requirement <ArrowUpRight size={18} aria-hidden="true" /></Link>
              </div>
              <div className="equipment-visual">
                <AssetVisual asset="jetEngine" priority />
                <figure className="equipment-airport-image"><div><Image src="/assets/madrid-barajas-terminal-4-diego-delso.jpg" alt="Passenger concourse and moving walkways at Madrid-Barajas Terminal 4" fill sizes="(max-width: 600px) 100vw, 50vw" /></div><figcaption>Madrid-Barajas Terminal 4 · <a href="https://delso.photo">Diego Delso</a> · <a href="https://commons.wikimedia.org/wiki/File:Terminal_4_del_aeropuerto_de_Madrid-Barajas,_Espa%C3%B1a,_2013-01-09,_DD_01.jpg">Source</a> · <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a> · Cropped</figcaption></figure>
                <div className="equipment-image-note"><span>Aircraft. Airports. Ground operations.</span><p>Sourcing shaped around your operational requirements.</p></div>
              </div>
            </div>
            <div className="equipment-services" aria-label="Sourcing areas">
              <article><div className="equipment-service-icon"><Plane size={25} strokeWidth={1.5} aria-hidden="true" /></div><h2>Aircraft engines &amp; spares</h2><p>Supplier identification and proposal coordination, with attention to part references, condition, availability and documentation for the buyer’s technical review.</p><p className="equipment-mro"><span>MRO partnerships</span>We also help establish maintenance, repair and overhaul (MRO) partnerships, connecting operators with suitable providers and coordinating commercial discussions around maintenance and overhaul requirements.</p></article>
              <article><div className="equipment-service-icon"><Building2 size={25} strokeWidth={1.5} aria-hidden="true" /></div><h2>Airport &amp; ground support equipment</h2><p>Equipment sourcing for passenger handling, baggage and cargo operations, aircraft turnaround and airfield maintenance.</p><ul className="equipment-airport-list"><li>Passenger stairs, boarding bridges &amp; apron buses</li><li>Baggage systems, belt loaders &amp; cargo loaders</li><li>Aircraft and baggage tugs, ground power units &amp; servicing equipment</li><li>Airfield maintenance equipment</li></ul></article>
              <article><div className="equipment-service-icon"><Factory size={25} strokeWidth={1.5} aria-hidden="true" /></div><h2>Industrial &amp; material-handling equipment</h2><p>Sourcing support for workshops, warehouses and production facilities, including handling equipment, tooling and replacement components. We coordinate proposals around operating capacity, site requirements and delivery schedules.</p><Link href="#defense">Explore Defense Supply <ArrowUpRight size={15} aria-hidden="true" /></Link></article>
            </div>
            <div className="equipment-brief"><h2>Start with the requirement.</h2><p>Share the part number or equipment specification, quantity, required capacity, aircraft or site compatibility, destination and target delivery date. We will use these details to help define the sourcing brief.</p></div>
          </div>
        </section>
        <section id="defense" className="equipment-defense" aria-labelledby="defense-title">
          <div className="shell equipment-defense-layout">
            <div className="equipment-defense-copy">
            <p className="eyebrow">Fulcrum / Government &amp; defense</p>
            <h2 id="defense-title">Defense Supply</h2>
            <p className="equipment-defense-intro">{defense.intro}</p>
            </div>
            <div className="equipment-defense-grid">
              {defense.scope.map((heading, index) => (
                <article key={heading}>
                  <h3>{heading}</h3>
                  <p>{sectorDetails.defense[index]}</p>
                </article>
              ))}
            </div>
            <Link href="/contact" className="text-link">
              Discuss your defense supply requirement{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <figure className="equipment-defense-photo">
              <Image src="/assets/defense-shield.png" width={1284} height={1920} sizes="(max-width: 800px) 85vw, 45vw" alt="Illustrated wooden shield with metal studs" />
            </figure>
          </div>
        </section>
      </Container>
    </>
  )
}
