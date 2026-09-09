import Link from "next/link"
import { Header, Footer } from "@/components/site/chrome"
export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main">
        <section className="detail-hero">
          <div className="shell">
            <p className="eyebrow">404 / Page not found</p>
            <h1>
              Let’s find your
              <br />
              way forward.
            </h1>
            <p className="detail-intro">
              This page is unavailable. Explore Fulcrum’s aviation and energy
              capabilities from our homepage.
            </p>
            <Link href="/" className="text-link">
              Return to Fulcrum ↗
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
