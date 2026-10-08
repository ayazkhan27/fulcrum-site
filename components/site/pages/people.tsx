import { Header } from "@/components/site/chrome"
import "@/app/people/people.css"


export const PEOPLE = [
  {
    name: "Khan M Hussein",
    initials: "KH",
    role: "Chief Executive Officer",
    summary:
      "Three decades inside Biman Bangladesh Airlines, bringing an operator’s perspective to commercial decisions.",
    expertise: "Leadership · Airline operations · Commercial strategy",
    bio: "Khan’s career spans public relations, flight catering, security, transport and training. His roles included General Manager and Deputy General Manager posts, bringing practical experience of the systems behind an airline.",
    educationAndTraining: "Khan holds an M.A. in Mass Communication and Journalism from the University of Dhaka. His professional training includes programmes with George Washington University in the United States, the Royal Institute of Public Administration in London, and Boeing Marketing Academy.",
    email: "khanhussein@fulcrumtriad.com",
  },
  {
    name: "Captain SK Abul Masum",
    initials: "SM",
    role: "Chief Operating Officer–Bangladesh",
    summary:
      "Thirty years as a sea captain, bringing maritime leadership and operational experience to Fulcrum’s Bangladesh office.",
    expertise: "Energy · Maritime operations · Logistics",
    bio: "Captain SK Abul Masum oversees energy, maritime activities and logistics as Chief Operating Officer of Fulcrum’s Bangladesh office. He served as a sea captain for 30 years and holds an MBA from London School of Business.",
    experienceBio: "Captain SK Abul Masum oversees energy, maritime activities and logistics as Chief Operating Officer of Fulcrum’s Bangladesh office. He served as a sea captain for 30 years.",
    educationAndTraining: "He holds an MBA from London School of Business.",
  },
  {
    name: "Engineer M A Wadud",
    initials: "AW",
    role: "Safety & compliance",
    summary:
      "Extensive airline safety, quality and regulatory experience, with a focus on documentation and operational standards.",
    expertise: "Safety · Quality systems · Regulatory review",
    bio: "His background includes corporate quality and risk management at Biman Bangladesh Airlines and participation in Bangladesh’s State Safety Programme coordination work. At Fulcrum, his focus is safety documentation, quality systems and review coordination.",
    educationAndTraining: "Engineer Wadud graduated in Mechanical Engineering from Bangladesh University of Engineering and Technology. He has also completed numerous professional training programmes with IATA and ICAO, among other organisations.",
  },
  {
    name: "Fatin A Khan",
    initials: "FK",
    role: "Operations",
    summary:
      "Commercial coordination and practical execution, keeping vendors, information and deadlines moving together.",
    expertise: "Coordination · Vendors · Execution",
    bio: "Fatin’s focus is vendor coordination and translating requirements into practical work plans. At Fulcrum, he coordinates information, submission logistics and deadlines across the assignment.",
    educationAndTraining: "Fatin graduated in Computer Science and Engineering from North South University in Dhaka. He also studied at Stony Brook University on Long Island and has received professional training from Google and other organisations.",
  },
  {
    name: "Ayaz A Khan",
    initials: "AK",
    role: "Data & scoring",
    summary:
      "Statistical thinking and analytical discipline that turn complex requirements into clear, auditable decisions.",
    expertise: "Statistics · Evaluation · Decision support",
    bio: "A recipient of the National Science Foundation Graduate Research Fellowship, Ayaz works on statistical analysis, data models and decision support. At Fulcrum, he applies that discipline to evaluation and scoring, making the reasoning behind a recommendation easier to inspect.",
    educationAndTraining: "Ayaz earned an M.A. in Statistics from Columbia University, New York, in 2026. He graduated with honours from Hunter College, New York, where he studied Data Science and Machine Learning.",
  },
]

export default function PageContent({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? "div" : "main"
  return (
    <>
      {!embedded && <Header />}
      <Container id={embedded ? undefined : "main"}>
        <section className="detail-hero people-hero">
          <div className="shell">
            <p className="eyebrow">Fulcrum / Our People</p>
            <h1>The People Behind the Motion</h1>
            <p className="detail-intro">
              At the core of Fulcrum Triad is a team of highly experienced and educated
              professionals. Three members each bring a three-decade track record,
              with expertise across aviation and maritime operations. Their
              academic backgrounds span the University of Dhaka, Bangladesh
              University of Engineering and Technology, Bangladesh Marine Academy,
              London School of Business and Columbia University, an Ivy League
              institution. Together, they bring complementary knowledge and
              practical experience to the work we undertake.
            </p>
          </div>
        </section>
        <section className="section shell">
          <div className="people-grid">
            {PEOPLE.map((person) => (
              <article className="person-card" key={person.name}>
                <div className="person-top">
                  <span className="person-monogram" aria-hidden="true">
                    {person.initials}
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
                Complementary
                <br />
                perspectives.
              </h2>
              <p className="section-note">
                Operating, analytical and
                <br />
                commercial perspectives meet
                <br />
                around the work.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </>
  )
}
