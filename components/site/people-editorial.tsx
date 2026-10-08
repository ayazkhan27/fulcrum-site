import { ArrowDown, ArrowUpRight, Plus } from "lucide-react"
import { Header } from "@/components/site/chrome"
import styles from "@/app/people/people-editorial.module.css"

type Person = {
  name: string
  role: string
  summary: string
  expertise: string
  bio: string
  experienceBio?: string
  educationAndTraining?: string
  email?: string
}

/** Standalone People page only. The approved homepage retains its own rendering. */
export function PeopleEditorial({ people }: { people: readonly Person[] }) {
  return (
    <>
      <Header />
      <main id="main" className={styles.page}>
        <section className={styles.hero} aria-labelledby="people-title">
          <div className={styles.shell}>
            <p className={styles.eyebrow}>Fulcrum / Our People</p>
            <div className={styles.introduction}>
              <div className={styles.headingBlock}>
                <h1 id="people-title">The People<br />Behind the Motion</h1>
                <p className={styles.heroNote}>One team. Complementary perspectives.</p>
                <a className={styles.meetLink} href="#our-team">
                  Meet the team <ArrowDown size={16} aria-hidden="true" />
                </a>
              </div>
              <p className={styles.introCopy}>
                Fulcrum brings together experience in aviation, maritime operations,
                safety and compliance, commercial coordination and data analysis.
                Our team combines practical industry knowledge with technical and
                analytical expertise to help clients assess opportunities, clarify
                requirements and coordinate work across borders.
              </p>
            </div>
          </div>
        </section>

        <section id="our-team" className={styles.directory} aria-labelledby="team-title">
          <div className={styles.shell}>
            <div className={styles.directoryHeading}>
              <h2 id="team-title">Our team</h2>
              <p>Experience. Perspective. People.</p>
            </div>
            <div className={styles.profiles}>
              {people.map((person, index) => (
                <article className={styles.profile} key={person.name} aria-labelledby={`team-person-${index}`}>
                  <header className={styles.identity}>
                    <p className={styles.role}>{person.role.replace(/\s*–\s*/g, " – ")}</p>
                    <h3 id={`team-person-${index}`}>{person.name}</h3>
                    <ul className={styles.expertise} aria-label={`Areas of focus for ${person.name}`}>
                      {person.expertise.split(" · ").map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </header>
                  <div className={styles.profileContent}>
                    <p className={styles.summary}>{person.summary}</p>
                    <details className={styles.biography}>
                      <summary aria-label={`Read biography of ${person.name}`}>
                        <span>Read biography</span>
                        <Plus size={18} strokeWidth={1.5} aria-hidden="true" />
                      </summary>
                      <div className={styles.bioContent}>
                        <p>{person.experienceBio ?? person.bio}</p>
                        {/* Education is retained in the profile data but hidden for now. */}
                        {person.email && (
                          <a href={`mailto:${person.email}`}>
                            {person.email} <ArrowUpRight size={15} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </details>
                  </div>
                </article>
              ))}
            </div>
            <aside className={styles.closing} aria-label="Our shared perspective">
              <span className={styles.closingMark} aria-hidden="true" />
              <p>Operating, analytical and commercial perspectives<br className={styles.desktopBreak} /> meet around the work.</p>
            </aside>
          </div>
        </section>
      </main>
    </>
  )
}
