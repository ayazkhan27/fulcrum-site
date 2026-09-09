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

test("flight approaches without diving, turning, or stretching", () => {
  for (const [width, height] of [
    [1280, 720],
    [390, 844],
    [320, 568],
    [844, 390],
  ]) {
    let previousZ = 0
    for (let step = 0; step <= 100; step++) {
      const p = step / 100
      const pose = flightTransform(width, height, p)
      assert.ok(Object.values(pose).every(Number.isFinite))
      assert.equal(pose.scale, flightTransform(width, height, 0).scale)
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
    assert.ok(flightTransform(width, height, 0.45).z > 2.5)
  }
})

test("SVG fallback uses exactly the same camera and fixed attitude as WebGL", () => {
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
  for (const p of [0, 0.25, 0.5, 0.75]) {
    const pose = flightTransform(width, height, p)
    const euler = new THREE.Euler(
      flightPose.pitch,
      flightPose.yaw,
      flightPose.bank,
      "XYZ"
    )
    const expected = vertices.map((v) => {
      const point = new THREE.Vector3(...v)
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
