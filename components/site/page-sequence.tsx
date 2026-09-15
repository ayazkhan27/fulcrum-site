"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { sitePages } from "@/lib/site-pages"

export function PageSequence() {
  const pathname = usePathname()
  const index = sitePages.findIndex((page) => page.href === pathname)
  if (index < 0) return null
  const previous = sitePages[index - 1]
  const next = sitePages[index + 1]

  return (
    <nav className="page-sequence" aria-label="Continue through Fulcrum">
      <div className="shell page-sequence-inner">
        {previous ? (
          <Link href={previous.href} rel="prev" className="page-sequence-previous">
            <span>← Previous</span>
            <strong>{previous.label}</strong>
          </Link>
        ) : <span />}
        <span className="page-sequence-position">{index + 1} / {sitePages.length}</span>
        {next ? (
          <Link href={next.href} rel="next" className="page-sequence-next">
            <span>Next →</span>
            <strong>{next.label}</strong>
          </Link>
        ) : <span />}
      </div>
    </nav>
  )
}
