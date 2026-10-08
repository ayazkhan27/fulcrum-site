import Link from "next/link"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { Navigation } from "@/components/site/navigation"
import { Wordmark } from "@/components/site/wordmark"
import { FooterSlogan } from "@/components/site/footer-slogan"
import { sitePages } from "@/lib/site-pages"

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
export function Footer({ closing = false }: { closing?: boolean }) {
  const companyPaths = new Set<string>(["/", "/mission", "/people", "/career"])
  const explore = { title: "Explore", pages: sitePages.filter((page) => !companyPaths.has(page.href) && page.href !== "/contact") }
  const company = { title: "Fulcrum", pages: sitePages.filter((page) => companyPaths.has(page.href)) }
  const linkGroups = closing ? [company, explore] : [explore, company]
  const NavigationGroup = closing ? "nav" : "div"
  const navigationGroups = linkGroups.map(({ title, pages }) => (
    <NavigationGroup key={title} aria-label={closing ? `${title} footer links` : undefined}>
      <p className="eyebrow">{title}</p>
      {pages.map(({ href, label }) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </NavigationGroup>
  ))
  return (
    <footer id={closing ? "contact-closing" : undefined} className={closing ? "site-footer contact-closing" : "site-footer"}>
      <div className="shell">
        {!closing && (
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
        )}
        <div className="footer-grid">
          <div className="footer-identity">
            <Link href="/" aria-label="Fulcrum, home" className="footer-brand">
              <Image
                src={closing ? "/fulcrum-logo-footer-black.svg" : "/fulcrum-logo-footer-cobalt.svg"}
                width={595}
                height={112}
                alt="Fulcrum"
                unoptimized
                className="masthead-art"
              />
            </Link>
            <Image
              src="/fulcrum-signature-white.svg"
              width={610}
              height={48}
              alt="Precision in motion."
              unoptimized
              className="footer-tagline"
            />
            {closing && (
              <>
                <address className="footer-office">
                  <span className="eyebrow">USA Office</span>
                  107-21 93rd Street, Ozone Park,
                  <br />
                  New York, NY 11417, USA
                  <div className="footer-office-phones">
                    Phones:<br />
                    <a href="tel:+19173294170">+1 (917) 329-4170</a><br />
                    <a href="tel:+15614407168">+1 (561) 440-7168</a>
                    <br />
                    <a href="mailto:khanhussein@fulcrumtriad.com">khanhussein@fulcrumtriad.com</a>
                  </div>
                </address>
                <address className="footer-office">
                  <span className="eyebrow">Bangladesh Office</span>
                  House 426, Unit 3A, Road 06,
                  <br />
                  Mirpur DOHS, Dhaka 1216 Bangladesh
                  <div className="footer-office-phones">
                    Phone:{" "}
                    <a href="tel:+8801770392001">+880 1770-392001</a>
                    <br />
                    <a href="mailto:infobd@fulcrumtriad.com">infobd@fulcrumtriad.com</a>
                  </div>
                </address>
              </>
            )}
          </div>
          {closing ? (
            <div className="footer-link-stack">{navigationGroups}</div>
          ) : navigationGroups}
          {closing && <FooterSlogan />}
          {!closing && (
            <div>
              <p className="eyebrow">Connect</p>
              <a href="mailto:infobd@fulcrumtriad.com">infobd@fulcrumtriad.com</a>
              <p>Bangladesh connections · Global reach</p>
              <Link href="/contact">Contact details ↗</Link>
            </div>
          )}
        </div>
        <p className="footer-scope">
          Fulcrum is registered in the United States as Fulcrum Triad LLC. We
          provide global sourcing, representation, advisory and
          transaction-intermediary support in Bangladesh and beyond. Scope,
          representation and remuneration are agreed upon for each engagement.
          Images are illustrative and do not depict assets or facilities owned
          by Fulcrum.
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
