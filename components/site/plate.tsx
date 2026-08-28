import Image from "next/image"

/**
 * A plate: an image presented the way a technical document presents one, with
 * a hairline frame, a mono figure number and a caption that says what is being
 * looked at rather than selling it.
 *
 * Width and height are always passed so the browser reserves the space before
 * the file arrives. Without them each plate would shift the page as it loads,
 * which is the single most common cause of a bad CLS score.
 */
export function Plate({
  src,
  width,
  height,
  alt,
  figure,
  caption,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  src: string
  width: number
  height: number
  alt: string
  figure: string
  caption: string
  priority?: boolean
  className?: string
  sizes?: string
}) {
  return (
    <figure className={`m-0 ${className}`}>
      <div className="relative overflow-hidden border border-rule bg-ground">
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          priority={priority}
          sizes={sizes}
          className="h-full w-full object-cover"
        />
      </div>
      <figcaption className="mt-3 flex gap-3 text-meta leading-relaxed">
        <span className="eyebrow shrink-0 pt-[0.2em] text-advisory">{figure}</span>
        <span className="text-ink/65">{caption}</span>
      </figcaption>
    </figure>
  )
}
