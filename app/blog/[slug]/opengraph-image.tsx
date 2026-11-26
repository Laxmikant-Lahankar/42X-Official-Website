import { getPost } from "@/lib/posts";
import { OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "42X Academy Journal article";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  return renderOgCard({
    kicker: "42X Journal",
    title: post?.title ?? "42X Academy Journal",
    subtitle: post?.readTime ? `${post.readTime} · Practical SAP career guide` : undefined,
  });
}
