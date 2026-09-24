"use client"

import { Analytics } from "@vercel/analytics/next"

// Keep enquiry fields and other URL parameters out of visitor reports.
export function VisitorAnalytics() {
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
