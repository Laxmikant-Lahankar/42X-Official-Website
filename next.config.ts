import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "globe.gl",
    "three",
    "three-globe",
    "three-render-objects",
  ],
};

export default nextConfig;
