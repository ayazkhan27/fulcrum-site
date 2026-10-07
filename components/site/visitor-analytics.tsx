"use client"

import { useEffect } from "react"
import { track } from "@vercel/analytics"
import { Analytics } from "@vercel/analytics/next"
import {
  contactClickEvent,
  enquiryPageContext,
  readEnquiryAttribution,
  recordEnquiryEvent,
  stripAnalyticsUrl,
} from "@/lib/enquiry-attribution"

// Keep enquiry fields and other URL parameters out of visitor reports.
export function VisitorAnalytics() {
  useEffect(() => {
    function recordContactClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return
      const link = event.target.closest("a")
      const href = link?.getAttribute("href") ?? ""
      if (!link) return
      const name = contactClickEvent(href, {
        draft: link.hasAttribute("data-enquiry-draft"),
        career: Boolean(link.closest(".career-page")),
      })
      if (!name) return
      const context = enquiryPageContext(
        window.location.pathname,
        link.closest('[id^="page-"]')?.id
      )
      const attribution = readEnquiryAttribution(
        new URLSearchParams(window.location.search)
      )
      const form = link.closest("form")
      const contact = context.page === "contact"
      recordEnquiryEvent(track, name, {
        ...context,
        sector: form
          ? form.getAttribute("data-enquiry-sector")
          : contact
            ? attribution.sector || context.sector
            : context.sector,
        service: form
          ? form.getAttribute("data-enquiry-service")
          : contact
            ? attribution.service
            : "",
        source:
          (form
            ? form.getAttribute("data-enquiry-source")
            : contact
              ? attribution.source
              : "") || context.source,
      })
    }
    document.addEventListener("click", recordContactClick)
    return () => document.removeEventListener("click", recordContactClick)
  }, [])

  return (
    <Analytics
      beforeSend={(event) => {
        const url = stripAnalyticsUrl(event.url)
        return url ? { ...event, url } : null
      }}
    />
  )
}
