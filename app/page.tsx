import Link from "next/link"

import { Footer, Header } from "@/components/site/chrome"
import { GateList } from "@/components/site/gates"
import { Plate } from "@/components/site/plate"
import { RecordsTable } from "@/components/site/records-table"
import { ScoringBand, ScoringWorksheet } from "@/components/site/scoring"

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id?: string
  eyebrow: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="border-t border-rule py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="eyebrow text-ink/65">{eyebrow}</p>
        <h2 className="mt-5 max-w-3xl font-display text-title font-extrabold text-ink">
          {title}
        </h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  )
}

export default function Page() {
  return (
    <>
      <Header />
      <main>
        {/* ---------------- 1 · Hero ---------------- */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="eyebrow text-advisory">
              New York · Widebody aircraft placement
            </p>
            <h1 className="mt-7 max-w-4xl font-display text-display font-extrabold text-ink">
              Most of the fleet is already ineligible.
            </h1>
            <p className="mt-8 max-w-2xl text-lede text-ink/65">
              Fulcrum is a placement intermediary for widebody aircraft. We act
              for owners and lessors, screening fleets against a
              requirement&rsquo;s binding constraints, then assembling the
              technical offer that survives them.
            </p>
            <Plate
              src="/img/approach-1600.webp"
              width={1600}
              height={1176}
              priority
              sizes="(min-width: 1024px) 64rem, 100vw"
              alt="A narrowbody airliner photographed head-on at dusk, wings and nose gear square to the camera."
              figure="Fig. 01"
              caption="An aircraft is an asset under inspection long before it is a route."
              className="mt-14"
            />
            <div className="mt-16">
              <RecordsTable />
            </div>
          </div>
        </section>

        {/* --------- Indicator band: dense, no padding, real figures --------- */}
        <section aria-label="Scoring at a glance" className="border-t border-rule">
          <div className="mx-auto max-w-5xl px-6">
            <ScoringBand />
          </div>
        </section>

        {/* ---------------- 2 · What we do ---------------- */}
        <Section eyebrow="What we do" title="We work one side of the table.">
          <p className="max-w-2xl leading-relaxed text-ink/70">
            An owner or lessor appoints us under written mandate. We screen the
            fleet against a specific requirement, say which aircraft can
            actually clear it, and build the technical submission. They bid in
            their own name and keep the relationship. We never sit on both sides
            of the same transaction.
          </p>
          {/* Four equal parts of one engagement, so they read as a set rather
              than a ranked list running down one side of the page. */}
          <ul className="mt-12 grid gap-x-12 border-t border-rule sm:grid-cols-2">
            {[
              [
                "Screening",
                "Which aircraft can clear the requirement, by serial number.",
              ],
              [
                "Scoring",
                "Where the points actually sit, and what can safely be conceded.",
              ],
              [
                "Bid assembly",
                "The technical package, to the standard the tender demands.",
              ],
              [
                "Submission",
                "Deadlines, formats, and the clocks that void an offer.",
              ],
            ].map(([name, note]) => (
              <li key={name} className="border-b border-rule py-5">
                <p className="font-display text-[0.9375rem] font-bold text-ink">
                  {name}
                </p>
                <p className="mt-1 text-meta leading-relaxed text-ink/60">
                  {note}
                </p>
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------------- 3 · The screen ---------------- */}
        <Section eyebrow="Method" title="The screen comes first.">
          <p className="max-w-prose leading-relaxed text-ink/70">
            Most placement work starts with commercial terms. We start with the
            asset, because in a structured tender the asset decides more of the
            outcome than the negotiation does. Screening runs as an ordered
            cascade. Each gate eliminates, cheapest first.
          </p>
          <GateList />
          <Link
            href="/method"
            className="mt-10 inline-block cursor-pointer border-b border-advisory pb-0.5 text-meta text-advisory transition-opacity duration-200 hover:opacity-70"
          >
            How each gate works
          </Link>
        </Section>

        {/* ---- Proof of work. Full width, stacked: the plate and the panel
             have different internal structures, so side-by-side never aligned.
             The section now reads top to bottom as an argument. ---- */}
        <section className="border-t border-rule py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="eyebrow text-ink/65">Proof of work</p>
            <h2 className="mt-5 max-w-3xl font-display text-title font-extrabold text-ink">
              What four lines of arithmetic are worth.
            </h2>
            <p className="mt-8 max-w-prose text-lede text-ink/65">
              Structured tenders publish how they will score you. Almost nobody
              does the division. Here is a real example, worked from the
              document, and what reading it carefully was worth to an owner.
            </p>

            <div className="mt-12">
              <ScoringWorksheet />
            </div>
          </div>
        </section>

        {/* ---------------- 4 · Independence ---------------- */}
        <Section eyebrow="Independence" title="One side, and how we are paid.">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16">
            <p className="max-w-prose leading-relaxed text-ink/70">
              Our fee is paid by the owner or lessor who appoints us, on success,
              and is disclosed to both sides. We hold no aircraft and take no
              positions. We have no joint ventures, no affiliations, and no
              interests that could put us on the other side of a client&rsquo;s
              trade.
            </p>
            <p className="max-w-prose leading-relaxed text-ink/70">
              We are not a lessor and do not present ourselves as one. Our
              principals spent their careers on the airline side of this
              business, which is disclosed openly on our people page along with
              the recusals that follow from it.
            </p>
          </div>
        </Section>

        {/* ---------------- 5 · Compliance ---------------- */}
        <Section
          eyebrow="Compliance"
          title="Written down, before any work starts."
        >
          <p className="max-w-prose leading-relaxed text-ink/70">
            Many airlines in this market are state-owned, which makes their staff
            foreign officials under the US Foreign Corrupt Practices Act. For a
            counterparty assessing risk, how an intermediary behaves is not fine
            print. These are the rules we work under.
          </p>
          <ul className="mt-10 grid gap-x-16 border-t border-rule sm:grid-cols-2">
            {[
              "A written mandate before any work begins.",
              "Agency disclosed to both sides.",
              "Fee paid by the appointing party, and only by them.",
              "No payment of any kind to anyone connected with a government counterparty.",
              "Sanctions and OFAC screening on every counterparty.",
              "Tender channels used exactly as published, never an unsolicited approach.",
            ].map((rule) => (
              <li
                key={rule}
                className="border-b border-rule py-4 leading-relaxed text-ink/70"
              >
                {rule}
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------------- 6 · People ---------------- */}
        <Section eyebrow="People" title="The firm is new. The people are not.">
          <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
            <p className="max-w-prose leading-relaxed text-ink/70">
              Fulcrum has no corporate track record and will not manufacture
              one. What it has is thirty years spent inside a national flag
              carrier, at General Manager level across five divisions, and a
              method you can inspect on this site and judge for yourself.
            </p>
            <p className="max-w-prose leading-relaxed text-ink/70">
              That history sits on the airline side of the table rather than
              ours, so we publish it in full, together with the recusals that
              follow from it.
            </p>
          </div>
          <Link
            href="/people"
            className="mt-10 inline-block cursor-pointer border-b border-advisory pb-0.5 text-meta text-advisory transition-opacity duration-200 hover:opacity-70"
          >
            Who we are, and what we disclose
          </Link>
        </Section>

        {/* ---------------- 7 · Contact ---------------- */}
        <Section id="contact" eyebrow="Contact" title="Talk to us directly.">
          <p className="max-w-prose leading-relaxed text-ink/70">
            If you own or manage widebody aircraft and want to know which of them
            can clear a specific requirement, that is the conversation to start
            with. No fee unless an aircraft is placed.
          </p>
          <a
            href="mailto:infobd@fulcrumtriad.com"
            className="mt-8 inline-block font-mono text-lede text-advisory transition-opacity hover:opacity-70"
          >
            infobd@fulcrumtriad.com
          </a>
        </Section>
      </main>
      <Footer />
    </>
  )
}
