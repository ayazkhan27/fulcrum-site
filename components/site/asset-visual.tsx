import Image from "next/image"
import { suppliedAssets, type AssetKey } from "@/lib/asset-library"
export function AssetVisual({
  asset,
  className = "",
  priority = false,
  caption,
}: {
  asset: AssetKey
  className?: string
  priority?: boolean
  caption?: string
}) {
  const image = suppliedAssets[asset]
  return (
    <figure
      className={`asset-visual asset-${image.treatment} asset-${asset} ${className}`}
    >
      <div className="asset-image">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 700px) 100vw, 50vw"
          preload={priority}
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  )
}
