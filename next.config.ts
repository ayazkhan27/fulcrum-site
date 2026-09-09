import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  async redirects() {
    return [
      {
        source: "/method",
        destination: "/aviation/aircraft-engine-transactions",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
