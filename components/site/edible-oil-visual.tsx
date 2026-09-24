import Image from "next/image"

export function EdibleOilVisual() {
  return (
    <div className="edible-oil-visual edible-oil-visual-single">
      <Image
        src="/assets/openclipart-vectors-soy-146694_1920.png"
        alt="Soybean pod and green leaves above a golden drop of oil"
        width={1461}
        height={1920}
        sizes="(max-width: 800px) 80vw, 360px"
        preload
      />
      <div className="edible-oil-bottle-panel">
        <Image
        src="/assets/openclipart-vectors-oil-159855_1920.png"
        alt="Glass bottle of golden oil with olives and leaves"
        width={1108}
        height={1920}
        sizes="(max-width: 800px) 40vw, 180px"
      />
      </div>
    </div>
  )
}
