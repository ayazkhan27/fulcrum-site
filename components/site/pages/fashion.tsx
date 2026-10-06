import { Header } from "@/components/site/chrome"
import Image from "next/image"
import "@/app/fashion-and-finery/fashion.css"

export default function FashionContent({ embedded = false }: { embedded?: boolean }) {
  const Container = embedded ? "div" : "main"
  return <>
    {!embedded && <Header />}
    <Container id={embedded ? undefined : "main"} className="fashion-page">
        <section className="fashion-hero" aria-labelledby="fashion-title">
          <div className="shell fashion-grid">
            <div>
              <p className="eyebrow">Fulcrum / Fashion &amp; Finery</p>
              <h1 id="fashion-title">Made in Bangladesh.<br />Selected for America.</h1>
              <p className="fashion-lead">Everyday clothing. Cultural connections.</p>
              <div className="fashion-gallery">
                <figure>
                  <Image src="/assets/fashion-contemporary-v1.png" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 45vw" alt="Illustrative collection of cotton shirts, denim and neutral knitwear" />
                  <figcaption>Contemporary essentials</figcaption>
                </figure>
                <figure>
                  <Image src="/assets/fashion-south-asian-v1.png" width={1536} height={1024} sizes="(max-width: 800px) 100vw, 45vw" alt="Illustrative South Asian finery: teal sari, embroidered ivory panjabi and rose salwar kameez" />
                  <figcaption>South Asian finery</figcaption>
                </figure>
              </div>
            </div>
            <div className="fashion-copy">
              <p>Fulcrum connects US retailers, brands and distributors with suitable garment manufacturers in Bangladesh. We help buyers source ready-made clothing for the wider US market, alongside ethnic and traditional wear for Bangladeshi, Indian, Pakistani and other South Asian communities.</p>
              <p>Our approach begins with the buyer’s customers: the styles they seek, the fit they expect and the price points they need. From everyday essentials and contemporary clothing to occasion wear rooted in South Asian traditions, we aim to connect each requirement with manufacturers suited to the product, order size and delivery schedule.</p>
              <p>We identify suitable suppliers, coordinate samples and quotations, and help buyers and manufacturers agree on product specifications, quality expectations and delivery schedules. From the initial enquiry through order follow-up, we keep commercial communication clear and focused.</p>
              <p>Whether you are building a clothing brand, expanding a retail collection or serving a community with a distinctive sense of style, we welcome a conversation about your sourcing needs.</p>
              <a className="text-link" href="/contact">Discuss apparel sourcing <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>
    </Container>
  </>
}
