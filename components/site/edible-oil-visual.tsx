import Image from "next/image"

export function EdibleOilVisual() {
  return (
    <figure className="edible-oil-visual">
      <Image
        className="edible-oil-bottle"
        src="/assets/openclipart-vectors-oil-159855_1920.png"
        alt="Glass cruet of golden oil with olives and leaves"
        width={1108}
        height={1920}
        sizes="155px"
        preload
      />
    </figure>
  )
}
