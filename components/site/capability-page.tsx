import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Header, Footer } from "@/components/site/chrome"
import { CapabilityIcon } from "@/components/site/technical-artwork"
import { AssetVisual } from "@/components/site/asset-visual"
import { sectors } from "@/lib/sectors"
import type { AssetKey } from "@/lib/asset-library"
import { suppliedAssets } from "@/lib/asset-library"
import { AircraftTransactions } from "@/components/site/aircraft-transactions"
import { EngagementDisclosure } from "@/components/site/engagement-disclosure"
import { EdibleOilVisual } from "@/components/site/edible-oil-visual"
import { buildEnquiryHref } from "@/lib/enquiry-attribution"
import type { EnquirySectorId } from "@/lib/enquiry-services"
export type CapabilityContent = {
  label: string
  pageLabel?: string
  title: string
  intro: string
  tagline?: string
  heading: string
  items: [string, string][]
  noteTitle: string
  note: string
  related: string
  relatedLabel: string
}
export function CapabilityPage({ content, heroOnly = false, embedded = false }: { content: CapabilityContent; heroOnly?: boolean; embedded?: boolean }) {
  const Container = embedded ? "div" : "main"
  const sector = content.label === "Aviation" || content.label === "Energy"
  const match = sectors.find((s) => s.name === content.label)
  const enquirySector = ({ Aviation: "aviation", Energy: "energy", "Textile & Mill Supply": "textiles", "Edible Oil & Commodities": "commodities" } as Record<string, EnquirySectorId>)[content.label]
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
      {!embedded && <Header />}
      <Container id={embedded ? undefined : "main"}>
        <section
          id={heroOnly && content.label === "Aviation" ? "aircraft-engine-transactions" : undefined}
          className={[
            "detail-hero",
            sector
              ? `vertical-hero vertical-hero-${content.label.toLowerCase()}`
              : "",
          ].join(" ")}
        >
          <div className="shell detail-hero-grid">
            <div>
              <p className="eyebrow">
                Fulcrum / {content.pageLabel ?? content.label}
              </p>
              <h1>{content.pageLabel ?? content.label}</h1>
              <p className="detail-intro">{content.intro}</p>
              {content.tagline && (
                content.label === "Energy" ? (
                  <p className="detail-tagline energy-tagline">
                    <strong>We move heaven and earth to ease your burden. With precision. Everywhere.</strong>
                  </p>
                ) : (
                  <p className="detail-tagline"><strong>{content.tagline}</strong></p>
                )
              )}
              {content.label === "Edible Oil & Commodities" && (
                <div className="hero-object-scope">
                  <p className="eyebrow">In focus</p>
                  <ul>
                    {content.items.slice(0, 3).map(([name]) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                </div>
              )}
              <Link href={embedded ? "/contact" : buildEnquiryHref({ sector: enquirySector, source: "sector" })} className="text-link">
                Discuss your requirement{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            {content.label === "Aviation" ? (
              <div className="aviation-image-stack">
                <figure className="asset-visual asset-photo aviation-lower-image">
                  <div className="asset-image">
                    <Image
                      src="/assets/leerosario-airplane-7766082.jpg"
                      alt="Head-on view of a passenger jet flying above clouds and snow-covered mountains"
                      fill
                      sizes="(max-width: 700px) 100vw, 50vw"
                      preload={!embedded}
                    />
                  </div>
                </figure>
                <div className="aviation-airport-photo">
                  <Image
                    src="/assets/airport-ground-operations-v1.png"
                    alt="Passenger aircraft at a terminal gate with a jet bridge and baggage tug on the airport apron"
                    fill
                    sizes={embedded ? "(max-width: 800px) 100vw, 50vw" : "(max-width: 800px) 50vw, 25vw"}
                  />
                </div>
                <div className="aviation-image-box">
                  <Image
                    src="/aviation-boeing-curated.svg"
                    alt="Rear view line drawing of a Boeing aircraft with its full wingspan"
                    fill
                    sizes="(max-width: 700px) 100vw, 50vw"
                  />
                </div>
              </div>
            ) : content.label === "Textile & Mill Supply" ? (
              <div className="textile-image-stack">
                <AssetVisual asset="cottonBlack" priority={!embedded} />
                <AssetVisual asset="fabricFolds" />
              </div>
            ) : content.label === "Medical equipment" ? (
              <div className="medical-hero">
                <span aria-hidden="true">M+</span>
                <p>Equipment. Specifications. Coordination.</p>
              </div>
            ) : suppliedAssets[heroAsset].treatment === "object" ? (
              <div className="hero-object-panel">
                {content.label === "Energy" ? (
                  <div className="energy-visual-pair">
                    <figure className="energy-editorial-visual">
                      <div className="energy-image-frame">
                        <Image src="/assets/energy-editorial-v2.png" alt="Road tanker at a petroleum terminal" width={1536} height={1024} sizes="(max-width: 520px) 90vw, (max-width: 800px) 44vw, 22vw" preload={!embedded} />
                      </div>
                    </figure>
                    <figure className="energy-editorial-visual">
                      <div className="energy-image-frame">
                        <Image src="/assets/lng-carrier-editorial-v1.png" alt="LNG carrier transporting liquefied natural gas across the sea" width={1983} height={793} sizes="(max-width: 520px) 90vw, (max-width: 800px) 44vw, 22vw" preload={!embedded} />
                      </div>
                    </figure>
                  </div>
                ) : content.label === "Edible Oil & Commodities" ? (
                  <EdibleOilVisual priority={!embedded} />
                ) : (
                <AssetVisual
                  asset={heroAsset}
                  className="detail-asset"
                  priority={!embedded}
                />
                )}
                {content.label !== "Edible Oil & Commodities" && <div className="hero-object-scope">
                  <p className="eyebrow">In focus</p>
                  <ul>
                    {content.items.slice(0, 3).map(([name]) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                  {content.label !== "Energy" && <span>Illustrative imagery</span>}
                </div>}
              </div>
            ) : (
              <AssetVisual
                asset={heroAsset}
                className="detail-asset"
                priority={!embedded}
                caption="Illustrative imagery"
              />
            )}
          </div>
        </section>
        {!heroOnly && <>
        {sector && (
          <div className="sector-subnav shell">
            <a href="#execution">
              Explore {content.label.toLowerCase()} capabilities ↓
            </a>
            <Link
              href={
                content.label === "Aviation"
                  ? "/aviation#aircraft-engine-transactions"
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
        {content.label === "Textile & Mill Supply" && (
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
                content.label === "Brokerage") && <EngagementDisclosure />}
              <Link href={content.related} className="text-link">
                {content.relatedLabel}{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
        {content.label === "Aviation" && <AircraftTransactions />}
        </>}
      </Container>
      {!heroOnly && <Footer />}
    </>
  )
}
