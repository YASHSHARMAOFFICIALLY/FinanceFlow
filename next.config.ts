import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/Quiz",
        destination: "/quiz",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
