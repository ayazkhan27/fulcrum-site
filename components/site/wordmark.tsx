import Image from "next/image"

/**
 * Fulcrum wordmark: the brushed-metal mountain mark plus lockup, supplied as
 * a finished asset (fulcrum-logo.png) with the black backdrop keyed out to
 * transparency. `bg-logo-plate` is transparent on the dark ground, where the
 * mark already reads on its own, and becomes the original dark backing on
 * the light ground, where a silver mark on paper would otherwise vanish.
 */
export function Wordmark({
  className,
  priority = false,
}: {
  className?: string
  priority?: boolean
}) {
  return (
    <span className="inline-block bg-logo-plate">
      <Image
        src="/img/fulcrum-logo.png"
        width={1784}
        height={415}
        alt="Fulcrum"
        priority={priority}
        className={className}
      />
    </span>
  )
}
