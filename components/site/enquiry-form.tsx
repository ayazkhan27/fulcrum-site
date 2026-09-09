"use client"
import { useState, type FormEvent } from "react"
import { ArrowUpRight } from "lucide-react"
export function EnquiryForm() {
  const [draft, setDraft] = useState<string | null>(null)
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = `Fulcrum enquiry, ${data.get("sector")}`
    const body = `Name: ${data.get("name")}\nOrganization: ${data.get("organization")}\nEmail: ${data.get("email")}\nArea: ${data.get("sector")}\n\n${data.get("requirement")}`
    setDraft(
      `mailto:infobd@fulcrumtriad.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    )
  }
  return (
    <form
      className="enquiry-form"
      onSubmit={prepare}
      onChange={() => setDraft(null)}
    >
      <h2>Tell us what you have in mind.</h2>
      <p>Prepare an enquiry, then send it from your email app.</p>
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
            <option>Aviation</option>
            <option>Energy, petroleum & LNG</option>
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
