# Fly-past motion study

Reference: https://www.flyhyer.com/, inspected 10 September 2026.

## Observed reference behaviour

- A live Three.js canvas, not an opening video.
- Desktop camera: perspective with a 75-degree field of view.
- The canvas occupies the opening viewport and scrolls with the document. It is not sticky or pinned.
- At 1280 by 720, observed scroll milestones were 0, 108, 252 and 432 pixels. The aircraft progressively enlarges and passes rightward toward the camera while the following section enters. By 432 pixels, only a cropped portion is visible at the top/right.
- Forward translation is linear in native scroll distance. Perspective produces the apparent acceleration and increasing size. There is no forced endpoint placing the tail at the screen edge.
- The aircraft rolls about its longitudinal axis during the approach. This is not a yaw turn or a pitch-driven nosedive.
- Slow independent idle oscillation remains active when scrolling stops.

## Fulcrum implementation

The camera-relative flight direction, forward/lift relationship and axial banking are reconstructed for Fulcrum's existing CC0 paper-plane mesh. Its nose is +Z rather than the reference aircraft's local -X, so the frame and roll axis are converted accordingly.

The user requested restoration of the original plane appearance while retaining the fly-past. Its original 36-degree lens, camera distance of 12, uniform scale, position and fixed three-quarter attitude are restored, with no extra starting roll. Reference motion is converted into that camera's units using the ratio of visible scene heights for lateral motion and the ratio of camera distances for depth. Responsiveness varies continuously with viewport width instead of jumping at the reference's tablet breakpoint. This is a reconstruction of the fly-past behaviour for different geometry, not a pixel-identical jet silhouette. No Hyer mesh, texture, branding or source code is bundled in this project.

The earlier 130svh sticky stage, 42% progress cap, scroll spring and artificial sideways endpoint are not part of the reference behaviour and have been removed. Native scroll drives both the live WebGL scene and the lightweight SVG fallback. Existing pause, reduced-motion and offscreen rendering protections remain in place.
