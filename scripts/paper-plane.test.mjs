import { test } from "node:test"
import assert from "node:assert/strict"
import { readFileSync } from "node:fs"
import * as THREE from "three"
import {
  vertices,
  faces,
  flightPose,
  flightTransform,
  projectPaperPlane,
  cameraDistance,
  cameraFov,
} from "../lib/paper-plane-model.ts"
import { advanceFlightSpring } from "../lib/flight-motion.ts"

test("CC0 stock mesh is a long folded dart, exported without drift", () => {
  const span =
    Math.max(...vertices.map((v) => v[0])) -
    Math.min(...vertices.map((v) => v[0]))
  const length =
    Math.max(...vertices.map((v) => v[2])) -
    Math.min(...vertices.map((v) => v[2]))
  assert.ok(length > span * 1.7)
  assert.equal(vertices.length, 16)
  assert.equal(faces.length, 16)
  assert.ok(
    Math.max(...vertices.map((v) => v[1])) -
      Math.min(...vertices.map((v) => v[1])) >
      0.7
  )
  for (const face of faces) {
    const [a, b, c] = face.map((i) => new THREE.Vector3(...vertices[i]))
    assert.ok(b.sub(a).cross(c.sub(a)).length() > 0.00001, "no degenerate face")
  }
  const obj = readFileSync(
    new URL("../public/paper-plane.obj", import.meta.url),
    "utf8"
  )
  const exported = obj
    .split("\n")
    .filter((l) => l.startsWith("v "))
    .map((l) => l.slice(2).split(" ").map(Number))
  assert.deepEqual(exported, vertices)
})

test("flight follows a linear camera approach without yawing, diving, or stretching", () => {
  for (const [width, height] of [
    [1280, 720],
    [390, 844],
    [320, 568],
    [844, 390],
  ]) {
    let previousZ = flightTransform(width, height, 0).z
    for (let step = 0; step <= 100; step++) {
      const p = step / 100
      const pose = flightTransform(width, height, p)
      assert.ok(Object.values(pose).every(Number.isFinite))
      assert.equal(pose.scale, flightTransform(width, height, 0).scale)
      assert.equal(pose.pitch, flightPose.pitch)
      assert.equal(pose.yaw, flightPose.yaw)
      assert.ok(
        pose.y >= flightTransform(width, height, 0).y,
        "no downward dive"
      )
      assert.ok(pose.z >= previousZ)
      previousZ = pose.z
      assert.ok(
        projectPaperPlane(width, height, p).every(
          (face) => !/NaN|Infinity/.test(face.points)
        )
      )
    }
    const start = flightTransform(width, height, 0)
    const middle = flightTransform(width, height, 0.5)
    const end = flightTransform(width, height, 1)
    for (const axis of ["x", "y", "z", "roll"]) {
      assert.ok(Math.abs(middle[axis] - (start[axis] + end[axis]) / 2) < 1e-10)
    }
    assert.ok(end.z > start.z + 1)
    assert.ok(end.roll < start.roll, "bank is about the longitudinal axis")
  }
})

test("opening preserves the original paper-plane lens, framing and attitude", () => {
  assert.equal(cameraDistance, 12)
  assert.equal(cameraFov, 36)
  assert.deepEqual(flightPose, { pitch: 0.42, yaw: 1.03, bank: 0 })
  for (const [width, height] of [[1280, 720], [884, 788], [390, 844]]) {
    const pose = flightTransform(width, height, 0)
    const viewHeight = 24 * Math.tan(18 * Math.PI / 180)
    assert.equal(pose.scale, Math.min(1.25, width / height * 0.95) * 0.9)
    assert.equal(pose.x, viewHeight * width / height * (width < 700 ? -0.02 : 0))
    assert.equal(pose.y, viewHeight * (width < 700 ? -0.03 : -0.06))
    assert.equal(pose.z, 0)
    assert.ok(pose.roll === 0, "no added tilt at the start")
  }
})

test("fly-past bank is modestly stronger without adding an opening tilt", () => {
  for (const [width, height] of [[1280, 720], [390, 844]]) {
    for (const progress of [0, 0.25, 0.5, 1]) {
      const previousRoll = -(progress * height * 0.7 * Math.min(4, 1280 / width)) / 1200
      const pose = flightTransform(width, height, progress)
      assert.ok(Math.abs(pose.roll - previousRoll * 1.2) < 1e-10)
    }
  }
})

test("SVG fallback matches the WebGL camera, axial bank and translation", () => {
  const width = 1280,
    height = 720
  const camera = new THREE.PerspectiveCamera(
    cameraFov,
    width / height,
    0.1,
    100
  )
  camera.position.z = cameraDistance
  camera.updateMatrixWorld()
  for (const p of [0, 0.25, 0.5, 0.75, 1]) {
    const pose = flightTransform(width, height, p)
    const euler = new THREE.Euler(
      pose.pitch,
      pose.yaw,
      pose.bank,
      "XYZ"
    )
    const expected = vertices.map((v) => {
      const point = new THREE.Vector3(...v)
        .applyAxisAngle(new THREE.Vector3(0, 0, 1), pose.roll)
        .applyEuler(euler)
        .multiplyScalar(pose.scale)
        .add(new THREE.Vector3(pose.x, pose.y, pose.z))
        .project(camera)
      return [((point.x + 1) * width) / 2, ((1 - point.y) * height) / 2]
    })
    for (const face of projectPaperPlane(width, height, p)) {
      for (const pair of face.points
        .split(" ")
        .map((v) => v.split(",").map(Number)))
        assert.ok(
          expected.some(
            (v) => Math.hypot(v[0] - pair[0], v[1] - pair[1]) < 0.02
          )
        )
    }
  }
})

test("spring settles in either direction across frame rates and interrupted frames", () => {
  for (const dt of [0.008, 0.016, 0.032, 1]) {
    let state = { position: 0, velocity: 0 }
    for (const target of [1, 0, 0.6]) {
      for (let i = 0; i < 400; i++)
        state = advanceFlightSpring(state.position, state.velocity, target, dt)
      assert.ok(Math.abs(state.position - target) < 0.0001)
      assert.ok(Math.abs(state.velocity) < 0.0001)
    }
  }
})

test("idle motion is bounded and does not change the scroll path or mesh scale", () => {
  for (const [width, height] of [[1280, 720], [884, 788], [390, 844]]) {
    for (const progress of [0, 0.35, 0.6, 1]) {
      const base = flightTransform(width, height, progress)
      for (let time = 0; time <= 120; time += 0.5) {
        const pose = flightTransform(width, height, progress, time)
        assert.equal(pose.scale, base.scale)
        assert.equal(pose.pitch, base.pitch)
        assert.ok(Math.abs(pose.yaw - base.yaw) <= 0.0081)
        assert.ok(Math.abs(pose.roll - base.roll) <= 0.0601)
        assert.ok(Math.abs(pose.x - base.x) <= 0.1201)
        assert.ok(Math.abs(pose.y - base.y) <= 0.3001)
        assert.ok(Math.abs(pose.z - base.z) <= 0.1201)
      }
    }
  }
})
