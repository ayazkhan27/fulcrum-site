"use client"

import { Suspense, useState, type ReactNode } from "react"
import { useSearchParams } from "next/navigation"
import { ServiceExplorer } from "@/components/site/service-explorer"
import { EnquiryForm } from "@/components/site/enquiry-form"
import {
  isEnquiryService,
  type EnquiryServiceChoice,
  type EnquiryServiceId,
} from "@/lib/enquiry-services"
import {
  readEnquiryAttribution,
  type EnquiryAttribution,
} from "@/lib/enquiry-attribution"

const emptyAttribution: EnquiryAttribution = {
  sector: "",
  service: "",
  source: "",
}

export function ServiceEnquiry({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <ServiceEnquiryContent attribution={emptyAttribution}>
          {children}
        </ServiceEnquiryContent>
      }
    >
      <PrefilledServiceEnquiry>{children}</PrefilledServiceEnquiry>
    </Suspense>
  )
}

function PrefilledServiceEnquiry({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const attribution = readEnquiryAttribution(searchParams)
  // A new supported selection starts a fresh form. Unrelated URL parameters
  // cannot populate fields or reset the visitor's work.
  const selectionKey = `${attribution.sector}:${attribution.service}:${attribution.source}`
  return (
    <ServiceEnquiryContent key={selectionKey} attribution={attribution}>
      {children}
    </ServiceEnquiryContent>
  )
}

function ServiceEnquiryContent({
  children,
  attribution,
}: {
  children: ReactNode
  attribution: EnquiryAttribution
}) {
  const [active, setActive] = useState<EnquiryServiceId>(
    isEnquiryService(attribution.service) ? attribution.service : "consulting"
  )
  const [service, setService] = useState<EnquiryServiceChoice>(
    attribution.service
  )

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
          <EnquiryForm
            service={service}
            onServiceChange={selectService}
            attribution={attribution}
          />
        </section>
      </div>
    </>
  )
}
