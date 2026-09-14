import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/studio", destination: "/", permanent: true },
      { source: "/pricing", destination: "/", permanent: true },
      { source: "/brief", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
