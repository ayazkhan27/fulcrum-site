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

function canvasRecorder() {
  const arcs = [], gradients = []
  let saves = 0, restores = 0
  return {
    arcs, gradients,
    get balanced() { return saves === restores },
    clearRect() {}, beginPath() {}, fill() {}, stroke() {}, moveTo() {}, lineTo() {},
    save() { saves++ }, restore() { restores++ },
    arc(...args) { arcs.push(args) },
    createRadialGradient() {
      const stops = []
      gradients.push(stops)
      return { addColorStop(...args) { stops.push(args) } }
    },
  }
}

test("The balloon adds only 1100ms before the unchanged burst, gathering and reveals", () => {
  assert.equal(formationBubbleDuration, 1.5)
  assert.ok(Math.abs(formationDuration - 5.8) < 1e-12)
  for (const oldTime of [.4, .5, .78, .88, 1, 2, 3.43, 3.5, 4, 4.15, 4.7]) {
    assert.ok(Math.abs(formationTimelineTime(oldTime + 1.1) - originalTimeline(oldTime)) < 1e-12)
  }
  for (let t = 0; t < formationBubbleDuration; t += .01) {
    assert.ok(formationTimelineTime(t) < .4)
    assert.ok(formationTimelineTime(t + .01) >= formationTimelineTime(t))
  }
})

test("The pure-white dot swells to exactly half the previous maximum size and briefly holds before bursting", () => {
  for (const [width, height] of [[1280, 720], [390, 844], [320, 568], [160, 160]]) {
    const previousMaximumRadius = Math.max(18, Math.min(68, Math.min(width, height) * .095))
    const maximumRadius = previousMaximumRadius / 2
    let previousRadius = 0
    for (const elapsed of [0, .3, .6, .9, 1.2, 1.32, 1.49]) {
      const ctx = canvasRecorder()
      assert.equal(drawFormation(ctx, width, height, elapsed), 0)
      const [x, y, radius, start, end] = ctx.arcs[0]
      assert.equal(x, width * .5)
      assert.equal(y, height * .57)
      assert.equal(start, 0)
      assert.equal(end, Math.PI * 2)
      assert.ok(radius >= previousRadius && radius >= 6 && radius <= maximumRadius)
      if (elapsed === 0) assert.equal(radius, 6)
      if (elapsed === .9) assert.ok(radius > maximumRadius * .6)
      if (elapsed >= 1.32) assert.equal(radius, maximumRadius)
      previousRadius = radius
      assert.equal(ctx.arcs.length, 1)
      assert.equal(ctx.gradients.length, 0)
      assert.equal(ctx.fillStyle, "#ffffff")
      assert.equal(ctx.strokeStyle, "#ffffff")
      assert.equal(ctx.shadowColor, "#ffffff")
      assert.equal(ctx.shadowBlur, 4.5)
      assert.ok(ctx.balanced, "bubble canvas styling must not leak into particles")
    }
  }
})

test("The existing 480 particles follow the bubble and disappear at the completed reveal", () => {
  const burst = canvasRecorder()
  assert.equal(drawFormation(burst, 1280, 720, formationBubbleDuration + .01), 0)
  assert.equal(burst.arcs.length, 480)
  assert.equal(burst.gradients.length, 0)
  const complete = canvasRecorder()
  assert.equal(drawFormation(complete, 1280, 720, formationDuration), 1)
  assert.equal(complete.arcs.length, 0)
})
