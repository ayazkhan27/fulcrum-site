import Image from "next/image"

export function EdibleOilVisual() {
  return (
    <div className="edible-oil-visual edible-oil-editorial edible-oil-stack">
      <Image src="/assets/soybean-oil-editorial-v2.png" alt="Illustrative still life of soybean oil, soybeans and leaves" width={1536} height={1024} sizes="(max-width: 800px) 90vw, 45vw" preload />
      <Image className="corn-oil-image" src="/assets/corn-oil-generated-v1.png" alt="Illustration of golden corn oil in a glass cruet with fresh corn cobs" width={1024} height={1536} sizes="(max-width: 800px) 65vw, 250px" />
    </div>
  )
}
