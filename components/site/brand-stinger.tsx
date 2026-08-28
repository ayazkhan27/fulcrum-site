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
 * Autoplay note: browsers refuse to start audio until the user has interacted
 * with the origin, so a cold landing cannot reliably carry the voice line. The
 * gate exists to solve that rather than to decorate: the click that dismisses
 * it is the gesture that lets `play()` succeed, which is why the Audio object
 * is constructed and started inside the handler rather than in an effect.
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
  gate = true,
}: {
  beats?: StingerBeats
  audioSrc?: string
  storageKey?: string
  once?: boolean
  /** Ask before playing, so the voice line is allowed to start. */
  gate?: boolean
}) {
  // The server snapshot is always false, so the markup React renders on the
  // server matches the first client render and nothing hydrate-mismatches.
  const armed = useSyncExternalStore(
    noopSubscribe,
    () => shouldPlay(storageKey, once),
    () => false,
  )
  const [phase, setPhase] = useState<"gate" | "run" | "done">(
    gate ? "gate" : "run",
  )
  const [stage, setStage] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const running = armed && phase === "run"

  useEffect(() => {
    if (!running) return

    const at = (s: number, fn: () => void) =>
      window.setTimeout(fn, Math.round(s * 1000))
    const timers = [
      at(beats.drop, () => setStage(1)),
      at(beats.tagline, () => setStage(2)),
      at(beats.shine, () => setStage(3)),
      at(beats.out, () => setStage(4)),
      at(beats.out + 0.7, () => setPhase("done")),
    ]
    return () => timers.forEach(clearTimeout)
  }, [running, beats])

  // Stop the voice line if the component goes away mid-run.
  useEffect(() => () => audioRef.current?.pause(), [])

  /**
   * Must stay synchronous: `play()` only inherits the user gesture if it is
   * called during the click, so awaiting anything first loses the permission.
   */
  const enter = (withSound: boolean) => {
    if (withSound) {
      const audio = new Audio(audioSrc)
      audio.preload = "auto"
      audioRef.current = audio
      audio.play().catch(() => {})
    }
    setPhase("run")
  }

  const skip = () => {
    audioRef.current?.pause()
    setStage(4)
    setPhase("done")
  }

  if (!armed || phase === "done") return null

  if (phase === "gate") {
    return (
      <div className="stinger" role="dialog" aria-label="Introduction">
        <div className="stinger__gate">
          <Image
            src="/img/intro-mark-dark.webp"
            width={514}
            height={297}
            alt=""
            priority
            className="on-dark stinger__gatemark"
          />
          <Image
            src="/img/intro-mark-light.webp"
            width={514}
            height={297}
            alt=""
            aria-hidden
            priority
            className="on-light stinger__gatemark"
          />
          <div className="stinger__actions">
            <button
              type="button"
              className="stinger__btn"
              onClick={() => enter(true)}
              autoFocus
            >
              Play with sound
            </button>
            <button
              type="button"
              className="stinger__btn stinger__btn--ghost"
              onClick={() => enter(false)}
            >
              Play silently
            </button>
          </div>
          <button type="button" className="stinger__skip" onClick={skip}>
            Skip intro
          </button>
        </div>
      </div>
    )
  }

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
