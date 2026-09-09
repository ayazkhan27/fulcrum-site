"use client"

import { useState } from "react"
import {
  Plane,
  Cog,
  Wrench,
  Building2,
  Utensils,
  ArrowUpRight,
} from "lucide-react"
import Link from "next/link"

const disciplines = [
  {
    name: "Aircraft",
    icon: Plane,
    heading: "The asset. And the opportunity.",
    body: "Aircraft sourcing, acquisition, sale, leasing and placement, aligned with the operator’s commercial and operational requirements.",
    detail: "Sourcing / Acquisition / Leasing",
  },
  {
    name: "Engines",
    icon: Cog,
    heading: "Power behind the operation.",
    body: "Engine sourcing and placement, commercial coordination and support around records and shop-visit planning.",
    detail: "Sourcing / Records / Planning",
  },
  {
    name: "Maintenance",
    icon: Wrench,
    heading: "Readiness is in the details.",
    body: "Connect with appropriate maintenance and MRO expertise, coordinate workscopes and keep technical information organized.",
    detail: "MRO / Workscopes / Coordination",
  },
  {
    name: "Airports",
    icon: Building2,
    heading: "Beyond the aircraft.",
    body: "Ground-support equipment, vehicles, tooling and airport systems, considered within the wider operating environment.",
    detail: "Ground support / Equipment / Systems",
  },
  {
    name: "Subsidiaries",
    icon: Utensils,
    heading: "The services behind every journey.",
    body: "Commercial and operational support for flight catering, cargo, ground handling, training and related airline businesses.",
    detail: "Catering / Cargo / Ground handling",
  },
]

export function AviationExplorer() {
  const [active, setActive] = useState(0)
  const selected = disciplines[active]
  const Icon = selected.icon
  return (
    <section className="section aviation-explorer">
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">A connected operating system</p>
            <h2 className="aviation-slogan">From terminal to tarmac.</h2>
          </div>
          <p className="section-note">
            Explore the connections behind aviation.
            <br />
            Select a discipline to see where we help.
          </p>
        </div>
        <div className="explorer-panel">
          <div
            className="explorer-tabs"
            role="tablist"
            aria-label="Aviation disciplines"
          >
            {disciplines.map((item, index) => {
              const ItemIcon = item.icon
              return (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  id={`discipline-${index}`}
                  aria-selected={active === index}
                  aria-controls="discipline-panel"
                  tabIndex={active === index ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => {
                    let next = index
                    if (event.key === "ArrowRight")
                      next = (index + 1) % disciplines.length
                    else if (event.key === "ArrowLeft")
                      next =
                        (index + disciplines.length - 1) % disciplines.length
                    else if (event.key === "Home") next = 0
                    else if (event.key === "End") next = disciplines.length - 1
                    else return
                    event.preventDefault()
                    setActive(next)
                    document.getElementById(`discipline-${next}`)?.focus()
                  }}
                >
                  <span className="explorer-node">
                    <ItemIcon strokeWidth={1} aria-hidden="true" />
                  </span>
                  <span>{item.name}</span>
                  <span className="node-number">0{index + 1}</span>
                </button>
              )
            })}
          </div>
          <div
            className="explorer-detail"
            id="discipline-panel"
            role="tabpanel"
            aria-labelledby={`discipline-${active}`}
            tabIndex={0}
          >
            <div className="explorer-emblem" aria-hidden="true">
              <div />
              <Icon strokeWidth={0.55} />
            </div>
            <div>
              <p className="eyebrow">{selected.detail}</p>
              <h3>{selected.heading}</h3>
              <p>{selected.body}</p>
              <Link href="/contact" className="text-link">
                Discuss a requirement{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
