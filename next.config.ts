import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Turbopack is the default bundler in Next.js 16+ — no extra config needed
  images: {
    // Add remote image domains here as needed
    // Example: remotePatterns: [{ protocol: 'https', hostname: 'example.com' }],
    remotePatterns: [],
  },
};

export default nextConfig;


