import {
  Compass,
  Layers3,
  Network,
  Ship,
  Plane,
  Cog,
  Wrench,
  Building2,
  Utensils,
  Package,
  Droplets,
  Waves,
  Route,
  ChartNoAxesCombined,
  ClipboardCheck,
  Handshake,
  FileCheck2,
  Search,
  Target,
  Users,
  ArrowUpRight,
} from "lucide-react"

export function TechnicalArtwork({ kind }: { kind: string }) {
  return (
    <div
      className={`technical-artwork art-${kind.toLowerCase()}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 440 340" fill="none">
        <defs>
          <linearGradient
            id={`silver-${kind}`}
            x1="70"
            y1="30"
            x2="350"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#e7f0fb" stopOpacity=".75" />
            <stop offset="1" stopColor="#6d9acb" stopOpacity=".12" />
          </linearGradient>
        </defs>
        <g stroke="#a9c6e6" strokeWidth=".7" opacity=".3">
          <path d="M30 70H410M30 270H410M70 30V310M370 30V310" />
          <circle cx="220" cy="170" r="135" strokeDasharray="3 8" />
        </g>
        {kind === "Energy" ? (
          <g>
            <path
              d="M80 219V112Q80 91 127 91Q174 91 174 112V219"
              fill={`url(#silver-${kind})`}
              stroke="#c1d6ed"
            />
            <ellipse cx="127" cy="112" rx="47" ry="18" stroke="#c1d6ed" />
            <path
              d="M80 219Q127 251 174 219M80 167Q127 196 174 167"
              stroke="#c1d6ed"
              strokeOpacity=".6"
            />
            <path
              d="M199 219V88Q199 65 246 65Q293 65 293 88V219"
              fill={`url(#silver-${kind})`}
              stroke="#c1d6ed"
            />
            <ellipse cx="246" cy="88" rx="47" ry="18" stroke="#c1d6ed" />
            <path
              d="M199 219Q246 251 293 219M199 153Q246 183 293 153"
              stroke="#c1d6ed"
              strokeOpacity=".6"
            />
            <path
              className="connection-route"
              d="M127 238V266H346V211"
              stroke="#dceafd"
              strokeDasharray="4 5"
            />
            <circle cx="346" cy="184" r="28" stroke="#abc8e8" />
            <path
              d="M330 190h31l-6 9h-19zM338 190v-13h15v13m-8-13v-9"
              stroke="#dceafd"
            />
          </g>
        ) : kind === "Consulting" ? (
          <g stroke="#c8dff6">
            {[60, 105, 150].map((y, i) => (
              <path
                key={y}
                d={`M75 ${y + 40}L220 ${y - 20}L365 ${y + 40}L220 ${y + 100}Z`}
                fill={`url(#silver-${kind})`}
                opacity={0.45 + i * 0.2}
              />
            ))}
            <path d="M220 40V270" strokeDasharray="4 7" opacity=".65" />
            <circle cx="220" cy="150" r="42" fill="#133d69" />
            <path d="M201 160l12-28 26 8-12 28z" />
            <circle cx="220" cy="150" r="3" fill="white" />
          </g>
        ) : kind === "Brokerage" ? (
          <g stroke="#bfd5ed">
            <path
              d="M87 198Q220-25 353 198M87 198Q220 296 353 198"
              strokeOpacity=".45"
            />
            <path
              className="connection-route"
              d="M87 198L220 112L353 198"
              strokeDasharray="5 7"
            />
            {[
              [87, 198],
              [220, 112],
              [353, 198],
            ].map(([x, y], i) => (
              <g key={x}>
                <circle
                  cx={x}
                  cy={y}
                  r={i === 1 ? 52 : 37}
                  fill={`url(#silver-${kind})`}
                />
                <circle
                  cx={x}
                  cy={y}
                  r={i === 1 ? 64 : 49}
                  strokeOpacity=".25"
                />
                <path d={`M${x - 12} ${y}h24m-12-12v24`} stroke="white" />
              </g>
            ))}
          </g>
        ) : (
          <g stroke="#c4d9ef">
            <path
              d="M220 48L362 268H78Z"
              fill={`url(#silver-${kind})`}
              fillOpacity=".3"
            />
            <path
              d="M220 48V180M78 268L220 180L362 268"
              strokeDasharray="4 6"
            />
            {[
              [220, 48],
              [78, 268],
              [362, 268],
            ].map(([x, y]) => (
              <g key={x}>
                <circle cx={x} cy={y} r="25" fill="#315d8c" />
                <circle cx={x} cy={y} r="37" strokeOpacity=".25" />
              </g>
            ))}
            <circle cx="220" cy="180" r="46" fill={`url(#silver-${kind})`} />
            <circle cx="220" cy="180" r="60" strokeOpacity=".3" />
          </g>
        )}
        <g fill="#c6d9ee">
          <circle cx="70" cy="70" r="2" />
          <circle cx="370" cy="270" r="2" />
        </g>
      </svg>
      <p>
        {kind === "Energy"
          ? "Supply / Logistics / Opportunity"
          : kind === "Consulting"
            ? "Perspective / Analysis / Direction"
            : kind === "Brokerage"
              ? "Mandate / Connection / Execution"
              : "Expertise / Connection / Execution"}
      </p>
    </div>
  )
}

const icons = {
  Aviation: [Plane, Cog, Wrench, Building2, Utensils, Package],
  Energy: [Droplets, Waves, Ship, ChartNoAxesCombined],
  Consulting: [Compass, Network, ClipboardCheck, Search, Building2, Route],
  Brokerage: [Target, Search, FileCheck2, Handshake, ArrowUpRight],
  Capabilities: [Plane, Droplets, Compass, Users, Layers3, Route],
}
export function CapabilityIcon({
  kind,
  index,
}: {
  kind: string
  index: number
}) {
  const Icon = (icons[kind as keyof typeof icons] || icons.Capabilities)[
    index % (icons[kind as keyof typeof icons] || icons.Capabilities).length
  ]
  return (
    <span className="capability-icon" aria-hidden="true">
      <Icon strokeWidth={1} />
    </span>
  )
}
