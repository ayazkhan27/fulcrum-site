// The owner's approved nine-page structure. Navigation and sitemap share it.
export const sitePages = [
  { href: "/", label: "Home" },
  { href: "/mission", label: "Mission" },
  { href: "/people", label: "Our People" },
  { href: "/aviation", label: "Aviation & Airports" },
  { href: "/equipment", label: "Equipment" },
  { href: "/energy", label: "Energy & Petroleum" },
  { href: "/sectors/textiles", label: "Textile & Mill Supply" },
  { href: "/sectors/commodities", label: "Edible Oil & Commodities" },
  { href: "/contact", label: "Contact" },
] as const

// Retired addresses remain useful, but do not create additional content pages.
export const legacyRedirects = [
  { source: "/services", destination: "/mission#capabilities" },
  { source: "/consulting", destination: "/mission#consulting" },
  { source: "/brokerage", destination: "/mission#brokerage" },
  { source: "/method", destination: "/aviation#aircraft-engine-transactions" },
  {
    source: "/aviation/aircraft-engine-transactions",
    destination: "/aviation#aircraft-engine-transactions",
  },
  { source: "/sectors/industrial", destination: "/equipment#industrial" },
  { source: "/sectors/healthcare", destination: "/equipment#healthcare" },
  { source: "/sectors/defense", destination: "/equipment#defense" },
] as const
