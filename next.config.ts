import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export', // Commented out for SSR deployment
  /* images: {
    unoptimized: true,
  }, */
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default nextConfig;
