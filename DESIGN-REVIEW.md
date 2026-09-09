# Fulcrum redesign

Review branch: `ceocrossroads/fulcrum-editorial-review`.

## Latest owner adjustments

The paper plane is teal (`#58a1aa`), superseding moss. The main Aviation card now
uses the existing airport-terminal image previously shown under “Aviation / A
closer look”. That duplicate lower homepage feature and its unused CSS have been
removed; the dedicated aircraft/engine page remains accessible under Aviation and
in the footer. No image files or destination pages were deleted. The overview
heading explicitly uses Helvetica. Aviation and Energy retain equal primary cards.

## Live 3D opening, final review on 9 September 2026

Earlier owner refinement after that review: the plane material was muted moss
`#65744e`, including the no-WebGL fallback. The homepage wordmark uses medium
weight and -0.025em tracking instead of the tightly packed -0.085em bold version.
The critic subsequently retained 9/10 for the supplied moss-plane composition
and mobile masthead. The primary agent also visually verified the full desktop
masthead, which was not visible in the critic's latest cropped desktop frame.

This section supersedes earlier opening, model, sky and header descriptions.
The homepage now uses an oversized open Fulcrum wordmark, a real Pexels sky
photograph and a CC0 human-created folded paper-plane mesh. Asset source links,
licenses, hashes and conversion details are in `research/ASSET-NOTES.md`.
No AI-generated image is used in this opening; older sector illustrations remain
elsewhere and are disclosed. The owner's rivet identity remains on interiors and
the footer. The model is intentionally folded paper, not a photographic scan.

Three.js is lazy-loaded and renders the real 3D mesh with directional and
hemisphere lighting. It floats continuously without scrolling, with small bounded
translation, pitch and bank. The scroll path has a constant base attitude, uniform
scale and forward/right movement with no downward dive. Perspective supplies
enlargement. The 55vh approach is reversible, spring-smoothed and never hijacks
scrolling. The photographic sky and CSS mist drift independently. This is not
volumetric weather, a prerecorded video, or a physics-certified flight simulation.

The named review-agent workflow prompted an independent read-only critique. Its
offscreen/tab-return lifecycle finding was fixed. Browser testing additionally
found that `overflow: hidden` could scroll the stage internally when focusing the
pause control; `overflow: clip` fixes the visible sky-edge strip. The critic's
final visual-design assessment is 9/10 for desktop entry, approach and 390px mobile,
with no additional findings at 320×568 or 844×390. That is not an independently
measured frame-rate score or an objective claim of superiority to FlyHyer.

Latest checks:

- Production build, TypeScript, ESLint and all four flight unit tests passed.
- Unit tests cover stock mesh/export integrity, a non-diving uniformly scaled
  approach, SVG/WebGL projection parity and spring stability at different rates.
- Nine-route source/HTTP audit passed, including heading order, metadata,
  landmarks, image attributes, fragment links, legacy redirect and no em dashes.
- Browser verified the live WebGL renderer, advancing idle clock at zero scroll,
  pause holding the clock and sky, resume, resize continuation, close pass,
  desktop/mobile/landscape composition, and 320px menu opening/Escape.
- Reduced-motion and hidden-tab handling were source-reviewed but not separately
  media-emulated in this round. The critic inspected saved actual browser frames;
  its own browser connection was unavailable.

The existing npm deployment workflow is preserved. `package-lock.json` adds only
Three.js and its root dependency declaration; no unrelated locked versions are
changed. Development-only pnpm lock/config files were moved outside the repo.
Changes are staged on the review branch, not committed, pushed or deployed.

## Editorial review, 9 September 2026

This update supersedes the earlier visual direction described below. The homepage
now pairs an oversized editorial headline with equal Aviation and Energy image
panels, shared-capability disclosures, and an original silver connection diagram.
Original generated aerial imagery replaces the former sector hero sculptures.
Capabilities retains its glass composition; Consulting and Brokerage retain
their distinct technical artwork. The supplied masthead remains unchanged.

The reference audit and route inventory are in `research/DESIGN-AUDIT.md` and
`research/flyhyer-inventory.json`. No FlyHyer photographs, model or licensed font
files were copied. Headings use a Helvetica-family system fallback stack, not an
embedded copy of FlyHyer's commercial Helvetica Now Display font. Body text is
locally served Avenir at a 16px baseline.

