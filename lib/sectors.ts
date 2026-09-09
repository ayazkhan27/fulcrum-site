import type { AssetKey } from "./asset-library"
export type Sector = {
  slug: string
  name: string
  short: string
  href: string
  asset?: AssetKey
  intro: string
  scope: string[]
}
export const sectors: Sector[] = [
  {
    slug: "aviation",
    name: "Aviation & airports",
    short: "From terminal to tarmac.",
    href: "/aviation",
    asset: "terminal",
    intro:
      "The aircraft, engines, equipment and partnerships that keep airlines and airports moving.",
    scope: [
      "Aircraft, engines & spare parts",
      "MRO partnerships, checks & engine overhauls",
      "Ground support, apron buses & boarding bridges",
      "Radar, airport systems & manufacturer representation",
    ],
  },
  {
    slug: "energy",
    name: "Energy & petroleum",
    short: "Supply that moves economies.",
    href: "/energy",
    asset: "petroleum",
    intro:
      "Connecting petroleum and LNG requirements with producers, suppliers and commercial counterparties.",
    scope: [
      "Petroleum products & fossil oils",
      "LNG supplier introductions",
      "Product, quantity & delivery coordination",
      "Commercial proposals & documentation",
    ],
  },
  {
    slug: "textiles",
    name: "Textiles & mill supply",
    short: "From fibre to finished fabric.",
    href: "/sectors/textiles",
    asset: "fabric",
    intro:
      "Cotton, fibres, fabrics and production inputs, sourced around the needs of textile and finishing mills.",
    scope: [
      "Cotton & textile fibres",
      "Fabrics & finishing requirements",
      "Mill inputs & supplier sourcing",
      "Samples, specifications & delivery follow-through",
    ],
  },
  {
    slug: "commodities",
    name: "Edible oils & commodities",
    short: "The right source. The right specification.",
    href: "/sectors/commodities",
    asset: "edibleOil",
    intro:
      "Commercial sourcing for edible oils and commodity requirements, connecting purchasers with suitable supply.",
    scope: [
      "Edible oils & related commodities",
      "Supplier identification & buyer representation",
      "Specifications, quantities & packaging",
      "Commercial terms & shipment coordination",
    ],
  },
  {
    slug: "industrial",
    name: "Industrial equipment",
    short: "Keep the operation moving.",
    href: "/sectors/industrial",
    asset: "cogwheel",
    intro:
      "From a replacement bearing to equipment for a warehouse or production line, we coordinate the commercial detail.",
    scope: [
      "Bearings, parts & components",
      "Generators & production equipment",
      "Warehouse & handling systems",
      "Manufacturer representation & sourcing",
    ],
  },
  {
    slug: "healthcare",
    name: "Medical equipment",
    short: "Clear requirements. Considered sourcing.",
    href: "/sectors/healthcare",
    intro:
      "Connecting medical equipment buyers with manufacturers and suppliers around a clearly defined procurement need.",
    scope: [
      "Equipment manufacturer introductions",
      "Product specifications & procurement documents",
      "Coordination with qualified technical reviewers",
      "Purchasing milestones & supplier follow-up",
    ],
  },
  {
    slug: "defense",
    name: "Government & defense",
    short: "Representation with responsibility.",
    href: "/sectors/defense",
    asset: "aircraft",
    intro:
      "Commercial representation and supplier coordination for government and defense procurement in Bangladesh.",
    scope: [
      "Manufacturer & supplier representation",
      "Equipment and vehicle procurement coordination",
      "Tender documentation & submission milestones",
      "End-user requirements & specialist review coordination",
    ],
  },
]
