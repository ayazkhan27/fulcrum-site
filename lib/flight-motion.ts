/** Near-critically-damped spring; cap elapsed time after interrupted frames. */
export function advanceFlightSpring(
  position: number,
  velocity: number,
  target: number,
  elapsed: number
) {
  const dt = Math.max(0, Math.min(elapsed, 0.032))
  const nextVelocity =
    velocity + ((target - position) * 180 - velocity * 27) * dt
  return { position: position + nextVelocity * dt, velocity: nextVelocity }
}
