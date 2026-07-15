import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Allow drag-drop uploads up to 50 MB per file via Server Actions.
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  // Drive serves thumbnails / icons from these hosts.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "drive.google.com" },
      { protocol: "https", hostname: "drive-thirdparty.googleusercontent.com" },
    ],
  },
  // Headers — allow embedding of /command-center inside the Roy Super Cockpit.
  // The cookie SameSite=None (set in auth.ts) lets the session travel into the
  // iframe; this CSP allows the embed itself. frame-ancestors is more flexible
  // than X-Frame-Options because it accepts multiple origins.
  async headers() {
    return [
      {
        source: "/command-center/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "frame-ancestors 'self' " +
              "http://localhost:8765 " +
              "http://127.0.0.1:8765 " +
              "http://100.77.248.128:8765 " +
              "http://100.96.228.102:8765 " +
              "https://cockpit.semistudio.com",
          },
        ],
      },
    ];
  },
  // OAuth discovery lives at well-known paths; route them to our handlers.
  async rewrites() {
    return [
      { source: "/.well-known/oauth-protected-resource", destination: "/api/oauth/resource-metadata" },
      { source: "/.well-known/oauth-authorization-server", destination: "/api/oauth/as-metadata" },
    ];
  },
};

export default nextConfig;
