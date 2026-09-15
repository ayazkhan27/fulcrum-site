import * as THREE from "three"
import {
  vertices,
  faces,
  flightPose,
  flightTransform,
  cameraDistance,
  cameraFov,
  cameraNear,
  paperFaceColor,
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
  const camera = new THREE.PerspectiveCamera(cameraFov, 1, cameraNear, 100)
  camera.position.z = cameraDistance
  const model = new THREE.Group()
  model.rotation.set(flightPose.pitch, flightPose.yaw, flightPose.bank, "XYZ")
  const positions: number[] = []
  const colors: number[] = []
  faces.forEach((face, faceIndex) => {
    const color = new THREE.Color(`rgb(${paperFaceColor(faceIndex).join(",")})`)
    face.forEach((index) => {
      positions.push(...vertices[index])
      colors.push(color.r, color.g, color.b)
    })
  })
  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  )
  geometry.computeVertexNormals()
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
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
    const pose = flightTransform(width, height, p, time)
    model.position.set(pose.x, pose.y, pose.z)
    model.rotation.set(pose.pitch, pose.yaw, pose.bank, "XYZ")
    mesh.rotation.z = pose.roll
    model.scale.setScalar(pose.scale)
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
