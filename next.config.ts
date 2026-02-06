import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb', // Allow up to 20MB for photo uploads
    },
  },
};

export default nextConfig;
