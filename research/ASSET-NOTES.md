# Asset provenance

## Current opening: non-AI assets, 9 September 2026

This section supersedes all earlier paper-plane attempts below. No AI-generated
image is used in the current opening. Two rejected generated opening images were
removed from `public` and retained outside the repo for recoverability. Earlier
illustrative sector images further down the website are still disclosed as such.

Latest owner refinement: the paper material is teal (`#58a1aa`), replacing moss
and the initial off-white material noted in the conversion history below. It uses the
same manually created geometry, real-time lighting and matching SVG fallback.

The owner-selected `fulcrum-airport-hero.png` now appears in the main Aviation card.
Its former lower-page “Aviation / A closer look” feature was removed to avoid
duplicating aviation emphasis. This reuses an existing disclosed illustration;
no new image was generated and the source asset remains unchanged.

### Real sky photograph

- Photographer: Johann Piber.
- Source: https://www.pexels.com/photo/white-and-blue-cloudy-sky-695657/
- License: https://www.pexels.com/license/ (Pexels License, not CC0).
- Download: https://images.pexels.com/photos/695657/pexels-photo-695657.jpeg?auto=compress&cs=srgb&w=2400
- Local: `public/sky-johann-piber.jpg`, 2400 × 1800.
- SHA256: `ab48a37d8ac736e147ce23eab4643117ff1f872bd2dac1bd352be9b8a585b541`.
- Treatment: browser-only desaturation, lightening and gradient integration;
  slow independent CSS movement. The underlying file is a stock photograph,
  not generated cloud imagery. CSS mist layers supplement its movement.

### Human-created 3D paper airplane

- Artist: Clint Bellanger, published 2 July 2010; modeled by manually folding
  an A4-sized rectangle in Blender according to the author's description.
- Source and CC0 grant: https://opengameart.org/content/paper-airplane
- Original file: https://opengameart.org/sites/default/files/paper_airplane_0.blend
- Preserved source: `research/source-assets/paper-airplane-clint-bellanger.blend`.
- SHA256: `8c9f782e413f83da4940f9c2335f9422690dc86e8a10c1172aa999c8c29ab748`.
- Conversion: read the Blender 2.49 MVert/MFace blocks with blender-asset-tracer
  1.20, a build-time-only tool. Sixteen original vertices and fourteen polygons
  become sixteen triangles. Coordinates map from `(x,y,z)` to
  `(x*.55,(z-.65)*.55,(y-.75)*.55)`, rounded to seven decimals. No mesh dimensions
  are independently stretched. The texture is not copied; an off-white rough
  paper material is assigned in Three.js. This is a manually modeled object,
  not a photographic scan or a physically validated aircraft.
- Runtime geometry: `lib/paper-plane-model.ts`; matching downloadable derivative:
  `public/paper-plane.obj`. Three.js 0.185.0 is MIT licensed.
- Lighting and perspective are real-time WebGL. Continuous low-amplitude idle
  translation and attitude variation are separate from the fixed-attitude scroll
  approach. The sky is composited CSS photography, not volumetric 3D weather.
- Hyer's proprietary model, cloud image, font binaries and source code were not
  copied. Its implementation was inspected as a design reference only.

### Current masthead

The homepage uses an oversized HTML Helvetica-family Fulcrum wordmark with no
rectangular bar. Interior pages and the footer retain the owner's supplied rivet
identity. No FlyHyer logo or commercial font file is redistributed.

## Earlier iteration notes (historical, not the shipped opening)

## Paper-plane scroll sequence

Latest refinement: narrowed dart geometry (8 vertices / 6 faces), span 3.44,
length 6.6, deep 1.25-unit keel and raised wing-edge folds. These are visual
paper-aircraft proportions, not an aerodynamically validated design. Orientation
is fixed at the prior end-of-turn attitude (pitch .15, yaw .16, bank .18 radians);
scrolling changes position and perspective distance only. Independent critic
review was requested but the agent hit a usage limit before scoring. No 9/10
approval is claimed.

