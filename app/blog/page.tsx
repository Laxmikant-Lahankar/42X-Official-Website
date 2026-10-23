import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = { title: "Blog" };

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <main>
      <h1>Blog</h1>
      {posts.map((p) => (
        <article key={p.slug}>
          <h2>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
          </h2>
          <p>{p.description}</p>
        </article>
      ))}
    </main>
  );
}