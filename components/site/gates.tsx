/* Illustrative screening areas. Order and eligibility depend on the mandate. */
export const GATES = [
  {
    n: "01",
    name: "Engine",
    rule: "Confirm engine model, configuration and thrust requirements.",
    detail:
      "Compare the installed configuration and supporting records with the specific tender or operating requirement.",
    source: "Specifications and owner records",
  },
  {
    n: "02",
    name: "Airframe",
    rule: "Check weight limits, cabin layout, seat count and age criteria.",
    detail:
      "Treat mandatory tender limits as eligibility conditions. Assess any permitted reconfiguration for cost, timing and technical feasibility.",
    source: "Tender, configuration and owner records",
  },
  {
    n: "03",
    name: "Maintenance status",
    rule: "Review scheduled work against delivery and operating requirements.",
    detail:
      "Assess the applicable maintenance programme and upcoming tasks. The significance of any check or overhaul depends on the mandate and agreed delivery conditions.",
    source: "Maintenance programme and operator records",
  },
  {
    n: "04",
    name: "Engine condition",
    rule: "Review hours, cycles, life-limited parts and maintenance history.",
    detail:
      "Coordinate specialist review of the documented condition and remaining life. Apply scoring weights only where the tender specifies them.",
    source: "Engine and component records",
  },
  {
    n: "05",
    name: "Records",
    rule: "Review traceability, repairs and relevant compliance documentation.",
    detail:
      "Identify gaps and coordinate technical review. Required records vary by component, jurisdiction and transaction; a commercial screen is not an airworthiness approval.",
    source: "Owner and operator technical records",
  },
  {
    n: "06",
    name: "Availability",
    rule: "Confirm release, delivery and contractual timing.",
    detail:
      "Check timing early and revisit it as the candidate is evaluated. Availability alone does not establish technical or commercial suitability.",
    source: "Owner confirmation and contractual documents",
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
          <span className="pt-1 eyebrow text-advisory">{gate.n}</span>
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
                <p className="mt-4 eyebrow text-ink/65">
                  Source · {gate.source}
                </p>
              </>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  )
}
