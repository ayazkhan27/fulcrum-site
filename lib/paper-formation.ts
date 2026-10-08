import { projectPaperPlane } from "./paper-plane-model"

// Retain the approved choreography, uniformly condensed to a 3.5-second intro.
const referenceDuration = 5.8
const referenceBubbleDuration = 1.5
const bubbleExtraDuration = referenceBubbleDuration - .4
export const formationDuration = 3.5
const playbackRate = referenceDuration / formationDuration
export const formationBubbleDuration = referenceBubbleDuration / playbackRate
/** Keep every visual phase in proportion, including the sky and masthead reveal. */
export function formationTimelineTime(elapsed: number) {
  const referenceElapsed = Math.max(0, elapsed) * playbackRate
  const originalElapsed = referenceElapsed <= referenceBubbleDuration
    ? referenceElapsed * .4 / referenceBubbleDuration
    : referenceElapsed - bubbleExtraDuration
  const gatherStart = .88
  const originalGather = 1.05
  const slowerGather = 2.55
  if (originalElapsed <= gatherStart) return originalElapsed
  if (originalElapsed < gatherStart + slowerGather) {
    return gatherStart + (originalElapsed - gatherStart) * originalGather / slowerGather
  }
  return originalElapsed - (slowerGather - originalGather)
}
const clamp = (n: number) => Math.max(0, Math.min(1, n))
const smooth = (n: number) => { const t = clamp(n); return t * t * (3 - 2 * t) }

/** Deterministic particles converge on the actual projected paper surfaces. */
export function drawFormation(ctx: CanvasRenderingContext2D, width: number, height: number, elapsed: number) {
  ctx.clearRect(0, 0, width, height)
  if (elapsed >= formationDuration) return 1
  const time = formationTimelineTime(elapsed)
  const reveal = smooth((time - 1.65) / .5)
  const cx = width * .5, cy = height * .57
  if (time < .4) {
    // A satin-white sphere keeps the approved swelling and size; light from
    // the upper left gives the dot depth without changing its silhouette.
    const maximumRadius = Math.max(9, Math.min(34, Math.min(width, height) * .0475))
    const inflation = smooth(Math.pow(clamp(time / .35), 1.35))
    const radius = 6 + inflation * (maximumRadius - 6)
    ctx.save()
    const body = ctx.createRadialGradient(
      cx - radius * .32, cy - radius * .38, radius * .04,
      cx - radius * .32, cy - radius * .38, radius * 1.45,
    )
    body.addColorStop(0, "#ffffff")
    body.addColorStop(.30, "#fffefb")
    body.addColorStop(.60, "#ebece9")
    body.addColorStop(.82, "#c4cbd2")
    body.addColorStop(1, "#85909e")
    ctx.fillStyle = body
    ctx.strokeStyle = "rgba(255,255,255,.28)"
    ctx.lineWidth = .6
    ctx.shadowColor = "rgba(255,255,255,.30)"
    ctx.shadowBlur = 4.5
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
    // A broad, diffused reflection keeps the surface pearly rather than metallic.
    ctx.shadowBlur = 0
    const highlight = ctx.createRadialGradient(
      cx - radius * .30, cy - radius * .38, 0,
      cx - radius * .30, cy - radius * .38, radius * .55,
    )
    highlight.addColorStop(0, "rgba(255,255,255,.52)")
    highlight.addColorStop(.45, "rgba(255,255,255,.16)")
    highlight.addColorStop(1, "rgba(255,255,255,0)")
    ctx.fillStyle = highlight
    ctx.fill()
    ctx.restore()
    return 0
  }
  const burst = 1 - Math.pow(1 - clamp((time - .4) / .38), 3)
  // Let the burst reach the edges before the stars start returning.
  const gather = smooth((time - .88) / 1.05)
  const faces = projectPaperPlane(width, height, 0)
  const projected = faces.map(face => face.points.split(" ").map(p => p.split(",").map(Number)))
  for (let i = 0; i < 480; i++) {
    const points = projected[i % faces.length]
    if (points.length < 3) continue
    const a = Math.sqrt(((i * 73) % 287 + .5) / 288)
    const b = ((i * 137) % 283 + .5) / 284
    const tx = (1-a)*points[0][0]+a*(1-b)*points[1][0]+a*b*points[2][0]
    const ty = (1-a)*points[0][1]+a*(1-b)*points[1][1]+a*b*points[2][1]
    const angle = i * 2.399963
    // A low-discrepancy star field covers the full viewport, including corners.
    const sx = (((i + .5) * .754877666) % 1) * width * 1.12 - width * .06
    const sy = (((i + .5) * .569840291) % 1) * height * 1.12 - height * .06
    const bx = cx + (sx-cx) * burst
    const by = cy + (sy-cy) * burst
    const arc = Math.sin(gather * Math.PI) * Math.min(width, height) * .085
    const x = bx + (tx-bx)*gather + Math.cos(angle)*arc
    const y = by + (ty-by)*gather + Math.sin(angle)*arc
    ctx.globalAlpha = (1-reveal) * (.65 + (i % 3)*.15)
    ctx.strokeStyle = i % 4 === 0 ? "#a9cdef" : "#ffffff"
    ctx.fillStyle = ctx.strokeStyle
    ctx.lineWidth = 1.2
    const returning = time > .88
    const trail = returning ? Math.sin(gather*Math.PI)*.08 : Math.sin(burst*Math.PI)*.1
    const dx = returning ? tx-bx : bx-cx
    const dy = returning ? ty-by : by-cy
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x-dx*trail, y-dy*trail); ctx.stroke()
    ctx.beginPath(); ctx.arc(x, y, i%5 === 0 ? 2.1 : 1.25, 0, Math.PI*2); ctx.fill()
  }
  ctx.globalAlpha = 1
  return reveal
}
