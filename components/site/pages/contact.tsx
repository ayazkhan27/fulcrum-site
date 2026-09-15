import { Header, Footer } from "@/components/site/chrome"
import { ServiceEnquiry } from "@/components/site/service-enquiry"
import "@/app/contact/contact.css"

export default function PageContent({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? "div" : "main"
  return (
    <>
      {!embedded && <Header />}
      <Container id={embedded ? undefined : "main"} className="contact-page">
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
                  "Chief Executive Officer",
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
      </Container>
      <Footer closing />
    </>
  )
}
