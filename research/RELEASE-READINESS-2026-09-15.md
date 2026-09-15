# Fulcrum release readiness

15 September 2026

## Verdict

The local release candidate passes the scoped release checks and is ready for deployment. It is not yet signed off as the live production site: publication and post-deployment verification remain outstanding. No commit, push or publication was performed during this cleanup.

Fulcrum provides sourcing, representation, advisory support and commercial coordination, connecting Bangladesh with international suppliers and buyers.

## Nine-page summary

| Order | Page | Purpose and outcome |
| --- | --- | --- |
| 1 | Home | Introduces Fulcrum. Replaced the duplicated full service accordion with a summary and Mission link. Sector order now begins Aviation, Energy, Textiles while preserving two featured cards. |
| 2 | Mission | Definitive explanation of services and responsibilities. Reduced repeated team credentials and corrected metadata punctuation. |
| 3 | Our People | Team experience and expertise. Corrected heading hierarchy and repeated team-note wording; preserved light-ash hero and card appearance. |
| 4 | Aviation & Airports | Aircraft, engines, MRO and airport systems. Specialist content retained after review. |
| 5 | Energy & Petroleum | Petroleum/LNG sourcing and coordination. Standardized fossil-fuel terminology. |
| 6 | Textile & Mill Supply | Textile inputs and mill requirements. Differentiated lower headings and coordination copy from Edible Oil. |
| 7 | Edible Oil & Commodities | Oil specifications and shipment coordination. Differentiated lower copy and retained the approved soybean spelling. |
| 8 | Equipment | Industrial, medical and government procurement support. Removed repeated industrial introductory wording. |
| 9 | Contact | Service selection, unsent email preparation and office details. Preserved approved footer; verified draft encoding and keyboard interactions. |

Navigation and sitemap use the same nine-page visitor journey. Shared navigation, branding and scope disclosures remain intentionally consistent, rather than being removed as duplication.

## Verification

- Production build and TypeScript: passed.
- Full lint: passed.
- Regression tests: 26/26 passed, including corrected footer assertion and new order/heading/redirect safeguards.
- Scoped structural audit: passed for all nine routes, internal anchors, canonical URLs, sitemap and eight legacy redirects.
- Desktop 1280px and mobile 390px: no page-level horizontal overflow on any of the nine pages.
- People mobile hero remains readable with black text on light ash.
- Contact service tabs: arrow-key selection verified; navigation closes with Escape and restores focus.
- Enquiry draft: special characters encoded correctly, selected service included, stale draft removed after editing. No email was opened or sent.
- Added www-to-apex permanent redirect; locally verified path and query preservation. This takes effect only after deployment.
- Whitespace/diff check: passed.

These are scoped checks, not a comprehensive accessibility certification or proof of mailbox delivery.

## Owner confirmations

The owner confirmed working mailboxes, website-use rights for supplied imagery and Avenir fonts, and accuracy of team qualifications and experience. This is recorded in FACT-CHECK.md as owner confirmation, not independent documentary verification.

## Live launch gate

The read-only public-site check during this review found 404 responses for Contact, Equipment, Edible Oil and sitemap, and no www-to-apex redirect. These findings concern the existing public deployment, not the passing local build.

After authorized deployment, verify all nine public routes, eight legacy redirects, www-to-apex behavior, HTTPS, sitemap/canonicals and the enquiry workflow on the deployed domain. Until then, the live site is not production-signed-off.
