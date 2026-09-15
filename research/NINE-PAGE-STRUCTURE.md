# Approved nine-page structure

Owner-approved structure, implemented on the existing design branch. No change
to the homepage flight, sky, masthead, footer artwork, people biographies or bus.

1. Home: `/`
2. Mission: `/mission`
3. Aviation and Airports: `/aviation`
4. Equipment and Procurement: `/equipment`
5. Energy & Petroleum: `/energy`
6. Textile and Mill Supply: `/sectors/textiles`
7. Edible Oil and Commodities: `/sectors/commodities`
8. Our People: `/people`
9. Contact: `/contact`

`lib/site-pages.ts` supplies the menu, footer directory and sitemap, plus the
permanent redirects. The only dynamic sector pages are textiles and commodities.
Error pages, robots.txt and sitemap.xml are utility responses, not content pages.

## Content consolidation

- Consulting and brokerage copy is retained in `lib/advisory-content.ts` and
  displayed in Mission, alongside the shared capabilities and engagement boundaries.
- The aircraft and engine review framework is retained in
  `components/site/aircraft-transactions.tsx` within Aviation and Airports.
- Industrial, medical and government/defense information remains distinct in
  Equipment and Procurement, using the existing sector descriptions and details.
- The former generic Services overview is represented by Mission's capabilities
  and sector directory, rather than a tenth page.
- The homepage retains its sector cards, including links to the relevant
  Equipment subsections. Multiple sections can lead to the same content page.

## Legacy links

`/services`, `/consulting`, `/brokerage`, `/method`, the former aircraft transaction
page, and the three merged equipment-sector URLs redirect directly to the relevant
page and section. Internal links use their destinations directly.

The old route sources are recoverable through Git history; advisory and
transaction content has been moved into reusable modules rather than discarded.
