/**
 * The worked scoring example.
 *
 * Earlier this section showed the arithmetic with no setup, which assumed the
 * reader already knew what 518 was, what "redelivery" costs, and why any of it
 * mattered. Nobody arriving at the site knows that. It is now staged: where the
 * numbers come from, what the trap is, the calculation, and what it means.
 *
 * Every figure is real. The formulae are quoted from a published 2026 widebody
 * dry-lease tender; the arithmetic is ours. The tender is not named, because
 * naming a live requirement would put a client's position on a public website.
 */

const FIGURES = [
  { value: "518", unit: "pts", label: "Maximum technical score" },
  { value: "150", unit: "pts", label: "Attached to redelivery terms" },
  { value: "25", unit: "%", label: "Weight the technical score carries" },
  { value: "7.2", unit: "pts", label: "Cost of refusing all of it", key: true },
]


export function ScoringBand() {
  return (
    <dl className="grid grid-cols-2 border-t border-l border-rule sm:grid-cols-4">
      {FIGURES.map((f) => (
        <div key={f.label} className="border-r border-b border-rule px-5 py-7">
          <dd
            className={`font-display text-[2rem] font-extrabold tracking-tight tabular sm:text-[2.5rem] ${
              f.key ? "text-advisory" : "text-ink"
            }`}
          >
            {f.value}
            <span className="ml-1 font-mono text-meta font-normal tracking-normal text-ink/65">
              {f.unit}
            </span>
          </dd>
          <dt className="mt-2 text-meta leading-snug text-ink/65">{f.label}</dt>
        </div>
      ))}
    </dl>
  )
}


