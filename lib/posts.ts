import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";
import type { SceneId } from "@/components/courses/landing/scenes/types";

/** Animated course scene used as the cover when a post has no image. */
const BLOG_SCENES: Record<string, SceneId> = {
  "sap-mm-vs-sap-sd": "o2c",
  "sap-wm-vs-ewm": "warehouse",
  "what-is-sap-basis": "basis",
  "how-to-become-sap-abap-developer": "abap",
  "which-sap-module-to-choose": "p2p",
  "learn-sap-online": "lowcode",
  "sap-classes-in-pune": "warehouse",
  "sap-layoffs-2026-what-it-means-for-sap-careers": "o2c",
  "sap-security-incident-november-2026": "basis",
};

const dir = path.join(process.cwd(), "content/blog");

export type Faq = { question: string; answer: string };
export type CtaButton = { label: string; url: string };
export type Cta = { heading?: string; text?: string; buttons?: CtaButton[] };

const str = (v: unknown) => (typeof v === "string" ? v : "");

function readTime(text: string) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}

function toMeta(slug: string, data: { [key: string]: unknown }, content: string) {
  const title = str(data.title);
  const intro = str(data.intro);
  return {
    slug,
    title,
    seoTitle: str(data.seoTitle),
    description: str(data.description),
    author: str(data.author),
    primaryKeyword: str(data.primaryKeyword),
    secondaryKeywords: (Array.isArray(data.secondaryKeywords)
      ? data.secondaryKeywords
      : []) as string[],
    date: data.date ? new Date(data.date as string | Date).toISOString() : "",
    image: str(data.image) || null,
    imageAlt: str(data.imageAlt) || title,
    scene: BLOG_SCENES[slug] ?? null,
    intro,
    faqs: (Array.isArray(data.faqs) ? data.faqs : []) as Faq[],
    cta: (data.cta ?? null) as Cta | null,
    readTime: readTime(`${intro} ${content}`),
  };
}

export function getAllPosts() {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data, content } = matter(
        fs.readFileSync(path.join(dir, f), "utf8")
      );
      return toMeta(f.replace(/\.md$/, ""), data, content);
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string) {
  const file = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  // GFM: tables, autolinked URLs, strikethrough. remark-html sanitizes output.
  const processed = await remark().use(gfm).use(html).process(content);
  return { ...toMeta(slug, data, content), html: processed.toString() };
}