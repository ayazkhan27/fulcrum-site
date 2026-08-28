import type { Metadata } from "next"

import { Footer, Header } from "@/components/site/chrome"
import { Plate } from "@/components/site/plate"

export const metadata: Metadata = {
  title: "People | Fulcrum",
  description:
    "Fulcrum is a new firm built by people with long operating careers inside commercial aviation.",
}

const FIGURES = [
  { value: "30", unit: "yrs", label: "Inside a national flag carrier" },
  { value: "700", unit: "staff", label: "Largest team directly led" },
  { value: "5", unit: "divisions", label: "Run at General Manager level" },
  { value: "1989", unit: "", label: "Year the aviation career started" },
]

const CAREER = [
  {
    period: "2016 – 2019",
    role: "General Manager, Printing & Publications",
    detail:
      "Ran the carrier's in-house print operation and its 70 staff, setting policy and priorities across clerical, graphic, press and bindery functions.",
  },
  {
    period: "2014 – 2016",
    role: "General Manager, Biman Flight Catering Centre",
    detail:
      "Led 700 staff at the facility supplying in-flight meals to roughly 20 airlines operating through Dhaka. Annual profit doubled in each of two consecutive years, and a major kitchen renovation restored the centre's standing as a regional brand in its own right.",
  },
  {
    period: "2011 – 2016",
    role: "General Manager, Public Relations",
    detail:
      "The airline's spokesperson, reporting to the Chief Executive Officer. Directed a team of twenty across branding, events, advertising and publications on budgets of $1–3M, and built the event programme from the ground up, including new aircraft induction ceremonies and the launch of the frequent flyer programme.",
  },
  {
    period: "2010 – 2011",
    role: "Deputy General Manager, Motor Transport",
    detail:
      "A 300-strong division running a fleet of nearly 100 vehicles around the clock. Travelled to the Mitsubishi plant in Japan to negotiate a 31-microbus procurement, saving the airline roughly two crore taka.",
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
      "Communications and public information strategy for the carrier. Orchestrated the airline's first rebranding, run with Boeing's branding professionals over roughly two years and twenty people.",
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

const TEAM = [
  {
    name: "Muhammad Abdul Wadud",
    role: "Safety & Compliance",
    summary:
      "Thirty-six years inside airline safety and quality, including 24 years building and running Safety Management Systems and 15 running Quality Management Systems at Biman Bangladesh Airlines and US-Bangladesh Airlines. He led IOSA registration and renewal audits for over a decade, has run more than 80 internal and external safety and quality audits, and served three years as a safety inspector with Bangladesh's Civil Aviation Authority. At Fulcrum he leads the audit trail behind every screen: maintenance records, safety documentation and regulatory standing checked before an aircraft reaches a client's shortlist.",
  },
  {
    name: "Ayaz Khan",
    role: "Data & Scoring",
    summary:
      "A statistician completing a Master of Arts in Statistics at Columbia University, where he is a National Science Foundation Graduate Research Fellow. His work is building auditable, production-grade models: fraud detection systems, natural language pipelines over regulatory filings, and machine learning tools deployed against live enterprise data. At Fulcrum he applies that discipline to scoring, turning a tender's published formula into the arithmetic behind every recommendation, so a concession is priced rather than guessed at.",
  },
  {
    name: "Fatin Khan",
    role: "Operations",
    summary:
      "Ten years building and running operating businesses, most recently leading product and regulatory strategy for a cross-border real-estate platform, translating legal requirements into working roadmaps across jurisdictions. He has sourced and negotiated with more than a dozen vendors and built the operational infrastructure behind ventures he founded and scaled himself. At Fulcrum he runs the mechanics of a bid: compliance matrices, submission logistics, and the deadlines that decide whether a qualified offer is even read.",
  },
]

export default function PeoplePage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="eyebrow text-advisory-panel">People</p>
            <h1 className="mt-7 max-w-4xl font-display text-title font-extrabold text-ink">
              The firm is new. The people are not.
            </h1>
            <p className="mt-8 max-w-2xl text-lede text-ink/65">
              Fulcrum has no corporate track record and will not pretend
              otherwise. What it has is people who spent their careers inside
              the operating side of commercial aviation, and who know how these
              decisions actually get made.
            </p>
          </div>
        </section>

        <section aria-label="Experience at a glance" className="border-t border-rule">
          <div className="mx-auto max-w-5xl px-6">
            <dl className="grid grid-cols-2 border-t border-l border-rule sm:grid-cols-4">
              {FIGURES.map((f) => (
                <div key={f.label} className="border-r border-b border-rule px-5 py-7">
                  <dd className="font-display text-[2rem] font-extrabold tracking-tight text-ink tabular sm:text-[2.5rem]">
                    {f.value}
                    {f.unit ? (
                      <span className="ml-1 font-mono text-meta font-normal tracking-normal text-ink/65">
                        {f.unit}
                      </span>
                    ) : null}
                  </dd>
                  <dt className="mt-2 text-meta leading-snug text-ink/60">
                    {f.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ---------------- Profile ---------------- */}
        <section className="border-t border-rule py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:gap-16">
              <div>
                <h2 className="font-display text-title font-extrabold text-ink">
                  Khan Musharraf Hussein
                </h2>
                <p className="eyebrow mt-4 text-advisory-panel">Founding principal</p>
                <p className="mt-6 leading-relaxed text-ink/70">
                  Thirty years at Biman Bangladesh Airlines, from public
                  relations officer in 1989 to General Manager across five
                  divisions. He has been the airline&rsquo;s spokesperson,
                  run its flight catering subsidiary, headed its security
                  function, and negotiated its vehicle procurement in Japan.
                </p>
                <p className="mt-4 leading-relaxed text-ink/70">
                  MA in Mass Communication and Journalism, University of Dhaka.
                  Trained at George Washington University, the Royal Institute
                  of Public Administration in London, the Boeing Marketing
                  Academy, and IATA in Singapore.
                </p>
                <a
                  href="mailto:khanhussein@fulcrumtriad.com"
                  className="mt-6 inline-block cursor-pointer font-mono text-meta text-advisory-panel transition-opacity duration-200 hover:opacity-70"
                >
                  khanhussein@fulcrumtriad.com
                </a>
              </div>

              <ol className="border-t border-rule">
                {CAREER.map((job) => (
                  <li key={job.period} className="border-b border-rule py-6">
                    <p className="eyebrow text-ink/50">{job.period}</p>
                    <h3 className="mt-2 font-display text-[1.0625rem] font-bold tracking-tight text-ink">
                      {job.role}
                    </h3>
                    <p className="mt-2 max-w-prose leading-relaxed text-ink/60">
                      {job.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------------- Team ---------------- */}
        <section className="border-t border-rule py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="eyebrow text-ink/65">The team</p>
            <h2 className="mt-5 max-w-3xl font-display text-title font-extrabold text-ink">
              Three disciplines, one screen.
            </h2>
            <div className="mt-12 grid gap-x-12 gap-y-14 border-t border-rule pt-12 sm:grid-cols-3">
              {TEAM.map((p) => (
                <div key={p.name}>
                  <h3 className="font-display text-[1.0625rem] font-bold tracking-tight text-ink">
                    {p.name}
                  </h3>
                  <p className="eyebrow mt-2 text-advisory-panel">{p.role}</p>
                  <p className="mt-4 leading-relaxed text-ink/70">
                    {p.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Disclosure ---------------- */}
        <section className="border-t border-rule py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="eyebrow text-caution-panel">Disclosure</p>
            <h2 className="mt-5 max-w-3xl font-display text-title font-extrabold text-ink">
              Where we came from, and what we do about it.
            </h2>

            <div className="mt-10 record-panel">
              <div className="grid gap-x-12 gap-y-8 px-6 py-8 sm:px-8 lg:grid-cols-2">
                <div className="space-y-5 leading-relaxed text-panel-ink/80">
                  <p>
                    Our founding principal spent three decades at a
                    state-owned flag carrier and left it in 2019. We would
                    rather you read that here than find it later.
                  </p>
                  <p>
                    That history is why the compliance position on this site
                    exists in the detail it does. Someone who has watched a
                    national airline&rsquo;s procurement from the inside knows
                    exactly how an intermediary can be misused, and exactly
                    what it costs an institution when one is.
                  </p>
                </div>
                <ul className="space-y-4 border-t border-panel-ink/15 pt-6 lg:border-t-0 lg:border-l lg:border-panel-ink/15 lg:pt-0 lg:pl-12">
                  {[
                    "We act for aircraft owners and lessors. We do not act for airlines, and we do not accept a fee from both sides of a transaction.",
                    "Our principal takes no part in any mandate involving his former employer. That recusal is written into our engagement terms, not left to judgement.",
                    "Where a counterparty is state-owned, we use published tender channels only. No introductions, no informal approaches, at any stage.",
                    "Every mandate is documented before work begins, and our agency is disclosed to both sides.",
                  ].map((line) => (
                    <li
                      key={line}
                      className="leading-relaxed text-panel-ink/80"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-rule py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="eyebrow text-ink/65">Building the bench</p>
            <h2 className="mt-5 max-w-3xl font-display text-title font-extrabold text-ink">
              We are hiring the technical side.
            </h2>
            <p className="mt-8 max-w-prose leading-relaxed text-ink/70">
              Screening at gate 04 and gate 05 needs someone who reads
              borescope reports, life-limited part traces and shop visit
              records for a living. We are adding that capability rather than
              claiming it. If that is your background, we would like to hear
              from you.
            </p>
            <Plate
              src="/img/borescope-1200.webp"
              width={1200}
              height={686}
              sizes="(min-width: 1024px) 55vw, 100vw"
              alt="A gloved engineer guiding a video borescope probe into an inspection port on a jet engine."
              figure="Fig. 05"
              caption="This is the capability we are adding, not the one we are claiming."
              className="mt-12 max-w-2xl"
            />
            <a
              href="mailto:operations@fulcrumtriad.com"
              className="mt-8 inline-block cursor-pointer font-mono text-lede text-advisory-panel transition-opacity duration-200 hover:opacity-70"
            >
              operations@fulcrumtriad.com
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
