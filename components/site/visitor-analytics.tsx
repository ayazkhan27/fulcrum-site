"use client"

import { useEffect } from "react"
import { track } from "@vercel/analytics"
import { Analytics } from "@vercel/analytics/next"

// Keep enquiry fields and other URL parameters out of visitor reports.
export function VisitorAnalytics() {
  useEffect(() => {
    function recordContactClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return
      const link = event.target.closest("a")
      const href = link?.getAttribute("href") ?? ""
      if (href.startsWith("mailto:")) track("Email link clicked")
      else if (href.startsWith("tel:")) track("Phone link clicked")
    }
    document.addEventListener("click", recordContactClick)
    return () => document.removeEventListener("click", recordContactClick)
  }, [])

  return (
    <Analytics
      beforeSend={(event) => {
        const url = new URL(event.url)
        url.search = ""
        url.hash = ""
        return { ...event, url: url.toString() }
      }}
    />
  )
}
