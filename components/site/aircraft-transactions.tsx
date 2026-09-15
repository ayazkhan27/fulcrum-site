import Link from "next/link"
import { GateList } from "@/components/site/gates"

// Preserved transaction detail, now part of the Aviation and Airports page.
export function AircraftTransactions() {
  return (
    <>
      <section
        className="section shell"
        id="aircraft-engine-transactions"
        aria-labelledby="transactions-title"
      >
        <div className="detail-heading">
          <p className="eyebrow">
            Aviation / Aircraft &amp; engine transactions
          </p>
          <div>
            <h2 id="transactions-title">
              The asset. The records. The right transaction.
            </h2>
            <p
              className="section-note"
              style={{ marginTop: 24, maxWidth: 650 }}
            >
              Sourcing, leasing, acquisition and placement bring technical
              records, commercial terms and delivery requirements together. We
              help organize that process with the parties and qualified
              specialists.
            </p>
          </div>
        </div>
        <div className="transaction-scope">
          <div>
            <h3>Aircraft</h3>
            <p>
              Define the operating requirement, assess potential aircraft and
              coordinate the commercial and technical information needed for a
              sourcing, lease or acquisition decision.
            </p>
          </div>
          <div>
            <h3>Engines</h3>
            <p>
              Identify the required engine configuration and coordinate review
              of records, condition, life-limited parts, maintenance status and
              delivery terms with qualified specialists.
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
              records and delivery conditions can also affect suitability. None
              of these factors should be treated as a universal substitute for
              the others.
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
    </>
  )
}
