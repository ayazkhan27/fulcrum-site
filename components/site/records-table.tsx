"use client"

import { useEffect, useState } from "react"

import { Magnify } from "@/components/canvasui/Magnify"

/**
 * Gate 01 rendered as an instrument rather than a spreadsheet.
 *
 * A flat grid of rows shows data. This shows *elimination*: failing rows carry
 * a status stripe, a struck rule through the operator, and a drop in contrast,
 * so the screen is visibly doing something rather than listing something. That
 * distinction is the whole product.
 *
 * Every row is public record. Engine type per operator is published by the
 * manufacturers and the trade press. Nothing is invented, and nothing is
 * presented as live fleet data. Maintenance status, the constraint that
 * actually binds, is deliberately absent because it is not public.
 */
type Row = {
  operator: string
  fleet: string
  engine: string
  clears: boolean
}

const ROWS: Row[] = [
  { operator: "Norse Atlantic", fleet: "12", engine: "Trent 1000 TEN", clears: false },
  { operator: "British Airways", fleet: "n/a", engine: "Trent 1000", clears: false },
  { operator: "ANA", fleet: "n/a", engine: "Trent 1000", clears: false },
  { operator: "Virgin Atlantic", fleet: "n/a", engine: "Trent 1000", clears: false },
  { operator: "Etihad Airways", fleet: "37", engine: "GEnx-1B", clears: true },
  { operator: "Oman Air", fleet: "10", engine: "GEnx-1B", clears: true },
  { operator: "United Airlines", fleet: "n/a", engine: "GEnx-1B", clears: true },
]

const CLEARED = ROWS.filter((r) => r.clears).length

/** Advisory cyan as 0–1 RGB, for the lens reticle and readout. */
const RETICLE: [number, number, number] = [0.498, 0.698, 0.769]

function useLensEnabled() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const coarse = window.matchMedia("(pointer: coarse)")
    const update = () => setEnabled(!motion.matches && !coarse.matches)

    update()
    motion.addEventListener("change", update)
    coarse.addEventListener("change", update)
    return () => {
      motion.removeEventListener("change", update)
      coarse.removeEventListener("change", update)
    }
  }, [])

  return enabled
}

function Screen() {
  return (
    <div className="record-panel tabular">
      {/* Instrument header: what the screen is, and what it did. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-panel-ink/20 px-4 py-4 sm:px-6">
        <p className="eyebrow text-panel-ink/70">Gate 01 · engine type</p>
        <p className="font-mono text-meta text-panel-ink/60">
          {ROWS.length} screened
          <span className="mx-2 text-panel-ink/30">/</span>
          <span className="text-advisory-panel">{CLEARED} clear</span>
          <span className="mx-2 text-panel-ink/30">/</span>
          <span className="text-caution-panel">{ROWS.length - CLEARED} eliminated</span>
        </p>
      </div>

      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Illustrative engine-type screen for the Boeing 787-9
        </caption>
        <thead>
          <tr className="border-b border-panel-ink/15">
            <th scope="col" className="w-1 p-0">
              <span className="sr-only">Result</span>
            </th>
            <th
              scope="col"
              className="eyebrow py-2.5 pr-4 pl-4 font-medium text-panel-ink/65 sm:pl-6"
            >
              Operator
            </th>
            <th
              scope="col"
              className="eyebrow hidden py-2.5 pr-4 font-medium text-panel-ink/65 sm:table-cell"
            >
              787-9
            </th>
            <th
              scope="col"
              className="eyebrow py-2.5 pr-4 font-medium text-panel-ink/65"
            >
              Engine
            </th>
            <th
              scope="col"
              className="eyebrow py-2.5 pr-4 text-right font-medium whitespace-nowrap text-panel-ink/65 sm:pr-6"
            >
              Result
            </th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => (
            <tr
              key={row.operator}
              className="border-b border-panel-ink/10 transition-colors duration-200 last:border-0 hover:bg-panel-ink/5"
            >
              {/* Status stripe: the verdict readable before any text is. */}
              <td className={`w-1 p-0 ${row.clears ? "bg-advisory-panel" : "bg-caution-panel"}`}>
                <span className="sr-only">{row.clears ? "Pass" : "Fail"}</span>
              </td>
              <td className="py-3 pr-4 pl-4 sm:pl-6">
                <span
                  className={
                    row.clears
                      ? "text-panel-ink"
                      : "text-panel-ink/60 line-through decoration-1 decoration-caution-panel/60"
                  }
                >
                  {row.operator}
                </span>
              </td>
              <td className="hidden py-3 pr-4 font-mono text-meta text-panel-ink/60 sm:table-cell">
                {row.fleet}
              </td>
              <td
                className={`py-3 pr-4 font-mono text-meta ${
                  row.clears ? "text-panel-ink" : "text-panel-ink/60"
                }`}
              >
                {row.engine}
              </td>
              <td className="py-3 pr-4 text-right font-mono text-meta tracking-wider sm:pr-6">
                <span className={row.clears ? "text-advisory-panel" : "text-caution-panel"}>
                  {row.clears ? "PASS" : "FAIL"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Proportional footer: the same fact at fleet scale. */}
      <div className="border-t border-panel-ink/20 px-4 py-5 sm:px-6">
        <div className="flex h-2 w-full overflow-hidden" role="presentation">
          <div className="bg-advisory-panel" style={{ width: "66.6%" }} />
          <div className="ml-px flex-1 bg-caution/70" />
        </div>
        <div className="mt-3 flex flex-wrap justify-between gap-x-6 gap-y-1 font-mono text-meta">
          <span className="text-panel-ink/70">
            <span className="text-advisory-panel">■</span> GEnx-1B · roughly two in
            three 787s in service
          </span>
          <span className="text-panel-ink/70">
            <span className="text-caution-panel">■</span> Trent 1000 · eliminated on
            engine type alone
          </span>
        </div>
      </div>
    </div>
  )
}

export function RecordsTable() {
  const lens = useLensEnabled()

  return (
    <figure className="m-0">
      {lens ? (
        <Magnify
          size={46}
          zoom={2}
          follow={0.18}
          color={RETICLE}
          hud={0.85}
          ring
          crosshair
          ticks
          brackets
          dot
          grid
          readout
          aberration={0}
          haze={0}
          ripples={false}
          scrollZoom={false}
          className="cursor-crosshair"
        >
          <Screen />
        </Magnify>
      ) : (
        <Screen />
      )}
      <figcaption className="mt-3 max-w-prose text-meta leading-relaxed text-ink/65">
        Illustrative. Engine type is public record. Maintenance status, the
        constraint that actually decides eligibility, is not.
      </figcaption>
    </figure>
  )
}
