"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/* Progressive enhancement: content is always visible, and touch/reduced-motion users get the static composition. */
export function SiteMotion() {
  const pathname = usePathname()
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    const pointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    let frame = 0
    let current: HTMLElement | null = null
    let observer: IntersectionObserver | null = null
    const animations = new Set<Animation>()
    const selector =
      "[data-reactive], .sector-card, .person-card, .capability-list article, .service-links > a"
    const reset = () => {
      cancelAnimationFrame(frame)
      if (current) {
        current.style.removeProperty("--look-x")
        current.style.removeProperty("--look-y")
        current.style.removeProperty("--tilt-x")
        current.style.removeProperty("--tilt-y")
        current.removeAttribute("data-hovered")
        current = null
      }
    }
    const move = (event: PointerEvent) => {
      if (
        preference.matches ||
        !pointer.matches ||
        event.pointerType !== "mouse"
      )
        return
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>(selector)
          : null
      if (target !== current) {
        reset()
        current = target
      }
      if (!target) return
      cancelAnimationFrame(frame)
      const { clientX, clientY } = event
      frame = requestAnimationFrame(() => {
        const rect = target.getBoundingClientRect()
        const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
        const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height))
        target.style.setProperty("--look-x", `${x * 100}%`)
        target.style.setProperty("--look-y", `${y * 100}%`)
        target.style.setProperty("--tilt-x", `${(0.5 - y) * 7}deg`)
        target.style.setProperty("--tilt-y", `${(x - 0.5) * 9}deg`)
        target.setAttribute("data-hovered", "true")
      })
    }
    const configure = () => {
      reset()
      observer?.disconnect()
      animations.forEach((animation) => animation.cancel())
      animations.clear()
      if (preference.matches || !("IntersectionObserver" in window)) return
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            observer?.unobserve(entry.target)
            const animation = entry.target.animate(
              [
                { opacity: 0.65, transform: "translateY(14px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 650, easing: "cubic-bezier(.2,.7,.2,1)" }
            )
            animations.add(animation)
            animation.onfinish = () => animations.delete(animation)
          })
        },
        { threshold: 0.15 }
      )
      document
        .querySelectorAll(
          ".section-heading, .detail-heading, .people-preview, .intro, .positioning-section"
        )
        .forEach((element) => observer?.observe(element))
    }
    configure()
    document.addEventListener("pointermove", move, { passive: true })
    document.documentElement.addEventListener("pointerleave", reset)
    window.addEventListener("blur", reset)
    preference.addEventListener("change", configure)
    pointer.addEventListener("change", reset)
    return () => {
      reset()
      observer?.disconnect()
      animations.forEach((animation) => animation.cancel())
      document.removeEventListener("pointermove", move)
      document.documentElement.removeEventListener("pointerleave", reset)
      window.removeEventListener("blur", reset)
      preference.removeEventListener("change", configure)
      pointer.removeEventListener("change", reset)
    }
  }, [pathname])
  return null
}
