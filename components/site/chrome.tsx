import Link from "next/link"

import { ThemeToggle } from "@/components/site/theme-toggle"
import { Wordmark } from "@/components/site/wordmark"

// Three items plus the theme control. Every entry resolves to real content;
// nothing here is a placeholder.
const NAV = [
  { href: "/services", label: "Services" },
  { href: "/method", label: "Method" },
  { href: "/people", label: "People" },
  { href: "/#contact", label: "Contact" },
]

export function Header() {
  return (
    <header className="border-b border-rule">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-5">
        <Link
          href="/"
          aria-label="Fulcrum, home"
          className="text-ink transition-opacity hover:opacity-70"
        >
          <Wordmark priority className="h-16 w-auto sm:h-[4.75rem]" />
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-5 sm:gap-6">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-meta text-ink/60 transition-colors hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="flex items-center">
              <ThemeToggle />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="text-ink/70">
            <Wordmark className="h-9 w-auto" />
          </div>
          <p className="max-w-md text-meta leading-relaxed text-ink/65">
            Fulcrum is a placement intermediary. We are not a lessor, we do not
            own aircraft, and we do not take positions. We act for owners and
            lessors under written mandate and are paid by them.
          </p>
        </div>
        <p className="eyebrow mt-10 text-ink/65">New York</p>
      </div>
    </footer>
  )
}
