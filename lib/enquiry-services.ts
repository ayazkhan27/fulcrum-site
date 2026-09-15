export const enquiryServices = [
  {
    id: "consulting",
    name: "Consulting",
    heading: "Clarity before commitment.",
    body: "Define the requirement, explore commercial options and establish a practical scope of work. We help bring the right information and specialist input together before decisions are made.",
    detail: "Requirements / Options / Advice",
  },
  {
    id: "sourcing",
    name: "Sourcing",
    heading: "The right source for your requirement.",
    body: "Identify suitable manufacturers and suppliers, coordinate specifications, availability and quotations, and help buyers compare proposals against their requirements, quantities and timelines.",
    detail: "Suppliers / Specifications / Proposals",
  },
  {
    id: "representation",
    name: "Representation",
    heading: "A clear mandate. A direct connection.",
    body: "Represent buyers, sellers or manufacturers under an agreed mandate. We support introductions, market entry and commercial follow-up, with clear responsibilities and disclosed fees or commissions.",
    detail: "Mandates / Introductions / Market entry",
  },
  {
    id: "negotiation",
    name: "Negotiation",
    heading: "Bring the commercial details together.",
    body: "Support discussions on pricing, quantities, lead times, payment and delivery terms. We coordinate offers and clarifications so the parties can assess the proposal and reach their own agreement.",
    detail: "Offers / Terms / Clarifications",
  },
  {
    id: "coordination",
    name: "Coordination",
    heading: "Follow-through at every stage.",
    body: "Keep supplier updates, samples, documentation and agreed delivery milestones connected. We follow up with the parties and appointed specialists, while technical acceptance and regulatory approvals remain with those responsible.",
    detail: "Documentation / Milestones / Follow-up",
  },
] as const

export type EnquiryServiceId = (typeof enquiryServices)[number]["id"]
export type EnquiryServiceChoice = EnquiryServiceId | "guidance" | ""

export function isEnquiryService(value: string): value is EnquiryServiceId {
  return enquiryServices.some((service) => service.id === value)
}

export function enquiryServiceLabel(value: EnquiryServiceChoice) {
  return (
    enquiryServices.find((service) => service.id === value)?.name ??
    (value === "guidance" ? "I would like guidance" : "Not specified")
  )
}

export function buildEnquiryMailto(fields: {
  name: string
  organization: string
  email: string
  sector: string
  service: EnquiryServiceChoice
  requirement: string
}) {
  const subject = `Fulcrum enquiry, ${fields.sector}`
  const body = `Name: ${fields.name}\nOrganization: ${fields.organization}\nEmail: ${fields.email}\nArea: ${fields.sector}\nService: ${enquiryServiceLabel(fields.service)}\n\n${fields.requirement}`
  return `mailto:infobd@fulcrumtriad.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
