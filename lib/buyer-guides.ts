import type { Metadata } from "next"

type GuideSource = {
  id: string
  label: string
  href: string
  note: string
}

type GuideSection = {
  id: string
  title: string
  introduction: string
  checklist: string[]
  reference?: { text: string; sourceIds: string[] }
}

export type BuyerGuide = {
  slug: string
  title: string
  category: string
  audience: string
  summary: string
  introduction: string
  scope: string
  sections: GuideSection[]
  comparison: { heading: string; rows: { item: string; detail: string }[] }
  brief: { introduction: string; fields: string[] }
  support: string
  contactHref: string
  sectorHref: string
  sectorLabel: string
  sources: GuideSource[]
}

export const aircraftDryLeaseGuide: BuyerGuide = {
  slug: "aircraft-dry-lease-enquiry-checklist",
  title: "Aircraft dry lease enquiry checklist",
  category: "Aviation & Airports",
  audience: "For airline and commercial aircraft procurement teams",
  summary:
    "Prepare the operating brief, asset requirements and commercial questions for an aircraft dry lease enquiry.",
  introduction:
    "A useful aircraft enquiry gives a prospective lessor enough information to assess the requirement and gives your team a consistent basis for comparing responses. Start with the operator, aircraft specification, timing and commercial scope; identify what is confirmed and what still needs review.",
  scope:
    "Use this as a commercial preparation checklist. Aircraft suitability, maintenance status, operational approvals and lease terms require review by the operator and its appointed technical, regulatory and legal specialists.",
  sections: [
    {
      id: "operator-and-mandate",
      title: "Identify the operator and the mandate",
      introduction:
        "Make it clear who will lease and operate the aircraft, who is coordinating the enquiry, and who can make a decision.",
      checklist: [
        "Record the proposed lessee’s legal name, operating base and relevant air operator certificate details or application status.",
        "Name the commercial decision-maker and the technical and operations contacts who will review any proposal.",
        "Explain whether the enquiry comes directly from the operator or through an authorized representative, and describe that representative’s scope.",
        "State that a dry lease is requested. If crew or other operating services are also needed, describe them separately for specialist review.",
      ],
      reference: {
        text: "The FAA describes a dry lease as an aircraft lease without crew and emphasizes the lessee’s operational control. Its guidance addresses US operations; your own authority’s requirements must be checked for the proposed arrangement.",
        sourceIds: ["faa"],
      },
    },
    {
      id: "aircraft-and-operation",
      title: "Define the aircraft and intended operation",
      introduction:
        "Separate essential requirements from preferences so that an alternative can be assessed without losing the purpose of the enquiry.",
      checklist: [
        "Specify the aircraft family, model or acceptable alternatives, number of aircraft, and passenger or cargo configuration.",
        "Give the intended operating region, indicative routes, required capacity, and the operator’s expected monthly flight hours and cycles.",
        "List cabin, engine and equipment preferences supplied by your technical team; mark which are mandatory and which are negotiable.",
        "State any age, records, maintenance or delivery-condition limits set by the operator or relevant authority, with the reviewer responsible for confirming them.",
      ],
    },
    {
      id: "delivery-and-term",
      title: "Set the delivery window and lease term",
      introduction:
        "An available aircraft and a ready-to-operate aircraft are different milestones. Give each a date and an owner.",
      checklist: [
        "Provide the desired delivery window, preferred delivery location, proposed lease duration and flexibility on each.",
        "Distinguish the target aircraft handover date from the target entry-into-service date.",
        "Identify internal review, inspection, documentation and approval milestones that could affect the timetable.",
        "Ask which delivery assumptions depend on maintenance, reconfiguration, records review, registration or other outstanding work.",
      ],
    },
    {
      id: "commercial-basis",
      title: "Put the commercial assumptions in writing",
      introduction:
        "Monthly rent alone does not describe the proposed commitment. Ask for enough detail to compare the full commercial structure.",
      checklist: [
        "State the rent budget or commercial parameters, currency, intended term and assumed utilization; label estimates clearly.",
        "Request the proposed security deposit or other security, rent payment schedule, escalation and offer validity.",
        "Ask how maintenance reserves, reimbursement conditions, end-of-lease compensation and return-condition obligations are proposed to work.",
        "Identify responsibility for insurance, inspections, modifications, positioning, taxes and other transaction costs, with unresolved items marked for review.",
      ],
    },
    {
      id: "records-and-review",
      title: "Plan the information and specialist review",
      introduction:
        "At the initial stage, request an asset summary and agree how detailed records and confidential information will be exchanged.",
      checklist: [
        "Request the aircraft identity, specification, configuration and current location when a specific asset is proposed.",
        "Ask your technical team to define the records package it needs, including relevant aircraft, engine and component histories and maintenance status.",
        "Agree who will assess the records, inspect the aircraft and sign off technical acceptance; record the scope and timing of that review.",
        "Have the responsible teams confirm the approval, registration, import, insurance and operational requirements for the intended jurisdictions before committing to dates.",
      ],
      reference: {
        text: "For a Bangladesh operation, CAAB’s Air Operator Certification and Administration implementing standard includes aircraft leasing arrangements. Ask the operator’s regulatory team to confirm the current provisions and their application to the proposed lease.",
        sourceIds: ["caab"],
      },
    },
    {
      id: "decision-and-follow-up",
      title: "Agree the next decision and its owner",
      introduction:
        "A clear response process helps both parties understand whether they are discussing an indicative option or progressing a defined transaction.",
      checklist: [
        "Ask the lessor to identify departures from the brief, unavailable information and the assumptions behind the offer.",
        "Keep a dated list of open commercial, technical and documentation questions, with a named owner for each answer.",
        "Identify who can authorize a letter of intent, deposit, inspection or contract, and have advisers review the relevant terms before signature or payment.",
        "Set a date for the next review and record what information is needed to move to that stage.",
      ],
    },
  ],
  comparison: {
    heading: "Compare proposals on the same basis",
    rows: [
      { item: "Asset & condition", detail: "Aircraft identity, configuration, records access, maintenance assumptions and proposed delivery condition." },
      { item: "Timing", detail: "Actual availability, delivery dependencies, location and readiness for your review process." },
      { item: "Commercial exposure", detail: "Rent, security, reserves, escalation, additional costs and return obligations across the proposed term." },
      { item: "Responsibilities", detail: "Who supplies each document, performs each review, pays each cost and obtains each approval." },
      { item: "Open conditions", detail: "Exceptions, unanswered questions, offer expiry and approvals still needed before commitment." },
    ],
  },
  brief: {
    introduction: "Use these headings for your initial message. An honest “to be confirmed” is more useful than an unsupported estimate.",
    fields: [
      "Operator / lessee and country:",
      "Your role and authority to enquire:",
      "Aircraft type, quantity and configuration:",
      "Intended operation and indicative utilization:",
      "Delivery window, location and lease term:",
      "Essential requirements and acceptable alternatives:",
      "Commercial parameters and review contacts:",
      "Open questions and requested next step:",
    ],
  },
  support:
    "Fulcrum coordinates sourcing, supplier representation and transactions for Bangladesh and international aviation markets. Share a defined requirement so the scope of commercial coordination can be discussed. Technical acceptance and regulatory approvals remain with the responsible teams.",
  contactHref: "/contact?sector=aviation&service=sourcing&source=guide#enquiry-form",
  sectorHref: "/aviation",
  sectorLabel: "Aviation & Airports",
  sources: [
    {
      id: "faa",
      label: "FAA — Pilots, Owners, and Operators",
      href: "https://www.faa.gov/about/initiatives/safecharteroperations/pilots-owners-and-operators",
      note: "US guidance on dry leases and operational control.",
    },
    {
      id: "caab",
      label: "CAAB — Air Operator Certification and Administration (PDF)",
      href: "https://www.caab.gov.bd/ano/anoaocair.pdf",
      note: "Bangladesh implementing standard with provisions on aircraft leasing arrangements; confirm the current applicable version with CAAB.",
    },
  ],
}

