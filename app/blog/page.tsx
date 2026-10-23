import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { Customsection } from "@/app/CustomSection";
import { BlogImage } from "@/components/blog/BlogImage";

export const metadata: Metadata = {
  title: "Blog — 42X Academy",
  description:
    "Articles, insights, and industry guides on SAP, Data Engineering, and Power Platform from 42X Academy.",
};

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Blog Hero Header */}
      <Customsection>
        <div
          className="px-6 py-14 md:px-12 md:py-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 65% 50% at 50% 0%, rgba(59, 130, 246, 0.09), rgba(147, 51, 234, 0.03), transparent 75%)",
          }}
        >
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3.5 py-1 text-xs font-medium text-blue-400">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
              </span>
              <span>42X Academy Journal</span>
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Insights, Playbooks & Tech Deep-Dives
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/60 sm:text-lg">
              Practical guides on SAP ecosystems, Data Engineering pipelines,
              and enterprise tech career acceleration.
            </p>
          </div>
        </div>
      </Customsection>

      {/* Posts Section (Two cards per row) */}
      <Customsection>
        <div className="px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-5xl">
            {posts.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#101114] py-16 text-center">
                <BookOpen className="size-10 text-white/30" />
                <h3 className="mt-4 text-lg font-semibold text-white">
                  No posts published yet
                </h3>
                <p className="mt-1 text-sm text-white/50">
                  Check back soon for new articles and deep-dives.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {posts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#4a6fb5]/20 bg-[#111113] transition duration-200 hover:-translate-y-1.5 hover:border-[#4a6fb5]/45 hover:shadow-2xl hover:shadow-blue-950/20"
                  >
                    {/* Subtle Card Glow */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(ellipse_75%_100%_at_50%_100%,rgba(70,120,230,0.12),transparent_70%)]"
                    />

                    {/* Image on Top (with placeholder fallback) */}
                    <BlogImage
                      src={p.image}
                      alt={p.title}
                      aspectClassName="aspect-video"
                    />

                    {/* Text Underneath */}
                    <div className="relative flex flex-1 flex-col p-6">
                      <div className="flex flex-wrap items-center gap-3 text-xs text-white/50">
                        {p.date && (
                          <span className="flex items-center gap-1.5">
                            <Calendar className="size-3.5 text-white/40" />
                            {formatDate(p.date)}
                          </span>
                        )}
                        {p.readTime && (
                          <span className="flex items-center gap-1.5">
                            <Clock className="size-3.5 text-white/40" />
                            {p.readTime}
                          </span>
                        )}
                      </div>

                      <h2 className="mt-3 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-blue-300">
                        {p.title}
                      </h2>

                      {p.description && (
                        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-white/60">
                          {p.description}
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
                ))}
              </div>
            )}
          </div>
        </div>
      </Customsection>
    </div>
  );
}