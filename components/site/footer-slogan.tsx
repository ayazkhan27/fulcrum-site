"use client"

import { useEffect, useRef } from "react"

/** Keep the approved natural-lettering size while adding space between letters. */
export function FooterSlogan() {
  const containerRef = useRef<HTMLParagraphElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const text = textRef.current
    if (!container || !text) return

    let frame = 0
    let disposed = false
    let lastWidth = 0

    const fit = () => {
      if (disposed) return
      const available = container.getBoundingClientRect().width
      // Measure without tracking so the added spacing doesn't shrink the font.
      const letterSpacing = text.style.letterSpacing
      text.style.letterSpacing = "normal"
      const measured = text.getBoundingClientRect().width
      text.style.letterSpacing = letterSpacing
      const currentSize = Number.parseFloat(getComputedStyle(text).fontSize)
      if (available <= 0 || measured <= 0 || !Number.isFinite(currentSize)) return
      const fittedSize = Math.floor(currentSize * available / measured * 0.55 * 100) / 100
      if (Math.abs(fittedSize - currentSize) > 0.01) {
        text.style.fontSize = `${fittedSize}px`
      }
    }

    const schedule = () => {
      if (disposed) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(fit)
    }
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width === lastWidth) return
      lastWidth = entry.contentRect.width
      schedule()
    })
    observer.observe(container)
    document.fonts.ready.then(schedule)
    schedule()

    return () => {
      disposed = true
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <p className="footer-statement" ref={containerRef}>
      <span ref={textRef}>
        precision in motion<span className="footer-slogan-dot" aria-hidden="true" />
      </span>
    </p>
  )
}
