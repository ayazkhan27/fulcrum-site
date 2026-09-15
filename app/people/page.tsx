import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Footer, Header } from "@/components/site/chrome"
import "./people.css"

export const metadata: Metadata = {
  title: "Our People | Fulcrum",
  description:
    "Meet the operating, analytical and commercial experience behind Fulcrum.",
  alternates: { canonical: "/people" },
}
const PEOPLE = [
  {
    name: "Khan M Hussein",
    initials: "KH",
    role: "Chief Executive Officer",
    summary:
      "Three decades inside Biman Bangladesh Airlines, bringing an operator’s perspective to commercial decisions.",
    expertise: "Leadership · Airline operations · Commercial strategy",
    bio: "Khan’s career spans public relations, flight catering, security, transport and training. His roles included General Manager and Deputy General Manager posts, bringing practical experience of the systems behind an airline.",
    email: "khanhussein@fulcrumtriad.com",
  },
  {
    name: "Captain S A Masum",
    initials: "SM",
    role: "Chief Operating Officer–Bangladesh",
    summary:
      "Thirty years as a sea captain, bringing maritime leadership and operational experience to Fulcrum’s Bangladesh office.",
    expertise: "Energy · Maritime operations · Logistics",
    bio: "Captain S A Masum oversees energy, maritime activities and logistics as Chief Operating Officer of Fulcrum’s Bangladesh office. He served as a sea captain for 30 years and holds an MBA from London School of Business.",
  },
  {
    name: "Engineer M A Wadud",
    initials: "AW",
    role: "Safety & compliance",
    summary:
      "Extensive airline safety, quality and regulatory experience, with a focus on documentation and operational standards.",
    expertise: "Safety · Quality systems · Regulatory review",
    bio: "His background includes corporate quality and risk management at Biman Bangladesh Airlines and participation in Bangladesh’s State Safety Programme coordination work. At Fulcrum, his focus is safety documentation, quality systems and review coordination.",
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
  {
    name: "Ayaz Khan",
    initials: "AK",
    role: "Data & scoring",
    summary:
      "Statistical thinking and analytical discipline that turn complex requirements into clear, auditable decisions.",
    expertise: "Statistics · Evaluation · Decision support",
    bio: "A recipient of the National Science Foundation Graduate Research Fellowship, Ayaz works on statistical analysis, data models and decision support. At Fulcrum, he applies that discipline to evaluation and scoring, making the reasoning behind a recommendation easier to inspect.",
  },
]

export default function PeoplePage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="detail-hero people-hero">
          <div className="shell">
            <p className="eyebrow">Fulcrum / Our People</p>
            <h1>Our People</h1>
            <p className="detail-intro">
              At the core of Fulcrum Triad is a team of highly experienced and educated
              professionals. Three members each bring a three-decade track record,
              with expertise across aviation and maritime operations. Their
              academic backgrounds span the University of Dhaka, Bangladesh
              University of Engineering and Technology, Bangladesh Marine Academy,
              London School of Business and Columbia University, the elite Ivy League
              institution. Together, they bring complementary knowledge and
              practical experience to the work we undertake.
            </p>
          </div>
        </section>
        <section className="section shell">
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
                  <h2>{person.name}</h2>
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
            <div className="people-team-note">
              <h2>
                One team.
                <br />
                Complementary perspectives.
              </h2>
              <p className="section-note">
                Operating, analytical and commercial perspectives meet around the work.
              </p>
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
