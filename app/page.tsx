import { createPageMetadata, organizationStructuredData } from "@/lib/site-seo"
import { Header } from "@/components/site/chrome"
import { PaperFlight } from "@/components/site/paper-flight"
import MissionContent from "@/components/site/pages/mission"
import { PEOPLE } from "@/components/site/pages/people"
import { PeopleEditorial } from "@/components/site/people-editorial"
import AviationContent from "@/components/site/pages/aviation"
import EnergyContent from "@/components/site/pages/energy"
import SectorContent from "@/components/site/pages/sector"
import EquipmentContent from "@/components/site/pages/equipment"
import DefenseContent from "@/components/site/pages/defense"
import ContactContent from "@/components/site/pages/contact"
import FashionContent from "@/components/site/pages/fashion"
import "./flight.css"
import "./home.css"
import "./scroll-pages.css"

export const metadata = createPageMetadata("/")
export default function Page() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationStructuredData).replace(/</g, "\\u003c") }}
    />
    <div className="home-page">
      <Header home />
      <main id="main">
        <PaperFlight />
      </main>
    </div>
    <section id="page-mission" aria-label="Mission"><MissionContent embedded /></section>
    <section id="page-people" aria-label="Our People"><PeopleEditorial people={PEOPLE} embedded /></section>
    <section id="page-aviation" aria-label="Aviation & Airports"><AviationContent embedded /></section>
    <section id="page-equipment" aria-label="Equipment"><EquipmentContent embedded /></section>
    <section id="page-defense" aria-label="Defense Supply"><DefenseContent embedded /></section>
    <section id="page-energy" aria-label="Energy & Petroleum"><EnergyContent embedded /></section>
    <section id="page-textiles" aria-label="Textile & Mill Supply"><SectorContent slug="textiles" embedded /></section>
    <section id="page-fashion" aria-label="Fulcrum Fashion and Finery">
      <div className="fulcrum-connection-panel">
        <p className="shell">Connecting capability with opportunity.</p>
      </div>
      <FashionContent embedded />
    </section>
    <section id="page-commodities" aria-label="Edible Oil & Commodities"><SectorContent slug="commodities" embedded /></section>
    <section id="page-contact" aria-label="Contact"><ContactContent embedded /></section>
    </>
  )
}
