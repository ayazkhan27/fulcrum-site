# Independent design review — Fulcrum and FlyHyer

Reviewed 9 September 2026. Scores are an independent reviewer's design judgment, using weights fixed before reviewing the revised Fulcrum site. They are not an objective certification or a formal accessibility/performance audit.

| Category | Maximum | FlyHyer | Revised Fulcrum |
|---|---:|---:|---:|
| Visual composition | 25 | 23 | 23 |
| Typography | 15 | 13 | 14 |
| Usability and responsiveness | 20 | 17 | 18 |
| Content clarity | 20 | 15 | 18 |
| Imagery | 10 | 9 | 8 |
| Accessibility and functionality | 10 | 6 | 8 |
| **Total** | **100** | **83** | **89** |

Fulcrum exceeds this benchmark by **6 points**, meeting the requested margin of at least 5 and the 88-point threshold. This does not mean Fulcrum is superior in every category: FlyHyer retains an imagery advantage.

## Scope and method

FlyHyer was inspected directly through browser interaction and screenshots at desktop and 390×844 mobile sizes. The review covered the homepage, Solutions, About, Contact, Travel, Stays, News and expanded navigation; mobile checks covered the home, content stack, Stays and menu. No enquiry was submitted. The [live homepage](https://www.flyhyer.com/) was also checked through web extraction.

Fulcrum was reviewed independently through current source and screenshots produced by the functional QA agent. Direct browser access became unavailable in this reviewer's context, so this report does **not** claim direct local browser interaction. Desktop/mobile screenshots covered home, Services, Aviation, Energy, Textiles, Commodities, Industrial, Healthcare, Defense, People and Contact. Full-page views, viewport views, natural hero-scroll captures and a mobile footer capture were examined. The QA agent supplied successful checks for all 14 routes, 42 header/overflow checks at 375/884/1280 widths, and a 618-link crawl. The implementation agent reported passing production build and TypeScript checks.

Screenshots used during review are in `/tmp/fulcrum-review/`; these temporary files may not persist. Source and the implementation's QA artifacts provide the durable record.

## FlyHyer assessment

The design is visually confident: oversized typography, deliberate asymmetry, generous whitespace, photographic transitions and a restrained interface create a coherent identity. Mobile simplifies the composition cleanly without observed clipping.

The current live content is less consistent than the visual design. The homepage's “Modern Stays” section describes aircraft ownership; some content destinations and page titles retain earlier aviation positioning. Several image descriptions are raw URLs or placeholders, header buttons lack accessible names in the accessibility tree, and heading ranks skip. Small pale body copy also weakens readability. These observed issues explain the deductions rather than a preference for Fulcrum's brand or business.

## Fulcrum assessment

- **Visual composition, 23/25:** A more vibrant sky, silver aircraft, bold masthead and blue/gold content palette form a coherent system. The staggered photo pair, sector index and alternating editorial sections create clear rhythm. The corrected aviation/energy spacing now matches the rest of the site. The page remains long, with some template repetition.
- **Typography, 14/15:** Helvetica Bold and Condensed Bold provide a consistent hierarchy. Mobile body text is more readable after increasing the sector descriptions. Some long bold introductory paragraphs could be tightened further.
- **Usability and responsiveness, 18/20:** Persistent desktop About/Services/Contact links improve wayfinding across routes. Mobile layouts and menus fit the tested widths. The hero transition now retains the plane until the next content enters instead of leaving an empty-sky interval. Enquiries clearly prepare an email draft, but still depend on the visitor's email application.
- **Content clarity, 18/20:** The site now explains Bangladesh market connections, manufacturer representation and the broader sourcing business. Aviation, energy, textiles, commodities, industry, healthcare and public-sector/defense requirements are distinguished with specific scope descriptions. Representation, responsibility and remuneration are stated plainly. More verified examples of completed work would strengthen evidence of capability; none were invented for this redesign.
- **Imagery, 8/10:** User-supplied photography receives the strongest editorial positions. Object illustrations are used as smaller insets with useful scope information. The permitted asset set is fully represented and relevant; its mixed photographic/illustrative quality is less consistently premium than FlyHyer's collection. Healthcare appropriately uses typography where no relevant supplied photograph exists.
- **Accessibility and functionality, 8/10:** Named navigation controls, semantic headings, meaningful image descriptions, form labels and a clear unsent-draft state improve on observed benchmark shortcomings. QA found no broken internal routes or tested-width overflow. The final low-contrast inset eyebrow was corrected to a darker blue. This was not an exhaustive keyboard, screen-reader, WCAG contrast or assistive-technology audit.

## Iteration and remaining limits

The first Fulcrum pass scored a provisional 86. Review-driven changes corrected missing aviation/energy spacing, reduced oversized object images, exposed desktop navigation on interior pages, differentiated sector descriptions, raised small mobile copy, and removed the empty hero-scroll interval. Refreshed screenshots support the final 89.

No score was raised solely to meet the requested target. The remaining opportunities are richer verified business evidence, more consistent source imagery if the owner later supplies it, shorter introductory copy, and a future end-to-end enquiry delivery implementation. These are refinements rather than unresolved defects in the reviewed brief.
