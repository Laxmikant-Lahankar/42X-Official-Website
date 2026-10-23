import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
} from "lucide-react";
import { getAllPosts, getPost } from "@/lib/posts";
import { Customsection } from "@/app/CustomSection";
import { BlogImage } from "@/components/blog/BlogImage";
import { BlogShareSection } from "@/components/blog/BlogShareSection";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const pageTitle = post.seoTitle
    ? { absolute: post.seoTitle }
    : `${post.title} — 42X Academy Blog`;
  const socialTitle = post.seoTitle || `${post.title} — 42X Academy`;

  return {
    title: pageTitle,
    description:
      post.description || "Read articles and insights from 42X Academy.",
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: socialTitle,
      description: post.description,
      type: "article",
      images: post.image
        ? [{ url: post.image, alt: post.imageAlt }]
        : ["/logo2.png"],
    },
  };
}

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const relatedPosts = allPosts.filter((p) => p.slug !== slug).slice(0, 2);
  const formattedDate = formatDate(post.date);

  const faqSchema =
    post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Post Header Hero Section */}
      <Customsection>
        <div
          className="relative px-6 py-12 md:px-12 md:py-16 lg:py-20"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 65% 45% at 50% 0%, rgba(59, 130, 246, 0.08), rgba(147, 51, 234, 0.03), transparent 75%)",
          }}
        >
          {/* Top Navigation & Breadcrumbs */}
          <div className="mx-auto max-w-4xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <Link
                href="/blog"
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs font-medium text-white/70 backdrop-blur-md transition hover:border-white/25 hover:bg-white/10 hover:text-white"
              >
                <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                <span>Back to Blog</span>
              </Link>

              <div className="hidden items-center gap-2 text-xs text-white/40 sm:flex">
                <Link href="/" className="hover:text-white/70">
                  Home
                </Link>
                <span>/</span>
                <Link href="/blog" className="hover:text-white/70">
                  Blog
                </Link>
                <span>/</span>
                <span className="max-w-[200px] truncate text-white/70">
                  {post.title}
                </span>
              </div>
            </div>

            {/* Badge & Metadata Chips */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
                </span>
                <span>42X Journal</span>
              </div>

              {post.author && (
                <div className="inline-flex items-center gap-1.5 text-xs text-white/55">
                  <User className="size-3.5 text-white/40" />
                  <span>{post.author}</span>
                </div>
              )}

              {formattedDate && (
                <div className="inline-flex items-center gap-1.5 text-xs text-white/55">
                  <Calendar className="size-3.5 text-white/40" />
                  <span>{formattedDate}</span>
                </div>
              )}

              <div className="inline-flex items-center gap-1.5 text-xs text-white/55">
                <Clock className="size-3.5 text-white/40" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Main Headline (H1) */}
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[2.85rem] lg:leading-[1.18]">
              {post.title}
            </h1>

            {/* Featured Image Frame */}
            <div className="relative mt-10 w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] shadow-2xl shadow-black/80">
              <BlogImage
                src={post.image}
                alt={post.imageAlt}
                priority
                aspectClassName="aspect-video md:aspect-[21/9]"
              />
            </div>
          </div>
        </div>
      </Customsection>

      {/* Main Article Content Section */}
      <Customsection>
        <div className="px-6 py-12 md:px-12 md:py-16">
          <div className="mx-auto max-w-3xl">
            {/* Intro paragraph */}
            {post.intro && (
              <p className="border-l-2 border-blue-500/60 pl-5 text-lg leading-relaxed text-white/85 md:text-xl">
                {post.intro}
              </p>
            )}

            <article
              className="prose prose-invert prose-lg mt-10 max-w-none
                prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-white
                prose-h1:mt-12 prose-h1:mb-6 prose-h1:text-3xl sm:prose-h1:text-4xl
                prose-h2:mt-12 prose-h2:mb-4 prose-h2:border-t prose-h2:border-white/10 prose-h2:pt-8 prose-h2:text-2xl sm:prose-h2:text-3xl
                prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl sm:prose-h3:text-2xl
                prose-p:text-base prose-p:leading-relaxed prose-p:text-white/80 sm:prose-p:text-lg
                prose-a:text-blue-400 prose-a:underline-offset-4 prose-a:transition hover:prose-a:text-blue-300
                prose-strong:font-semibold prose-strong:text-white
                prose-blockquote:rounded-r-xl prose-blockquote:border-l-2 prose-blockquote:border-blue-500 prose-blockquote:bg-white/[0.03] prose-blockquote:px-5 prose-blockquote:py-2 prose-blockquote:not-italic prose-blockquote:text-white/75
                prose-code:rounded prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-blue-300 prose-code:before:content-none prose-code:after:content-none
                prose-pre:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#121316]
                prose-li:my-1 prose-li:text-white/80
                prose-img:rounded-xl prose-img:border prose-img:border-white/10
                prose-hr:my-10 prose-hr:border-white/10"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />

            {/* FAQs */}
            {post.faqs.length > 0 && (
              <section className="mt-14">
                <h2 className="border-t border-white/10 pt-8 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Frequently Asked Questions
                </h2>
                <div className="mt-6 space-y-4">
                  {post.faqs.map((f) => (
                    <div
                      key={f.question}
                      className="rounded-xl border border-white/10 bg-white/[0.02] p-5"
                    >
                      <h3 className="text-lg font-semibold text-white">
                        {f.question}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-white/70">
                        {f.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Call to action */}
            {post.cta?.heading && (
              <section
                className="mt-14 rounded-2xl border border-[#4a6fb5]/25 p-8 text-center md:p-10"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 80% 100% at 50% 100%, rgba(70, 120, 230, 0.14), transparent 70%)",
                }}
              >
                <h2 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {post.cta.heading}
                </h2>
                {post.cta.text && (
                  <p className="mx-auto mt-3 max-w-xl text-base text-white/70">
                    {post.cta.text}
                  </p>
                )}
                {post.cta.buttons && post.cta.buttons.length > 0 && (
                  <div className="mt-7 flex flex-wrap justify-center gap-3">
                    {post.cta.buttons.map((b, i) => (
                      <a
                        key={b.url}
                        href={b.url}
                        className={
                          i === 0
                            ? "inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
                            : "inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white/85 transition hover:border-white/40 hover:text-white"
                        }
                      >
                        {b.label}
                        <ArrowRight className="size-4" />
                      </a>
                    ))}
                  </div>
                )}
              </section>
            )}

            {/* Share section */}
            <div className="mt-14">
              <BlogShareSection title={post.title} />
            </div>
          </div>
        </div>
      </Customsection>

      {/* Related Articles Section */}
      {relatedPosts.length > 0 && (
        <Customsection>
          <div className="px-6 py-12 md:px-12 md:py-16">
            <div className="mx-auto max-w-5xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    Keep Reading
                  </p>
                  <h2 className="mt-1 text-2xl font-bold text-white md:text-3xl">
                    More from 42X Academy
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-1 text-sm font-medium text-white/60 transition hover:text-white"
                >
                  <span>View all articles</span>
                  <ArrowRight className="size-4" />
                </Link>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                {relatedPosts.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/blog/${p.slug}`}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#4a6fb5]/20 bg-[#111113] transition duration-200 hover:-translate-y-1.5 hover:border-[#4a6fb5]/40 hover:shadow-xl hover:shadow-black/50"
                  >
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(ellipse_75%_100%_at_50%_100%,rgba(70,120,230,0.12),transparent_70%)]"
                    />

                    <BlogImage
                      src={p.image}
                      alt={p.imageAlt}
                      aspectClassName="aspect-video"
                    />

                    <div className="relative flex flex-1 flex-col p-6">
                      <p className="text-xs text-white/40">
                        {formatDate(p.date)}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-blue-300">
                        {p.title}
                      </h3>
                      {p.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/60">
                          {p.description}
                        </p>
                      )}
                      <div className="mt-auto pt-4">
                        <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-400 group-hover:underline">
                          Read article <ArrowRight className="size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Customsection>
      )}

      {/* FAQ structured data for Google */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </div>
  );
}