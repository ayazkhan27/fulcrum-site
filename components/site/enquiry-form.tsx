"use client"
import { useState, type FormEvent } from "react"
import { ArrowUpRight } from "lucide-react"
import {
  buildEnquiryMailto,
  enquiryServices,
  type EnquiryServiceChoice,
} from "@/lib/enquiry-services"

export function EnquiryForm({
  service,
  onServiceChange,
}: {
  service: EnquiryServiceChoice
  onServiceChange: (service: EnquiryServiceChoice) => void
}) {
  const [prepared, setPrepared] = useState<{
    service: EnquiryServiceChoice
    url: string
  } | null>(null)
  const draft = prepared?.service === service ? prepared.url : null
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setPrepared({
      service,
      url: buildEnquiryMailto({
        name: String(data.get("name") ?? ""),
        organization: String(data.get("organization") ?? ""),
        email: String(data.get("email") ?? ""),
        sector: String(data.get("sector") ?? ""),
        service,
        requirement: String(data.get("requirement") ?? ""),
      }),
    })
  }
  return (
    <form
      className="enquiry-form"
      id="enquiry-form"
      tabIndex={-1}
      aria-labelledby="enquiry-form-title"
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
          onChange={(event) =>
            onServiceChange(event.target.value as EnquiryServiceChoice)
          }
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
          <select name="sector" defaultValue="" required>
            <option value="" disabled>
              Select an area
            </option>
            <option>Aviation & airports</option>
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
            <a href={draft} className="text-link">
              Open email draft <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </form>
  )
}
