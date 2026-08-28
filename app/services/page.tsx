import type { Metadata } from "next"
import Link from "next/link"

import { Footer, Header } from "@/components/site/chrome"
import { Plate } from "@/components/site/plate"

export const metadata: Metadata = {
  title: "Services | Fulcrum",
  description:
    "Fleet screening, scoring analysis, technical bid assembly and submission management for aircraft owners and lessors bidding into structured tenders.",
}

type Service = {
  n: string
  name: string
  line: string
  body: string[]
  you: string[]
  us: string[]
}

const SERVICES: Service[] = [
  {
    n: "01",
    name: "Screening",
    line: "Which of your aircraft can clear the requirement, by serial number.",
    body: [
      "A requirement is a list of constraints, and most of them are not the ones people assume. Age caps are usually decorative. Engine type, maintenance status and the protected window at the front of the lease are what actually eliminate.",
      "We run your fleet through the gates in cost order, cheapest first, and come back with a shortlist by MSN rather than by type. Where an aircraft fails, you get the reason and the date it stops failing, because an aircraft that clears in eight months is a candidate for the next round.",
    ],
    you: [
      "Fleet list with serial numbers",
      "Lease expiry dates",
      "Maintenance status: next heavy check, landing gear, engine and APU cycles",
    ],
    us: [
      "A pass/fail shortlist by MSN, with the binding constraint named per aircraft",
      "The date any near-miss becomes eligible",
      "An honest count of how thin the field is likely to be",
    ],
  },
  {
    n: "02",
    name: "Scoring",
    line: "Where the points actually sit, and what you can safely concede.",
    body: [
      "Structured tenders publish how they will score you, usually in an annex nobody reads to the end. Those formulae decide which concessions are expensive and which only look expensive.",
      "We convert the published scoring into final award points, so a decision to refuse a term is priced rather than guessed at. Often a block that reads as fatal is worth a few points of a hundred, and can be bought back on rent.",
    ],
    you: ["The tender document, in full, including every annex"],
    us: [
      "The scoring converted into final points, block by block",
      "What is fixed by the asset and cannot be negotiated at all",
      "A recommended position on each concession, with the arithmetic shown",
    ],
  },
  {
    n: "03",
    name: "Bid assembly",
    line: "The technical package, to the standard the document actually demands.",
    body: [
      "Technical annexes routinely ask for avionics tables by ATA chapter, life-limited part traces back to birth, borescope video, dent and buckle charts, and engine health data recorded inside a fixed window before submission. Where a tender uses the word must, a single missing item makes the whole offer non-responsive.",
      "We build the compliance matrix from the document, chase the evidence, and quality-control the package before it goes anywhere. The dated items are the ones that sink bids, because they cannot be produced retrospectively.",
    ],
    you: [
      "Access to your records and technical team",
      "Authority to request data from the MRO where needed",
    ],
    us: [
      "A line-by-line compliance matrix against every requirement",
      "Early warning on the dated items, before the window closes",
      "The assembled technical envelope, checked twice",
    ],
  },
  {
    n: "04",
    name: "Submission",
    line: "Deadlines, formats, and the clocks that void an offer.",
    body: [
      "Tenders are lost on process more often than on price. Separated technical and financial envelopes, pricing that leaks into the wrong one, a courier that misses a stated hour in a stated timezone.",
      "We manage the mechanics, draft clarification questions for you to file through the published channel, and keep the timetable. You bid in your own name and hold the relationship throughout.",
    ],
    you: ["A decision, and a signature"],
    us: [
      "Submission logistics and deadline management",
      "Clarification questions drafted for you to file",
      "Support through evaluation and negotiation",
    ],
  },
]

