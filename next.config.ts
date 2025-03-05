import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {}, // Use an empty object instead of true
  },
};

export default nextConfig;
