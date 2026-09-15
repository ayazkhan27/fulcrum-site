<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Owner-authorized editorial cleanup - 2026-09-15

Subsequent release authorization: on 2026-09-15 the owner explicitly requested
pushing the approved release to GitHub main and checking the automatic Vercel
deployment at fulcrumtriad.com. This supersedes the earlier no-publication
restriction for this release only.

The owner authorized the nine-page audit fixes: remove unnecessary repeated
body copy, standardize sector order, correct heading hierarchy and terminology,
and update stale tests. Preserve approved visual layouts and recent colour,
logo and footer adjustments. This exception permits the targeted editorial
changes without reopening unrelated approved designs. Launch verification is
separate from design approval; no push or publication is authorized.

## Approved Contact closing section - 2026-09-15

The owner approved the final Contact footer locally. Preserve its light
background, dark canonical wordmark enlarged by an additional 5%, unchanged
signature, USA and Bangladesh office details, phone numbers and email. Keep
the supplied illustrated bus on the right, the Fulcrum/Explore links in one
column, Fulcrum aligned with USA Office, and Equipment aligned with the last
Bangladesh address line on desktop. Retain the shortened Edible Oil link and
the registration/scope statement. Do not restore the removed closing CTA or
Connect column. Relevant files: app/contact/contact.css,
components/site/chrome.tsx, and public/assets/fulcrum-branded-bus.jpg.

The subsequent Our People hero colour is light ash grey (#e5e7e9), with black
text and its existing typography and spacing. Preserve that owner-requested
change during the audit cleanup.

## Approved cover page — preserve

### Default website logo — owner confirmed 2026-09-15

The homepage masthead is the canonical website logo. Use the shared Wordmark
component for every website header and footer, preserving its exact mountain
geometry, transparent diagonal gap, spacing and Helvetica lettering. The master
is assets/brand/fulcrum-website-master.svg, identical to the approved homepage
asset public/fulcrum-logo-shadow-dark.svg. The light variant changes only colours
for contrast on navy backgrounds. Preserve existing sizes and the footer's
separate signature. Generate variants with scripts/build-brand-assets.mjs and
verify scripts/brand-mark.test.mjs. Do not substitute the older livery artwork.

The owner approved the current homepage cover as final on 2026-09-13.
Do not change its appearance, layout, assets, typography, colors, spacing,
navigation placement, or paper-plane animation unless the owner explicitly
requests a cover-page change. This also applies to shared styles/components
when editing other pages. Preserve the Padrinan sky background, current logo
treatment, and the two-line “Precision / in motion” headline without a period.

## Approved Our Mission page — preserve

The owner approved the current Our Mission page as final on 2026-09-13.
Preserve its copy, layout, connection graphic, typography, colors and alignment
unless the owner requests a change to this page. The page-specific files are
app/mission/page.tsx and app/mission/mission.css. Shared-component changes must
also preserve its approved appearance.

## Approved Aviation & Airports page — preserve

Latest owner change: keep only the approved Aviation hero and header, with
nothing below the hero (no subnavigation, capability sections, transaction
sections or footer). Preserve both hero images, attribution and contact link.
The former transaction fragment resolves to the hero for legacy links.

The owner approved the current Aviation & Airports page as final on 2026-09-13.
Preserve its copy, typography, colors, spacing and two-box image layout unless
the owner requests changes to this page. This includes app/aviation/page.tsx,
app/aviation/aviation.css, public/aviation-boeing-curated.svg and the aviation
branch in components/site/capability-page.tsx. Shared changes must preserve
its approved appearance.

Owner-requested exception: move the interactive connected-node explorer out
of Aviation and onto the existing Contact page, generalized to Consulting,
Sourcing, Representation, Negotiation and Coordination. Pair it with the
enquiry form and retain the nine-page structure. This does not authorize
changes to Aviation's approved hero, imagery or aircraft-transaction content.

The owner subsequently selected Diego Delso's Madrid-Barajas Terminal 4 photo
for the lower airport image. Preserve the upper aircraft illustration and
two-box layout; retain the photographer, source and CC BY-SA 3.0 links with
the displayed crop notice. Asset: public/assets/madrid-barajas-terminal-4-diego-delso.jpg.

## Approved Energy & Petroleum page — preserve

The owner approved the current Energy & Petroleum page as final on 2026-09-13.
Preserve its copy, typography, colors, spacing, barrel and LNG image pairing,
photo credit, and deep moss green tagline unless the owner requests changes.
This includes app/energy/page.tsx, app/energy/energy.css, the LNG photo asset,
and the Energy rendering in components/site/capability-page.tsx. Shared
changes must preserve its approved appearance.

## Approved Textile & Mill Supply page - preserve

The owner approved the current Textile & Mill Supply page on 2026-09-14.
Preserve its copy, white background, spacing, alignment and image order unless
the owner requests changes. Keep the cotton image above the supplied golden
fabric photograph (nomevisualizzato-folds-4397703.jpg). Preserve the justified
14px muted-blue introduction and the separate US cotton-sourcing paragraph
in 18px Helvetica Neue Thin (weight 200), cobalt blue (#0047ab).
The page-specific files are app/sectors/[slug]/page.tsx (Textile branch) and
app/sectors/[slug]/sectors.css. Changes to components/site/capability-page.tsx
and lib/asset-library.ts must also preserve this approved appearance.
This approval is saved locally; it does not authorize a push or deployment.

## Approved Edible Oil & Commodities page - preserve

The owner approved the current Edible Oil & Commodities page on 2026-09-14.
Preserve its wording, layout, image, spacing and typography unless the owner
requests changes. Keep the light-blue hero background (#e6f0f8), white image
box and single supplied oil-cruet illustration. Preserve the justified 15px
introduction in muted blue (#52677c), with the last line left-aligned.
The owner subsequently requested italic text and tighter spacing: preserve
font-style italic, line-height 1.3 and letter-spacing -0.015em.
Keep the section label at its approved upper position and the
headline and introduction shifted up 16px. The bold list under IN FOCUS is
dark coffee brown (#4b3621); its first item reads "Edible oils, primarily
soybean and corn oil, crude or refined".
Relevant files are app/sectors/[slug]/page.tsx (Commodities branch),
app/sectors/[slug]/sectors.css, lib/sectors.ts and
components/site/edible-oil-visual.tsx. Changes to shared components, including
components/site/capability-page.tsx, must preserve this approved appearance.
This approval is saved locally; it does not authorize a push or deployment.

## Approved Spares & Equipment page - preserve

The owner approved the current Spares & Equipment page on 2026-09-14.
Preserve its wording, layout, spacing, typography and imagery unless the owner
requests changes. Keep the "Spares & Equipment" heading and raised
"Fulcrum / Spares & Equipment" label, sterling-silver hero background
(#cbd4df), and black right-hand box with light text. Preserve the introduction
beginning "From replacement bearings to heavy equipment for warehouses and
production lines". The owner subsequently selected Andrew Basterfield's
Rolls-Royce Avon cutaway photograph to replace the steampunk vehicle image.
Keep the cutaway displayed without cropping or colour filters, with its
linked photographer credit and CC BY-SA 2.0 licence. The IN FOCUS entries are
"Aircraft engines & spares", "Ground support equipment" and
"Government & defense procurement".
Relevant files are app/equipment/page.tsx, app/equipment/equipment.css,
lib/asset-library.ts and public/assets/rolls-royce-avon-cutaway-andrew-basterfield.jpg.
Shared styles and components must preserve this approved appearance.
This approval is saved locally; it does not authorize a push or deployment.
