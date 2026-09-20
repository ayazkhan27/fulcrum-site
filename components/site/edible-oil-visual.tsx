import Image from "next/image"

export function EdibleOilVisual() {
  return (
    <div className="edible-oil-visual">
      <figure className="edible-oil-feature">
      <Image
        className="edible-oil-bottle"
        src="/assets/openclipart-vectors-oil-159855_1920.png"
        alt="Glass cruet of golden oil with olives and leaves"
        width={1108}
        height={1920}
        sizes="(max-width: 800px) 45vw, 220px"
        preload
      />
        <figcaption>Edible oils</figcaption>
      </figure>
      <figure className="edible-oil-crop edible-oil-soybean">
        <Image
          src="/assets/soybean-pod-stock.png"
          alt="Golden soybean pod with three beans"
          width={600}
          height={600}
          sizes="(max-width: 800px) 35vw, 150px"
        />
        <figcaption>Soybean</figcaption>
      </figure>
      <figure className="edible-oil-crop edible-oil-corn">
        <Image
          src="/assets/corn-cob-stock.png"
          alt="Golden corn cob with green husks"
          width={600}
          height={600}
          sizes="(max-width: 800px) 35vw, 150px"
        />
        <figcaption>Corn</figcaption>
      </figure>
    </div>
  )
}
