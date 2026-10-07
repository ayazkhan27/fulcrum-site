// The owner's approved page structure. Navigation and sitemap share it.
export const sitePages = [
  { href: "/", label: "Home" },
  { href: "/mission", label: "Mission" },
  { href: "/people", label: "Our People" },
  { href: "/aviation", label: "Aviation & Airports" },
  { href: "/equipment", label: "Spares & Equipment" },
  { href: "/defense", label: "Defense Supply" },
  { href: "/energy", label: "Energy & Petroleum" },
  { href: "/sectors/textiles", label: "Textile & Mill Supply" },
  { href: "/fashion-and-finery", label: "Fulcrum Fashion and Finery" },
  { href: "/sectors/commodities", label: "Edible Oil & Commodities" },
  { href: "/career", label: "Career" },
  { href: "/contact", label: "Contact" },
] as const

// Retired addresses remain useful, but do not create additional content pages.
export const legacyRedirects = [
  { source: "/services", destination: "/contact#services" },
  { source: "/consulting", destination: "/contact?service=consulting#services" },
  { source: "/brokerage", destination: "/mission#purpose" },
  { source: "/method", destination: "/aviation#aircraft-engine-transactions" },
  {
    source: "/aviation/aircraft-engine-transactions",
    destination: "/aviation#aircraft-engine-transactions",
  },
  { source: "/sectors/industrial", destination: "/equipment#industrial" },
  { source: "/sectors/healthcare", destination: "/contact#enquiry-form" },
  { source: "/sectors/defense", destination: "/defense" },
] as const
