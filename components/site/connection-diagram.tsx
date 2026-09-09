export function ConnectionDiagram() {
  return (
    <figure className="connection-diagram" data-reactive>
      <div className="connection-art" aria-hidden="true">
        <svg viewBox="0 0 520 440" fill="none">
          <defs>
            <radialGradient id="connection-halo">
              <stop stopColor="#5386cf" stopOpacity=".22" />
              <stop offset="1" stopColor="#dce7f5" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="connection-ring">
              <stop stopColor="#eff5fc" />
              <stop offset=".4" stopColor="#99b2d4" />
              <stop offset=".7" stopColor="#fff" />
              <stop offset="1" stopColor="#7899c3" />
            </linearGradient>
          </defs>
          <circle cx="260" cy="220" r="205" fill="url(#connection-halo)" />
          <g stroke="#7497c4" strokeOpacity=".4">
            <path d="M60 110H150L260 220L370 110H460M60 330H150L260 220L370 330H460" />
            <circle cx="260" cy="220" r="153" strokeDasharray="2 9" />
            <path d="M260 38V68M260 372V402M78 220H108M412 220H442" />
          </g>
          <g className="connection-orbit">
            <ellipse
              cx="260"
              cy="220"
              rx="174"
              ry="91"
              transform="rotate(-34 260 220)"
              stroke="url(#connection-ring)"
              strokeWidth="18"
            />
            <ellipse
              cx="260"
              cy="220"
              rx="174"
              ry="91"
              transform="rotate(34 260 220)"
              stroke="#245b9f"
              strokeWidth="2"
              strokeDasharray="3 9"
            />
          </g>
          <circle cx="260" cy="220" r="65" fill="#073e83" />
          <circle cx="260" cy="220" r="72" stroke="#c3d5eb" />
          <text
            x="260"
            y="225"
            textAnchor="middle"
            fill="white"
            fontSize="18"
            fontFamily="Arial, sans-serif"
            letterSpacing="2"
          >
            FULCRUM
          </text>
          {[
            [60, 110],
            [460, 110],
            [60, 330],
            [460, 330],
          ].map(([x, y]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r="7" fill="#f1f5fa" stroke="#4877b4" />
              <circle cx={x} cy={y} r="2" fill="#0047ab" />
            </g>
          ))}
        </svg>
        <span className="connection-label label-one">Your requirement</span>
        <span className="connection-label label-two">Counterparties</span>
        <span className="connection-label label-three">Specialist input</span>
        <span className="connection-label label-four">Execution support</span>
      </div>
      <figcaption>
        <span className="eyebrow">The value is in the connection</span>
        <p>
          Coordinating the people and information around a clearly defined
          assignment.
        </p>
      </figcaption>
    </figure>
  )
}
