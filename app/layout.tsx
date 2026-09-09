import type { Metadata } from "next"
import localFont from "next/font/local"
import { SiteMotion } from "@/components/site/site-motion"

import "./globals.css"
import "./editorial.css"

// Avenir stays local for body copy. Editorial headings use the system
// Helvetica stack; no third-party font files are copied or remotely fetched.
const avenir = localFont({
  src: [
    { path: "./fonts/avenir/Avenir-Light.ttf", weight: "300", style: "normal" },
    { path: "./fonts/avenir/Avenir-Book.ttf", weight: "400", style: "normal" },
    {
      path: "./fonts/avenir/Avenir-Regular.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/avenir/Avenir-Medium.ttf",
      weight: "600",
      style: "normal",
    },
    { path: "./fonts/avenir/Avenir-Heavy.ttf", weight: "800", style: "normal" },
    { path: "./fonts/avenir/Avenir-Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-avenir",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://fulcrumtriad.com"),
  title: "Fulcrum | Aviation and energy advisory & brokerage",
  description:
    "Global consulting and brokerage across aviation, aircraft, engines, maintenance, operational equipment, petroleum products and LNG.",
  openGraph: {
    title: "Fulcrum · Global advisory and brokerage across aviation and energy",
    description:
      "Independent consulting and transaction support for aviation and energy clients worldwide.",
    type: "website",
    siteName: "Fulcrum",
    images: [
      {
        url: "/aviation-aerial.png",
        width: 1536,
        height: 1024,
        alt: "Fulcrum aviation and energy advisory. Illustrative aircraft image.",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={avenir.variable}>
      <body id="top">
        {children}
        <SiteMotion />
      </body>
    </html>
  )
}
