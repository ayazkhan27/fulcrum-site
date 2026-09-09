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
  title: "Fulcrum | Global sourcing & representation",
  description:
    "Sourcing, supplier representation and commercial coordination across aviation, energy, textiles, industrial equipment and healthcare. Bangladesh connections, global reach.",
  openGraph: {
    title: "Fulcrum · Global sourcing. Local representation.",
    description:
      "Connecting international suppliers and manufacturers with requirements in Bangladesh and beyond.",
    type: "website",
    siteName: "Fulcrum",
    images: [
      {
        url: "/assets/su-jun-mega-projects-8020883_1920.png",
        width: 1920,
        height: 1250,
        alt: "Terminal architecture. Fulcrum sourcing and representation.",
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
