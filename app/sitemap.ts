import type { MetadataRoute } from "next";
import { COURSES } from "@/data/courses";
import { getAllPosts } from "@/lib/posts";
import { SITE, UNLISTED_COURSES } from "@/lib/seo";

// lastModified is only set where we know the real date (blog posts).
// Google ignores lastmod values that change on every deploy without the page
// changing, so static and course pages omit it rather than claim "today".
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/courses`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${SITE.url}/privacy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE.url}/terms`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const coursePages: MetadataRoute.Sitemap = COURSES.filter(
    (c) => !UNLISTED_COURSES.has(c.slug),
  ).map((c) => ({
    url: `${SITE.url}/courses/${c.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE.url}/blog/${p.slug}`,
    ...(p.date ? { lastModified: new Date(p.date) } : {}),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...coursePages, ...blogPages];
}