Current version supersedes the flat-vector approach below: an original six-vertex,
four-face 3D folded mesh is defined in `lib/paper-plane-model.ts` and exported as
`public/paper-plane.obj`. A small perspective renderer projects depth-sorted
triangles into SVG, including orientation-dependent face lighting. No external
model, license dependency or WebGL runtime is required. The nose points along +Z
toward the camera. Base materials retain the reference teal (#58a1aa/#42898d).
Scroll travel is reduced from 130vh to 55vh (about 2.36x sensitivity), with a
faster damped spring. Reduced motion uses the same 3D model at a static pose.

The user supplied a teal paper-plane PNG. Its four flat folds were manually
reconstructed as transparent vector polygons in `components/site/paper-flight.tsx`,
preserving the supplied silhouette and colors rather than copying a Hyer asset.
CSS perspective and a damped spring animate scale, banking and translation as
the user scrolls. This is a 2.5D treatment of flat artwork, not a volumetric model.
The flight reverses on upward scrolling, stops updating when settled, cleans up
on unmount and becomes a compact static composition with reduced motion or no JS.
The Explore Fulcrum link bypasses the sequence. No scroll events are intercepted.

## Current logo

The owner supplied `fulcrum-logo-shadow-rivet.svg` to replace the earlier masthead.
The source is preserved byte-for-byte as `public/fulcrum-logo-shadow-rivet-original.svg`.
The homepage uses `public/fulcrum-logo-shadow-dark.svg`; interior headers and
footers use `public/fulcrum-logo-shadow-rivet-light.svg`. At the owner's request,
the website has returned to its earlier mixed-case Helvetica `Fulcrum` masthead,
with the two mountains and their approved proportions and gap. The site master
is `assets/brand/fulcrum-website-master.svg`; dark and white variants adapt its
colors for contrast. There is no under-logo slogan in the page headers. The
footer reuses the bus's exact outlined italic `Precision in motion.` signature
and three speed strokes via `public/fulcrum-signature-white.svg`, replacing the
previous plain-text tagline. The former `Global sourcing and representation.
Bangladesh and beyond.` description now opens the lower footer scope paragraph,
not the logo block. The signature is right-aligned beneath the final `m` of its mixed-case
name. The footer logo is 10% larger (264px desktop, 220px below 1100px), while its
visible mountain edge still aligns with `Let's move forward.` above. Page headers
are unchanged. The uppercase name remains reserved for the bus/livery version.
All variants have transparent backgrounds and no rivet details.
After approving the restored website masthead, the owner moved only its mountain
group one step left, then 8px right. Its current translation is 9 SVG units,
approximately 8px right of the previous placement at the 884px preview width.
The Helvetica name, mountain geometry and gap, and bus master remain unchanged.
On 2026-09-13 the owner supplied `exec-c1f1bf91-ddac-4de4-94be-3c930825edec.png`
as the reference for the mountains: the diagonal separation is essential and
must remain transparent negative space, never overlapping shapes or a painted
separator. All active SVG variants share this separated geometry.
The owner's follow-up enlarges the smaller mountain uniformly by 5%, anchored
at its bottom-right corner. This keeps the baseline and lettering clearance
unchanged, narrowing the gap at the baseline from 5 to 3.175 SVG units.
The next requested 5% enlargement compounds to 10.25% over the initial size.
This second adjustment is anchored at the inner baseline corner to preserve
the 3.175-unit gap rather than reducing it to a fragile hairline. Lettering,
the larger mountain and the overall logo placement remain unchanged.
The bus/livery master is `assets/brand/fulcrum-master.svg`. Its name and signature
outlines were traced deterministically from the owner's supplied reference
lettering using [Potrace](https://github.com/tooolbox/node-potrace). They are
actual vector paths, not substitute fonts, embedded bitmaps or generated imagery.
Tracing was a one-off asset-preparation step outside the app dependencies.
`public/fulcrum-logo-white.svg` provides the same complete lockup in white for
livery and other colored surfaces. The bus version uses the same approved
mountains and reference lettering; front branding is intentionally absent.
Keep website and bus lettering separate. After editing the appropriate master, run
`node scripts/build-brand-assets.mjs`, then `node --test scripts/brand-mark.test.mjs`.
The shared `Wordmark` component serves all page headers and footers with the
restored 595 by 112 canvas. The approved mountain sizes and diagonal separation
are retained, and standalone hero copy is unchanged. Legacy SVG filenames are
retained so existing asset URLs keep working.
The original supplied SVG above remains an unmodified archive, not a live asset.
The old masthead is no longer used in social
metadata, which uses illustrative aviation imagery instead (SVG sharing support
varies). Earlier masthead-preservation notes below describe the previous version.

## Surface integration update

Photos now use CSS alpha masks at their edges and consistent restrained
saturation. The Aviation and Energy hero images fade into the same silver
surface. Homepage panel text remains on a light base; upper labels have their
own translucent backing for contrast. Transaction imagery dissolves horizontally
on desktop and vertically on mobile. Original raster files are unchanged.

Two built-in background-extraction attempts returned opaque RGB images with a
painted checkerboard (`sips hasAlpha: no`). Neither was installed in the site.
This is browser-level edge transparency, not a claim that the photos are
subject-isolated transparent PNGs. Existing vector artwork remains transparent.

Created with the built-in image-generation tool for this redesign. They are
illustrative compositions, not documentary evidence of Fulcrum-owned assets,
facilities, clients or completed transactions. Captions and the footer disclose
that distinction. Next Image supplies responsive optimized derivatives.

## Final assets and prompt direction

- `public/aviation-aerial.png`: overhead editorial view of a generic unbranded
  white passenger aircraft, diagonal across a pale silver airport apron, cool
  blue shadows, generous negative space, realistic aerial composition, no text,
  airline logos or claims of asset ownership.
- `public/energy-terminal.png`: editorial aerial coastal LNG terminal with white
  storage tanks, blue sea, diagonal loading jetty and vessel, restrained cool
  palette, no corporate marks or text, no representation of a Fulcrum facility.
- `public/fulcrum-airport-hero.png`: earlier generated generic passenger aircraft
  at an airport terminal, used as a lower-page illustrative transaction feature.

The directions above summarize the generation prompts rather than purporting
to reproduce unavailable exact tool-call text. No FlyHyer image or 3D model was
used as an input or copied into the repository.

## Preserved identity

`public/fulcrum-masthead.png` is the user's supplied calibrated master, unchanged.
SHA256: `09dc49d5a92af803cc6645524f43ba4f1e25f696d1c64cd5a5bae71c4e4b72ab`.
The canceled aircraft cutout was not applied.
