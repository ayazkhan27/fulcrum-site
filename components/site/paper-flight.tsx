"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { projectPaperPlane } from "@/lib/paper-plane-model"
import type { createPaperScene } from "@/lib/paper-plane-scene"

const clamp = (n: number) => Math.max(0, Math.min(1, n))
export function PaperFlight() {
  const root = useRef<HTMLElement>(null)
  const plane = useRef<HTMLDivElement>(null)
  const canvas = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)
  const wakeRef = useRef<() => void>(() => {})
  useEffect(() => {
    const section = root.current!
    const object = plane.current!
    const reduced = matchMedia("(prefers-reduced-motion: reduce)")
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
      object.style.opacity = "1"
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
      if (!pausedRef.current && !reduced.matches) ambientTime += dt
      const moving = Math.abs(target - position) > 0.0001
      position = target
      if (moving || time - lastDraw >= 32) {
        draw()
        lastDraw = time
      }
      const ambient =
        Boolean(scene) &&
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
      target = progress()
      if (!frame) frame = requestAnimationFrame(tick)
    }
    wakeRef.current = update
    const configure = () => {
      cancelAnimationFrame(frame)
      frame = 0
      last = 0
      section.dataset.motion = reduced.matches ? "static" : "active"
      width = Math.max(1, section.clientWidth)
      height = Math.max(1, section.querySelector(".flight-stage")!.clientHeight)
      scene?.resize(width, height)
      position = target = reduced.matches ? 0 : progress()
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
                <span>in motion</span>
              </h1>
            </div>
          </div>
          <div className="flight-camera" aria-hidden="true">
            <div className="flight-plane" ref={plane}>
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
