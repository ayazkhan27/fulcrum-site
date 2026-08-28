import Image from "next/image"

/**
 * Fulcrum wordmark: the brushed-metal mountain mark plus lockup, supplied as
 * a finished asset (fulcrum-logo.png) with the black backdrop keyed out to
 * transparency, so it sits directly on the page ground rather than its own
 * plate.
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