export const bangladeshGarmentGuide: BuyerGuide = {
  slug: "bangladesh-garment-sourcing-checklist",
  title: "Bangladesh garment sourcing checklist",
  category: "Fashion & Finery",
  audience: "For US retailers, brands and apparel distributors",
  summary:
    "Turn an apparel idea into a sourcing brief covering specifications, samples, order quantities, quality and delivery.",
  introduction:
    "A good garment sourcing brief describes the product the customer should receive, not just a style name and target price. Use this checklist to prepare a Bangladesh supplier enquiry and to compare responses for everyday clothing, contemporary collections or South Asian ethnic wear.",
  scope:
    "This is a purchasing preparation guide. Confirm product safety, labeling, customs and contractual requirements with your appointed specialists for the exact product and destination market.",
  sections: [
    {
      id: "product-and-customer",
      title: "Define the product and the customer",
      introduction:
        "Start with the intended wearer, retail channel and use. A supplier needs this context to assess the product and quotation.",
      checklist: [
        "Identify the garment category, intended wearer and age group, destination market and sales channel.",
        "Describe the fit, size range, style references and target price position. State whether you are developing a new design or repeating an approved product.",
        "For ethnic or occasion wear, specify the silhouette, included pieces, coverage, lining, embroidery or embellishment, and any matching requirements.",
        "Provide your legal business name, buyer contact and the person authorized to approve samples, changes and orders.",
      ],
    },
    {
      id: "specification-pack",
      title: "Build one version of the specification",
      introduction:
        "Give each style a reference and revision date. Keep drawings, measurements and approved changes together so quotations refer to the same product.",
      checklist: [
        "Supply a technical pack: drawings or reference photographs, fabric composition, construction, weight and intended finish.",
        "Include the measurement chart, size grading, measurement method and tolerances; identify the fit sample or reference garment.",
        "Specify colors, trims, buttons, zippers, labels, artwork, print or embroidery placement, and packaging requirements.",
        "Mark missing details and acceptable alternatives. Require written approval before a supplier substitutes materials or changes construction.",
      ],
    },
    {
      id: "quantities-and-quotation",
      title: "Break down quantities and the quotation",
      introduction:
        "An order total is only the starting point. Make the style, color and size breakdown visible alongside the price assumptions.",
      checklist: [
        "State the initial quantity by style, color and size. Separate a committed order from an indicative reorder forecast.",
        "Ask for minimum order quantities by style and color, material minimums, and any small-order or development charges.",
        "Specify the quotation currency, delivery term and named place or port; ask which packing, testing, freight and other costs are included.",
        "Request payment terms, sample charges, quotation validity and the events from which production lead time will be measured.",
      ],
    },
    {
      id: "supplier-and-samples",
      title: "Check the supplier and approve the samples",
      introduction:
        "Assess the actual production site and the proposed product together. A useful sample process ends with a clear record of what was approved.",
      checklist: [
        "Obtain the supplier’s legal name, factory address, contact details and the identity of the site that will produce the order; ask about planned subcontracting.",
        "Request relevant product experience, current capacity and the records your purchasing policy requires. Verify any certification or audit claim with its issuer and check its scope and date.",
        "Agree the sample stages needed for this order, such as fabric or color approval, fit, size set and a pre-production sample, with cost and timing for each.",
        "Record sample comments, revisions and the final approval in writing. Keep an identified reference sample and assign an approver for later changes.",
      ],
      reference: {
        text: "BGMEA provides a searchable member directory. Use directory information as a starting point for checking company details, and assess the specific factory and order independently.",
        sourceIds: ["bgmea"],
      },
    },
    {
      id: "quality-and-market-requirements",
      title: "Agree quality and destination-market requirements",
      introduction:
        "Define what will be checked, who will check it, and what happens if the product does not meet the agreed specification.",
      checklist: [
        "Set measurable acceptance criteria for dimensions, workmanship, color consistency, fabric performance and packaging, with the tests and inspection stages your product needs.",
        "Have your compliance reviewer confirm the applicable labeling, care instructions, safety testing and certification requirements before bulk production.",
        "Identify who commissions tests, supplies reports, approves labels and releases the order. Confirm that the evidence covers the actual materials and product being purchased.",
        "Agree inspection access, the reporting process, and how defects, rework or rejected goods will be handled in the commercial agreement.",
      ],
      reference: {
        text: "FTC guidance covers textile fiber content, origin and responsible-business labeling, as well as garment care labels. CPSC guidance addresses apparel flammability and additional requirements for children’s products. Requirements depend on the product; children’s clothing and sleepwear need particular attention.",
        sourceIds: ["ftc", "cpsc"],
      },
    },
    {
      id: "delivery-and-import",
      title: "Work back from the required arrival date",
      introduction:
        "Keep production completion, shipment and delivery to your warehouse as separate milestones, with time for approvals and unresolved dependencies.",
      checklist: [
        "State the required in-warehouse date and destination. Ask for material booking, sample approval, production, inspection and shipment milestones.",
        "Confirm carton dimensions, packing ratios, carton marks, shipping method and the party arranging freight and insurance.",
        "Identify the importer of record and customs broker. Have them confirm classification, origin, duties and current entry requirements before relying on a landed-cost estimate.",
        "Agree the invoice, packing list, transport documents and other product-specific records required, plus an escalation contact for delays or discrepancies.",
      ],
      reference: {
        text: "CBP’s textile importing guidance points buyers to origin, labeling and other agency requirements. Ask your broker to review the complete product and manufacturing details for the shipment.",
        sourceIds: ["cbp"],
      },
    },
  ],
  comparison: {
    heading: "Compare more than the unit price",
    rows: [
      { item: "Product basis", detail: "Same specification revision, fabric, measurements, trims, labels and packaging." },
      { item: "Order basis", detail: "Same style, color and size quantities, with minimums and surcharges visible." },
      { item: "Cost basis", detail: "Same currency, delivery term and named place; identify excluded development, testing, freight and import costs." },
      { item: "Quality basis", detail: "Agreed samples, tests, inspections, approvals and remedies for nonconforming goods." },
      { item: "Schedule basis", detail: "Milestones tied to material availability and approvals, with shipment and warehouse arrival shown separately." },
    ],
  },
  brief: {
    introduction: "Use these headings to start the conversation, then agree how to share your specification pack and reference images.",
    fields: [
      "Business, buyer contact and destination market:",
      "Garment category, intended wearer and style references:",
      "Specification pack status and open details:",
      "Quantity by style, color and size:",
      "Target price, currency and delivery basis:",
      "Sample, quality and testing requirements:",
      "Required arrival date and delivery destination:",
      "Requested sourcing support and next step:",
    ],
  },
  support:
    "Fulcrum connects US retailers, brands and distributors with suitable garment manufacturers in Bangladesh. We identify suitable suppliers, coordinate samples and quotations, and help buyers and manufacturers agree on product specifications, quality expectations and delivery schedules.",
  contactHref: "/contact?sector=apparel&service=sourcing&source=guide#enquiry-form",
  sectorHref: "/fashion-and-finery",
  sectorLabel: "Fashion & Finery",
  sources: [
    {
      id: "bgmea",
      label: "BGMEA — Member search",
      href: "https://www.bgmea.com.bd/page/member-search",
      note: "Manufacturer directory for initial company research.",
    },
    {
      id: "ftc",
      label: "FTC — Clothing and Textiles",
      href: "https://www.ftc.gov/business-guidance/industry/clothing-and-textiles",
      note: "US textile labeling and care-label guidance.",
    },
    {
      id: "cpsc",
      label: "CPSC — Clothing guidance",
      href: "https://www.cpsc.gov/FAQ/Clothing",
      note: "US apparel flammability and children’s product requirements.",
    },
    {
      id: "cbp",
      label: "CBP — Regulations for importing textiles",
      href: "https://www.help.cbp.gov/s/article/Article-1070?language=en_US",
      note: "US import considerations and links to origin guidance.",
    },
  ],
}

