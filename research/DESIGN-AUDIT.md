# FlyHyer reference study and Fulcrum direction

Inspection: 8 September 2026, New York time. This is a design study, not a copy of the reference site.

## Coverage and evidence

The accompanying `flyhyer-inventory.json` inventories every URL in the public
sitemap plus current navigation destinations: status, final destination, heading
structure, image descriptions, links and HTML asset references. The current
homepage, Solutions, About, Travel, Stays, Contact, News, navigation drawer,
legacy Shared Flights and Shared Ownership, policy and article templates were
also visually inspected. Hero motion was compared while scrolling and against
the public homepage JavaScript. This is not a claim to have inspected every
possible dynamic page, third-party redirect, binary asset or transaction state.
No forms were submitted and no bookings or payments were initiated.

Sources: [homepage](https://www.flyhyer.com/),
[Solutions](https://www.flyhyer.com/solutions),
[About](https://www.flyhyer.com/about-us),
[Travel](https://www.flyhyer.com/travel),
[Stays](https://www.flyhyer.com/stays),
[Contact](https://www.flyhyer.com/contact),
[News](https://www.flyhyer.com/news),
[sitemap](https://www.flyhyer.com/sitemap.xml).

## What creates the visual character

| Element | Observed design | Fulcrum application |
| --- | --- | --- |
| Type | HelveticaNowDisplay, bold headings, regular body, tight display spacing | Swiss-style display stack; preserve local Avenir 16px body. Do not copy font files. |
| Composition | Large brand anchor, narrow explanatory columns, generous margins | Strong masthead, precise headline, concise right-hand context. |
| Hero | Large canvas aircraft, pale atmosphere, quiet controls | Equally prominent Aviation and Energy imagery; no private-charter positioning. |
| Photography | Aerial views, destination scale, cropped detail, portrait cards | Original aircraft-apron and coastal-energy aerial imagery, not claimed assets. |
| Color | Black/white foundation, sky blue, muted terracotta, sage | Cobalt, midnight navy, sterling and white; differentiated verticals within one identity. |
| Rhythm | Large image blocks alternate with quiet text; fine dividing rules | Deliberate large/small changes in scale, consistent spacing and readable lists. |
| Shapes | Circular controls, pill buttons, selected large curved corners | Limited rounded architectural corners; avoid rounding every panel. |
| Motion | Delayed reveals, image crops, canvas movement, drawer transition | Progressive enhancement, restrained image drift and cursor response; no content hidden by default. |
| Navigation | Small top navigation plus a large right-side drawer | Six explicit top-level destinations, accessible mobile disclosure. |
| Depth | Photos and the model carry dimension; decoration stays secondary | Original imagery and selective SVG diagrams that explain actual work. |

## Why does the aircraft appear to stretch?

### Verified live rendering, 9 September 2026

The live homepage contained zero video elements and one full-viewport canvas.
Its public homepage bundle
`/_next/static/chunks/pages/index-93398794e971d1e5.js` uses React Three Fiber and
Three.js, loads a Cessna glTF model, builds a sky shader, and places translucent
cloud-image planes at different depths. Elapsed-time sinusoids animate the jet
and clouds independently of scroll. The outer aircraft group has fixed rotation
`[.2,2.4,-.05]`; its internal time/scroll translations produce a shallow pass.
This is evidence of live 3D, not a prerecorded opening video. These implementation
details are observations, not a license to reuse Hyer's assets or source.

Fulcrum uses Three.js directly, lazy-loaded on the homepage, for its licensed
paper-plane mesh, light and perspective. A real licensed sky photograph and
independently moving CSS mist supply the atmosphere. It is a hybrid scene, not a
claim that text or the sky photograph is volumetric 3D. The object floats without
scrolling; scrolling approaches and passes right without a turn or downward dive.
The model stays uniformly scaled. Pause, reduced-motion, hidden-tab and offscreen
handling are separate requirements, not optional visual polish.

The user-supplied
[Active Theory Paper Planes repository](https://github.com/activetheory/Paper-Planes-Android-Experiment)
documents WebGL, worker-based flocking and Three.js morph targets. Its README
explicitly says it does not contain the complete production experience. Those
multi-plane, folding and Android features are not required for this single fixed
dart. Fulcrum uses the maintained MIT
[Three.js library](https://github.com/mrdoob/three.js) directly, with its own small
motion controller and licensed CC0 mesh. No unsupported claim of copying a full
Active Theory flight engine is made.

The homepage uses a glTF Cessna Citation X model rendered into a canvas. The
public animation changes position and Euler rotation using elapsed time and
scroll offset. Its outer scale is uniform and responsive to viewport width,
not an animated unequal X/Y stretch. The apparent length change is consistent
with perspective, rotation and the model passing across the viewport.

Interpretation, not a claim about the designer's stated intent: this makes the
aircraft feel physical, adds a sense of travel and draws the eye through the
opening. Fulcrum should use camera-like movement without distorting equipment
or letting an effect interfere with navigation or reading.

## Things not to inherit

- Several sitemap entries return a visible Error 404 with HTTP 200. Fulcrum
  should use real redirects and correct not-found status.
- `/on-demand` redirects to `/travel`; `/ownership` to `/stays`. Some existing
  homepage links still use those older paths. Fulcrum should link canonically.
- The sitemap includes legacy campaigns and checkout states. Keep Fulcrum's
  sitemap limited to current public content, not transaction confirmations.
- The current homepage mixes revised travel/stays language with older
  membership and aircraft-ownership sections. Fulcrum's two verticals need
  consistent boundaries and no accidental conflation.
- Initial image blurs and delayed reveals can briefly leave empty-looking
  sections. Fulcrum content must remain available without animation.
- FlyHyer loads multiple analytics/advertising services. None are added here.
- Do not import private-travel lifestyle promises, third-party testimonials,
  counts, qualifications, rights, photography, model files or font licenses.

## Fulcrum baseline

GitHub `origin/main` fetched and inspected: `0493726390c94843f9fa96932001515168d2b8b3`.
The GitHub Vercel status reports a successful deployment for this commit.
The live apex domain responds HTTP 200 from Vercel. Main positions Fulcrum
primarily as a widebody-placement intermediary; the local redesign has not been
committed or published. Earlier staged and unstaged work is preserved.

Review branch: `ceocrossroads/fulcrum-editorial-review`.

## Information architecture

Primary navigation: Aviation, Energy, Consulting, Brokerage, People, Contact.
Shared capabilities remain available from the homepage and footer.

- Aviation: aircraft and engine transactions, maintenance/MRO, parts,
  ground-support equipment, airport systems, catering, cargo, training,
  security, civil and defense requirements.
- Energy: petroleum products and LNG, advisory, introductions, negotiation
  support, documentation/delivery coordination, logistics and infrastructure.
- Shared: consulting, sourcing, brokerage, due diligence coordination,
  negotiation support, project coordination and compliance-screening support.
- Aircraft placement becomes a nested Aviation page. Legacy `/method` redirects
  so existing bookmarks and search links continue to work.

## Claims and role boundaries

The owner describes the business as nascent and asks to include the broad scope
conservatively. Present scopes that can be discussed, not a proven trading
history. Use independent advisor and transaction intermediary as the baseline.
Representation, authority, remuneration, counterparties and deliverables must
be defined per engagement. Do not claim existing mandates, already verified
suppliers, commodity title-taking, guaranteed financing, approvals, successful
transactions or owned assets. Success-fee arrangements may be discussed but
must not be presented as universal. Principal trading requires separate scope,
authority, arrangements and professional review; it is not the default service.

Legal, engineering, inspection and regulatory conclusions remain with qualified
professionals. Compliance copy describes a workstream, not a certification or
guarantee. No fabricated clients, offices, deal counts or testimonials.

## Release gate

Review locally, validate keyboard/mobile behavior and production build, stage
changes on the review branch. Do not commit to main, push, or deploy without
the owner's approval. Contact delivery remains an email draft, not a backend
submission. Production addresses and individual credentials require owner
confirmation before release.
