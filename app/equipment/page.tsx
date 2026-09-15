import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Header, Footer } from "@/components/site/chrome"
import { AssetVisual } from "@/components/site/asset-visual"
import { sectors } from "@/lib/sectors"
import { sectorDetails } from "@/lib/sector-details"
import "../structure.css"
import "./equipment.css"

export const metadata: Metadata = {
  title: "Spares & Equipment | Fulcrum",
  description:
    "Industrial equipment, medical equipment and government or defense procurement support, with distinct requirements, supplier sourcing and specialist review for each assignment.",
  alternates: { canonical: "/equipment" },
}
const equipmentSectors = sectors.filter((sector) =>
  sector.href.startsWith("/equipment#")
)

export default function EquipmentPage() {
  return (
    <>
      <Header />
      <main id="main">
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
              <Link href="/contact" className="text-link">
                Discuss your requirement{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-object-panel">
              <AssetVisual asset="avonCutaway" className="detail-asset" priority />
              <div className="hero-object-scope">
                <p className="eyebrow">In focus</p>
                <ul>
                  <li>Aircraft engines &amp; spares</li>
                  <li>Ground support equipment</li>
                  <li>Government &amp; defense procurement</li>
                </ul>
                <span className="equipment-photo-credit">
                  Illustrative imagery<br />
                  Photo: <a href="https://commons.wikimedia.org/wiki/File:Jet_engine,_cutaway_(27441073466).jpg">Andrew Basterfield</a>
                  {" · "}<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0</a>
                </span>
              </div>
            </div>
          </div>
        </section>
        <nav
          className="page-section-nav shell"
          aria-label="Equipment and procurement areas"
        >
          {equipmentSectors.map((sector) => (
            <a href={`#${sector.slug}`} key={sector.slug}>
              {sector.name}
            </a>
          ))}
        </nav>
        {equipmentSectors.map((sector, index) => (
          <section
            className="section shell equipment-group"
            id={sector.slug}
            aria-labelledby={`${sector.slug}-title`}
            key={sector.slug}
          >
            <div className="equipment-group-heading">
              <div>
                <p className="eyebrow">
                  0{index + 1} / {sector.name}
                </p>
                <h2 id={`${sector.slug}-title`}>{sector.short}</h2>
                <p className="section-note">
                  {sector.slug === "industrial"
                    ? "Industrial assignments cover generators, production equipment, warehouse and material-handling systems, with supplier proposals aligned to capacity, site interfaces, delivery and service requirements."
                    : sector.intro}
                </p>
              </div>
              {sector.asset ? (
                <AssetVisual
                  asset={sector.asset}
                  caption="Illustrative imagery"
                />
              ) : (
                <div className="medical-hero">
                  <span aria-hidden="true">M+</span>
                  <p>Equipment. Specifications. Coordination.</p>
                </div>
              )}
            </div>
            <div className="capability-list">
              {sector.scope.map((name, i) => (
                <article key={name}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{name}</h3>
                    <p>{sectorDetails[sector.slug][i]}</p>
                  </div>
                </article>
              ))}
            </div>
            {sector.slug === "defense" && (
              <p className="section-note procurement-boundary">
                End-use, counterparty and jurisdictional screening are scoped
                with qualified specialists. This is commercial coordination, not
                a regulatory clearance or an assurance of procurement approval.
              </p>
            )}
          </section>
        ))}
        <section className="section detail-note">
          <div className="shell">
            <div>
              <p className="eyebrow">One defined assignment</p>
              <h2>
                Clear scope.
                <br />
                Responsible coordination.
              </h2>
            </div>
            <div>
              <p>
                We connect international manufacturers and suppliers with
                requirements in Bangladesh and other markets. Each mandate
                defines the party we represent, the scope of work and our fees
                or commissions. Product acceptance and specialist approvals
                remain with the responsible parties.
              </p>
              <Link href="/mission#brokerage" className="text-link">
                How representation works{" "}
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
