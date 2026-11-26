import type { ReactNode } from "react";
import { Inter, Montserrat } from "next/font/google";
import { Customsection } from "@/app/CustomSection";
import { Syllabus } from "@/components/courses/Syllabus";
import { JsonLd } from "@/components/JsonLd";
import type { CourseContent } from "@/data/courses";
import type { CourseLanding as LandingCopy } from "@/data/course-landing/types";
import { faqSchema } from "@/lib/seo";
import {
  CountUp,
  FadeIn,
  FaqList,
  IncidentTicker,
  LandingMotion,
  Roadmap,
  TrackedLink,
} from "./motion";
import { RoleScene } from "./RoleScene";
import { SceneThumb } from "@/components/courses/SceneThumb";
import type { SceneId } from "./scenes/types";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

// Brand typography (42X brand guide): Montserrat for headings/CTAs, Inter for body.
// --font-montserrat is also what the shared Syllabus component already asks for.
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-montserrat",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const H2 =
  "font-[family-name:var(--font-montserrat)] text-3xl font-semibold leading-tight tracking-tight text-white md:text-[40px]";
const KICKER =
  "text-xs font-semibold uppercase tracking-[0.2em] text-[#00E5FF]";
const GRADIENT_TEXT =
  "bg-gradient-to-r from-[#00B4FF] via-[#7B3DFF] to-[#00E5FF] bg-clip-text text-transparent";
const CARD =
  "rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(11,31,68,.55),rgba(10,10,20,.8))]";
const BTN =
  "inline-flex min-h-12 items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 font-[family-name:var(--font-montserrat)] text-[15px] font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]";
const BTN_PRIMARY = `${BTN} bg-gradient-to-r from-[#00B4FF] to-[#7B3DFF] text-white shadow-[0_12px_36px_-10px_rgba(123,61,255,.7)] hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-10px_rgba(0,180,255,.7)] motion-reduce:hover:translate-y-0`;
const BTN_SECONDARY = `${BTN} border border-white/20 text-white hover:border-[#00B4FF]/70 hover:bg-white/5`;

function Section({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <Customsection id={id}>
      <div className="px-5 py-16 sm:px-8 md:px-12 md:py-24">{children}</div>
    </Customsection>
  );
}

