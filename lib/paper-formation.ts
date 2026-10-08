import { projectPaperPlane } from "./paper-plane-model"

export const formationBubbleDuration = 1.5
const bubbleExtraDuration = formationBubbleDuration - .4
export const formationDuration = 4.7 + bubbleExtraDuration
/** Give the bubble time to swell, then preserve the existing particle/reveal pace. */
export function formationTimelineTime(elapsed: number) {
  const originalElapsed = elapsed <= formationBubbleDuration
    ? elapsed * .4 / formationBubbleDuration
    : elapsed - bubbleExtraDuration
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
    // A white dot swells to the smaller approved size, then briefly holds before bursting.
    const maximumRadius = Math.max(9, Math.min(34, Math.min(width, height) * .0475))
    const inflation = smooth(Math.pow(clamp(time / .35), 1.35))
    const radius = 6 + inflation * (maximumRadius - 6)
    ctx.save()
    ctx.fillStyle = "#ffffff"
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = .6
    ctx.shadowColor = "#ffffff"
    ctx.shadowBlur = 4.5
    ctx.beginPath(); ctx.arc(cx, cy, radius, 0, Math.PI * 2); ctx.fill(); ctx.stroke()
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
