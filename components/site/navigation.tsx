"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
const links = [
  ["/aviation", "Aviation"],
  ["/energy", "Energy"],
  ["/consulting", "Consulting"],
  ["/brokerage", "Brokerage"],
  ["/people", "People"],
]
export function Navigation({ editorial = false }: { editorial?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const toggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        toggle.current?.focus()
      }
    }
    document.addEventListener("keydown", close)
    return () => document.removeEventListener("keydown", close)
  }, [open])
  return (
    <>
      {editorial && (
        <nav className="editorial-quicklinks" aria-label="Featured">
          <Link href="/#overview">About</Link>
          <Link href="/services">Services</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      )}
      <button
        ref={toggle}
        type="button"
        className="menu-toggle"
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        aria-controls="primary-navigation"
        onClick={() => setOpen(!open)}
      >
        {open ? <X /> : <Menu />}
      </button>
      <nav
        id="primary-navigation"
        aria-label="Primary"
        className={`primary-nav ${open ? "is-open" : ""}`}
      >
        {links.map(([href, label]) => (
          <Link
            key={href}
            href={href}
            aria-current={
              pathname === href || pathname.startsWith(`${href}/`)
                ? "page"
                : undefined
            }
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/contact"
          className="nav-contact"
          aria-current={pathname === "/contact" ? "page" : undefined}
          onClick={() => setOpen(false)}
        >
          Contact <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </nav>
    </>
  )
}
