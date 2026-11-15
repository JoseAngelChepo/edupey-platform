import type { NextConfig } from "next"

/**
 * Proxy /api/v1 → services so auth cookies are first-party on the app origin.
 * Cross-port (3000→3001) breaks SameSite cookie flows in the browser.
 *
 * Production can keep NEXT_PUBLIC_API_URL=/api/v1 and set API_PROXY_ORIGIN
 * to the real services host, or point NEXT_PUBLIC_API_URL at the API directly
 * (then cookies need SameSite=None + CORS).
 */
const nextConfig: NextConfig = {
  // Allow LAN devices (phone/tablet) to use HMR in `next dev`.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
  async rewrites() {
    const proxyOrigin =
      process.env.API_PROXY_ORIGIN?.trim() || "http://localhost:3001"
    return [
      {
        source: "/api/v1/:path*",
        destination: `${proxyOrigin.replace(/\/$/, "")}/api/v1/:path*`,
      },
    ]
  },
}

export default nextConfig
