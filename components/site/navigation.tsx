"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { sitePages } from "@/lib/site-pages"
const links = sitePages
  .filter((page) => page.href !== "/contact")
  .flatMap<{ href: string; label: string }>((page) =>
    page.href === "/equipment"
      ? [page, { href: "/equipment#defense", label: "Defense Supply" }]
      : [page],
  )
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
          <Link href="/">Home</Link>
          <Link href="/mission">Mission</Link>
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
        {links.map(({ href, label }) => {
          const NavLink = href.includes("#") ? "a" : Link
          return (
          <NavLink
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
          </NavLink>
          )
        })}
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