export const buyerGuides = [aircraftDryLeaseGuide, bangladeshGarmentGuide] as const

export const resourcePages = [
  { href: "/resources", label: "Buyer resources" },
  { href: `/resources/${aircraftDryLeaseGuide.slug}`, label: aircraftDryLeaseGuide.title },
  { href: `/resources/${bangladeshGarmentGuide.slug}`, label: bangladeshGarmentGuide.title },
] as const

export const resourceSeo = {
  "/resources": {
    title: "Buyer Resources & Sourcing Checklists | Fulcrum",
    description: "Prepare a clearer sourcing enquiry with Fulcrum’s practical buyer checklists for aircraft dry leasing and garment sourcing from Bangladesh.",
  },
  "/resources/aircraft-dry-lease-enquiry-checklist": {
    title: "Aircraft Dry Lease Enquiry Checklist | Fulcrum",
    description: "Prepare an aircraft dry lease enquiry: operator details, aircraft requirements, delivery, commercial terms, records and specialist review questions.",
  },
  "/resources/bangladesh-garment-sourcing-checklist": {
    title: "Bangladesh Garment Sourcing Checklist | Fulcrum",
    description: "A practical checklist for US apparel buyers sourcing from Bangladesh: specifications, quantities, samples, quality, labeling, delivery and supplier questions.",
  },
} as const

export function createResourceMetadata(path: keyof typeof resourceSeo): Metadata {
  const { title, description } = resourceSeo[path]
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
