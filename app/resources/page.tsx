import Link from "next/link"
import { buyerGuides, createResourceMetadata } from "@/lib/buyer-guides"
import { buildEnquiryHref } from "@/lib/enquiry-attribution"
import styles from "./resources.module.css"

export const metadata = createResourceMetadata("/resources")

export default function ResourcesPage() {
  return (
    <main id="main" className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Fulcrum</Link><span aria-hidden="true">/</span><span aria-current="page">Buyer resources</span>
        </nav>
        <header className={styles.landingHeader}>
          <p className={styles.eyebrow}>Buyer resources</p>
          <h1>A clearer brief.<br />A better starting point.</h1>
          <p className={styles.lead}>Practical checklists for preparing a sourcing enquiry, asking useful questions and comparing commercial proposals.</p>
        </header>
        <section className={styles.guideCards} aria-label="Sourcing checklists">
          {buyerGuides.map((guide, index) => (
            <article key={guide.slug} className={styles.guideCard}>
              <div className={styles.cardTop}><p className={styles.eyebrow}>{guide.category}</p><span aria-hidden="true">0{index + 1}</span></div>
              <h2><Link href={`/resources/${guide.slug}`}>{guide.title}<span className={styles.cardArrow} aria-hidden="true">↗</span></Link></h2>
              <p>{guide.summary}</p>
              <ul>
                {guide.slug === "aircraft-dry-lease-enquiry-checklist" ? <><li>Operator, aircraft and timing</li><li>Commercial terms and review responsibilities</li><li>A brief for your initial enquiry</li></> : <><li>Specifications, samples and order quantities</li><li>Quality, destination requirements and delivery</li><li>A brief for your initial enquiry</li></>}
              </ul>
              <p className={styles.cardAudience}>{guide.audience}</p>
            </article>
          ))}
        </section>
        <section className={styles.landingNote} aria-labelledby="use-guides-title">
          <h2 id="use-guides-title">Start with what you know.</h2>
          <div><p>Work through the relevant checklist and mark anything that still needs confirmation. Bring the open questions into your enquiry so the scope, responsibilities and next steps can be discussed.</p><Link className={styles.secondaryLink} href={buildEnquiryHref({ service: "sourcing", source: "guide" })}>Discuss your sourcing requirement <span aria-hidden="true">↗</span></Link></div>
        </section>
      </div>
    </main>
  )
}
