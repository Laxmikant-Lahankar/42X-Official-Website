import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const dir = path.join(process.cwd(), "content/blog");

export function getAllPosts() {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const { data } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
      return {
        slug: f.replace(/\.md$/, ""),
        title: data.title as string,
        description: (data.description ?? "") as string,
        date: data.date ? new Date(data.date).toISOString() : "",
        image: (data.image ?? null) as string | null,
      };
    })
    .sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPost(slug: string) {
  const file = path.join(dir, `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  const processed = await remark().use(html).process(content);
  return {
    slug,
    title: data.title as string,
    description: (data.description ?? "") as string,
    date: data.date ? new Date(data.date).toISOString() : "",
    image: (data.image ?? null) as string | null,
    html: processed.toString(),
  };
}