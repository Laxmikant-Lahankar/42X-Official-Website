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
  async redirects() {
    return [
      // The /apply form does not persist submissions yet; send visitors to the
      // contact form, which saves leads to SharePoint. Temporary (302).
      {
        source: "/apply",
        destination: "/contact?src=apply",
        permanent: false,
      },
      {
        source: "/blogs",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/blogs/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;