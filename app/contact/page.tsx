import type { Metadata } from "next"
import { Header, Footer } from "@/components/site/chrome"
import { ServiceEnquiry } from "@/components/site/service-enquiry"
import "./contact.css"
export const metadata: Metadata = {
  title: "Contact Us | Fulcrum",
  description:
    "Discuss sourcing, manufacturer representation or procurement across aviation, energy, textiles, commodities, industrial and medical equipment.",
  alternates: { canonical: "/contact" },
}
export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main" className="contact-page">
        <h1 className="sr-only">Contact Us</h1>
        <div className="shell contact-page-label">
          <p className="eyebrow">Fulcrum / Contact Us</p>
        </div>
        <ServiceEnquiry>
          <div>
            <p className="eyebrow">Connect with Fulcrum</p>
            <h2>
              Global reach.
              <br />A direct connection.
            </h2>
            <dl className="contact-addresses">
              <div>
                <dt>Visit our website</dt>
                <dd>
                  <a href="https://fulcrumtriad.com">www.fulcrumtriad.com</a>
                </dd>
              </div>
              {[
                ["General enquiries", "infobd@fulcrumtriad.com"],
                ["Operations & partnerships", "operations@fulcrumtriad.com"],
                [
                  "Chief Executive Office",
                  "khanhussein@fulcrumtriad.com",
                ],
              ].map(([label, email]) => (
                <div key={email}>
                  <dt>{label}</dt>
                  <dd>
                    <a href={`mailto:${email}`}>{email}</a>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="section-note">
              Based in New York. Working across borders.
            </p>
          </div>
        </ServiceEnquiry>
      </main>
      <Footer closing />
    </>
  )
}