export function CourseLanding({
  course,
  copy,
  related = [],
}: {
  course: CourseContent;
  copy: LandingCopy;
  related?: { slug: string; title: string; scene: SceneId; weeks: string }[];
}) {
  const slug = course.slug;
  // Blog posts that support this course (order as listed in its landing data).
  const posts = getAllPosts();
  const guides = (copy.reading ?? [])
    .map((s) => posts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const href = {
    session: `/contact?intent=demo&course=${slug}`,
    fees: `/contact?course=${slug}`,
    whatsapp: `https://wa.me/918484834242?text=${encodeURIComponent(
      `Hi 42X Academy, I'd like details about the ${course.title} course.`,
    )}`,
  };
  const withSrc = (base: string, src: string) =>
    `${base}${base.includes("?") ? "&" : "?"}src=${src}`;

  return (
    <LandingMotion>
      <div
        className={`${montserrat.variable} ${inter.variable} font-[family-name:var(--font-inter)]`}
      >
        <JsonLd data={faqSchema(copy.faqs)} />

        {/* ───────── HERO: headline + warehouse scene ───────── */}
        <Customsection>
          <div className="relative overflow-hidden px-5 pb-14 pt-12 sm:px-8 md:px-12 md:pb-20 md:pt-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(0,180,255,.16), transparent 70%), radial-gradient(ellipse 45% 50% at 50% 100%, rgba(123,61,255,.16), transparent 70%)",
              }}
            />
            {/* Hero text renders immediately (no opacity-0 entrance) for a fast LCP;
                only the buttons and scene animate in. */}
            <div className="relative mx-auto max-w-3xl text-center">
              <div>
                <p className="mx-auto w-fit rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-[#C8B8FF]">
                  {copy.eyebrow}
                </p>
              </div>
              <h1 className="mt-5 font-[family-name:var(--font-montserrat)] text-[40px] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
                {course.title} Training
                <span className={`mt-2 block ${GRADIENT_TEXT}`}>
                  {copy.headlineAccent}
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/70">
                {copy.lede}
              </p>
              <div className="animate-fade-up mt-8 flex flex-col justify-center gap-3 [animation-delay:240ms] sm:flex-row">
                <TrackedLink
                  event="hero-free-session"
                  href={withSrc(href.session, "ewm-hero")}
                  className={BTN_PRIMARY}
                >
                  Book a free session <span aria-hidden="true">→</span>
                </TrackedLink>
                <TrackedLink
                  event="hero-syllabus"
                  href="#syllabus"
                  className={BTN_SECONDARY}
                >
                  View syllabus
                </TrackedLink>
              </div>
            </div>

            <div className="animate-fade-up relative mt-12 [animation-delay:300ms] md:mt-16">
              <p className={`${KICKER} mb-4 text-center`}>
                IT roles that run on {course.title}
              </p>
              <RoleScene
                scene={copy.scene}
                roles={copy.roles}
                label={`Animated ${course.title} illustration. IT roles that work on it`}
              />
            </div>

            {/* Fact strip */}
            <dl className="relative mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
              {[
                { value: <>{copy.totalWeeks} weeks</>, label: "Duration" },
                {
                  value: <CountUp to={course.modules.length} />,
                  label: "Modules",
                },
                {
                  value: <>{copy.projects?.count ?? "1"}</>,
                  label: copy.projects?.label ?? "Capstone project",
                },
                { value: <>1-on-1</>, label: "Mentorship" },
              ].map((f, i) => (
                <FadeIn
                  key={f.label}
                  delay={0.05 * i}
                  y={12}
                  className="bg-[#07070d] p-5 text-center sm:p-6"
                >
                  <dt className="sr-only">{f.label}</dt>
                  <dd className="font-[family-name:var(--font-montserrat)] text-2xl font-bold text-white sm:text-3xl">
                    {f.value}
                  </dd>
                  <dd className="mt-1 text-sm text-[#94A3B8]">{f.label}</dd>
                </FadeIn>
              ))}
            </dl>
          </div>
        </Customsection>

        {/* ───────── ROADMAP + SYLLABUS ───────── */}
        <Section id="syllabus">
          <FadeIn>
            <p className={KICKER}>Curriculum</p>
            <h2 className={`mt-3 ${H2}`}>
              {course.modules.length} modules.{" "}
              <span className={GRADIENT_TEXT}>Week by week.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} className={`${CARD} mt-10 p-5 sm:p-8`}>
            <Roadmap modules={course.modules} />
          </FadeIn>
          <div className="mt-16">
            <Syllabus
              modules={course.modules}
              courseSlug={course.slug}
              courseTitle={course.title}
            />
          </div>
        </Section>

        {/* ───────── CAPSTONE ───────── */}
        <Section>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <FadeIn>
              <p className={KICKER}>Capstone</p>
              <h2 className={`mt-3 ${H2}`}>
                {copy.capstoneTitle[0]}{" "}
                <span className={GRADIENT_TEXT}>{copy.capstoneTitle[1]}</span>
              </h2>
              <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/70">
                {copy.capstoneLine}
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <IncidentTicker
                label={copy.incident.label}
                steps={copy.incident.steps}
              />
            </FadeIn>
          </div>
        </Section>

        {/* ───────── TWO WAYS TO LEARN ───────── */}
        <Section>
          <FadeIn>
            <h2 className={`${H2} text-center`}>
              Same syllabus.{" "}
              <span className={GRADIENT_TEXT}>Two ways to learn.</span>
            </h2>
          </FadeIn>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-2">
            {[
              {
                tag: "Live online",
                title: "Anywhere in the world",
                cta: "Online batch details",
                src: `${slug}-mode-online`,
                primary: true,
              },
              {
                tag: "Classroom",
                title: "J.M. Road, Pune",
                cta: "Pune batch details",
                src: `${slug}-mode-pune`,
                primary: false,
              },
            ].map((m, i) => (
              <FadeIn key={m.tag} delay={0.1 * i}>
                <article
                  className={`${CARD} flex h-full flex-col items-center p-8 text-center transition duration-300 hover:border-[#7B3DFF]/50`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C8B8FF]">
                    {m.tag}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-montserrat)] text-2xl font-semibold text-white">
                    {m.title}
                  </h3>
                  <p className="mt-3 text-[15px] text-white/70">
                    Weekday and weekend batches
                  </p>
                  <TrackedLink
                    event={m.src}
                    href={withSrc(href.fees, m.src)}
                    className={`${m.primary ? BTN_PRIMARY : BTN_SECONDARY} mt-6`}
                  >
                    {m.cta}
                  </TrackedLink>
                </article>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* ───────── GUIDES FOR THIS COURSE (blog cluster links) ───────── */}
        {guides.length > 0 && (
          <Section>
            <FadeIn>
              <p className={KICKER}>Guides for this course</p>
              <h2 className={`mt-3 ${H2}`}>
                Read before you <span className={GRADIENT_TEXT}>decide.</span>
              </h2>
            </FadeIn>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {guides.map((g, i) => (
                <li key={g.slug}>
                  <FadeIn delay={0.06 * i} className="h-full">
                    <Link
                      href={`/blog/${g.slug}`}
                      className={`${CARD} group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:border-[#00B4FF]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF] motion-reduce:hover:translate-y-0`}
                    >
                      <span className="text-xs text-[#94A3B8]">
                        42X Journal · {g.readTime}
                      </span>
                      <span className="mt-2 font-[family-name:var(--font-montserrat)] text-lg font-semibold leading-snug text-white group-hover:text-[#00E5FF]">
                        {g.title}
                      </span>
                      {g.description && (
                        <span className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-white/65">
                          {g.description}
                        </span>
                      )}
                    </Link>
                  </FadeIn>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* ───────── RELATED TRACKS (internal links) ───────── */}
        {related.length > 0 && (
          <Section>
            <FadeIn>
              <h2 className={`${H2} text-center`}>
                Explore other{" "}
                <span className={GRADIENT_TEXT}>
                  {course.category === "sap" ? "SAP tracks" : "career tracks"}
                </span>
              </h2>
            </FadeIn>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r, i) => (
                <li key={r.slug} className="h-full">
                  <FadeIn delay={0.06 * i} className="h-full">
                    <Link
                      href={`/courses/${r.slug}`}
                      className={`${CARD} group flex h-full flex-col p-3 transition duration-300 hover:-translate-y-1 hover:border-[#00B4FF]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF] motion-reduce:hover:translate-y-0`}
                    >
                      <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-[#05070f] p-1.5 ring-1 ring-white/10">
                        <SceneThumb scene={r.scene} label={`${r.title} course illustration`} />
                      </div>
                      <span className="mt-3 flex items-center justify-between px-1 pb-1">
                        <span className="font-[family-name:var(--font-montserrat)] font-semibold text-white">
                          {r.title} Training
                        </span>
                        <span className="text-xs text-[#94A3B8]">{r.weeks} wks</span>
                      </span>
                    </Link>
                  </FadeIn>
                </li>
              ))}
            </ul>
            {course.category === "sap" && (
            <p className="mt-8 text-center text-[15px] text-white/70">
              Not sure which one fits you? Read our guide to{" "}
              <Link
                href="/blog/sap-classes-in-pune"
                className="font-medium text-white underline decoration-[#00B4FF]/60 underline-offset-4 hover:decoration-[#00E5FF]"
              >
                choosing an SAP track
              </Link>
              .
            </p>
            )}
          </Section>
        )}

        {/* ───────── FAQ ───────── */}
        <Section>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <FadeIn>
              <p className={KICKER}>FAQ</p>
              <h2 className={`mt-3 ${H2}`}>
                Questions about{" "}
                <span className={GRADIENT_TEXT}>{course.title} training</span>
              </h2>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                <TrackedLink
                  event="faq-free-session"
                  href={withSrc(href.session, "ewm-faq")}
                  className={BTN_PRIMARY}
                >
                  Book a free session
                </TrackedLink>
                <a
                  href={href.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={BTN_SECONDARY}
                >
                  WhatsApp +91 84848 34242
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <FaqList faqs={copy.faqs} />
            </FadeIn>
          </div>
        </Section>
      </div>
    </LandingMotion>
  );
}
