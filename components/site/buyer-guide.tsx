import Link from "next/link"
import type { BuyerGuide } from "@/lib/buyer-guides"
import styles from "@/app/resources/resources.module.css"

export function BuyerGuidePage({ guide }: { guide: BuyerGuide }) {
  return (
    <main id="main" className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Fulcrum</Link>
          <span aria-hidden="true">/</span>
          <Link href="/resources">Buyer resources</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{guide.category}</span>
        </nav>
        <header className={styles.guideHeader}>
          <p className={styles.eyebrow}>{guide.audience}</p>
          <h1>{guide.title}</h1>
          <p className={styles.lead}>{guide.summary}</p>
          <div className={styles.guideMeta}>
            <span>Commercial preparation guide</span>
            <span>Updated <time dateTime="2026-10-07">7 October 2026</time></span>
          </div>
        </header>
        <div className={styles.guideLayout}>
          <aside className={styles.contents}>
            <nav aria-label="On this page">
              <p className={styles.eyebrow}>In this guide</p>
              <ol>
                {guide.sections.map((section, index) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{section.title}</a>
                  </li>
                ))}
              </ol>
              <a className={styles.contentsBrief} href="#enquiry-brief">Your enquiry brief <span aria-hidden="true">↗</span></a>
            </nav>
          </aside>
          <article className={styles.article} aria-label={guide.title}>
            <div className={styles.introduction}>
              <p>{guide.introduction}</p>
              <p className={styles.scope}>{guide.scope}</p>
            </div>
            {guide.sections.map((section, index) => (
              <section key={section.id} id={section.id} className={styles.checklistSection} aria-labelledby={`${section.id}-title`}>
                <p className={styles.sectionNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
                <h2 id={`${section.id}-title`}>{section.title}</h2>
                <p className={styles.sectionIntroduction}>{section.introduction}</p>
                <ul className={styles.checklist}>
                  {section.checklist.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {section.reference && (
                  <div className={styles.reference}>
                    <p>{section.reference.text}</p>
                    <div className={styles.referenceLinks}>
                      {section.reference.sourceIds.map((id) => {
                        const source = guide.sources.find((item) => item.id === id)
                        return source ? <a key={id} href={source.href}>{source.label} <span aria-hidden="true">↗</span></a> : null
                      })}
                    </div>
                  </div>
                )}
              </section>
            ))}
            <section className={styles.comparison} aria-labelledby="comparison-title">
              <p className={styles.eyebrow}>Before shortlisting</p>
              <h2 id="comparison-title">{guide.comparison.heading}</h2>
              <dl>
                {guide.comparison.rows.map((row) => (
                  <div key={row.item}><dt>{row.item}</dt><dd>{row.detail}</dd></div>
                ))}
              </dl>
            </section>
            <section id="enquiry-brief" className={styles.brief} aria-labelledby="brief-title">
              <p className={styles.eyebrow}>Ready to start</p>
              <h2 id="brief-title">Your initial enquiry brief</h2>
              <p>{guide.brief.introduction}</p>
              <ul>{guide.brief.fields.map((field) => <li key={field}>{field}</li>)}</ul>
            </section>
            <section className={styles.support} aria-labelledby="support-title">
              <h2 id="support-title">Discuss your requirement with Fulcrum</h2>
              <p>{guide.support}</p>
              <div className={styles.actions}>
                <Link className={styles.primaryLink} href={guide.contactHref}>Prepare an enquiry <span aria-hidden="true">↗</span></Link>
                <Link className={styles.secondaryLink} href={guide.sectorHref}>{guide.sectorLabel} <span aria-hidden="true">↗</span></Link>
              </div>
            </section>
            <section className={styles.sources} aria-labelledby="sources-title">
              <h2 id="sources-title">Official references</h2>
              <p>Use the current guidance for your product, operation and destination. These references support the points noted above; they do not replace a transaction-specific review.</p>
              <ul>
                {guide.sources.map((source) => (
                  <li key={source.id} id={`source-${source.id}`}><a href={source.href}>{source.label} <span aria-hidden="true">↗</span></a><p>{source.note}</p></li>
                ))}
              </ul>
            </section>
          </article>
        </div>
        <nav className={styles.endNavigation} aria-label="Resource navigation">
          <Link href="/resources">← All buyer resources</Link>
          <a href="#top">Back to top ↑</a>
        </nav>
      </div>
    </main>
  )
}
