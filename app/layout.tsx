import type { Metadata } from "next"
import { createPageMetadata, siteUrl } from "@/lib/site-seo"
import localFont from "next/font/local"
import { VisitorAnalytics } from "@/components/site/visitor-analytics"
import { SiteMotion } from "@/components/site/site-motion"
import { PageSequence } from "@/components/site/page-sequence"
import { PerformanceInsights } from "@/components/site/performance-insights"
import { isProductionPerformanceEnabled } from "@/lib/performance-privacy"

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
  ...createPageMetadata("/"),
  verification: { google: "Dzv0rqF46y0VLNYkl_z-pbzpPwc_xjtmsnsp2w-d0xw" },
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/fulcrum-site-icon.png?v=masthead-mark-only-v3", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/apple-touch-icon.png?v=masthead-mark-only-v3", sizes: "180x180", type: "image/png" }],
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
        <VisitorAnalytics />
        {isProductionPerformanceEnabled(process.env.NODE_ENV, process.env.VERCEL_ENV) && (
          <PerformanceInsights />
        )}
      </body>
    </html>
  )
}
