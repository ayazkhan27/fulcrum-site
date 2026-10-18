import { Header } from "@/components/site/chrome"
import { buildEnquiryHref } from "@/lib/enquiry-attribution"
import Image from "next/image"
import "@/app/fashion-and-finery/fashion.css"

export default function FashionContent({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? "div" : "main"
  return <>
    {!embedded && <Header />}
    <Container id={embedded ? undefined : "main"} className="fashion-page">
      <section className="fashion-hero" aria-labelledby="fashion-title">
        <div className="shell fashion-layout">
          <div className="fashion-intro">
            <p className="eyebrow">Fulcrum / Fashion &amp; Finery</p>
            <h1 id="fashion-title">Made in Bangladesh.<br />Selected for America.</h1>
            <p className="fashion-lead">Everyday clothing. Cultural connections.</p>
            <div className="fashion-copy">
              <p>Fulcrum connects US retailers, brands and distributors with suitable garment manufacturers in Bangladesh. We help buyers source ready-made clothing for the wider US market, alongside ethnic and traditional wear for Bangladeshi, Indian, Pakistani and other South Asian communities.</p>
              <p>Our approach begins with the buyer’s customers: the styles they seek, the fit they expect and the price points they need. From everyday essentials and contemporary clothing to occasion wear rooted in South Asian traditions, we aim to connect each requirement with manufacturers suited to the product, order size and delivery schedule.</p>
              <p>We identify suitable suppliers, coordinate samples and quotations, and help buyers and manufacturers agree on product specifications, quality expectations and delivery schedules. From the initial enquiry through order follow-up, we keep commercial communication clear and focused.</p>
              <p>Whether you are building a clothing brand, expanding a retail collection or serving a community with a distinctive sense of style, we welcome a conversation about your sourcing needs.</p>
              <a className="text-link" href={embedded ? "/contact" : buildEnquiryHref({ sector: "apparel", service: "sourcing", source: "sector" })}>Discuss apparel sourcing <span aria-hidden="true">↗</span></a>
            </div>
          </div>

          <div className="fashion-gallery" aria-label="Garment concepts">
            <figure className="fashion-plate fashion-plate-muslin">
              <div className="fashion-image-frame">
                <Image
                  src="/assets/dhakai-muslin-white-concept.png"
                  width={1024}
                  height={1536}
                  sizes="(max-width: 800px) 100vw, (max-width: 1200px) 27vw, 340px"
                  alt="White Dhakai muslin-inspired sari concept with a fine, airy weave"
                />
              </div>
            </figure>
            <figure className="fashion-plate fashion-plate-tee fashion-plate-big-apple">
              <div className="fashion-image-frame">
                <Image
                  src="/assets/fulcrum-nyc-tee-02.jpeg"
                  width={679}
                  height={690}
                  sizes="(max-width: 800px) 50vw, (max-width: 1200px) 27vw, 340px"
                  alt="Fulcrum-designed black T-shirt with a colorful Big Apple and New York skyline illustration"
                />
              </div>
            </figure>
            <figure className="fashion-plate fashion-plate-tee fashion-plate-subway">
              <div className="fashion-image-frame">
                <Image
                  src="/assets/fulcrum-nyc-tee-01.jpeg"
                  width={1080}
                  height={1009}
                  sizes="(max-width: 800px) 50vw, (max-width: 1200px) 27vw, 340px"
                  alt="Fulcrum-designed black T-shirt featuring a colorful New York subway illustration"
                />
              </div>
            </figure>
          </div>
        </div>
      </section>
    </Container>
  </>
}
