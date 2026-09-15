"use client"

import { useState, type ReactNode } from "react"
import { ServiceExplorer } from "@/components/site/service-explorer"
import { EnquiryForm } from "@/components/site/enquiry-form"
import {
  isEnquiryService,
  type EnquiryServiceChoice,
  type EnquiryServiceId,
} from "@/lib/enquiry-services"

export function ServiceEnquiry({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<EnquiryServiceId>("consulting")
  const [service, setService] = useState<EnquiryServiceChoice>("")

  function selectService(value: EnquiryServiceChoice) {
    setService(value)
    if (isEnquiryService(value)) setActive(value)
  }

  return (
    <>
      <ServiceExplorer active={active} onSelect={selectService} />
      <div className="contact-section">
        <section
          className="section shell contact-layout"
          aria-label="Contact details and enquiry form"
        >
          {children}
          <EnquiryForm service={service} onServiceChange={selectService} />
        </section>
      </div>
    </>
  )
}
