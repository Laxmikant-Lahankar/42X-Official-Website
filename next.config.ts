import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: [
    "globe.gl",
    "three",
    "three-globe",
    "three-render-objects",
  ],
  turbopack: {
    resolveAlias: {
      "tw-animate-css": path.join(
        process.cwd(),
        "node_modules/tw-animate-css/dist/tw-animate.css",
      ),
    },
  },
};

export default nextConfig;
