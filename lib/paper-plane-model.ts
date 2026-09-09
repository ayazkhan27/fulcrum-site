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

// Shallow three-quarter nose-right framing, fixed throughout the pass.
export const flightPose = { pitch: 0.42, yaw: 1.03, bank: 0 }
export const cameraDistance = 12
export const cameraFov = 36
// Sterling silver, shared by the live scene and reduced-motion fallback.
export const paperColor = [192, 196, 200] as const
export const shadowStrength = 0.8

// A single flight path shared by WebGL and the lightweight SVG fallback.
// Scroll never changes the attitude or stretches the mesh. Perspective creates
// the approach; the WebGL scene adds a separate, very small idle float.
export function flightTransform(
  width: number,
  height: number,
  progress: number
) {
  const p = Math.max(0, Math.min(1, progress))
  const narrow = width < 700
  const viewHeight = 2 * cameraDistance * Math.tan((cameraFov * Math.PI) / 360)
  const viewWidth = (viewHeight * width) / height
  return {
    scale: Math.min(1.25, (width / height) * 0.95),
    x: viewWidth * (narrow ? -0.02 : 0) + 5.2 * p ** 3,
    y: viewHeight * (narrow ? -0.03 : -0.06) + 0.25 * p,
    z: 7 * p ** 1.25,
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
  const { pitch, yaw, bank } = flightPose
  const transform = flightTransform(width, height, p)
  const focal = height / (2 * Math.tan((cameraFov * Math.PI) / 360))
  const points = vertices.map(([x, y, z]) => {
    const x0 = x * Math.cos(bank) - y * Math.sin(bank),
      y0 = x * Math.sin(bank) + y * Math.cos(bank)
    const x3 = x0 * Math.cos(yaw) + z * Math.sin(yaw),
      z1 = -x0 * Math.sin(yaw) + z * Math.cos(yaw)
    const y3 = y0 * Math.cos(pitch) - z1 * Math.sin(pitch),
      z2 = y0 * Math.sin(pitch) + z1 * Math.cos(pitch)
    const depth = Math.max(
      0.3,
      cameraDistance - transform.z - z2 * transform.scale
    )
    return {
      x: width / 2 + ((x3 * transform.scale + transform.x) * focal) / depth,
      y: height / 2 - ((y3 * transform.scale + transform.y) * focal) / depth,
      z: z2,
      world: [x3, y3, z2],
    }
  })
  return faces
    .map((face, index) => {
      const [a, b, c] = face.map((i) => points[i])
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
        points: face
          .map((i) => `${points[i].x.toFixed(2)},${points[i].y.toFixed(2)}`)
          .join(" "),
        fill: `rgb(${paperColor.map((c) => Math.round(c * shade)).join(",")})`,
        depth: (a.z + b.z + c.z) / 3,
      }
    })
    .sort((a, b) => a.depth - b.depth)
}
