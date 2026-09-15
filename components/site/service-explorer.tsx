"use client"

import { useRef } from "react"
import {
  Compass,
  Search,
  Handshake,
  MessagesSquare,
  Route,
  ArrowUpRight,
} from "lucide-react"
import { enquiryServices, type EnquiryServiceId } from "@/lib/enquiry-services"

const icons = {
  consulting: Compass,
  sourcing: Search,
  representation: Handshake,
  negotiation: MessagesSquare,
  coordination: Route,
}

export function ServiceExplorer({
  active,
  onSelect,
}: {
  active: EnquiryServiceId
  onSelect: (service: EnquiryServiceId) => void
}) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const selected = enquiryServices.find((service) => service.id === active)!
  const Icon = icons[selected.id]
  return (
    <section
      className="section service-explorer"
      id="services"
      aria-labelledby="service-explorer-title"
    >
      <div className="shell">
        <div className="section-heading">
          <div>
            <p className="eyebrow">One connected approach</p>
            <h2 id="service-explorer-title">
              From requirement to opportunity.
            </h2>
          </div>
          <p className="section-note">
            Across every industry we serve, the right support starts with your
            requirement. Select a service, then tell us what you need.
          </p>
        </div>
        <div className="explorer-panel">
          <div
            className="explorer-tabs"
            role="tablist"
            aria-label="Fulcrum services"
          >
            {enquiryServices.map((item, index) => {
              const ItemIcon = icons[item.id]
              return (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  ref={(node) => {
                    tabs.current[index] = node
                  }}
                  id={`service-${item.id}`}
                  aria-selected={active === item.id}
                  aria-controls="service-panel"
                  tabIndex={active === item.id ? 0 : -1}
                  onClick={() => onSelect(item.id)}
                  onKeyDown={(event) => {
                    let next = index
                    if (event.key === "ArrowRight")
                      next = (index + 1) % enquiryServices.length
                    else if (event.key === "ArrowLeft")
                      next =
                        (index + enquiryServices.length - 1) %
                        enquiryServices.length
                    else if (event.key === "Home") next = 0
                    else if (event.key === "End")
                      next = enquiryServices.length - 1
                    else return
                    event.preventDefault()
                    onSelect(enquiryServices[next].id)
                    tabs.current[next]?.focus({ preventScroll: true })
                    tabs.current[next]?.scrollIntoView({
                      block: "nearest",
                      inline: "nearest",
                    })
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
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-${active}`}
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
              <a
                href="#enquiry-form"
                className="text-link"
                onClick={() => onSelect(selected.id)}
              >
                Discuss {selected.name.toLowerCase()}{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
