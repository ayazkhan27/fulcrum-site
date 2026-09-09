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
`public/fulcrum-logo-shadow-rivet-light.svg` is a web derivative with transparent
background, cropped whitespace and white primary lettering/mountain for navy
surfaces. Geometry, Helvetica wordmark and silver rivet details are retained.
Header and footer share this asset. The old masthead is no longer used in social
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
