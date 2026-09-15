import type { Metadata } from "next"
import "./aviation.css"
import {
  CapabilityPage,
  type CapabilityContent,
} from "@/components/site/capability-page"
export const metadata: Metadata = {
  title: "Aviation & Airports | Fulcrum",
  description:
    "Aircraft, engine and spare-parts sourcing, MRO partnerships and airport equipment representation for Bangladesh and international markets.",
  alternates: { canonical: "/aviation" },
}
const content: CapabilityContent = {
  label: "Aviation",
  pageLabel: "Aviation & Airports",
  title: "From terminal to tarmac.",
  intro:
    "From terminal to tarmac. Assisting airlines and airports with aircraft and engine leasing, sourcing spare parts and essential equipment, and finding maintenance, repair and overhaul (MRO) partners to keep their operations running smoothly. We coordinate sourcing, supplier representation and transactions for Bangladesh and international markets.",
  heading: "Expertise across assets, infrastructure and operations.",
  items: [
    [
      "Aircraft transactions",
      "Sourcing, acquisition, sale and leasing support. Connecting operators, owners and lessors around a defined asset and commercial requirement.",
    ],
    [
      "Engines",
      "Engine sourcing and placement, overhaul-provider introductions and shop-visit coordination. Configuration, records and maintenance requirements are reviewed with qualified specialists.",
    ],
    [
      "Maintenance & MRO",
      "MRO partnership development, repair-provider sourcing and coordination of aircraft checks and engine overhauls, from the initial work scope to agreed milestones.",
    ],
    [
      "Ground support & airport systems",
      "Sourcing and manufacturer introductions for ground-support equipment, generators, apron buses, passenger boarding bridges and radar systems. We align specifications, proposals and delivery requirements.",
    ],
    [
      "Parts, bearings & support infrastructure",
      "Spare parts, components, bearings and tooling, alongside warehouse and repair-facility requirements. We connect purchasing teams with relevant suppliers and coordinate supporting documentation.",
    ],
    [
      "Manufacturer & supplier representation",
      "A commercial bridge between international suppliers and airline or airport buyers in Bangladesh. Market engagement, proposal coordination and transaction follow-through are defined for each mandate.",
    ],
  ],
  noteTitle: "The whole operation comes into view.",
  note: "An aircraft is one part of a much wider system. We consider the commercial requirement alongside maintenance, equipment and operational dependencies. Civil and military assignments are scoped around the relevant technical, regulatory and end-user requirements.",
  related: "/aviation#aircraft-engine-transactions",
  relatedLabel: "Explore aircraft & engine transactions",
}
export default function Page() {
  return <CapabilityPage content={content} />
}
