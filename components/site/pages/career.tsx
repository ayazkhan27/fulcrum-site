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
          <div className="career-role-description">
            <h3>About the role</h3>
            <p>Fulcrum seeks commercially minded Business Development Officers to identify opportunities, bring in new business and develop relationships with prospective clients, manufacturers and suppliers.</p>
            <p>The primary responsibility is to turn promising contacts into business for the company—from finding a lead and understanding the requirement to supporting negotiations and following the opportunity through to a successful transaction.</p>
            <h3>Key responsibilities</h3>
            <ul>
              <li>Explore markets and identify potential clients, suppliers and business opportunities relevant to Fulcrum’s services.</li>
              <li>Generate leads through research, networking, introductions and direct outreach.</li>
              <li>Understand prospective clients’ requirements and assess whether opportunities fit the company’s capabilities.</li>
              <li>Introduce Fulcrum’s sourcing, representation and commercial-coordination services.</li>
              <li>Arrange meetings and help coordinate proposals, quotations and commercial discussions.</li>
              <li>Work with company leadership to convert qualified opportunities into confirmed business.</li>
              <li>Follow up with clients and suppliers, maintaining accurate records of leads, discussions and progress.</li>
              <li>Build lasting relationships that support repeat business and referrals.</li>
              <li>Represent Fulcrum professionally, making only commitments authorised by the company.</li>
            </ul>
            <h3>Suitable background</h3>
            <ul>
              <li>A bachelor’s degree in Business Administration or a related field is preferred.</li>
              <li>Experience in business development, sales, sourcing, trading or commercial representation.</li>
              <li>Strong communication, networking and negotiation skills.</li>
              <li>Initiative, persistence and the ability to work independently.</li>
              <li>An understanding of the local market; relevant industry contacts would be an advantage.</li>
              <li>A practical, results-oriented approach and sound professional judgment.</li>
            </ul>
            <h3>How success is measured</h3>
            <p>Success will be assessed primarily through qualified opportunities developed, business secured and revenue received by Fulcrum from the officer’s attributable business—not simply the number of contacts made.</p>
            <h3>Commission arrangement</h3>
            <p>This is a commission-only opportunity, with no base salary. Earnings will be linked to business generated for Fulcrum.</p>
            <p>Commission rates and the conditions for earning and receiving payment will be discussed individually and set out in a written agreement before work begins.</p>
            <h3>How to apply</h3>
            <p>Email your CV and a brief introduction describing your relevant experience, market knowledge and location to <a href="mailto:khanhussein@fulcrumtriad.com">khanhussein@fulcrumtriad.com</a>. Select your location below to use the corresponding application subject.</p>
          </div>
          <div className="career-jobs">
            {["USA", "Malaysia", "Bangladesh"].map((location) => (
              <article className="career-job" key={location}>
                <p className="eyebrow">{location}</p>
                <h3>Business Development Officer</h3>
                <p>To apply, send your CV and a brief introduction outlining your relevant experience, location and business-development interests.</p>
                <p>This is a commission-only opportunity, with no base salary.</p>
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
