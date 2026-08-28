import type { Metadata } from "next"
import { IBM_Plex_Mono } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css"

// Display and body: Avenir, loaded locally across its full weight range so
// both the display headings and running text draw from the same family.
const avenir = localFont({
  src: [
    { path: "./fonts/avenir/Avenir-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/avenir/Avenir-Book.ttf", weight: "400", style: "normal" },
    { path: "./fonts/avenir/Avenir-Regular.ttf", weight: "500", style: "normal" },
    { path: "./fonts/avenir/Avenir-Medium.ttf", weight: "600", style: "normal" },
    { path: "./fonts/avenir/Avenir-Heavy.ttf", weight: "800", style: "normal" },
    { path: "./fonts/avenir/Avenir-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-avenir",
  display: "swap",
})

// Data: mono is not decoration here. It is how MSNs, part numbers, cycle counts
// and margins are actually written in this industry.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Fulcrum — aircraft placement, lessor side",
  description:
    "A New York placement intermediary for widebody aircraft. We act for owners and lessors, screen fleets against tender requirements, and assemble technical bids.",
  openGraph: {
    title: "Fulcrum — aircraft placement, lessor side",
    description:
      "A New York placement intermediary for widebody aircraft. We act for owners and lessors.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${avenir.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before first paint so the correct ground colour is already
            in place. Without this the page flashes dark before switching. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('fulcrum-theme');var m=window.matchMedia('(prefers-color-scheme: light)').matches;document.documentElement.dataset.theme=s||(m?'light':'dark')}catch(e){document.documentElement.dataset.theme='dark'}})()`,
          }}
        />
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
