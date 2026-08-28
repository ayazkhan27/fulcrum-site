"use client"

import Image from "next/image"
import { useEffect, useRef, useState, useSyncExternalStore } from "react"

/**
 * The Fulcrum stinger: a three-beat brand animation cut to the voice line
 * "Fulcrum. Precision in motion. Everywhere."
 *
 * Beats are taken from the waveform of the recording rather than guessed:
 *   0.16s  "Fulcrum"            the peaks and FULCRUM drop and land
 *   1.82s  "Precision in motion" the tagline slides in from the left
 *   3.56s  "Everywhere"          a shine sweeps across the whole lockup
 *
 * Kept generic on purpose so it can be reused as an ad or title card: pass
 * different `beats`, a different `audioSrc`, or set `once={false}` to replay it.
 *
 * Autoplay note: browsers block audio until the user has interacted with the
 * page, so on a cold landing the animation is expected to run silently. It is
 * built to stand on its own without sound, and unmutes on the first pointer or
 * key event if one arrives while it is still running.
 */

export type StingerBeats = {
  /** Seconds at which the mark and wordmark land. */
  drop: number
  /** Seconds at which the tagline slides in. */
  tagline: number
  /** Seconds at which the shine sweeps. */
  shine: number
  /** Seconds at which the overlay begins to clear. */
  out: number
}

export const FULCRUM_BEATS: StingerBeats = {
  drop: 0.16,
  tagline: 1.82,
  shine: 3.56,
  out: 4.5,
}

/**
 * Decided once per page load and cached at module scope, so the snapshot this
 * feeds to useSyncExternalStore is stable across re-renders. Reading storage
 * (and marking the intro as seen) has to happen exactly once.
 */
let decision: boolean | null = null

function shouldPlay(storageKey: string, once: boolean) {
  if (decision !== null) return decision
  if (typeof window === "undefined") return false
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  let seen = false
  try {
    seen = once && window.localStorage.getItem(storageKey) === "1"
  } catch {
    // Storage disabled: treat as unseen rather than crash.
  }
  decision = !reduced && !seen
  if (decision && once) {
    try {
      window.localStorage.setItem(storageKey, "1")
    } catch {
      /* nothing to do */
    }
  }
  return decision
}

const noopSubscribe = () => () => {}

/**
 * One piece of the lockup: both tonal cuts, plus a glint layer masked to the
 * artwork's own alpha so the sweep travels across the peaks and letterforms
 * rather than across their bounding box. Both cuts share an alpha channel, so
 * the dark file can always supply the mask.
 */
function Piece({
  part,
  width,
  height,
  alt,
  imgClass = "",
  lit,
}: {
  part: "mark" | "word" | "tag"
  width: number
  height: number
  alt: string
  imgClass?: string
  lit: boolean
}) {
  const mask = `url(/img/intro-${part}-dark.webp)`
  return (
    <span className="stinger__piece">
      <Image
        src={`/img/intro-${part}-dark.webp`}
        width={width}
        height={height}
        alt={alt}
        priority
        className={`on-dark ${imgClass}`}
      />
      <Image
        src={`/img/intro-${part}-light.webp`}
        width={width}
        height={height}
        alt=""
        aria-hidden
        priority
        className={`on-light ${imgClass}`}
      />
      <span
        aria-hidden
        className={`stinger__glint ${lit ? "is-on" : ""}`}
        style={
          {
            WebkitMaskImage: mask,
            maskImage: mask,
          } as React.CSSProperties
        }
      />
    </span>
  )
}

export function BrandStinger({
  beats = FULCRUM_BEATS,
  audioSrc = "/fulcrum-vo.mp3",
  storageKey = "fulcrum-stinger-seen",
  once = true,
}: {
  beats?: StingerBeats
  audioSrc?: string
  storageKey?: string
  once?: boolean
}) {
  // The server snapshot is always false, so the markup React renders on the
  // server matches the first client render and nothing hydrate-mismatches.
  const armed = useSyncExternalStore(
    noopSubscribe,
    () => shouldPlay(storageKey, once),
    () => false,
  )
  const [done, setDone] = useState(false)
  const [stage, setStage] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const playing = armed && !done

  useEffect(() => {
    if (!playing) return

    const audio = new Audio(audioSrc)
    audio.preload = "auto"
    audioRef.current = audio
    // Rejected when the user has not interacted with the page yet. The
    // animation is the point; the voice line is a bonus when allowed.
    audio.play().catch(() => {})

    const unmute = () => {
      if (audio.paused) audio.play().catch(() => {})
    }
    window.addEventListener("pointerdown", unmute, { once: true })
    window.addEventListener("keydown", unmute, { once: true })

    const at = (s: number, fn: () => void) =>
      window.setTimeout(fn, Math.round(s * 1000))
    const timers = [
      at(beats.drop, () => setStage(1)),
      at(beats.tagline, () => setStage(2)),
      at(beats.shine, () => setStage(3)),
      at(beats.out, () => setStage(4)),
      at(beats.out + 0.7, () => setDone(true)),
    ]

    return () => {
      timers.forEach(clearTimeout)
      window.removeEventListener("pointerdown", unmute)
      window.removeEventListener("keydown", unmute)
      audio.pause()
    }
  }, [playing, audioSrc, beats])

  const skip = () => {
    audioRef.current?.pause()
    setStage(4)
    setDone(true)
  }

  if (!playing) return null

  return (
    <div
      className={`stinger ${stage >= 4 ? "stinger--out" : ""}`}
      role="presentation"
      onClick={skip}
    >
      <div className="stinger__lockup">
        <div className="stinger__row">
          <span className={`stinger__drop ${stage >= 1 ? "is-in" : ""}`}>
            <Piece part="mark" width={514} height={297} alt="" lit={stage >= 3} />
          </span>
          <span
            className={`stinger__drop stinger__drop--late ${stage >= 1 ? "is-in" : ""}`}
          >
            <Piece
              part="word"
              width={1188}
              height={297}
              alt="Fulcrum"
              lit={stage >= 3}
            />
          </span>
        </div>

        <span className={`stinger__tag ${stage >= 2 ? "is-in" : ""}`}>
          <Piece
            part="tag"
            width={619}
            height={66}
            alt="Precision in motion"
            lit={stage >= 3}
          />
        </span>
      </div>

      <button type="button" className="stinger__skip" onClick={skip}>
        Skip
      </button>
    </div>
  )
}
