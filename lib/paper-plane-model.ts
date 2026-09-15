// Clint Bellanger, Paper Airplane (2010), CC0. Source: research/source-assets/.
// Source +Y becomes +Z, centered and uniformly rescaled. No generated geometry.
export const vertices = [
  [1.6980142, 0.2678958, -3.0241096],
  [-1.6982183, 0.2749285, -3.0241096],
  [-1e-7, -0.3575, -3.0241096],
  [-5e-7, -0.3575, 3.0258888],
  [0.0018322, -0.3093132, -0.2797097],
  [-0.0018642, -0.3093143, -0.2797097],
  [0.0823966, 0.3388927, -3.0241096],
  [-0.0803002, 0.3391377, -3.0241096],
  [-0.0923301, 0.3493256, 1.1366333],
  [0.0956331, 0.3489386, 1.1366333],
  [0.0424151, 0.3766081, -1.0825265],
  [-0.0372233, 0.3768596, -1.0825264],
  [0.8902054, 0.2770119, -3.0241096],
  [-0.8892592, 0.2806508, -3.0241096],
  [0.8702147, 0.3436919, -2.053318],
  [-0.8677208, 0.347334, -2.053318],
] as const

// Restore the original paper-plane presentation independently of its flight.
export const flightPose = { pitch: 0.42, yaw: 1.03, bank: 0 }
export const cameraDistance = 12
export const cameraFov = 36
export const cameraNear = 0.1
// Aluminium silver wings and deeper blue folds, shared by the scene and fallback.
export const paperColor = [210, 215, 219] as const
export const cobaltColor = [38, 94, 166] as const
export const paperFaceColor = (index: number) => index < 8 ? cobaltColor : paperColor
export const shadowStrength = 0.8

// Reconstructed camera-relative flight, observed at flyhyer.com on 2026-09-10.
// Travel is linear in native scroll pixels. Perspective, not a scale tween,
// creates acceleration toward the viewer. Local axial roll never turns the nose.
// See research/FLY-PAST-MOTION.md for the reference measurements and adaptations.
export function flightTransform(
  width: number,
  height: number,
  progress: number,
  time = 0
) {
  const p = Math.max(0, Math.min(1, progress))
  const viewHeight = 2 * cameraDistance * Math.tan((cameraFov * Math.PI) / 360)
  const viewWidth = (viewHeight * width) / height
  const scale = Math.min(1.25, (width / height) * 0.95) * 0.9
  const rigScale = Math.min(1.5, (width / height) * 1.06) / 1.5
  // Re-express the same reference motion in the original camera's units.
  // This preserves the approach's relative depth and screen-space travel
  // without replacing the original lens, framing or folded-wing presentation.
  const lateralUnits = viewHeight / (2 * 5.8 * Math.tan(75 * Math.PI / 360))
  const depthUnits = cameraDistance / 5.8
  const responsiveness = 0.7 * Math.min(4, 1280 / width)
  const scroll = p * height
  const travel = (scroll * responsiveness * rigScale) / 160
  const lift = travel * 0.16
  return {
    scale,
    x: viewWidth * (width < 700 ? -0.02 : 0)
      + lateralUnits * (travel * 0.7364721654 - lift * 0.0368543253)
      + 0.035 * Math.sin(time * 0.37),
    y: viewHeight * (width < 700 ? -0.03 : -0.06)
      + lateralUnits * (-travel * 0.0850431973 + lift * 0.9855486454)
      + 0.13 * Math.sin(time * 0.73),
    z: depthUnits * (travel * 0.6711008897 + lift * 0.1653348914)
      + 0.04 * Math.sin(time * 0.51),
    pitch: flightPose.pitch,
    yaw: flightPose.yaw,
    bank: flightPose.bank + 0.018 * Math.sin(time * 0.51),
    // No added starting tilt. Retain only the fly-past's gradual axial bank.
    roll: -(scroll * responsiveness) / 1200,
  }
}
export const faces = [
  [8, 3, 5],
  [3, 9, 4],
  [3, 8, 7],
  [3, 7, 2],
  [2, 6, 9],
  [2, 9, 3],
  [5, 11, 8],
  [10, 4, 9],
  [1, 13, 8],
  [13, 7, 8],
  [6, 12, 9],
  [12, 0, 9],
  [11, 15, 8],
  [15, 1, 8],
  [0, 14, 9],
  [14, 10, 9],
] as const

export function projectPaperPlane(
  width: number,
  height: number,
  progress: number
) {
  const p = Math.max(0, Math.min(1, progress))
  const transform = flightTransform(width, height, p)
  const { pitch, yaw, bank, roll } = transform
  const focal = height / (2 * Math.tan((cameraFov * Math.PI) / 360))
  const points = vertices.map(([x, y, z]) => {
    const xr = x * Math.cos(roll) - y * Math.sin(roll),
      yr = x * Math.sin(roll) + y * Math.cos(roll)
    const x0 = xr * Math.cos(bank) - yr * Math.sin(bank),
      y0 = xr * Math.sin(bank) + yr * Math.cos(bank)
    const x3 = x0 * Math.cos(yaw) + z * Math.sin(yaw),
      z1 = -x0 * Math.sin(yaw) + z * Math.cos(yaw)
    const y3 = y0 * Math.cos(pitch) - z1 * Math.sin(pitch),
      z2 = y0 * Math.sin(pitch) + z1 * Math.cos(pitch)
    return {
      x: x3 * transform.scale + transform.x,
      y: y3 * transform.scale + transform.y,
      depth: cameraDistance - transform.z - z2 * transform.scale,
      z: z2,
      world: [x3, y3, z2],
    }
  })
  return faces
    .map((face, index) => {
      const [a, b, c] = face.map((i) => points[i])
      // Clip against the same near plane as WebGL. A close fly-past can cross
      // the camera; clamping individual depths would distort a fallback wing.
      const polygon: { x: number; y: number; depth: number }[] = []
      const source = [a, b, c]
      for (let i = 0; i < source.length; i++) {
        const current = source[i]
        const previous = source[(i + source.length - 1) % source.length]
        const inside = current.depth >= cameraNear
        const previousInside = previous.depth >= cameraNear
        if (inside !== previousInside) {
          const t = (cameraNear - previous.depth) / (current.depth - previous.depth)
          polygon.push({
            x: previous.x + (current.x - previous.x) * t,
            y: previous.y + (current.y - previous.y) * t,
            depth: cameraNear,
          })
        }
        if (inside) polygon.push(current)
      }
      const u = b.world.map((v, i) => v - a.world[i]),
        v = c.world.map((n, i) => n - a.world[i])
      const normal = [
        u[1] * v[2] - u[2] * v[1],
        u[2] * v[0] - u[0] * v[2],
        u[0] * v[1] - u[1] * v[0],
      ]
      const length = Math.hypot(...normal)
      const light =
        0.72 +
        0.28 *
          Math.abs(
            (normal[0] * -0.3 + normal[1] * 0.8 + normal[2] * 0.5) / length
          )
      const shade = 1 - (1 - light * (index === 1 || index === 2 ? 0.87 : 1)) * shadowStrength
      return {
        points: polygon
          .map(({ x, y, depth }) =>
            `${(width / 2 + x * focal / depth).toFixed(2)},${(height / 2 - y * focal / depth).toFixed(2)}`
          )
          .join(" "),
        fill: `rgb(${paperFaceColor(index).map((c) => Math.round(c * shade)).join(",")})`,
        depth: (a.z + b.z + c.z) / 3,
      }
    })
    .sort((a, b) => a.depth - b.depth)
}
