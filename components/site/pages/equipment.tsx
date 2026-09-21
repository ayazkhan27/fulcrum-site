import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Header } from "@/components/site/chrome"
import { AssetVisual } from "@/components/site/asset-visual"
import { sectors } from "@/lib/sectors"
import { sectorDetails } from "@/lib/sector-details"
import "@/app/structure.css"
import "@/app/equipment/equipment.css"


export default function PageContent({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? "div" : "main"
  const defense = sectors.find((sector) => sector.slug === "defense")!
  return (
    <>
      {!embedded && <Header />}
      <Container id={embedded ? undefined : "main"}>
        <section className="detail-hero vertical-hero equipment-hero">
          <div className="shell detail-hero-grid">
            <div>
              <p className="eyebrow">Fulcrum / Spares &amp; Equipment</p>
              <h1>Spares &amp; Equipment</h1>
              <p className="detail-intro">
                From replacement bearings to heavy equipment for warehouses and
                production lines, we connect purchasers with international
                suppliers and support manufacturers entering Bangladesh. We
                coordinate supplier proposals for equipment and material-handling
                needs, clarify operating capacity and site requirements, and
                manage commercial follow-up from the initial brief through
                agreed delivery milestones.
              </p>
              <div className="hero-object-scope equipment-focus">
                <p className="eyebrow">In focus</p>
                <ul>
                  <li>Aircraft engines &amp; spares</li>
                  <li>Ground support equipment</li>
                  <li><a href="#defense">Government &amp; defense procurement</a></li>
                </ul>
              </div>
              <Link href="/contact" className="text-link">
                Discuss your requirement{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-object-panel">
              <AssetVisual asset="jetEngine" className="detail-asset" priority />
              <AssetVisual asset="roadRoller" className="detail-asset" />
            </div>
          </div>
        </section>
        <section id="defense" className="equipment-defense" aria-labelledby="defense-title">
          <div className="shell equipment-defense-layout">
            <div className="equipment-defense-copy">
            <p className="eyebrow">Fulcrum / Government &amp; defense</p>
            <h2 id="defense-title">Defense Supply</h2>
            <p className="equipment-defense-intro">{defense.intro}</p>
            </div>
            <div className="equipment-defense-grid">
              {defense.scope.map((heading, index) => (
                <article key={heading}>
                  <h3>{heading}</h3>
                  <p>{sectorDetails.defense[index]}</p>
                </article>
              ))}
            </div>
            <Link href="/contact" className="text-link">
              Discuss your defense supply requirement{" "}
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <figure className="equipment-defense-photo">
              <Image src="/assets/defense-shield.png" width={1284} height={1920} sizes="(max-width: 800px) 85vw, 45vw" alt="Illustrated wooden shield with metal studs" />
            </figure>
          </div>
        </section>
      </Container>
    </>
  )
}
