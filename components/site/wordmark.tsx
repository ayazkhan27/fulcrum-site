import Image from "next/image"

/**
 * Fulcrum wordmark, in two tonal cuts of the same artwork: the brushed-metal
 * original for the graphite ground, and an inverted cut for paper. Both ship
 * with the black backdrop keyed out.
 *
 * Both are rendered and one is hidden by CSS rather than swapped in JS, so the
 * correct cut is painted on the first frame instead of flashing the wrong one
 * while a script decides.
 */
export function Wordmark({
  className,
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <>
      <Image
        src="/img/fulcrum-logo.png"
        width={1784}
        height={415}
        alt="Fulcrum"
        priority={priority}
        className={`${className} logo-on-dark`}
      />
      <Image
        src="/img/fulcrum-logo-dark.png"
        width={1784}
        height={415}
        alt="Fulcrum"
        priority={priority}
        aria-hidden
        className={`${className} logo-on-light`}
      />
    </>
  )
}
