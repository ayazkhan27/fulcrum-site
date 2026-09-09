import { Compass, Plane, Waves } from "lucide-react"

export function SectorArtwork({
  kind,
  hero = false,
}: {
  kind: "Aviation" | "Energy" | "Capabilities"
  hero?: boolean
}) {
  const variant = kind.toLowerCase()
  return (
    <div
      className={`sector-artwork ${hero ? "sector-artwork-hero" : ""} artwork-${variant}`}
      aria-hidden="true"
    >
      <div className={`sector-illustration ${variant}-illustration`}>
        {kind === "Aviation" ? (
          <>
            <div className="diagram-ring" />
            <Plane strokeWidth={0.6} />
            <div className="diagram-cross">+</div>
          </>
        ) : kind === "Energy" ? (
          <>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="energy-wave"
                style={{
                  transform: `translateY(${i * 17}px) rotate(-20deg)`,
                  opacity: 1 - i * 0.11,
                }}
              />
            ))}
            <Waves strokeWidth={0.65} />
          </>
        ) : (
          <>
            <div className="diagram-ring" />
            <div className="capability-orbit" />
            <Compass className="capability-compass" strokeWidth={0.6} />
            <Plane className="orbit-plane" strokeWidth={0.8} />
            <Waves className="orbit-waves" strokeWidth={0.8} />
            <div className="diagram-cross">+</div>
          </>
        )}
      </div>
      {hero && (
        <div className="artwork-caption">
          <span>
            {kind === "Aviation"
              ? "Assets / Operations / Connections"
              : kind === "Energy"
                ? "Petroleum / LNG / Commercial support"
                : "Consulting / Brokerage / Coordination"}
          </span>
          <span>↗</span>
        </div>
      )}
    </div>
  )
}
