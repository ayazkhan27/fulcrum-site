import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Header, Footer } from "@/components/site/chrome"
import { AviationExplorer } from "@/components/site/aviation-explorer"
import { CapabilityIcon } from "@/components/site/technical-artwork"
import { AssetVisual } from "@/components/site/asset-visual"
import { sectors } from "@/lib/sectors"
import type { AssetKey } from "@/lib/asset-library"
import { suppliedAssets } from "@/lib/asset-library"
export type CapabilityContent = {
  label: string
  title: string
  intro: string
  heading: string
  items: [string, string][]
  noteTitle: string
  note: string
  related: string
  relatedLabel: string
}
export function CapabilityPage({ content }: { content: CapabilityContent }) {
  const sector = content.label === "Aviation" || content.label === "Energy"
  const match = sectors.find((s) => s.name === content.label)
  const heroAsset: AssetKey =
    match?.asset ??
    (
      {
        Aviation: "terminal",
        Energy: "petroleum",
        Capabilities: "terminal",
        Consulting: "fabric",
        Brokerage: "paperPlane",
      } as Record<string, AssetKey>
    )[content.label] ??
    "terminal"
  return (
    <>
      <Header />
      <main id="main">
        <section
          className={["detail-hero", sector ? `vertical-hero vertical-hero-${content.label.toLowerCase()}` : ""].join(" ")}
        >
          <div className="shell detail-hero-grid">
            <div>
              <p className="eyebrow">Fulcrum / {content.label}</p>
              <h1>{content.title}</h1>
              <p className="detail-intro">{content.intro}</p>
              <Link href="/contact" className="text-link">
                Discuss your requirement{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            {content.label === "Medical equipment" ? (
              <div className="medical-hero">
                <span aria-hidden="true">M+</span>
                <p>Equipment. Specifications. Coordination.</p>
              </div>
            ) : suppliedAssets[heroAsset].treatment === "object" ? (
              <div className="hero-object-panel">
                <AssetVisual asset={heroAsset} className="detail-asset" priority />
                <div className="hero-object-scope">
                  <p className="eyebrow">In focus</p>
                  <ul>{content.items.slice(0, 3).map(([name]) => <li key={name}>{name}</li>)}</ul>
                  <span>Illustrative imagery</span>
                </div>
              </div>
            ) : (
              <AssetVisual
                asset={heroAsset}
                className="detail-asset"
                priority
                caption="Illustrative imagery"
              />
            )}
          </div>
        </section>
        {sector && (
          <div className="sector-subnav shell">
            <a href="#execution">
              Explore {content.label.toLowerCase()} capabilities ↓
            </a>
            <Link
              href={
                content.label === "Aviation"
                  ? "/aviation/aircraft-engine-transactions"
                  : "/energy#role"
              }
            >
              {content.label === "Aviation"
                ? "Aircraft & engine transactions"
                : "Our role in energy transactions"}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        )}
        {content.label === "Aviation" && <AviationExplorer />}
        {content.label === "Capabilities" && (
          <section
            className="shell service-directory"
            aria-label="Explore sectors"
          >
            {sectors.map((s) => (
              <Link key={s.slug} href={s.href}>
                {s.name}
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </section>
        )}
        {content.label === "Textiles & mill supply" && (
          <div className="shell textile-materials">
            <AssetVisual asset="cotton" caption="Cotton & raw materials" />
            <AssetVisual asset="fibre" caption="Fibres & mill inputs" />
          </div>
        )}
        <section className="section shell" id="execution">
          <div className="detail-heading">
            <p className="eyebrow">Our capabilities</p>
            <h2>{content.heading}</h2>
          </div>
          <div className="capability-list">
            {content.items.map(([name, body], i) => (
              <article key={name}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <CapabilityIcon kind={content.label} index={i} />
                  <h3>{name}</h3>
                  <p>{body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section detail-note" id="role">
          <div className="shell">
            <div>
              <p className="eyebrow">The way we work</p>
              <h2>{content.noteTitle}</h2>
            </div>
            <div>
              <p>{content.note}</p>
              {(content.label === "Energy" ||
                content.label === "Brokerage") && (
                <details className="role-disclosure">
                  <summary>
                    Representation, fees and transaction boundaries
                  </summary>
                  <p>
                    Buyer or seller representation, authority to negotiate,
                    documentation and delivery coordination are potential
                    engagement scopes, not implied standing mandates. The
                    parties, responsibilities and remuneration are agreed in
                    writing for each assignment.
                  </p>
                  <p>
                    Fees may be structured for advisory work or linked to agreed
                    success milestones. No universal fee arrangement is
                    represented here. Introductions remain subject to
                    appropriate review; an introduction is not a guarantee of
                    counterparty performance.
                  </p>
                  <p>
                    The services described here are advisory and intermediary
                    services. Any proposal involving commodity ownership or
                    principal trading requires separate authority, arrangements
                    and professional review. Legal, engineering, inspection,
                    financing and regulatory conclusions remain with qualified
                    parties.
                  </p>
                </details>
              )}
              <Link href={content.related} className="text-link">
                {content.relatedLabel}{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
