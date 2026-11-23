import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // CMS admin and API endpoints are not content.
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
