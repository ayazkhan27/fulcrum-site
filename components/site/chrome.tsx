import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { Navigation } from "@/components/site/navigation"
import { Wordmark } from "@/components/site/wordmark"

export function Header({ home = false }: { home?: boolean }) {
  return (
    <header className={home ? "site-header home-header" : "site-header"}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <div className="shell header-inner">
        <Link href="/" aria-label="Fulcrum, home" className="brand-link">
          {home ? <Wordmark priority large dark /> : <Wordmark priority />}
        </Link>
        <Navigation editorial />
      </div>
    </header>
  )
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <p className="eyebrow">The next move starts here</p>
            <Link className="footer-invitation" href="/contact">
              Let’s move forward.
              <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <Link href="/contact" className="button button-light">
            Start a conversation <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <div className="footer-grid">
          <div>
            <Link href="/" aria-label="Fulcrum, home" className="footer-brand">
              <Wordmark />
            </Link>
            <p className="footer-description">
              Global sourcing and representation.
              <br />
              Bangladesh and beyond.
            </p>
          </div>
          <div>
            <p className="eyebrow">Explore</p>
            <Link href="/aviation">Aviation</Link>
            <Link href="/energy">Energy</Link>
            <Link href="/sectors/textiles">Textiles & mill supply</Link>
            <Link href="/sectors/commodities">Edible oils & commodities</Link>
            <Link href="/sectors/industrial">Industrial equipment</Link>
            <Link href="/sectors/healthcare">Medical equipment</Link>
            <Link href="/sectors/defense">Government & defense</Link>
            <Link href="/services">All capabilities</Link>
            <Link href="/aviation/aircraft-engine-transactions">
              Aircraft & engine transactions
            </Link>
          </div>
          <div>
            <p className="eyebrow">Fulcrum</p>
            <Link href="/people">Our people</Link>
            <Link href="/consulting">Consulting</Link>
            <Link href="/brokerage">Brokerage</Link>
          </div>
          <div>
            <p className="eyebrow">Connect</p>
            <a href="mailto:infobd@fulcrumtriad.com">infobd@fulcrumtriad.com</a>
            <p>Bangladesh connections · Global reach</p>
            <Link href="/contact">Contact details ↗</Link>
          </div>
        </div>
        <p className="footer-scope">
          Fulcrum provides advisory and transaction-intermediary support. Scope,
          representation and remuneration are agreed per engagement. The imagery
          is illustrative and does not depict assets or facilities owned by
          Fulcrum.
        </p>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Fulcrum. All rights reserved.</p>
          <p>Independent advice. Disclosed representation.</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  )
}
