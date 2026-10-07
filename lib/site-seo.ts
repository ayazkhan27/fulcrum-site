import type { Metadata } from "next"
import type { sitePages } from "./site-pages"

export const siteUrl = "https://fulcrumtriad.com"
export type SitePath = (typeof sitePages)[number]["href"]

// Search snippets describe the existing services; they do not claim inventory,
// certifications, partnerships or results that Fulcrum has not published.
export const pageSeo = {
  "/": {
    title: "Bangladesh Sourcing & Supplier Representation | Fulcrum",
    description: "Connect with suppliers and buyers in Bangladesh and worldwide. Fulcrum coordinates sourcing and representation across aviation, energy, textiles and commodities.",
  },
  "/mission": {
    title: "Sourcing & Representation in Bangladesh | Fulcrum",
    description: "Learn how Fulcrum connects Bangladesh with international suppliers through sourcing, commercial representation, tender support and transaction coordination.",
  },
  "/people": {
    title: "Aviation & Maritime Leadership Team | Fulcrum",
    description: "Meet Fulcrum's team and its experience in airline operations, maritime logistics, safety, commercial coordination and data analysis.",
  },
  "/aviation": {
    title: "Aircraft Leasing & Aviation Sourcing | Fulcrum",
    description: "Coordinate aircraft and engine leasing, spare-parts sourcing, MRO partnerships and airport equipment for Bangladesh and international aviation markets.",
  },
  "/equipment": {
    title: "Aircraft Spares & Ground Support Equipment | Fulcrum",
    description: "Source aircraft engines, spare parts, radars and ground support equipment. Fulcrum coordinates suppliers, specifications, quotations and delivery requirements.",
  },
  "/defense": {
    title: "Defense Supply & Tender Coordination Bangladesh | Fulcrum",
    description: "Sourcing and tender coordination for provisions, uniforms, engineering equipment, tools and spare parts for defense procurement in Bangladesh.",
  },
  "/energy": {
    title: "Petroleum & LNG Sourcing in Bangladesh | Fulcrum",
    description: "Connect petroleum and LNG requirements with producers and suppliers. Fulcrum supports representation and commercial coordination in Bangladesh and beyond.",
  },
  "/sectors/textiles": {
    title: "US Cotton & Textile Sourcing for Bangladesh | Fulcrum",
    description: "Connect Bangladesh textile mills with cotton, fibre, fabric and finishing-input suppliers. Coordinate samples, specifications, quotations and shipment milestones.",
  },
  "/fashion-and-finery": {
    title: "Bangladesh Apparel Sourcing for US Buyers | Fulcrum",
    description: "Fulcrum Fashion and Finery connects US retailers, brands and distributors with Bangladesh garment manufacturers for everyday clothing and South Asian ethnic wear.",
  },
  "/sectors/commodities": {
    title: "Soybean & Edible Oil Sourcing | Fulcrum",
    description: "Coordinate soybean and edible oil sourcing, supplier introductions, specifications, packaging, commercial terms and shipment documentation with Fulcrum.",
  },
  "/career": {
    title: "Careers in Sourcing & International Business | Fulcrum",
    description: "Explore career opportunities at Fulcrum in sourcing, commercial coordination and international business. Read the role details and contact the team.",
  },
  "/contact": {
    title: "Contact Fulcrum | Sourcing & Representation",
    description: "Discuss aviation, energy, textile, apparel, equipment or edible oil sourcing with Fulcrum. Find our US and Bangladesh contact details and prepare an enquiry.",
  },
} satisfies Record<SitePath, { title: string; description: string }>

export function createPageMetadata(path: SitePath): Metadata {
  const { title, description } = pageSeo[path]
  const images = [{
    url: "/fulcrum-masthead-preview.png",
    width: 1200,
    height: 630,
    alt: "Fulcrum masthead with its twin-mountain logo.",
  }]
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      siteName: "Fulcrum",
      locale: "en_US",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  }
}

// All organization details are already visible on the homepage/contact page.
// Do not add ratings, credentials or a SearchAction for a nonexistent search.
export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Fulcrum",
      legalName: "Fulcrum Triad LLC",
      url: siteUrl,
      logo: `${siteUrl}/fulcrum-site-icon.png`,
      description: pageSeo["/"].description,
      email: "infobd@fulcrumtriad.com",
      telephone: "+1-917-329-4170",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress: "107-21 93rd Street",
          addressLocality: "Ozone Park",
          addressRegion: "NY",
          postalCode: "11417",
          addressCountry: "US",
        },
        {
          "@type": "PostalAddress",
          streetAddress: "House 426, Unit 3A, Road 06, Mirpur DOHS",
          addressLocality: "Dhaka",
          postalCode: "1216",
          addressCountry: "BD",
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Fulcrum",
      alternateName: "Fulcrum Triad",
      url: siteUrl,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
}
