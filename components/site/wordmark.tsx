import Image from "next/image"

/**
 * Fulcrum wordmark: the brushed-metal mountain mark plus lockup, supplied as
 * a finished asset (fulcrum-logo.png) rather than built from paths. It ships
 * on its own black plate, so it renders identically on both the dark and
 * light grounds instead of trying to invert.
 */
export function Wordmark({
  className,
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <Image
      src="/img/fulcrum-logo.png"
      width={1784}
      height={415}
      alt="Fulcrum"
      priority={priority}
      className={className}
    />
  )
}
