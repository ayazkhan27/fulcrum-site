import * as THREE from "three"
import {
  vertices,
  faces,
  flightPose,
  flightTransform,
  cameraDistance,
  cameraFov,
  paperColor,
  shadowStrength,
} from "./paper-plane-model"

/** GPU depth testing and light on genuinely folded surfaces, with no model download. */
export function createPaperScene(canvas: HTMLCanvasElement, lost: () => void) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: "low-power",
  })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(cameraFov, 1, 0.1, 100)
  camera.position.z = cameraDistance
  const model = new THREE.Group()
  model.rotation.set(flightPose.pitch, flightPose.yaw, flightPose.bank, "XYZ")
  const positions: number[] = []
  faces.forEach((face) =>
    face.forEach((index) => positions.push(...vertices[index]))
  )
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  )
  geometry.computeVertexNormals()
  const material = new THREE.MeshStandardMaterial({
    color: `rgb(${paperColor.join(",")})`,
    roughness: 0.86,
    metalness: 0,
    side: THREE.DoubleSide,
    flatShading: true,
  })
  const mesh = new THREE.Mesh(geometry, material)
  model.add(mesh)
  scene.add(model)
  scene.add(new THREE.HemisphereLight(0xffffff, 0x9ba8b1, 1.7))
  // Redistribute 20% of directional light into fill to soften the shaded folds.
  scene.add(new THREE.AmbientLight(0xffffff, 1.6 * (1 - shadowStrength)))
  const sun = new THREE.DirectionalLight(0xffffff, 1.6 * shadowStrength)
  sun.position.set(-3, 8, 7)
  scene.add(sun)
  let width = 1,
    height = 1
  const draw = (p: number, time = 0) => {
    const pose = flightTransform(width, height, p)
    model.position.set(
      pose.x + 0.035 * Math.sin(time * 0.37),
      pose.y + 0.13 * Math.sin(time * 0.73),
      pose.z + 0.04 * Math.sin(time * 0.51)
    )
    // Small buoyant movements, never the former turning or diving sequence.
    model.rotation.set(
      flightPose.pitch + 0.018 * Math.sin(time * 0.62),
      flightPose.yaw,
      flightPose.bank + 0.018 * Math.sin(time * 0.51),
      "XYZ"
    )
    model.scale.setScalar(pose.scale)
    model.visible = p < 0.995
    renderer.render(scene, camera)
  }
  const resize = (w: number, h: number) => {
    width = Math.max(w, 1)
    height = Math.max(h, 1)
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }
  const contextLost = (event: Event) => {
    event.preventDefault()
    lost()
  }
  canvas.addEventListener("webglcontextlost", contextLost)
  return {
    draw,
    resize,
    dispose: () => {
      canvas.removeEventListener("webglcontextlost", contextLost)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    },
  }
}
