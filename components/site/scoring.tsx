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

const STEPS = [
  { op: "", term: "Points attached to redelivery", value: "150", unit: "pts" },
  { op: "÷", term: "Maximum technical score", value: "518", unit: "pts" },
  { op: "=", term: "Share of the technical score", value: "28.96", unit: "%" },
  { op: "×", term: "Weight technical carries in the award", value: "25", unit: "%" },
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

function Stage({
  n,
  title,
  children,
}: {
  n: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border-t border-panel-ink/15 px-6 py-7 sm:px-8">
      <div className="flex items-baseline gap-3">
        <span className="eyebrow text-advisory-panel">{n}</span>
        <h3 className="font-display text-[1.0625rem] font-bold tracking-tight text-panel-ink">
          {title}
        </h3>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}

export function ScoringWorksheet() {
  return (
    <div className="record-panel tabular">
      <div className="px-6 py-5 sm:px-8">
        <p className="eyebrow text-panel-ink/70">
          Worked example · published tender, 2026
        </p>
      </div>

      <Stage n="01" title="What the tender published">
        <p className="max-w-prose leading-relaxed text-panel-ink/80">
          A national carrier put three wide-body aircraft out to a six-year
          lease. Like most structured tenders it scored bidders on two separate
          axes, the aircraft and the money, then weighted them. Both formulae
          were printed in the document.
        </p>
        <dl className="mt-6 grid gap-5 font-mono text-meta sm:grid-cols-2">
          <div>
            <dt className="eyebrow text-panel-ink/65">Technical score</dt>
            <dd className="mt-2 text-panel-ink">T = points ÷ 518 × 100</dd>
          </div>
          <div>
            <dt className="eyebrow text-panel-ink/65">Award formula</dt>
            <dd className="mt-2 text-panel-ink">
              Final = (T × 25%) + (F × 75%)
            </dd>
          </div>
        </dl>
        <p className="mt-5 max-w-prose leading-relaxed text-panel-ink/80">
          Read together: everything about the aircraft is capped at a quarter of
          the result. Three quarters is money.
        </p>
      </Stage>

      <Stage n="02" title="Where bidders stop reading">
        <p className="max-w-prose leading-relaxed text-panel-ink/80">
          <strong className="font-semibold text-panel-ink">
            150 of those 518 points
          </strong>{" "}
          are awarded for taking the aircraft back at the end of the lease
          &ldquo;as is, where is&rdquo;. In plain terms, the owner absorbs the
          engine and airframe condition that six years of flying consumed,
          without compensation. At the utilisation the tender itself assumes,
          that is roughly 24,000 hours and 5,300 cycles of wear.
        </p>
        <p className="mt-4 max-w-prose leading-relaxed text-panel-ink/80">
          It is an eight-figure exposure per aircraft. Most owners read 150,
          price it, and decline to bid at all. That carrier has now failed to
          attract a bid five rounds running.
        </p>
      </Stage>

      <Stage n="03" title="What the 150 points are actually worth">
        <table className="w-full max-w-lg border-collapse text-left font-mono text-meta">
          <caption className="sr-only">
            Converting the redelivery block into final award points
          </caption>
          <tbody>
            {STEPS.map((s) => (
              <tr key={s.term}>
                <td className="w-6 py-2.5 align-baseline text-panel-ink/60">
                  {s.op}
                </td>
                <td className="py-2.5 pr-4 align-baseline font-sans text-panel-ink/80">
                  {s.term}
                </td>
                <td className="py-2.5 text-right align-baseline whitespace-nowrap text-panel-ink">
                  {s.value}
                  <span className="ml-1 text-panel-ink/60">{s.unit}</span>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3} className="pt-2">
                <div className="border-t border-panel-ink/40" />
              </td>
            </tr>
            <tr>
              <td className="py-3 align-baseline text-panel-ink/60">=</td>
              <td className="py-3 pr-4 align-baseline font-sans font-semibold text-panel-ink">
                Cost of refusing all of it
              </td>
              <td className="py-3 text-right align-baseline whitespace-nowrap">
                <span className="font-display text-[1.5rem] font-extrabold tracking-tight text-advisory-panel">
                  7.24
                </span>
                <span className="ml-1 text-panel-ink/60">pts</span>
              </td>
            </tr>
          </tbody>
        </table>
      </Stage>

      <Stage n="04" title="What that means for an owner">
        <p className="max-w-prose leading-relaxed text-panel-ink/80">
          Seven points of a hundred. An owner can decline every redelivery
          concession, keep the maintenance value it was being asked to give
          away, and lose about seven points, on an award where three quarters of
          the score is price. Keener rent buys those points back.
        </p>
        <p className="mt-4 max-w-prose leading-relaxed text-panel-ink/80">
          The difference between a requirement that looks unbiddable and one
          that is merely aggressive is four lines of arithmetic on a document
          anyone could download. This is the work.
        </p>
      </Stage>
    </div>
  )
}
