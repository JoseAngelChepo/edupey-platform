import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  /* Add product-specific redirects here when forking. */
  // Allow LAN devices (phone/tablet) to use HMR in `next dev`.
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*", "172.*.*.*"],
}

export default nextConfig