Aircraft and engine work now lives at `/aviation/aircraft-engine-transactions`.
The former `/method` route redirects there. Energy representation, fees and
principal-trading boundaries are disclosed as engagement-dependent matters.

Latest verification: production build including TypeScript and ESLint passed.
All nine content routes passed horizontal-overflow checks at 320, 390, 768 and
1024px. At 390px each had one H1, a main skip target, canonical metadata and no
rendered em dashes. Mobile menu opening and Escape, Aviation arrow-key tabs,
exclusive homepage disclosures, required enquiry validation, draft preparation
and invalidation after editing were exercised. No email was sent. Desktop and
mobile hero compositions were visually inspected. Reduced-motion handling is
implemented in CSS and the motion controller, but was not media-emulated in this
round. The local development origin is explicitly allowed for loopback preview.

All release work remains on the review branch, with no production publication.

## Earlier iteration notes (historical)

## Direction

An original cobalt, navy and sterling-silver design informed by FlyHyer's
spacious composition and clear hierarchy. The supplied calibrated Fulcrum
masthead and its “precision in motion” tagline are retained. CSS blending
integrates its dark background with the header and footer without changing
the source artwork.

Avenir is served locally with a 16px (12pt) body baseline. An original,
lightweight SVG globe and sector illustrations give the site a visual identity
without depending on stock photography. Animation respects reduced-motion
preferences.

Aviation and energy receive equal prominence. Aviation includes aircraft,
engines, MRO, airport equipment and operating subsidiaries, with civil and
military scope. Energy includes petroleum products and LNG for clients within
and outside aviation.

## Review

Run `pnpm dev` and open http://127.0.0.1:3000.

- Homepage: brand, sector links, capabilities, approach and people.
- Aviation, energy, consulting, brokerage and services: consistent detail pages.
- People: balanced profile cards, short introductions and expandable biographies.
  The founding principal's full career is available in an optional disclosure.
- Aircraft-placement method: existing substantive material retained.
- Aviation: keyboard-accessible interactive capability diagram and the slogan
  “From terminal to tarmac.” with natural wrapping and generous separation.
- Distinct signature artwork: a metallic aircraft and airfield for Aviation,
  interwoven energy conduits for Energy, and layered glass planes for Capabilities.
  These are symbolic compositions, not depictions of owned assets or facilities.
- The homepage's existing sector illustrations are retained. Consulting and
  Brokerage keep their discipline-specific technical artwork.
- Cursor-responsive depth and soft lighting on signature artwork; restrained
  highlights on sector, capability and people cards; link and button feedback;
  single-entry section reveals. Touch users do not need hover to access content.
  Reduced-motion preferences disable movement, and content stays visible without
  JavaScript. No animation library or additional image downloads were introduced.
- Contact: addresses, expandable FAQs and an enquiry composer.

The enquiry composer validates required fields and prepares a mailto draft.
It does not submit to a backend or claim an enquiry has been sent. Sending
requires an email application. Editing a field invalidates the previous draft.

## Validation

- Production build, TypeScript and ESLint passed.
- All nine content routes checked at 390px for horizontal overflow, a single
  primary heading, skip-link target and canonical URL.
- Desktop and mobile composition inspected in the browser.
- Enquiry drafting, invalidation after editing, and FAQ expansion exercised.
- Aviation tabs checked with mouse and arrow-key navigation.
- New signature compositions visually inspected at desktop and mobile sizes;
  cursor depth and pointer-exit reset exercised. All nine mobile pages rechecked
  after the interaction update, with no horizontal overflow or browser errors.
- No em dashes in rendered copy across all nine content pages.
- Sitemap, robots metadata and branded not-found page included.
- GitHub main checked: no newer commits relative to this branch's base.

## Release

Changes are staged locally for review. No commit, push, merge or deployment
was performed. The existing GitHub-to-Vercel production workflow remains in
place; release through main only after design approval. Previously removed
media remains recoverable in Git history.

The proposed aircraft cutout was cancelled. The site continues to use the
original masthead, byte-for-byte identical to the supplied master.
