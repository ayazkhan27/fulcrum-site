import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Footer, Header } from "@/components/site/chrome"

export const metadata: Metadata = {
  title: "Our people | Fulcrum",
  description:
    "Meet the operating, analytical and commercial experience behind Fulcrum.",
  alternates: { canonical: "/people" },
}
const CAREER = [
  {
    period: "2016 – 2019",
    role: "General Manager, Printing & Publications",
    detail:
      "Managed the carrier’s in-house print operation across publications, production and supporting functions.",
  },
  {
    period: "2014 – 2016",
    role: "General Manager, Biman Flight Catering Centre",
    detail:
      "Led the flight catering operation, with responsibility for people, service delivery and facility development.",
  },
  {
    period: "2011 – 2016",
    role: "General Manager, Public Relations",
    detail:
      "Served as the airline’s spokesperson and led public relations, branding, events and publications.",
  },
  {
    period: "2010 – 2011",
    role: "Deputy General Manager, Motor Transport",
    detail: "Managed transport operations and supported vehicle procurement.",
  },
  {
    period: "2009 – 2010",
    role: "Deputy General Manager, Security",
    detail:
      "Head of Security: overall security policy for senior management approval, company-wide standards, and risk analysis and threat assessment capability. Established an Emergency Response Centre near the international airport.",
  },
  {
    period: "2004 – 2009",
    role: "Deputy General Manager, Public Relations",
    detail:
      "Worked on communications, public information and airline branding.",
  },
  {
    period: "2000 – 2004",
    role: "Deputy Chief Instructor, Airlines Training Centre",
    detail:
      "Training administration and course design, including a new course introduced under the title 'Towards a Paperless Office'.",
  },
  {
    period: "1989 – 2000",
    role: "Manager and Public Relations Officer",
    detail:
      "Press, publications and marketing communications. Assistant Editor of the in-flight magazine for twelve years, and coordinator of the month-long Bangladesh Festival in London in 1999.",
  },
]

const PEOPLE = [
  {
    name: "Khan Musharraf Hussein",
    initials: "KH",
    role: "Founding principal",
    summary:
      "Three decades inside Biman Bangladesh Airlines, bringing an operator’s perspective to commercial decisions.",
    expertise: "Leadership · Airline operations · Commercial strategy",
    bio: "Khan’s career spans public relations, flight catering, security, transport and training. His roles included General Manager and Deputy General Manager posts, bringing practical experience of the systems behind an airline.",
    email: "khanhussein@fulcrumtriad.com",
  },
  {
    name: "Muhammad Abdul Wadud",
    initials: "AW",
    role: "Safety & compliance",
    summary:
      "Extensive airline safety, quality and regulatory experience, with a focus on documentation and operational standards.",
    expertise: "Safety · Quality systems · Regulatory review",
    bio: "His background includes corporate quality and risk management at Biman Bangladesh Airlines and participation in Bangladesh’s State Safety Programme coordination work. At Fulcrum, his focus is safety documentation, quality systems and review coordination.",
  },
  {
    name: "Ayaz Khan",
    initials: "AK",
    role: "Data & scoring",
    summary:
      "Statistical thinking and analytical discipline that turn complex requirements into clear, auditable decisions.",
    expertise: "Statistics · Evaluation · Decision support",
    bio: "A recipient of the National Science Foundation Graduate Research Fellowship, Ayaz works on statistical analysis, data models and decision support. At Fulcrum, he applies that discipline to evaluation and scoring, making the reasoning behind a recommendation easier to inspect.",
  },
  {
    name: "Fatin Khan",
    initials: "FK",
    role: "Operations",
    summary:
      "Commercial coordination and practical execution, keeping vendors, information and deadlines moving together.",
    expertise: "Coordination · Vendors · Execution",
    bio: "Fatin’s focus is vendor coordination and translating requirements into practical work plans. At Fulcrum, he coordinates information, submission logistics and deadlines across the assignment.",
  },
]

export default function PeoplePage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="detail-hero people-hero">
          <div className="shell">
            <p className="eyebrow">Fulcrum / Our people</p>
            <h1>
              Perspective earned.
              <br />
              Expertise connected.
            </h1>
            <p className="detail-intro">
              Operating experience. Analytical discipline. Commercial judgment.
              Different strengths, brought together around your assignment.
            </p>
          </div>
        </section>
        <section className="section shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The people behind Fulcrum</p>
              <h2>
                One team.
                <br />
                Complementary perspectives.
              </h2>
            </div>
            <p className="section-note">
              Get to know the experience behind the work.
            </p>
          </div>
          <div className="people-grid">
            {PEOPLE.map((person, index) => (
              <article className="person-card" key={person.name}>
                <div className="person-top">
                  <span className="person-monogram" aria-hidden="true">
                    {person.initials}
                  </span>
                  <span className="person-index" aria-hidden="true">
                    0{index + 1}
                  </span>
                </div>
                <div className="person-title">
                  <p className="eyebrow">{person.role}</p>
                  <h3>{person.name}</h3>
                </div>
                <p className="person-summary">{person.summary}</p>
                <p className="person-expertise">{person.expertise}</p>
                <details className="person-bio">
                  <summary>
                    More about {person.name.split(" ")[0]}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <div>
                    <p>{person.bio}</p>
                    {person.email && (
                      <a href={`mailto:${person.email}`}>{person.email} ↗</a>
                    )}
                  </div>
                </details>
              </article>
            ))}
          </div>
        </section>
        <section className="section detail-note">
          <div className="shell">
            <div>
              <p className="eyebrow">Our foundation</p>
              <h2>
                Experience with
                <br />
                operational depth.
              </h2>
              <p className="foundation-intro">
                Our founding principal’s career provides a perspective across
                the many businesses inside an airline.
              </p>
            </div>
            <div className="career-disclosures">
              <details>
                <summary>
                  Khan Hussein’s career & background{" "}
                  <span aria-hidden="true">+</span>
                </summary>
                <div className="career-content">
                  <ol>
                    {CAREER.map((job) => (
                      <li key={job.period}>
                        <p className="eyebrow">{job.period}</p>
                        <h3>{job.role}</h3>
                        <p>{job.detail}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </details>
              <details>
                <summary>
                  How we manage representation <span aria-hidden="true">+</span>
                </summary>
                <div className="career-content">
                  <p>
                    Representation, responsibilities and potential conflicts are
                    addressed when an engagement is scoped.
                  </p>
                  <p>
                    Our mandates and agency are documented, and representation
                    and compensation are disclosed. Government, defense and
                    state-owned assignments proceed through authorized channels
                    and the controls relevant to the engagement.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>
        <section className="section shell people-preview">
          <div>
            <p className="eyebrow">A wider circle of expertise</p>
            <h2>
              The assignment
              <br />
              shapes the team.
            </h2>
          </div>
          <div>
            <p>
              Engineering, inspection, legal, regulatory, logistics and market
              expertise are coordinated as the work requires. We bring the
              appropriate specialists into a clearly defined assignment.
            </p>
            <Link className="text-link" href="/contact">
              Connect with Fulcrum <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
