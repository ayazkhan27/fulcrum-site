# Fulcrum website

Fulcrum's nine-page website, built with Next.js. The approved sky, paper-plane
animation and shared brand artwork remain part of the existing design.

## Local preview

Install dependencies using the existing lockfile, then start the development server:

```bash
pnpm install --frozen-lockfile
pnpm dev --hostname 127.0.0.1 --port 3000
```

Open http://127.0.0.1:3000/. This local preview is not the deployed website.

## Page structure

The canonical navigation order is maintained in `lib/site-pages.ts`:

1. Home
2. Mission
3. Our People
4. Aviation & Airports
5. Equipment
6. Energy & Petroleum
7. Textile & Mill Supply
8. Edible Oil & Commodities
9. Contact

Consulting and brokerage are sections of Mission. Aircraft and engine
transactions are within Aviation and Airports. Industrial, medical and
government/defense procurement remain separate sections within Equipment and
Procurement. Retired page URLs redirect to these sections.

See [the structure notes](research/NINE-PAGE-STRUCTURE.md) for routes and content
locations. Error responses and SEO utility files are not extra content pages.

## Checks

```bash
pnpm test:site
pnpm test:flight
pnpm lint
pnpm build
# With the local preview running:
pnpm audit:ux
```

The site tests protect the exact page count, ordering, redirects and retained
content. The HTTP audit checks all nine pages, internal anchors, canonical URLs
and sitemap entries. Visual review is still required for design changes.

## Contact and publication

The contact form prepares a `mailto:` draft in the visitor's email app. It does
not submit to a server or confirm delivery. No form message is sent until the
visitor sends it through their email app.

Keep work on the design branch for review. The owner's deployment workflow
publishes changes through Vercel when they reach `main`; merging or pushing to
`main` requires the owner's explicit approval. Before launch, confirm the contact
mailboxes, business copy, image permissions and font licenses.
