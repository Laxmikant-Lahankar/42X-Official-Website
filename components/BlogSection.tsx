import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { Customsection } from "@/app/CustomSection";
import SectionHeader from "@/components/SectionHeader";
import { BlogImage } from "@/components/blog/BlogImage";
import Reveal from "@/components/Reveal";

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogSection() {
  const posts = getAllPosts().slice(0, 2);

  if (posts.length === 0) return null;

  return (
    <Customsection id="blogs">
      <div className="px-6 py-14 md:px-12 md:py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeader
            badge="From our blog"
            title="Insights & Playbooks from Industry Practitioners"
          />

          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold text-white transition hover:border-white/30 hover:bg-white/10 md:self-auto"
          >
            <span>View all articles</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2">
          {posts.map((post, idx) => (
            <Reveal key={post.slug} delayMs={idx * 100}>
              <Link
                href={`/blog/${post.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#4a6fb5]/20 bg-[#111113] transition duration-200 hover:-translate-y-1.5 hover:border-[#4a6fb5]/45 hover:shadow-2xl hover:shadow-blue-950/20"
              >
                {/* Glow rising from bottom */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(ellipse_75%_100%_at_50%_100%,rgba(70,120,230,0.12),transparent_70%)]"
                />

                {/* Image on top */}
                <BlogImage
                  src={post.image}
                  alt={post.title}
                  aspectClassName="aspect-video"
                />

                {/* Text underneath */}
                <div className="relative flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
                    {post.date && (
                      <span className="flex items-center gap-1.5">
                        <Calendar className="size-3.5 text-white/40" />
                        {formatDate(post.date)}
                      </span>
                    )}
                    {post.readTime && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5 text-white/40" />
                        {post.readTime}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-blue-300">
                    {post.title}
                  </h3>

                  {post.description && (
                    <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-white/60">
                      {post.description}
                    </p>
                  )}

                  <div className="mt-auto pt-6">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                      Read article
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </Customsection>
  );
}
