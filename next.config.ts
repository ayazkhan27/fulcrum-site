import type { NextConfig } from "next"
import { legacyRedirects } from "./lib/site-pages"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "www.fulcrumtriad.com" }],
        destination: "https://fulcrumtriad.com/:path*",
        permanent: true,
      },
      ...legacyRedirects.map((redirect) => ({ ...redirect, permanent: true })),
    ]
  },
}

export default nextConfig
