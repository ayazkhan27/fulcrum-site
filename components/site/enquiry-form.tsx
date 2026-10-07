"use client"
import { useState, type FormEvent } from "react"
import { track } from "@vercel/analytics"
import { ArrowUpRight } from "lucide-react"
import {
  buildEnquiryMailto,
  enquirySectorFromLabel,
  enquirySectorLabel,
  enquiryServices,
  isEnquiryServiceChoice,
  type EnquiryServiceChoice,
} from "@/lib/enquiry-services"
import {
  enquiryPageContext,
  recordEnquiryEvent,
  type EnquiryAttribution,
} from "@/lib/enquiry-attribution"

export function EnquiryForm({
  service,
  onServiceChange,
  attribution,
  embedded = false,
}: {
  service: EnquiryServiceChoice
  onServiceChange: (service: EnquiryServiceChoice) => void
  attribution: EnquiryAttribution
  embedded?: boolean
}) {
  const [sector, setSector] = useState(enquirySectorLabel(attribution.sector))
  const [prepared, setPrepared] = useState<{
    service: EnquiryServiceChoice
    sector: string
    url: string
  } | null>(null)
  const draft =
    prepared?.service === service && prepared.sector === sector
      ? prepared.url
      : null
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setPrepared({
      service,
      sector,
      url: buildEnquiryMailto({
        name: String(data.get("name") ?? ""),
        organization: String(data.get("organization") ?? ""),
        email: String(data.get("email") ?? ""),
        sector,
        service,
        requirement: String(data.get("requirement") ?? ""),
      }),
    })
    const context = enquiryPageContext(
      window.location.pathname,
      event.currentTarget.closest('[id^="page-"]')?.id
    )
    recordEnquiryEvent(track, "Enquiry prepared", {
      ...context,
      sector: enquirySectorFromLabel(sector),
      service,
      source: attribution.source || context.source,
    })
  }
  return (
    <form
      className="enquiry-form"
      id="enquiry-form"
      tabIndex={-1}
      aria-labelledby="enquiry-form-title"
      data-enquiry-sector={enquirySectorFromLabel(sector)}
      data-enquiry-service={service}
      data-enquiry-source={attribution.source}
      onSubmit={prepare}
      onChange={() => setPrepared(null)}
    >
      <h2 id="enquiry-form-title">Tell us what you have in mind.</h2>
      <p>Prepare an enquiry, then send it from your email app.</p>
      <label>
        Service needed
        <select
          name="service"
          required
          value={service}
          onChange={(event) => {
            if (isEnquiryServiceChoice(event.target.value))
              onServiceChange(event.target.value)
          }}
        >
          <option value="" disabled>
            Select a service
          </option>
          {enquiryServices.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
          <option value="guidance">I would like guidance</option>
        </select>
      </label>
      <div className="form-grid">
        <label>
          Your name
          <input required name="name" autoComplete="name" maxLength={120} />
        </label>
        <label>
          Organization
          <input
            required
            name="organization"
            autoComplete="organization"
            maxLength={160}
          />
        </label>
        <label>
          Email address
          <input
            required
            type="email"
            name="email"
            autoComplete="email"
            maxLength={160}
          />
        </label>
        <label>
          Area of interest
          <select
            name="sector"
            value={sector}
            onChange={(event) => setSector(event.target.value)}
            required
          >
            <option value="" disabled>
              Select an area
            </option>
            <option>Aviation & airports</option>
            {!embedded && <option>Apparel & fashion sourcing</option>}
            <option>Energy, petroleum & LNG</option>
            <option>Textiles, cotton & mill supply</option>
            <option>Edible oils & commodities</option>
            <option>Spares & equipment</option>
            <option>Industrial equipment</option>
            <option>Medical equipment</option>
            <option>Government & defense procurement</option>
            <option>Manufacturer representation</option>
            <option>Consulting</option>
            <option>Brokerage</option>
            <option>Other requirement</option>
          </select>
        </label>
      </div>
      <label>
        Your requirement
        <textarea
          name="requirement"
          required
          maxLength={2000}
          placeholder="The asset, service or opportunity, location, and indicative timing…"
        />
      </label>
      <button type="submit" className="button">
        Prepare enquiry <ArrowUpRight size={18} aria-hidden="true" />
      </button>
      <div aria-live="polite">
        {draft && (
          <div className="form-status">
            <p>Your enquiry is ready. Nothing has been sent yet.</p>
            <a href={draft} className="text-link" data-enquiry-draft>
              Open email draft <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </form>
  )
}
