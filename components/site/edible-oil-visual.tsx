import Image from "next/image"

export function EdibleOilVisual() {
  return (
    <div className="edible-oil-visual edible-oil-editorial">
      <Image src="/assets/soybean-oil-editorial-v2.png" alt="Illustrative still life of soybean oil, soybeans and leaves" width={1536} height={1024} sizes="(max-width: 800px) 90vw, 45vw" preload />
    </div>
  )
}
