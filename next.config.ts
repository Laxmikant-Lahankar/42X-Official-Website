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
  async rewrites() {
    return [{ source: "/admin", destination: "/admin/index.html" }];
  },
};

export default nextConfig;