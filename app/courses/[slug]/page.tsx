import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Customsection } from "@/app/CustomSection";
import { Syllabus } from "@/components/courses/Syllabus";
import { COURSES, getCourse } from "@/data/courses";
import { CTAButton } from "@/components/CTAButton";
import { CTAS } from "@/lib/cta";


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
        <div className="px-6 py-16 md:px-12 md:py-20">
          <Link
            href={`/courses#${course.category}`}
            className="text-xs font-medium text-white/50 hover:text-white/80 sm:text-sm"
          >
            ← Back to courses
          </Link>
          <h1 className="mt-4 max-w-3xl text-3xl font-light text-white md:text-4xl">
            {course.title}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            {course.subtitle}
          </p>
          <p className="mt-6 text-sm text-white/45">
            {course.duration} · {course.structure}
          </p>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/60">
            <span className="text-white/45">Who it&apos;s for: </span>
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
            variant="primary"
            size="sm"
            className="mt-8"
          />
        </div>
      </Customsection>


      <Customsection>
        <div className="space-y-16 px-6 py-16 md:px-12 md:py-20">
          <Highlights items={course.highlights} />

          <Syllabus modules={course.modules} />

          <div>
            <h2 className="text-3xl font-light text-white md:text-4xl">
              What you&apos;ll walk away with
            </h2>
            <div className="mt-8 space-y-4">
              <Card title="Practical skills and learning outcomes">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <p className="text-sm text-white/45">Practical skills</p>
                    <BulletList items={course.skills} />
                  </div>
                  <div>
                    <p className="text-sm text-white/45">Learning outcomes</p>
                    <BulletList items={course.outcomes} />
                  </div>
                </div>
              </Card>

              <div className="grid gap-4 md:grid-cols-2">
                <Card title="Capstone project">
                  <p className="text-sm leading-relaxed text-white/60">
                    {course.capstone}
                  </p>
                </Card>

                <Card title="Career outcomes">
                  <ul className="flex flex-wrap gap-2">
                    {course.roles.map((r) => (
                      <li
                        key={r}
                        className="rounded-full bg-white/[0.06] px-3 py-1 text-[13px] text-white/75"
                      >
                        {r}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm text-white/45">
                    What sets this course apart
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
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
      <h2 className="text-3xl font-light text-white md:text-4xl">
        Course highlights
      </h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {items.map((h, i) => (
          <li
            key={h}
            className={`flex items-start gap-4 rounded-sm bg-[#141414] p-5 ring-1 ring-white/10 transition-colors hover:ring-white/20 ${spans[i]}`}
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-white/80">
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
            <span className="pt-1 text-[15px] leading-relaxed text-white/75">
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
    <section className="rounded-sm bg-[#141414] p-6 ring-1 ring-white/10 md:p-8">
      <h3 className="mb-4 text-lg font-light text-white">{title}</h3>
      {children}
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-6 text-white/60">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}