import type { Metadata } from "next"
import localFont from "next/font/local"
import { SiteMotion } from "@/components/site/site-motion"
import { PageSequence } from "@/components/site/page-sequence"

import "./globals.css"
import "./editorial.css"
import "./page-sequence.css"

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
  icons: {
    icon: [{ url: "/fulcrum-site-icon.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
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
        url: "/fulcrum-masthead-preview.png",
        width: 1200,
        height: 630,
        alt: "Fulcrum masthead with its twin-mountain logo.",
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
        <PageSequence />
        <SiteMotion />
      </body>
    </html>
  )
}
