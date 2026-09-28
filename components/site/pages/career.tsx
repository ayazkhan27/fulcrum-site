import { ArrowUpRight } from "lucide-react"
import { Header, Footer } from "@/components/site/chrome"
import "@/app/career/career.css"

export default function CareerContent({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? "div" : "main"
  const Heading = embedded ? "h2" : "h1"
  return (
    <>
      {!embedded && <Header />}
      <Container id={embedded ? undefined : "main"} className="career-page">
        <section className="career-hero">
          <div className="shell career-layout">
            <div className="career-copy">
              <p className="eyebrow">Fulcrum / Career</p>
              <Heading className="career-title">Career</Heading>
              <p className="career-lead">Work across borders.<br />Make a contribution.</p>
              <p className="career-intro">
                Fulcrum connects international suppliers and manufacturers with
                business requirements in Bangladesh and beyond. Our work brings
                together sourcing, representation and commercial coordination.
              </p>
              <p className="career-intro">
                If your experience relates to our work, get in touch to enquire
                about opportunities with Fulcrum.
              </p>
            </div>
            <aside className="career-enquiry" aria-label="Career enquiries">
              <p className="eyebrow">Introduce yourself</p>
              <h2>Start a career conversation.</h2>
              <p>Tell us about your background, where you are based and the kind of work you are interested in.</p>
              <ul>
                <li>Your CV or a brief professional profile</li>
                <li>Your relevant experience and area of interest</li>
                <li>Your location and availability</li>
              </ul>
              <a className="text-link" href="mailto:khanhussein@fulcrumtriad.com?subject=Career%20enquiry">
                Email a career enquiry <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <p className="career-email">khanhussein@fulcrumtriad.com</p>
            </aside>
          </div>
        </section>
        <section className="career-opportunities shell" aria-label="Current opportunities">
          <p className="eyebrow">Current opportunities</p>
          <h2>Business Development Officer</h2>
          <p className="career-opportunities-intro">We are seeking Business Development Officers in the USA, Malaysia and Bangladesh to develop business relationships, identify opportunities and coordinate discussions with prospective clients, manufacturers and suppliers.</p>
          <div className="career-jobs">
            {["USA", "Malaysia", "Bangladesh"].map((location) => (
              <article className="career-job" key={location}>
                <p className="eyebrow">{location}</p>
                <h3>Business Development Officer</h3>
                <p className="career-compensation">Commission-only · No base salary</p>
                <p>This opportunity is offered on a purely commission basis. No base salary is offered at this time.</p>
                <p>To apply, send your CV and a brief introduction outlining your relevant experience, location and business-development interests.</p>
                <a className="text-link" href={`mailto:khanhussein@fulcrumtriad.com?subject=${encodeURIComponent(`Business Development Officer — ${location}`)}`}>
                  Apply — {location} <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
        </section>
      </Container>
      {!embedded && <Footer />}
    </>
  )
}
