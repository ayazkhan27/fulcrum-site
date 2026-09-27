import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight, Package, Shirt, Wrench } from "lucide-react"
import { Header } from "@/components/site/chrome"
import "@/app/defense/defense.css"

const supplies = [
  { label: "Provisions & General Supplies", detail: "Supplies for day-to-day operational needs", Icon: Package },
  { label: "Uniforms & Accessories", detail: "Clothing to the purchaser’s specifications", Icon: Shirt },
  { label: "Engineering Equipment & Spares", detail: "Equipment, tools and replacement components", Icon: Wrench },
]

export default function PageContent({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? "div" : "main"
  return (
    <>
      {!embedded && <Header />}
      <Container id={embedded ? undefined : "main"}>
        <section className="detail-hero vertical-hero defense-hero">
          <div className="shell defense-layout">
            <div className="defense-copy">
              <p className="eyebrow">Fulcrum / Defense Supply</p>
              <h1>Defense Supply</h1>
              <p className="defense-lead">Clear requirements.<br />Coordinated supply.</p>
              <p className="detail-intro">
                We help international manufacturers and suppliers respond to
                defense procurement requirements in Bangladesh. Our focus covers
                provisions, uniforms, engineering equipment, tools and spare parts.
                From supplier identification to tender coordination and delivery
                follow-up, we keep specifications, proposals and commercial
                communication aligned.
              </p>
              <div className="hero-object-scope defense-focus">
                <p className="eyebrow">In focus</p>
                <ul>
                  <li>Supplier identification and sourcing</li>
                  <li>Commercial representation</li>
                  <li>Proposal and tender coordination</li>
                  <li>Delivery follow-up</li>
                </ul>
              </div>
              <Link href="/contact" className="text-link">
                Discuss your procurement requirement <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="defense-visual">
              <figure className="defense-logistics">
                <Image src="/assets/defense-logistics-v1.png" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 50vw" alt="AI-generated illustration of uniforms, transport cases and engineering tools in an organized supply warehouse" />
              </figure>
            </div>
            <div className="defense-supplies" aria-label="Defense supply categories">
              {supplies.map(({ label, detail, Icon }, index) => (
                <div className="defense-supply" key={label}>
                  <span className="defense-supply-number" aria-hidden="true">0{index + 1}</span>
                  <Icon className="defense-supply-icon" strokeWidth={0.5} aria-hidden="true" />
                  <div><h2>{label}</h2><p>{detail}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Container>
    </>
  )
}
