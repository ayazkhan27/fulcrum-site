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
                <p className="detail-tagline"><strong>{content.tagline}</strong></p>
              )}
              <Link href="/contact" className="text-link">
                Discuss your requirement{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            {content.label === "Aviation" ? (
              <div className="aviation-image-stack">
                <figure className="asset-visual asset-photo aviation-lower-image">
                  <div className="asset-image">
                    <Image
                      src="/assets/zhai-ken-airplane-6674689.jpg"
                      alt="Airplane flying between two modern buildings against a blue sky"
                      fill
                      sizes="(max-width: 700px) 100vw, 50vw"
                      preload
                    />
                  </div>
                </figure>
                <div className="aviation-airport-photo">
                  <Image
                    src="/assets/stocksnap-building-2603781.jpg"
                    alt="Airport check-in hall with baggage conveyors and passengers"
                    fill
                    sizes="(max-width: 800px) 100vw, 50vw"
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
                <AssetVisual asset="cottonBlack" priority />
                <AssetVisual asset="fabricFolds" priority />
              </div>
            ) : content.label === "Medical equipment" ? (
              <div className="medical-hero">
                <span aria-hidden="true">M+</span>
                <p>Equipment. Specifications. Coordination.</p>
              </div>
            ) : suppliedAssets[heroAsset].treatment === "object" ? (
              <div className="hero-object-panel">
                {content.label === "Energy" ? (
                  <div className="energy-image-pair">
                    <figure className="energy-lng-photo">
                      <div className="energy-lng-image">
                        <Image
                          src="/assets/lng-carrier-fuji-ken-hodge.jpg"
                          alt="Fuji LNG carrier with spherical gas tanks at a terminal"
                          fill
                          sizes="(max-width: 700px) 60vw, 25vw"
                        />
                      </div>
                      <figcaption>
                        LNG carrier · <a href="https://commons.wikimedia.org/wiki/File:LNG_Carrier_Fuji_Lng.jpg">Ken Hodge</a>
                        {" · "}<a href="https://creativecommons.org/licenses/by/2.0/">CC BY 2.0</a>
                      </figcaption>
                    </figure>
                    <AssetVisual asset={heroAsset} className="detail-asset" priority />
                    <div className="energy-cylinder-panel">
                      <Image
                        src="/assets/openclipart-vectors-gas-container-160416.png"
                        alt="Red gas cylinder"
                        fill
                        sizes="(max-width: 800px) 30vw, 15vw"
                      />
                    </div>
                  </div>
                ) : content.label === "Edible Oil & Commodities" ? (
                  <EdibleOilVisual />
                ) : (
                <AssetVisual
                  asset={heroAsset}
                  className="detail-asset"
                  priority
                />
                )}
                <div className="hero-object-scope">
                  <p className="eyebrow">In focus</p>
                  <ul>
                    {content.items.slice(0, 3).map(([name]) => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                  {content.label !== "Edible Oil & Commodities" && <span>Illustrative imagery</span>}
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
