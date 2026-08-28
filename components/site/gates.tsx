/**
 * The screening cascade. Ordered, and the order matters: each gate eliminates,
 * cheapest first. The numbering is not decoration. Screening genuinely is a
 * sequence, so the coordinate carries information the reader needs.
 */
export const GATES = [
  {
    n: "01",
    name: "Engine",
    rule: "Type and thrust rating, from the dataplate.",
    detail:
      "The cheapest gate and usually the most brutal. A single line in a specification can remove a third of the world fleet before anything else is considered, including every aircraft an owner assumed was a candidate.",
    source: "Public",
  },
  {
    n: "02",
    name: "Airframe",
    rule: "Gross weight, cabin configuration, seat count.",
    detail:
      "Rarely a hard filter on its own. More often a cost: a reconfiguration priced into the offer rather than a reason to walk away.",
    source: "Public",
  },
  {
    n: "03",
    name: "Maintenance status",
    rule: "Nothing heavy falling due inside the protected window.",
    detail:
      "The gate that actually decides. Heavy checks, landing gear overhauls and calendar-driven tasks are what make a young aircraft ineligible and an older one perfectly placeable. This data is not public, which is why screening on age instead of status produces the wrong shortlist.",
    source: "Subscription + owner disclosure",
  },
  {
    n: "04",
    name: "Engine condition",
    rule: "Cycles since new, life-limited parts, on-wing margin.",
    detail:
      "Engines carry the most scoring weight in most structured tenders, and none of it is negotiable, because it is a fact about the asset. This is where a bid is won before anyone opens the commercial terms.",
    source: "Owner disclosure",
  },
  {
    n: "05",
    name: "Records",
    rule: "Repairs, back-to-birth traceability, damage history.",
    detail:
      "An aircraft's value is its paperwork. A permanent-repair requirement or a gap in back-to-birth history can end an otherwise perfect candidate late, after real money has been spent.",
    source: "Owner disclosure",
  },
  {
    n: "06",
    name: "Availability",
    rule: "Lease expiry against the delivery window.",
    detail:
      "Last, deliberately. Availability is the first question everyone asks and the least useful one to start with. An available aircraft that fails gate 03 was never a candidate.",
    source: "Subscription",
  },
] as const

export function GateList({ detailed = false }: { detailed?: boolean }) {
  return (
    <ol className="mt-10 border-t border-rule">
      {GATES.map((gate) => (
        <li
          key={gate.n}
          className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-b border-rule py-6 sm:grid-cols-[3.5rem_11rem_1fr] sm:gap-x-8"
        >
          <span className="eyebrow pt-1 text-advisory">{gate.n}</span>
          <h3 className="font-display text-base font-bold tracking-tight text-ink sm:text-[1.0625rem]">
            {gate.name}
          </h3>
          <div className="col-span-2 sm:col-span-1">
            <p className="text-ink/70">{gate.rule}</p>
            {detailed ? (
              <>
                <p className="mt-3 max-w-prose leading-relaxed text-ink/60">
                  {gate.detail}
                </p>
                <p className="eyebrow mt-4 text-ink/65">Source · {gate.source}</p>
              </>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
