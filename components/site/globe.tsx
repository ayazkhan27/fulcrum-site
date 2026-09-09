/* Original abstract connections; not a map of company offices. */
export function Globe() {
  return (
    <div className="globe-art" aria-hidden="true">
      <svg viewBox="0 0 720 720" fill="none">
        <defs>
          <radialGradient id="sphere" cx="30%" cy="24%" r="80%">
            <stop stopColor="#dce8f3" />
            <stop offset=".32" stopColor="#9fb6d1" />
            <stop offset=".66" stopColor="#366391" />
            <stop offset="1" stopColor="#0a2853" />
          </radialGradient>
          <linearGradient
            id="grid-line"
            x1="130"
            y1="100"
            x2="600"
            y2="650"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="white" stopOpacity=".7" />
            <stop offset="1" stopColor="#abc5e1" stopOpacity=".08" />
          </linearGradient>
          <clipPath id="globe-clip">
            <circle cx="360" cy="360" r="245" />
          </clipPath>
          <radialGradient id="halo">
            <stop stopColor="#679ce4" stopOpacity=".22" />
            <stop offset="1" stopColor="#679ce4" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="360" cy="360" r="355" fill="url(#halo)" />
        <g className="globe-sphere">
          <circle cx="360" cy="360" r="245" fill="url(#sphere)" />
          <g
            clipPath="url(#globe-clip)"
            stroke="url(#grid-line)"
            strokeWidth=".75"
            transform="rotate(-24 360 360)"
          >
            {[35, 75, 118, 160, 202, 239].map((r) => (
              <ellipse key={r} cx="360" cy="360" rx={r} ry="245" />
            ))}
            {[-210, -170, -120, -62, 0, 62, 120, 170, 210].map((y) => (
              <ellipse
                key={y}
                cx="360"
                cy={360 + y}
                rx={Math.sqrt(245 * 245 - y * y)}
                ry={Math.max(12, 48 * (1 - Math.abs(y) / 280))}
              />
            ))}
          </g>
          <circle
            cx="360"
            cy="360"
            r="245"
            stroke="#d0e0f0"
            strokeOpacity=".5"
          />
        </g>
        <g stroke="#d6e6fa" strokeWidth="1">
          <ellipse
            cx="360"
            cy="360"
            rx="328"
            ry="113"
            transform="rotate(-28 360 360)"
            strokeOpacity=".55"
          />
          <ellipse
            cx="360"
            cy="360"
            rx="293"
            ry="170"
            transform="rotate(48 360 360)"
            strokeOpacity=".25"
            strokeDasharray="3 7"
          />
        </g>
        <path
          className="connection-route"
          d="M151 414C170 195 469 71 590 244"
          stroke="#fff"
          strokeWidth="1.5"
          strokeDasharray="5 8"
        />
        <g fill="white">
          <circle cx="151" cy="414" r="4" />
          <circle cx="590" cy="244" r="4" />
          <circle cx="466" cy="594" r="3" />
        </g>
        <g stroke="white" strokeOpacity=".4">
          <circle className="signal" cx="151" cy="414" r="11" />
          <circle cx="590" cy="244" r="10" />
        </g>
        <g stroke="#b5cce5" strokeOpacity=".3">
          <path d="M49 345v30m-15-15h30M671 345v30m-15-15h30M345 49h30m-15-15v30M345 671h30m-15-15v30" />
        </g>
      </svg>
    </div>
  )
}
