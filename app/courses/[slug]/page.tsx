//@ts-ignore
import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Customsection } from "@/app/CustomSection";
import { Syllabus } from "@/components/courses/Syllabus";
import { COURSES, getCourse } from "@/data/courses";
import { CTAButton } from "@/components/CTAButton";
import { CTAS } from "@/lib/cta";

// Theme tokens only (styling) — no logic/content changes
const HEADING =
  "font-[family-name:var(--font-montserrat),Montserrat,sans-serif]";

// Muted neutral text tokens (replace the blue-tinted greys)
const TEXT = "text-white/70";
const MUTED = "text-white/45";

// One faint, cool glow at the top only. No purple, no corner blurs,
// so the page stays close to the site's near-black background.
const SECTION_BG = {
  backgroundImage:
    "radial-gradient(ellipse 50% 30% at 50% 0%, rgba(0,180,255,.04), transparent 80%)",
};

// Neutral dark card with a hairline border, matching the listing page cards
const CARD =
  "rounded-2xl border border-white/10 bg-gradient-to-br from-[#141414] to-[#0a0a0a]";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) return {};
  return {
    title: `${course.title} — 42X Academy`,
    description: course.subtitle,
  };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);
  if (!course) notFound();

  return (
    <div>
      {/* Hero */}
      <Customsection>
        <div className="px-6 py-16 md:px-12 md:py-20" style={SECTION_BG}>
          <Link
            href={`/courses#${course.category}`}
            className={`text-xs font-medium ${MUTED} hover:text-white sm:text-sm`}
          >
            ← Back to courses
          </Link>
          <h1
            className={`${HEADING} mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white md:text-4xl`}
          >
            {course.title}
          </h1>
          <p
            className={`mt-4 max-w-2xl text-sm leading-relaxed ${TEXT} md:text-base`}
          >
            {course.subtitle}
          </p>
          <p className={`mt-6 text-sm ${MUTED}`}>
            {course.duration} · {course.structure}
          </p>
          <p className={`mt-2 max-w-2xl text-sm leading-relaxed ${TEXT}`}>
            <span className={MUTED}>Who it&apos;s for: </span>
            {course.audience}
          </p>

          {/* Same button as the navbar Contact button, pre-selecting this course */}
          <CTAButton
            cta={{
              ...CTAS.contact,
              href: `/contact?course=${course.slug}`,
              label: "Enquire about this course",
            }}
            src="course-detail"
            variant="gradient"
            size="sm"
            className="mt-8"
          />
        </div>
      </Customsection>

      <Customsection>
        <div
          className="space-y-16 px-6 py-16 md:px-12 md:py-20"
          style={SECTION_BG}
        >
          <Highlights items={course.highlights} />

          <Syllabus
            modules={course.modules}
            courseSlug={course.slug}
            courseTitle={course.title}
          />

          <div>
            <h2
              className={`${HEADING} text-3xl font-bold tracking-tight text-white md:text-4xl`}
            >
              What you&apos;ll walk away with
            </h2>
            <div className="mt-8 space-y-4">
              <Card title="Practical skills and learning outcomes">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <p className={`text-sm ${MUTED}`}>Practical skills</p>
                    <BulletList items={course.skills} />
                  </div>
                  <div>
                    <p className={`text-sm ${MUTED}`}>Learning outcomes</p>
                    <BulletList items={course.outcomes} />
                  </div>
                </div>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card title="Capstone project">
                  <p className={`text-sm leading-relaxed ${TEXT}`}>
                    {course.capstone}
                  </p>
                </Card>

                <Card title="Career outcomes">
                  <ul className="flex flex-wrap gap-2">
                    {course.roles.map((r) => (
                      <li
                        key={r}
                        className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-1 text-[13px] text-white/75"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                  <p className={`mt-5 text-sm ${MUTED}`}>
                    What sets this course apart
                  </p>
                  <p className={`mt-2 text-sm leading-relaxed ${TEXT}`}>
                    {course.differentiator}
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Customsection>
    </div>
  );
}

/* ---------- small helpers ---------- */

// Splits N highlights into balanced rows (never a lonely orphan card):
// 4 -> 2+2, 5 -> 3+2, 7 -> 3+2+2, 9 -> 3+3+3. Uses a 6-column grid on large screens.
const SPAN: Record<number, string> = {
  1: "lg:col-span-6",
  2: "lg:col-span-3",
  3: "lg:col-span-2",
};

function spanClasses(n: number): string[] {
  const spans: string[] = [];
  let left = n;
  while (left > 0) {
    const size = left === 4 ? 2 : Math.min(3, left);
    for (let i = 0; i < size; i++) spans.push(SPAN[size]);
    left -= size;
  }
  return spans;
}

function Highlights({ items }: { items: string[] }) {
  const spans = spanClasses(items.length);
  return (
    <div>
      <h2
        className={`${HEADING} text-3xl font-bold tracking-tight text-white md:text-4xl`}
      >
        Course highlights
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {items.map((h, i) => (
          <li
            key={h}
            className={`flex items-start gap-4 ${CARD} p-5 transition duration-200 hover:-translate-y-1 hover:border-white/25 hover:shadow-lg hover:shadow-black/40 ${spans[i]}`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/[0.05] text-[#00B4FF]/80">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <span className={`pt-1 text-[15px] leading-relaxed ${TEXT}`}>
              {h}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className={`${CARD} p-6 md:p-8`}>
      <h3 className={`${HEADING} mb-4 text-lg font-bold text-white`}>
        {title}
      </h3>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul
      className={`mt-3 list-disc space-y-1 pl-5 text-sm leading-6 ${TEXT} marker:text-white/35`}
    >
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}
