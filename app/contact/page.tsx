import type { Metadata } from "next"
import { Header, Footer } from "@/components/site/chrome"
import { EnquiryForm } from "@/components/site/enquiry-form"
export const metadata: Metadata = {
  title: "Contact | Fulcrum",
  description:
    "Discuss an aviation, energy, consulting or brokerage requirement with Fulcrum.",
  alternates: { canonical: "/contact" },
}
export default function ContactPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="detail-hero">
          <div className="shell">
            <p className="eyebrow">Fulcrum / Contact</p>
            <h1>
              A conversation.
              <br />A clearer way forward.
            </h1>
            <p className="detail-intro">
              Tell us what needs to be sourced, evaluated or solved. We will
              help define the next step.
            </p>
          </div>
        </section>
        <section className="section shell contact-layout">
          <div>
            <p className="eyebrow">Connect with Fulcrum</p>
            <h2>
              Global reach.
              <br />A direct connection.
            </h2>
            <dl className="contact-addresses">
              {[
                ["General enquiries", "infobd@fulcrumtriad.com"],
                ["Operations & partnerships", "operations@fulcrumtriad.com"],
                [
                  "Khan Musharraf Hussein · Founding principal",
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
          <EnquiryForm />
        </section>
        <section className="section detail-note">
          <div className="shell">
            <div>
              <p className="eyebrow">Before we begin</p>
              <h2>
                A little context
                <br />
                goes a long way.
              </h2>
            </div>
            <div className="faq-list">
              {[
                [
                  "What should I include in an enquiry?",
                  "Describe the asset, product, service or business question, the relevant market or location, and your indicative timeline. A concise outline is enough to start.",
                ],
                [
                  "Do you work beyond aviation?",
                  "Yes. Our energy work includes petroleum products and LNG for buyers, sellers and project partners, including clients outside aviation.",
                ],
                [
                  "How does an engagement begin?",
                  "We first clarify the requirement and our potential role. Scope, representation and commercial terms are documented before an assignment begins.",
                ],
              ].map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
