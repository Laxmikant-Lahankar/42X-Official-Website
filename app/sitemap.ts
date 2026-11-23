import type { MetadataRoute } from "next";
import { COURSES } from "@/data/courses";
import { getAllPosts } from "@/lib/posts";
import { SITE, UNLISTED_COURSES } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: `${SITE.url}/`, changeFrequency: "weekly", priority: 1 },
      { url: `${SITE.url}/courses`, changeFrequency: "weekly", priority: 0.9 },
      { url: `${SITE.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
      { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.6 },
      { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.6 },
    ] as const
  ).map((p) => ({ ...p, lastModified: now }));

  const coursePages: MetadataRoute.Sitemap = COURSES.filter(
    (c) => !UNLISTED_COURSES.has(c.slug),
  ).map((c) => ({
    url: `${SITE.url}/courses/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    lastModified: p.date ? new Date(p.date) : now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...coursePages, ...blogPages];
}