const BOUNDARIES = [
  "We do not own aircraft and take no positions. There is no inventory we are quietly trying to place.",
  "We act for owners and lessors. We do not act for airlines, and never for both sides of one transaction.",
  "We are not lawyers, tax advisers or appraisers, and we do not issue airworthiness opinions. We work alongside the people who do.",
  "We do not approach counterparties outside published tender channels. Where a counterparty is state-owned, that rule is absolute.",
]

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="eyebrow text-advisory">Services</p>
            <h1 className="mt-7 max-w-4xl font-display text-title font-extrabold text-ink">
              Four things, done properly.
            </h1>
            <p className="mt-8 max-w-2xl text-lede text-ink/65">
              We are appointed by an aircraft owner or lessor to get one
              transaction across the line. That work divides cleanly into four
              parts, and we will tell you before we start which of them you
              actually need.
            </p>
          </div>
        </section>

        {SERVICES.map((s) => (
          <section key={s.n} className="border-t border-rule py-16 sm:py-20">
            <div className="mx-auto max-w-5xl px-6">
              <div className="flex items-baseline gap-4">
                <span className="eyebrow text-advisory">{s.n}</span>
                <h2 className="font-display text-title font-extrabold text-ink">
                  {s.name}
                </h2>
              </div>
              <p className="mt-4 max-w-2xl text-lede text-ink/65">{s.line}</p>

              <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
                {/* The figure lives inside the prose column rather than below
                    the grid. Sat outside it, it left the requirements panel
                    hanging over an empty half-row. */}
                <div>
                  <div className="space-y-5">
                    {s.body.map((p) => (
                      <p
                        key={p}
                        className="max-w-prose leading-relaxed text-ink/70"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                  {s.n === "01" ? (
                    <Plate
                      src="/img/hangar-1600.webp"
                      width={1600}
                      height={1600}
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      alt="A wide-body airliner in bare primer on maintenance stands inside a hangar at night."
                      figure="Fig. 04"
                      caption="Screening starts with the asset, not the commercial terms."
                      className="mt-10"
                    />
                  ) : null}
                </div>

                <div className="record-panel self-start">
                  <div className="border-b border-panel-ink/15 px-6 py-4">
                    <p className="eyebrow text-panel-ink/70">What you provide</p>
                  </div>
                  <ul className="space-y-3 px-6 py-5">
                    {s.you.map((y) => (
                      <li
                        key={y}
                        className="text-meta leading-relaxed text-panel-ink/80"
                      >
                        {y}
                      </li>
                    ))}
                  </ul>
                  <div className="border-t border-panel-ink/15 px-6 py-4">
                    <p className="eyebrow text-panel-ink/70">What comes back</p>
                  </div>
                  <ul className="space-y-3 px-6 py-5">
                    {s.us.map((u) => (
                      <li
                        key={u}
                        className="text-meta leading-relaxed text-panel-ink/80"
                      >
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </section>
        ))}

        {/* ---------------- Boundaries ---------------- */}
        <section className="border-t border-rule py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="eyebrow text-caution">Boundaries</p>
            <h2 className="mt-5 max-w-3xl font-display text-title font-extrabold text-ink">
              What we do not do.
            </h2>
            <p className="mt-8 max-w-prose leading-relaxed text-ink/70">
              A firm that claims everything is useful for nothing. These are the
              limits, and they are in our engagement terms rather than left to
              be discovered later.
            </p>
            <ul className="mt-10 grid gap-x-16 border-t border-rule sm:grid-cols-2">
              {BOUNDARIES.map((b) => (
                <li
                  key={b}
                  className="border-b border-rule py-5 leading-relaxed text-ink/70"
                >
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------------- Fee ---------------- */}
        <section className="border-t border-rule py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="eyebrow text-ink/65">Fee</p>
            <h2 className="mt-5 max-w-3xl font-display text-title font-extrabold text-ink">
              Paid by you, on success, and only then.
            </h2>
            <div className="mt-8 grid gap-10 md:grid-cols-2 md:gap-16">
              <p className="max-w-prose leading-relaxed text-ink/70">
                Our fee comes from the owner or lessor who appoints us, on
                execution of a lease, per aircraft delivered. Screening work
                carries no charge if nothing is placed. We take nothing from the
                other side of the transaction, in any form, at any point.
              </p>
              <p className="max-w-prose leading-relaxed text-ink/70">
                The mandate is written before work starts and states the fee, the
                aircraft it applies to, and the term. If a tender awards fewer
                aircraft than it offered, the fee follows what was actually
                delivered.
              </p>
            </div>
            <Link
              href="/#contact"
              className="mt-10 inline-block cursor-pointer border-b border-advisory pb-0.5 text-meta text-advisory transition-opacity duration-200 hover:opacity-70"
            >
              Ask us to screen your fleet
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
