"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { projectPaperPlane } from "@/lib/paper-plane-model"
import { drawFormation, formationDuration, formationTimelineTime } from "@/lib/paper-formation"
import type { createPaperScene } from "@/lib/paper-plane-scene"

const clamp = (n: number) => Math.max(0, Math.min(1, n))
export function PaperFlight() {
  const root = useRef<HTMLElement>(null)
  const plane = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const formation = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const wakeRef = useRef<() => void>(() => {})
  const replayRef = useRef<() => void>(() => {})
  useEffect(() => {
    const section = root.current!
    const home = section.closest<HTMLElement>(".home-page")!
    const object = plane.current!
    const reduced = matchMedia("(prefers-reduced-motion: reduce)")
    const particles = formation.current!
    const context = particles.getContext("2d")
    const introKey = "fulcrum-formation-seen-v1"
    let introSeen = false
    try { introSeen = localStorage.getItem(introKey) === "true" } catch { /* Storage may be unavailable. */ }
    let introTime = introSeen || reduced.matches || window.scrollY > 20 ? formationDuration : 0
    let restoreScroll: (() => void) | undefined
    let replayFrame = 0
    let frame = 0,
      position = 0,
      target = 0,
      last = 0
    let width = section.clientWidth,
      height = section.querySelector(".flight-stage")!.clientHeight
    let ambientTime = 0,
      lastDraw = 0
    const polygons = Array.from(object.querySelectorAll("polygon"))
    let scene: ReturnType<typeof createPaperScene> | undefined
    let disposed = false,
      loading = false,
      failed = false
    let intersecting =
      section.getBoundingClientRect().bottom > 0 &&
      section.getBoundingClientRect().top < innerHeight
    const progress = () => {
      const r = section.getBoundingClientRect()
      return clamp(-r.top / height)
    }
    const draw = () => {
      const p = clamp(position)
      object.dataset.progress = p.toFixed(3)
      object.dataset.elapsed = ambientTime.toFixed(2)
      section.style.setProperty(
        "--flight-tagline-opacity",
        "1"
      )
      // Native document scroll drives the approach, without a pinned stage,
      // artificial sideways exit, or an independently delayed scroll spring.
      if (scene) scene.draw(p, ambientTime)
      else {
        object
          .querySelector("svg")!
          .setAttribute("viewBox", [0, 0, width, height].join(" "))
        projectPaperPlane(width, height, p).forEach((face, i) => {
          polygons[i].setAttribute("points", face.points)
          polygons[i].setAttribute("fill", face.fill)
          polygons[i].setAttribute("stroke", face.fill)
        })
      }
      if (reduced.matches || p > .025 || !context) introTime = formationDuration
      const ease = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t) }
      const revealTime = formationTimelineTime(introTime)
      home.style.setProperty("--intro-sky", String(ease((revealTime - 2) / .8)))
      home.style.setProperty("--intro-brand", String(ease((revealTime - 2.65) / .55)))
      home.dataset.intro = introTime >= formationDuration ? "complete" : "playing"
      if (introTime >= formationDuration && restoreScroll) {
        restoreScroll()
        restoreScroll = undefined
      }
      if (introTime >= formationDuration && !introSeen) {
        introSeen = true
        try { localStorage.setItem(introKey, "true") } catch { /* Keep the page usable without storage. */ }
      }
      const opacity = context ? drawFormation(context, width, height, introTime) : 1
      object.style.opacity = String(opacity)
      particles.style.visibility = introTime >= formationDuration ? "hidden" : "visible"
      object.dataset.formation = introTime >= formationDuration ? "complete" : "forming"
    }
    const fallback = () => {
      failed = true
      scene?.dispose()
      scene = undefined
      delete object.dataset.renderer
      draw()
    }
    const loadRenderer = async () => {
      if (scene || loading || failed || reduced.matches) return
      loading = true
      try {
        const { createPaperScene } = await import("@/lib/paper-plane-scene")
        if (disposed || reduced.matches) return
        scene = createPaperScene(canvas.current!, fallback)
        scene.resize(width, height)
        draw()
        object.dataset.renderer = "webgl"
        update()
      } catch {
        if (!disposed) fallback()
      } finally {
        loading = false
      }
    }
    const tick = (time: number) => {
      if (document.hidden || !intersecting) {
        frame = 0
        last = 0
        return
      }
      const dt = Math.min((time - (last || time - 16)) / 1000, 0.032)
      last = time
      if (!pausedRef.current && !reduced.matches) {
        if (introTime < formationDuration) introTime += dt
        else ambientTime += dt
      }
      const moving = Math.abs(target - position) > 0.0001
      position = target
      if (moving || time - lastDraw >= 32) {
        draw()
        lastDraw = time
      }
      const ambient =
        (Boolean(scene) || introTime < formationDuration) &&
        !pausedRef.current &&
        !reduced.matches &&
        !document.hidden &&
        section.dataset.visible !== "false"
      if (moving || ambient) frame = requestAnimationFrame(tick)
      else {
        position = target
        draw()
        frame = 0
        last = 0
      }
    }
    const update = () => {
      if (reduced.matches || document.hidden || !intersecting) return
      target = introTime < formationDuration ? 0 : progress()
      if (!frame) frame = requestAnimationFrame(tick)
    }
    wakeRef.current = update
    replayRef.current = () => {
      // Replay deliberately, without clearing the saved first-visit preference.
      const page = document.documentElement
      restoreScroll?.()
      const previousScroll = page.style.scrollBehavior
      page.style.scrollBehavior = "auto"
      window.scrollTo(0, 0)
      restoreScroll = () => { page.style.scrollBehavior = previousScroll }
      cancelAnimationFrame(replayFrame)
      const startAtTop = () => {
        if (disposed) return
        if (window.scrollY > 1) {
          window.scrollTo({ top: 0, behavior: "instant" })
          replayFrame = requestAnimationFrame(startAtTop)
          return
        }
        replayFrame = 0
        introTime = reduced.matches ? formationDuration : 0
        ambientTime = 0
        position = target = 0
        last = 0
        intersecting = true
        section.dataset.visible = "true"
        draw()
        update()
      }
      replayFrame = requestAnimationFrame(startAtTop)
    }
    const configure = () => {
      cancelAnimationFrame(frame)
      frame = 0
      last = 0
      section.dataset.motion = reduced.matches ? "static" : "active"
      width = Math.max(1, section.clientWidth)
      height = Math.max(1, section.querySelector(".flight-stage")!.clientHeight)
      const dpr = Math.min(devicePixelRatio, 2)
      particles.width = Math.round(width * dpr)
      particles.height = Math.round(height * dpr)
      context?.setTransform(dpr, 0, 0, dpr, 0, 0)
      scene?.resize(width, height)
      position = target = reduced.matches || introTime < formationDuration ? 0 : progress()
      draw()
      void loadRenderer()
      update()
    }
    const visibility = () => {
      section.dataset.visible = String(intersecting && !document.hidden)
      if (document.hidden) {
        cancelAnimationFrame(frame)
        frame = 0
        last = 0
      } else configure()
    }
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting
      section.dataset.visible = String(intersecting && !document.hidden)
      if (intersecting) update()
    })
    observer.observe(section)
    configure()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", configure)
    reduced.addEventListener("change", configure)
    document.addEventListener("visibilitychange", visibility)
    return () => {
      disposed = true
      wakeRef.current = () => {}
      replayRef.current = () => {}
      restoreScroll?.()
      cancelAnimationFrame(replayFrame)
      home.style.removeProperty("--intro-sky")
      home.style.removeProperty("--intro-brand")
      delete home.dataset.intro
      scene?.dispose()
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", configure)
      reduced.removeEventListener("change", configure)
      document.removeEventListener("visibilitychange", visibility)
    }
  }, [])
  return (
    <>
      <noscript><style>{`.home-page .flight-horizon, .home-page .home-header, .home-page .flight-caption, .home-page .flight-plane { opacity: 1 !important; } .home-page .home-header { pointer-events: auto !important; } .flight-replay { display: none; }`}</style></noscript>
      <section
        className="paper-flight"
        ref={root}
        aria-labelledby="home-title"
        data-paused={paused}
      >
        <div className="flight-stage">
          <div className="flight-horizon flight-horizon-trial" aria-hidden="true">
            {/* Trial sky. Previous photograph: /sky-nika-akin-trial.webp. */}
            <Image
              src="/sky-padrinan-trial.jpg"
              alt=""
              fill
              sizes="100vw"
              preload
            />
            <div className="flight-cloud flight-cloud-near" />
            <div className="flight-cloud flight-cloud-far" />
          </div>
          <div className="flight-caption shell">
            <div className="flight-intro">
              <h1 id="home-title">
                <span>Precision</span>
                <span>in motion.</span>
              </h1>
            </div>
          </div>
          <div className="flight-camera" aria-hidden="true">
            <canvas ref={formation} className="flight-formation" />
            <div className="flight-plane" ref={plane} style={{ opacity: 0 }}>
              <svg viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
                {projectPaperPlane(1200, 800, 0).map((face, i) => (
                  <polygon
                    key={i}
                    points={face.points}
                    fill={face.fill}
                    stroke={face.fill}
                    strokeWidth=".5"
                  />
                ))}
              </svg>
              <canvas ref={canvas} />
            </div>
          </div>
        </div>
      </section>
      <div className="post-flight-navigation">
        <div className="shell post-flight-controls">
          <a className="flight-skip" href="#page-mission">
            Explore Fulcrum <span aria-hidden="true">↓</span>
          </a>
          <button
            type="button"
            className="flight-replay"
            onClick={(event) => {
              event.currentTarget.blur()
              pausedRef.current = false
              setPaused(false)
              requestAnimationFrame(() => replayRef.current())
            }}
          >
            Replay intro <span aria-hidden="true">↻</span>
          </button>
          <button
            type="button"
            className="flight-pause"
            aria-pressed={paused}
            onClick={() => {
              pausedRef.current = !paused
              setPaused(!paused)
              wakeRef.current()
            }}
          >
            {paused ? "Play motion" : "Pause motion"}{" "}
            <span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span>
          </button>
        </div>
      </div>
    </>
  )
}
