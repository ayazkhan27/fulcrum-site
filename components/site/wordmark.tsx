import Image from "next/image"

export function Wordmark({
  className = "",
  priority = false,
  large = false,
  dark = false,
}: {
  className?: string
  priority?: boolean
  large?: boolean
  dark?: boolean
}) {
  return (
    <Image
      src={dark ? "/fulcrum-logo-shadow-dark.svg" : "/fulcrum-logo-shadow-rivet-light.svg"}
      width={595}
      height={112}
      alt="Fulcrum"
      unoptimized
      preload={priority}
      sizes={
        large
          ? "(max-width: 699px) 75vw, 52vw"
          : "(max-width: 1100px) 205px, 240px"
      }
      className={`masthead-art ${className}`}
    />
  )
}
