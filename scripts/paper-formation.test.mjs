import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import test from "node:test"
import ts from "typescript"

const source = readFileSync(new URL("../lib/paper-formation.ts", import.meta.url), "utf8")
const moduleSource = ts.transpileModule(source.replace(
  '"./paper-plane-model"',
  JSON.stringify(new URL("../lib/paper-plane-model.ts", import.meta.url).href),
), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText
const { drawFormation, formationBubbleDuration, formationDuration, formationTimelineTime } =
  await import(`data:text/javascript;base64,${Buffer.from(moduleSource).toString("base64")}`)

const originalTimeline = (elapsed) => elapsed <= .88 ? elapsed
  : elapsed < 3.43 ? .88 + (elapsed - .88) * 1.05 / 2.55 : elapsed - 1.5
const timelineScale = 3.5 / 5.8

function canvasRecorder() {
  const arcs = [], gradients = [], fills = []
  let saves = 0, restores = 0
  return {
    arcs, gradients, fills,
    get balanced() { return saves === restores },
    clearRect() {}, beginPath() {}, stroke() {}, moveTo() {}, lineTo() {},
    fill() { fills.push({ style: this.fillStyle, shadowColor: this.shadowColor, shadowBlur: this.shadowBlur }) },
    save() { saves++ }, restore() { restores++ },
    arc(...args) { arcs.push(args) },
    createRadialGradient(...args) {
      const stops = []
      const gradient = { args, stops, addColorStop(...stop) { stops.push(stop) } }
      gradients.push(gradient)
      return gradient
    },
  }
}

test("The approved sphere, burst, gathering and reveals fit uniformly into 3.5 seconds", () => {
  assert.ok(Math.abs(formationBubbleDuration - 1.5 * timelineScale) < 1e-12)
  assert.equal(formationDuration, 3.5)
  for (const oldTime of [.4, .5, .78, .88, 1, 2, 3.43, 3.5, 4, 4.15, 4.7]) {
    assert.ok(Math.abs(formationTimelineTime((oldTime + 1.1) * timelineScale) - originalTimeline(oldTime)) < 1e-12)
  }
  for (let t = 0; t < formationBubbleDuration; t += .01) {
    assert.ok(formationTimelineTime(t) < .4)
    assert.ok(formationTimelineTime(t + .01) >= formationTimelineTime(t))
  }
  assert.ok(Math.abs(formationTimelineTime(formationBubbleDuration) - .4) < 1e-12)
  assert.ok(drawFormation(canvasRecorder(), 1280, 720, 4.75 * timelineScale) >= 1 - 1e-12, "the plane finishes forming before the end")
  assert.ok(formationTimelineTime(3.5) >= 3.2 - 1e-12, "the sky and brand reveal timeline completes by 3.5 seconds")
})

test("The satin-white sphere preserves the approved dot's size, position, swelling and hold", () => {
  for (const [width, height] of [[1280, 720], [390, 844], [320, 568], [160, 160]]) {
    const previousMaximumRadius = Math.max(18, Math.min(68, Math.min(width, height) * .095))
    const maximumRadius = previousMaximumRadius / 2
    let previousRadius = 0
    for (const phase of [0, .2, .4, .6, .8, .88, .99]) {
      const ctx = canvasRecorder()
      assert.equal(drawFormation(ctx, width, height, phase * formationBubbleDuration), 0)
      const [x, y, radius, start, end] = ctx.arcs[0]
      assert.equal(x, width * .5)
      assert.equal(y, height * .57)
      assert.equal(start, 0)
      assert.equal(end, Math.PI * 2)
      assert.ok(radius >= previousRadius && radius >= 6 && radius <= maximumRadius)
      if (phase === 0) assert.equal(radius, 6)
      if (phase === .6) assert.ok(radius > maximumRadius * .6)
      if (phase >= .88) assert.equal(radius, maximumRadius)
      previousRadius = radius
      assert.equal(ctx.arcs.length, 1)
      assert.equal(ctx.gradients.length, 2)
      const [body, highlight] = ctx.gradients
      assert.equal(ctx.fills[0].style, body, "the approved circle receives the shaded sphere body")
      assert.equal(ctx.fills[1].style, highlight, "the highlight reuses the same circle silhouette")
      assert.ok(body.args[0] < x && body.args[1] < y, "the light source sits above and left of centre")
      assert.equal(body.args[3], body.args[0], "the radial gradient keeps one light-source centre")
      assert.equal(body.args[4], body.args[1])
      const diagonal = radius / Math.sqrt(2)
      const upperLeftDistance = Math.hypot(x - diagonal - body.args[0], y - diagonal - body.args[1])
      const lowerRightDistance = Math.hypot(x + diagonal - body.args[0], y + diagonal - body.args[1])
      assert.ok(lowerRightDistance > upperLeftDistance, "the lower-right edge is farther from the light and receives the darker shading")
      assert.ok(body.args[2] < radius && body.args[5] >= radius)
      assert.equal(body.stops[0][0], 0)
      assert.equal(body.stops[0][1], "#ffffff")
      assert.equal(body.stops.at(-1)[0], 1)
      assert.ok(new Set(body.stops.map(([, color]) => color)).size >= 3, "multiple shades give the white dot depth")
      assert.ok(highlight.args[0] < x && highlight.args[1] < y)
      assert.ok(highlight.args[5] > radius * .4 && highlight.args[5] < radius, "the reflection remains broad and contained")
      assert.match(highlight.stops.at(-1)[1], /,\s*0\)$/, "the reflection fades to transparency")
      assert.equal(ctx.fills[0].shadowBlur, 4.5)
      assert.equal(ctx.fills[1].shadowBlur, 0, "the reflection does not add a second outer glow")
      assert.ok(ctx.balanced, "bubble canvas styling must not leak into particles")
    }
  }
})

test("The existing 480 particles follow the sphere and disappear by 3.5 seconds", () => {
  const burst = canvasRecorder()
  assert.equal(drawFormation(burst, 1280, 720, formationBubbleDuration + .01), 0)
  assert.equal(burst.arcs.length, 480)
  assert.equal(burst.gradients.length, 0)
  const complete = canvasRecorder()
  assert.equal(drawFormation(complete, 1280, 720, 3.5), 1)
  assert.equal(complete.arcs.length, 0)
  assert.equal(complete.gradients.length, 0)
})
