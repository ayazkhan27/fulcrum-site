"use client"

import { useCallback, useSyncExternalStore } from "react"
import { Moon, Sun } from "lucide-react"

type Theme = "dark" | "light"

const EVENT = "fulcrum-theme-change"

/**
 * The theme lives on the document element, applied by a blocking script in the
 * head before first paint. This component reads that external state rather
 * than owning it, which is why it subscribes instead of holding its own copy:
 * two sources of truth would let the icon and the page disagree.
 */
function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange)
  return () => window.removeEventListener(EVENT, onChange)
}

function getSnapshot(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark"
}

/** The server cannot know the visitor's theme, so it renders the placeholder. */
function getServerSnapshot(): Theme | null {
  return null
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggle = useCallback(() => {
    const next: Theme =
      document.documentElement.dataset.theme === "light" ? "dark" : "light"
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem("fulcrum-theme", next)
    } catch {
      // Private browsing can refuse storage. The toggle still works for this
      // session, it just will not be remembered.
    }
    window.dispatchEvent(new Event(EVENT))
  }, [])

  if (theme === null) {
    return <span className="block h-5 w-5" aria-hidden />
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      className="cursor-pointer text-ink/60 transition-colors duration-200 hover:text-ink"
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5" strokeWidth={1.5} />
      ) : (
        <Sun className="h-5 w-5" strokeWidth={1.5} />
      )}
    </button>
  )
}
