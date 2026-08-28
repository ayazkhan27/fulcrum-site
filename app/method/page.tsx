import type { Metadata } from "next"
import Link from "next/link"

import { Footer, Header } from "@/components/site/chrome"
import { GateList } from "@/components/site/gates"
import { Plate } from "@/components/site/plate"

export const metadata: Metadata = {
  title: "Method | Fulcrum",
  description:
    "How Fulcrum screens widebody fleets: an ordered cascade of six gates, each one eliminating, cheapest first.",
}

export default function MethodPage() {
  return (
    <>
      <Header />
      <main>
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6">
            <p className="eyebrow text-advisory">Method</p>
            <h1 className="mt-7 max-w-4xl font-display text-title font-extrabold text-ink">
              Six gates, in order. Each one eliminates.
            </h1>
            <div className="mt-8 max-w-prose space-y-5 leading-relaxed text-ink/70">
              <p>
                A structured aircraft tender looks like a commercial negotiation
                and behaves like a technical one. Most of the outcome is fixed
                before anyone discusses rent: by the engine bolted to the wing,
                by what falls due in the first two years of the term, by how many
                cycles the propulsor has run.
              </p>
              <p>
                So we screen before we sell. The order below is not
                presentational. It runs cheapest-first, because the gates that
                cost nothing to check are also the ones that remove the most
                candidates. There is no sense paying for maintenance
                records on an aircraft that was disqualified by its dataplate.
              </p>
            </div>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:gap-12">
              <Plate
                src="/img/engine-1200.webp"
                width={1200}
                height={1200}
                priority
                sizes="(min-width: 640px) 45vw, 100vw"
                alt="Head-on view of a high-bypass turbofan intake, fan blades and nacelle chevrons visible."
                figure="Fig. 02"
                caption="Gate 01 is decided here, on the dataplate, before anything else is considered."
              />
              <Plate
                src="/img/gear-1200.webp"
                width={1200}
                height={1200}
                sizes="(min-width: 640px) 45vw, 100vw"
                alt="A wide-body main landing gear bogie seen from below, brake stacks and torque links visible."
                figure="Fig. 03"
                caption="Gate 03: an overhaul falling inside the protected window ends a candidacy quietly."
              />
            </div>
          </div>
        </section>

        <section className="border-t border-rule py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="font-display text-title font-extrabold text-ink">
              The gates
            </h2>
            <GateList detailed />
          </div>
        </section>

        <section className="border-t border-rule py-20 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="eyebrow text-ink/65">What the screen is not</p>
            <h2 className="mt-5 max-w-3xl font-display text-title font-extrabold text-ink">
              Age is almost never the constraint.
            </h2>
            <div className="mt-8 max-w-prose space-y-5 leading-relaxed text-ink/70">
              <p>
                Tenders routinely cap aircraft age, and the cap is routinely
                irrelevant: on a young type, every aircraft in existence
                passes it. Screening on age produces a shortlist that looks
                rigorous and contains the wrong aircraft.
              </p>
              <p>
                Maintenance status is what binds. A nine-year-old airframe with
                nothing heavy due for three years is placeable. A four-year-old
                one facing a landing gear overhaul inside the protected window is
                not. Gate 03 is where candidates are really lost, and it is the
                gate that cannot be run from public sources.
              </p>
            </div>
            <Plate
              src="/img/airfoil-1600.webp"
              width={1600}
              height={1156}
              sizes="(min-width: 1024px) 60vw, 100vw"
              alt="A drafting plate showing an airfoil cross-section with station markings and dimensions."
              figure="Fig. 04"
              caption="Screening is drafting work. The answer is in the numbers or it is not an answer."
              className="mt-12 max-w-3xl"
            />
            <Link
              href="/#contact"
              className="mt-10 inline-block border-b border-advisory pb-0.5 text-meta text-advisory transition-opacity hover:opacity-70"
            >
              Ask us to run it against your fleet
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
