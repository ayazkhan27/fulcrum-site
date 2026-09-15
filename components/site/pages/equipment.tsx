import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Header } from "@/components/site/chrome"
import { AssetVisual } from "@/components/site/asset-visual"
import "@/app/structure.css"
import "@/app/equipment/equipment.css"


export default function PageContent({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? "div" : "main"
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
      </Container>
    </>
  )
}
