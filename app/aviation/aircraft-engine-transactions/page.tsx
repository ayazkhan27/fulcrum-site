import type { Metadata } from "next"
import Link from "next/link"
import { Header, Footer } from "@/components/site/chrome"
import { GateList } from "@/components/site/gates"
export const metadata: Metadata = {
  title: "Aircraft & Engine Transactions | Fulcrum",
  description:
    "Aircraft and engine sourcing, leasing and transaction coordination, with an illustrative framework for reviewing aircraft suitability against a defined requirement.",
  alternates: { canonical: "/aviation/aircraft-engine-transactions" },
}
export default function MethodPage() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="detail-hero">
          <div className="shell">
            <nav aria-label="Breadcrumb" className="content-breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/aviation">Aviation</Link>
              <span>/</span>
              <span>Aircraft & engine transactions</span>
            </nav>
            <p className="eyebrow">Aviation / Aircraft & engine transactions</p>
            <h1>
              The asset. The records.
              <br />
              The right transaction.
            </h1>
            <p className="detail-intro">
              Sourcing, leasing, acquisition and placement bring technical
              records, commercial terms and delivery requirements together. We
              help organize that process with the parties and qualified
              specialists.
            </p>
          </div>
        </section>
        <section className="section shell">
          <div className="transaction-scope">
            <div>
              <h2>Aircraft</h2>
              <p>
                Define the operating requirement, assess potential aircraft and
                coordinate the commercial and technical information needed for a
                sourcing, lease or acquisition decision.
              </p>
            </div>
            <div>
              <h2>Engines</h2>
              <p>
                Identify the required engine configuration and coordinate review
                of records, condition, life-limited parts, maintenance status
                and delivery terms with qualified specialists.
              </p>
            </div>
          </div>
          <div className="detail-heading">
            <p className="eyebrow">
              Aircraft placement / An illustrative framework
            </p>
            <div>
              <h2>The requirement sets the criteria.</h2>
              <p
                className="section-note"
                style={{ marginTop: 24, maxWidth: 650 }}
              >
                The sequence, scoring and pass or fail conditions depend on the
                tender and engagement. Timing and other mandatory constraints
                should be checked early, alongside the technical review.
              </p>
            </div>
          </div>
          <GateList detailed />
        </section>
        <section className="section detail-note">
          <div className="shell">
            <div>
              <p className="eyebrow">Beyond the initial screen</p>
              <h2>
                Age, condition and records
                <br />
                belong in the same picture.
              </h2>
            </div>
            <div>
              <p>
                Age limits may be binding. Maintenance status, configuration,
                records and delivery conditions can also affect suitability.
                None of these factors should be treated as a universal
                substitute for the others.
              </p>
              <p style={{ marginTop: 20 }}>
                Fulcrum coordinates the commercial review and appropriate
                specialist input. Airworthiness determinations, inspections and
                approvals remain with the responsible qualified parties.
              </p>
              <Link className="text-link" href="/contact">
                Discuss an aircraft requirement ↗
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
