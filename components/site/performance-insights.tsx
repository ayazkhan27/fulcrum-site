"use client"

import { useCallback, useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { SpeedInsights } from "@vercel/speed-insights/react"
import {
  publicPerformancePath,
  publicPerformanceUrl,
  sanitizePerformanceEvent,
  type PerformanceEvent,
} from "@/lib/performance-privacy"

const privateControls = 'form, input, textarea, select, [contenteditable]:not([contenteditable="false"])'

export function PerformanceInsights() {
  const pathname = usePathname()
  const formInteractionSeen = useRef(false)

  useEffect(() => {
    // Do not read values. The SDK cannot filter individual input-attributed
    // metrics, so stop subsequent performance sends for this document once
    // someone interacts with a form or editable control.
    const suppressAfterFormInteraction = (event: Event) => {
      if (event.target instanceof Element && event.target.closest(privateControls)) {
        formInteractionSeen.current = true
      }
    }
    const events = ["focusin", "pointerdown", "input", "change", "submit"]
    events.forEach((name) => document.addEventListener(name, suppressAfterFormInteraction, true))
    return () => {
      events.forEach((name) => document.removeEventListener(name, suppressAfterFormInteraction, true))
    }
  }, [])

  const beforeSend = useCallback((event: PerformanceEvent) => {
    if (
      formInteractionSeen.current ||
      document.activeElement?.closest(privateControls) ||
      publicPerformanceUrl(window.location.href) === null
    ) return null
    return sanitizePerformanceEvent(event)
  }, [])

  return (
    <SpeedInsights
      // Explicit fixed routes avoid deriving a route label from query keys.
      route={publicPerformancePath(pathname)}
      beforeSend={beforeSend}
      debug={false}
      framework="next"
      basePath={process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_BASEPATH}
      configString={process.env.NEXT_PUBLIC_VERCEL_OBSERVABILITY_CLIENT_CONFIG}
    />
  )
}
