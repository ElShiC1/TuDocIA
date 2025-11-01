import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://herrmans.eu/**')],
  },
  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
