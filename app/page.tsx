import type { Metadata } from "next"
import { Header } from "@/components/site/chrome"
import { PaperFlight } from "@/components/site/paper-flight"
import MissionContent from "@/components/site/pages/mission"
import PeopleContent from "@/components/site/pages/people"
import AviationContent from "@/components/site/pages/aviation"
import EnergyContent from "@/components/site/pages/energy"
import SectorContent from "@/components/site/pages/sector"
import EquipmentContent from "@/components/site/pages/equipment"
import ContactContent from "@/components/site/pages/contact"
import "./flight.css"
import "./home.css"
import "./scroll-pages.css"

export const metadata: Metadata = {
  title: "Home | Fulcrum",
  description:
    "Connecting international manufacturers and suppliers with Bangladesh. Sourcing, representation and commercial coordination across aviation, energy, textiles, industry and healthcare.",
  alternates: { canonical: "/" },
}
export default function Page() {
  return (
    <>
    <div className="home-page">
      <Header home />
      <main id="main">
        <PaperFlight />
      </main>
    </div>
    <section id="page-mission" aria-label="Mission"><MissionContent embedded /></section>
    <section id="page-people" aria-label="Our People"><PeopleContent embedded /></section>
    <section id="page-aviation" aria-label="Aviation & Airports"><AviationContent embedded /></section>
    <section id="page-equipment" aria-label="Equipment"><EquipmentContent embedded /></section>
    <section id="page-energy" aria-label="Energy & Petroleum"><EnergyContent embedded /></section>
    <section id="page-textiles" aria-label="Textile & Mill Supply"><SectorContent slug="textiles" embedded /></section>
    <section id="page-commodities" aria-label="Edible Oil & Commodities"><SectorContent slug="commodities" embedded /></section>
    <section id="page-contact" aria-label="Contact"><ContactContent embedded /></section>
    </>
  )
}
