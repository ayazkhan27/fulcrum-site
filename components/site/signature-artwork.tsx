type Sector = "Aviation" | "Energy" | "Capabilities"

/* Original, decorative SVG compositions. No fleet, facility or transaction is depicted as owned. */
export function SignatureArtwork({ kind }: { kind: Sector }) {
  return (
    <figure
      className={`signature-art signature-${kind.toLowerCase()}`}
      data-reactive
    >
      <div className="signature-aura" />
      <div className="object-depth" aria-hidden="true">
        {kind === "Aviation" ? (
          <svg viewBox="0 0 560 480" fill="none">
            <defs>
              <linearGradient
                id="airframe-metal"
                x1="150"
                y1="90"
                x2="365"
                y2="380"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#fbfdff" />
                <stop offset=".38" stopColor="#c6d8ed" />
                <stop offset=".52" stopColor="#6f92bb" />
                <stop offset=".63" stopColor="#e3eefb" />
                <stop offset="1" stopColor="#789abb" />
              </linearGradient>
              <linearGradient
                id="wing-metal"
                x1="110"
                y1="210"
                x2="440"
                y2="290"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4f7299" />
                <stop offset=".42" stopColor="#e8f2ff" />
                <stop offset=".53" stopColor="#9bb7d7" />
                <stop offset="1" stopColor="#eef5ff" />
              </linearGradient>
              <linearGradient
                id="runway-fade"
                x1="270"
                y1="245"
                x2="270"
                y2="470"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#91b4dc" stopOpacity=".5" />
                <stop offset="1" stopColor="#91b4dc" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="plane-halo">
                <stop stopColor="#89baff" stopOpacity=".16" />
                <stop offset="1" stopColor="#89baff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse
              cx="287"
              cy="242"
              rx="270"
              ry="220"
              fill="url(#plane-halo)"
            />
            <g className="airfield-grid" stroke="url(#runway-fade)">
              <path d="M205 290L45 474M300 290L435 474M160 342H338M112 397H380M65 452H418" />
              <path
                d="M255 290L235 470"
                strokeDasharray="12 14"
                strokeWidth="2"
              />
              <path
                d="M170 347h28m-44 17h31m-48 18h33M306 347h24m-21 17h29m-25 18h33"
                strokeWidth="3"
                opacity=".55"
              />
            </g>
            <g className="flight-track" stroke="#a9c9f0" strokeOpacity=".3">
              <path d="M35 260Q155 67 449 121" strokeDasharray="3 8" />
              <circle cx="449" cy="121" r="5" />
              <path d="M444 121h10m-5-5v10" />
            </g>
            <g className="aircraft-sculpture" transform="rotate(29 280 232)">
              <ellipse
                cx="280"
                cy="320"
                rx="110"
                ry="18"
                fill="#001a37"
                opacity=".15"
              />
              <path
                d="M271 190L112 291L110 308L270 259L277 309L223 344L223 358L280 342L338 358L337 344L290 309L295 259L450 308L448 291L291 190Z"
                fill="url(#wing-metal)"
                stroke="#dbeaff"
                strokeWidth=".65"
              />
              <path
                d="M269 112Q280 58 292 112L294 278Q292 326 280 349Q268 326 266 278Z"
                fill="url(#airframe-metal)"
                stroke="#eaf3ff"
                strokeWidth=".75"
              />
              <path d="M280 84V342" stroke="#fff" strokeOpacity=".6" />
              <path
                d="M271 121Q280 113 289 121L290 131Q280 126 270 131Z"
                fill="#193d67"
              />
              <path
                d="M208 248Q218 237 226 248V278Q216 289 208 278Z M337 248Q346 238 354 248V278Q345 289 337 278Z"
                fill="url(#airframe-metal)"
                stroke="#bdd2ec"
              />
              <path
                d="M113 293L268 217M293 217L448 293M228 346L272 324M290 324L334 346"
                stroke="#fff"
                strokeOpacity=".4"
              />
              <path
                d="M270 149V198M289 149V198"
                stroke="#2a557f"
                strokeDasharray="2 5"
                strokeWidth="1.5"
              />
            </g>
            <g fill="#bed1e8">
              <circle cx="67" cy="388" r="2" />
              <circle cx="460" cy="328" r="2" />
            </g>
            <path
              d="M48 82h24m-12-12v24M467 385h24m-12-12v24"
              stroke="#b5d3f7"
              strokeOpacity=".25"
            />
          </svg>
        ) : kind === "Energy" ? (
          <svg viewBox="0 0 560 480" fill="none">
            <defs>
              <linearGradient
                id="flow-metal"
                x1="105"
                y1="80"
                x2="402"
                y2="397"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#709cca" />
                <stop offset=".24" stopColor="#eaf4ff" />
                <stop offset=".42" stopColor="#8bb2db" />
                <stop offset=".56" stopColor="#f7fbff" />
                <stop offset=".77" stopColor="#3b73ad" />
                <stop offset="1" stopColor="#143e6f" />
              </linearGradient>
              <linearGradient
                id="flow-blue"
                x1="143"
                y1="120"
                x2="385"
                y2="395"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#75b6f9" />
                <stop offset=".4" stopColor="#1759a4" />
                <stop offset=".7" stopColor="#a6d4ff" />
                <stop offset="1" stopColor="#2d6eb3" />
              </linearGradient>
              <radialGradient id="energy-halo">
                <stop stopColor="#5fa8fd" stopOpacity=".21" />
                <stop offset="1" stopColor="#5fa8fd" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="290" cy="240" r="236" fill="url(#energy-halo)" />
            <g stroke="#8ab5e4" strokeOpacity=".17">
              <path d="M42 364H512M42 392H512M42 420H512" />
              <path d="M77 442L194 306M190 442L245 306M313 442L293 306M443 442L344 306" />
            </g>
            <g className="flow-ribbons" strokeLinecap="round">
              <path
                d="M121 135C121 78 248 65 248 139V302C248 379 435 379 435 304"
                stroke="#00182f"
                strokeWidth="51"
                opacity=".22"
                transform="translate(0 18)"
              />
              <path
                d="M121 135C121 78 248 65 248 139V302C248 379 435 379 435 304"
                stroke="url(#flow-metal)"
                strokeWidth="45"
              />
              <path
                d="M121 135C121 78 248 65 248 139V302C248 379 435 379 435 304"
                stroke="#e9f5ff"
                strokeWidth="1"
                transform="translate(-9 -8)"
                opacity=".55"
              />
              <path
                d="M116 239C116 309 329 310 329 228V143C329 95 427 95 427 153"
                stroke="url(#flow-blue)"
                strokeWidth="30"
              />
              <path
                d="M116 239C116 309 329 310 329 228V143C329 95 427 95 427 153"
                stroke="#d5eaff"
                strokeWidth="1"
                transform="translate(-5 -5)"
                opacity=".5"
              />
              <path
                className="energy-current"
                d="M121 135C121 78 248 65 248 139V302C248 379 435 379 435 304"
                stroke="#fff"
                strokeWidth="2"
                strokeDasharray="2 690"
                opacity=".8"
              />
            </g>
            <g fill="#103962" stroke="#bcd6f2">
              <ellipse cx="121" cy="135" rx="22" ry="9" />
              <ellipse cx="435" cy="304" rx="22" ry="9" />
            </g>
            <g stroke="#b4d2f4" strokeOpacity=".5">
              <path d="M99 136H60v45M435 326v52h57" />
              <circle cx="60" cy="187" r="3" />
              <circle cx="498" cy="378" r="3" />
            </g>
          </svg>
        ) : (
          <svg viewBox="0 0 560 480" fill="none">
            <defs>
              <linearGradient
                id="glass-top"
                x1="108"
                y1="115"
                x2="403"
                y2="285"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#dcecff" stopOpacity=".8" />
                <stop offset=".46" stopColor="#699ed6" stopOpacity=".35" />
                <stop offset="1" stopColor="#c4e1ff" stopOpacity=".6" />
              </linearGradient>
              <linearGradient id="glass-edge">
                <stop stopColor="#b2cee9" />
                <stop offset=".5" stopColor="#4773a3" />
                <stop offset="1" stopColor="#d9edff" />
              </linearGradient>
              <radialGradient id="capability-halo">
                <stop stopColor="#78aff4" stopOpacity=".18" />
                <stop offset="1" stopColor="#78aff4" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="285" cy="250" r="225" fill="url(#capability-halo)" />
            <ellipse
              cx="280"
              cy="405"
              rx="174"
              ry="24"
              fill="#00162e"
              opacity=".2"
            />
            <g className="slab slab-bottom">
              <path
                d="M78 303L275 223L475 303L279 391Z"
                fill="url(#glass-top)"
                stroke="#afcff1"
                strokeOpacity=".7"
              />
              <path
                d="M78 303V317L279 405L475 317V303L279 391Z"
                fill="url(#glass-edge)"
                opacity=".6"
              />
              <path
                d="M120 303L276 241L432 303L279 370Z"
                stroke="#c3ddfa"
                strokeOpacity=".4"
              />
            </g>
            <g className="slab slab-middle">
              <path
                d="M78 223L275 143L475 223L279 311Z"
                fill="url(#glass-top)"
                stroke="#cce4ff"
                strokeOpacity=".8"
              />
              <path
                d="M78 223V237L279 325L475 237V223L279 311Z"
                fill="url(#glass-edge)"
                opacity=".65"
              />
              <path
                d="M123 223L276 161L430 223L279 290Z"
                stroke="#d3e8ff"
                strokeOpacity=".45"
              />
            </g>
            <g className="slab slab-top">
              <path
                d="M78 143L275 63L475 143L279 231Z"
                fill="url(#glass-top)"
                stroke="#dceeff"
              />
              <path
                d="M78 143V157L279 245L475 157V143L279 231Z"
                fill="url(#glass-edge)"
                opacity=".8"
              />
              <path
                d="M122 143L276 81L432 143L279 210Z"
                stroke="#ebf5ff"
                strokeOpacity=".5"
              />
              <path
                d="M231 143L277 122L327 143L279 166Z"
                fill="#dfedff"
                fillOpacity=".8"
              />
            </g>
            <path
              className="sculpture-axis"
              d="M279 40V420"
              stroke="#d7ebff"
              strokeDasharray="2 6"
              strokeOpacity=".35"
            />
            <g stroke="#c5dfff" strokeOpacity=".4">
              <path d="M475 143h38M475 223h38M475 303h38" />
              <circle cx="518" cy="143" r="3" />
              <circle cx="518" cy="223" r="3" />
              <circle cx="518" cy="303" r="3" />
            </g>
          </svg>
        )}
      </div>
      <figcaption className="signature-caption">
        <span className="signature-index">
          {kind === "Aviation" ? "01" : kind === "Energy" ? "02" : "03"}
        </span>
        <div>
          <span>
            {kind === "Aviation"
              ? "From terminal to tarmac."
              : kind === "Energy"
                ? "Opportunity in motion."
                : "Different strengths. Shared direction."}
          </span>
          <small>
            {kind === "Aviation"
              ? "Assets · Infrastructure · Operations"
              : kind === "Energy"
                ? "Petroleum products · LNG"
                : "Consulting · Brokerage · Coordination"}
          </small>
        </div>
      </figcaption>
    </figure>
  )
}
