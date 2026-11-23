import type { ReactNode } from "react";
import { Inter, Montserrat } from "next/font/google";
import { Customsection } from "@/app/CustomSection";
import { Syllabus } from "@/components/courses/Syllabus";
import { JsonLd } from "@/components/JsonLd";
import type { CourseContent } from "@/data/courses";
import type { CourseLanding as LandingCopy } from "@/data/course-landing/sap-ewm";
import { SITE, faqSchema } from "@/lib/seo";
import {
  CountUp,
  FadeIn,
  FaqList,
  IncidentTicker,
  Journey,
  LandingMotion,
  Roadmap,
  TrackedLink,
  WarehouseFlow,
} from "./motion";

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
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Customsection id={id}>
      <div className={`px-5 py-16 sm:px-8 md:px-12 md:py-24 ${className}`}>
        {children}
      </div>
    </Customsection>
  );
}

function Check() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-[#00E5FF]"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function CourseLanding({
  course,
  copy,
}: {
  course: CourseContent;
  copy: LandingCopy;
}) {
  const slug = course.slug;
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

        {/* ───────── 1. HERO ───────── */}
        <Customsection>
          <div className="relative overflow-hidden px-5 pb-14 pt-12 sm:px-8 md:px-12 md:pb-20 md:pt-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(ellipse 60% 50% at 20% 0%, rgba(0,180,255,.16), transparent 70%), radial-gradient(ellipse 50% 60% at 100% 30%, rgba(123,61,255,.18), transparent 70%)",
              }}
            />
            <div className="relative grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
              <div>
                {/* Hero uses CSS fade-ups (no JS needed) so the H1 paints immediately. */}
                <div className="animate-fade-up">
                  <TrackedLink
                    event="back-to-courses"
                    href={`/courses#${course.category}`}
                    className="text-sm text-[#94A3B8] hover:text-white"
                  >
                    ← All courses
                  </TrackedLink>
                  <p className="mt-6 flex w-fit flex-wrap items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-medium text-[#C8B8FF]">
                    {copy.eyebrow}
                  </p>
                </div>
                <div className="animate-fade-up [animation-delay:80ms]">
                  <h1 className="mt-5 font-[family-name:var(--font-montserrat)] text-[40px] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[60px]">
                    {copy.headline}
                    <span className={`mt-2 block ${GRADIENT_TEXT}`}>
                      {copy.headlineAccent}
                    </span>
                  </h1>
                </div>
                <div className="animate-fade-up [animation-delay:160ms]">
                  <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/75">
                    {copy.lede}
                  </p>
                </div>
                <div className="animate-fade-up [animation-delay:240ms]">
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
                      See the 11-module syllabus
                    </TrackedLink>
                  </div>
                  <p className="mt-4 text-sm text-[#94A3B8]">
                    Prefer chat?{" "}
                    <a
                      href={href.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-white underline decoration-[#00B4FF]/60 underline-offset-4 hover:decoration-[#00E5FF]"
                    >
                      WhatsApp us
                    </a>{" "}
                    for fees and the next batch dates.
                  </p>
                </div>
              </div>

              <div className="animate-fade-up [animation-delay:200ms]">
                <WarehouseFlow steps={copy.flow} log={copy.rfLog} />
              </div>
            </div>

            {/* Fact strip */}
            <dl className="relative mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-4">
              {[
                {
                  value: <>{copy.totalWeeks} weeks</>,
                  label: "Basic + advanced + capstone",
                },
                {
                  value: <CountUp to={course.modules.length} suffix=" modules" />,
                  label: "From set-up to debugging",
                },
                { value: <>1 capstone</>, label: "End-to-end warehouse simulation" },
                { value: <>1-on-1</>, label: "Mentorship throughout" },
              ].map((f, i) => (
                <FadeIn key={i} delay={0.05 * i} y={12} className="bg-[#07070d] p-5 sm:p-6">
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

        {/* ───────── 2. TOPIC MARQUEE ───────── */}
        <Customsection>
          <div
            className="relative overflow-hidden py-5 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]"
            aria-label="Topics covered"
          >
            <ul className="animate-marquee flex w-max gap-3">
              {[...copy.marquee, ...copy.marquee].map((t, i) => (
                <li
                  key={i}
                  aria-hidden={i >= copy.marquee.length}
                  className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-white/75"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </Customsection>

        {/* ───────── 3. WHY EWM ───────── */}
        <Section>
          <FadeIn>
            <p className={KICKER}>Why SAP EWM</p>
            <h2 className={`mt-3 max-w-2xl ${H2}`}>
              Warehouses are where SAP projects{" "}
              <span className={GRADIENT_TEXT}>meet the real world.</span>
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {copy.whyNow.map((w, i) => (
              <FadeIn key={w.title} delay={0.08 * i}>
                <article
                  className={`${CARD} group h-full p-7 transition duration-300 hover:-translate-y-1 hover:border-[#00B4FF]/40 motion-reduce:hover:translate-y-0`}
                >
                  <span className="font-[family-name:var(--font-montserrat)] text-sm font-bold text-[#7B3DFF]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-montserrat)] text-xl font-semibold text-white">
                    {w.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                    {w.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* ───────── 4. JOURNEY ───────── */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <FadeIn>
                <p className={KICKER}>How the course flows</p>
                <h2 className={`mt-3 ${H2}`}>
                  Follow a pallet from{" "}
                  <span className={GRADIENT_TEXT}>dock to dispatch.</span>
                </h2>
                <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/70">
                  The course follows the order a warehouse actually works in.
                  Each stage builds on the one before, so by the capstone you can
                  run the whole flow yourself.
                </p>
                <TrackedLink
                  event="journey-free-session"
                  href={withSrc(href.session, "ewm-journey")}
                  className={`${BTN_PRIMARY} mt-8`}
                >
                  Try a free session
                </TrackedLink>
              </FadeIn>
            </div>
            <Journey steps={copy.journey} />
          </div>
        </Section>

        {/* ───────── 5. ROADMAP + SYLLABUS ───────── */}
        <Section id="syllabus">
          <FadeIn>
            <p className={KICKER}>Curriculum</p>
            <h2 className={`mt-3 ${H2}`}>
              11 modules.{" "}
              <span className={GRADIENT_TEXT}>Week by week.</span>
            </h2>
            <p className="mt-4 max-w-2xl text-[17px] leading-relaxed text-white/70">
              {course.structure}. Roughly {copy.totalWeeks.replace("~", "")}{" "}
              weeks from your first class to your capstone demo.
            </p>
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

        {/* ───────── 6. CAPSTONE ───────── */}
        <Section>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <FadeIn>
              <p className={KICKER}>Capstone project</p>
              <h2 className={`mt-3 ${H2}`}>
                Your warehouse.{" "}
                <span className={GRADIENT_TEXT}>Your go‑live.</span>
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-white/70">
                {course.capstone}
              </p>
              <ol className="mt-8 grid gap-4 sm:grid-cols-2">
                {copy.capstoneSteps.map((s, i) => (
                  <li key={s.title} className={`${CARD} p-5`}>
                    <span className="font-[family-name:var(--font-montserrat)] text-xs font-bold text-[#00B4FF]">
                      STEP {i + 1}
                    </span>
                    <p className="mt-1 font-[family-name:var(--font-montserrat)] font-semibold text-white">
                      {s.title}
                    </p>
                    <p className="mt-1 text-sm text-white/65">{s.body}</p>
                  </li>
                ))}
              </ol>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className={`${CARD} relative overflow-hidden p-6 sm:p-8`}>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7B3DFF]/20 blur-3xl"
                />
                <p className="relative font-[family-name:var(--font-montserrat)] text-lg font-semibold text-white">
                  Interviewers ask “what would you do if…?”
                </p>
                <p className="relative mt-2 text-[15px] text-white/70">
                  You&apos;ll have done it. The capstone deliberately breaks
                  your warehouse, and you find and fix the problem.
                </p>
                <div className="relative mt-6">
                  <IncidentTicker />
                </div>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* ───────── 7. OUTCOMES & CAREERS ───────── */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-2">
            <FadeIn>
              <p className={KICKER}>What you walk away with</p>
              <h2 className={`mt-3 ${H2}`}>
                Skills you can <span className={GRADIENT_TEXT}>demonstrate.</span>
              </h2>
              <ul className="mt-8 space-y-3">
                {[...course.outcomes, ...course.skills].map((o) => (
                  <li key={o} className="flex gap-3 text-[16px] text-white/80">
                    <Check />
                    {o}
                  </li>
                ))}
              </ul>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className={`${CARD} h-full p-7 sm:p-9`}>
                <p className={KICKER}>Roles this prepares you for</p>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {course.roles.map((r) => (
                    <li
                      key={r}
                      className="rounded-full border border-[#00B4FF]/40 bg-[#00B4FF]/10 px-4 py-2 text-sm font-medium text-white"
                    >
                      {r}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border-t border-white/10 pt-8">
                  <p className={KICKER}>The 42X difference</p>
                  <p className="mt-3 font-[family-name:var(--font-montserrat)] text-xl font-semibold leading-snug text-white">
                    {course.differentiator}
                  </p>
                  <p className="mt-3 text-[15px] text-white/65">
                    Plus the professional skills every project expects: Jira and
                    Agile, client communication, problem solving and meeting
                    facilitation, built into every course.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Section>

        {/* ───────── 8. WHO IT'S FOR + MENTOR ───────── */}
        <Section>
          <FadeIn>
            <p className={KICKER}>Who it&apos;s for</p>
            <h2 className={`mt-3 max-w-2xl ${H2}`}>
              Built for where you are{" "}
              <span className={GRADIENT_TEXT}>and where you&apos;re going.</span>
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {copy.audiences.map((a, i) => (
              <FadeIn key={a.title} delay={0.08 * i}>
                <article className={`${CARD} h-full p-7`}>
                  <h3 className="font-[family-name:var(--font-montserrat)] text-lg font-semibold text-white">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/70">
                    {a.body}
                  </p>
                </article>
              </FadeIn>
            ))}
          </div>
          {copy.mentor && (
            <FadeIn delay={0.1}>
              <div className="mt-6 rounded-3xl bg-gradient-to-r from-[#00B4FF] to-[#7B3DFF] p-px">
                <div className="flex flex-col gap-4 rounded-[23px] bg-[#0B1F44] p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
                  <div className="max-w-2xl">
                    <h3 className="font-[family-name:var(--font-montserrat)] text-xl font-semibold text-white">
                      {copy.mentor.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-white/75">
                      {copy.mentor.body}
                    </p>
                  </div>
                  <TrackedLink
                    event="mentor-talk"
                    href={withSrc(href.fees, "ewm-mentor")}
                    className={`${BTN_SECONDARY} shrink-0`}
                  >
                    Talk to an expert
                  </TrackedLink>
                </div>
              </div>
            </FadeIn>
          )}
        </Section>

        {/* ───────── 9. TWO WAYS TO LEARN ───────── */}
        <Section>
          <FadeIn>
            <p className={KICKER}>Two ways to learn</p>
            <h2 className={`mt-3 ${H2}`}>
              Same syllabus.{" "}
              <span className={GRADIENT_TEXT}>Your choice of classroom.</span>
            </h2>
          </FadeIn>
          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            {[
              {
                tag: "Live online · Worldwide",
                title: "Learn from anywhere",
                points: [
                  "Live, instructor-led online classes",
                  "Open to students in any country. Tell us your time zone",
                  "Same mentors, capstone and certificate as the classroom",
                ],
                cta: "Get online batch details",
                src: "ewm-mode-online",
              },
              {
                tag: "Classroom · Pune",
                title: "Learn at our Pune centre",
                points: [
                  "In-person batches at J.M. Road, Pune",
                  "Learn alongside peers with mentors in the room",
                  `${SITE.address.streetAddress}, Pune ${SITE.address.postalCode}`,
                ],
                cta: "Get Pune batch details",
                src: "ewm-mode-pune",
              },
            ].map((m, i) => (
              <FadeIn key={m.tag} delay={0.1 * i}>
                <article
                  className={`${CARD} flex h-full flex-col p-7 transition duration-300 hover:border-[#7B3DFF]/50 sm:p-9`}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C8B8FF]">
                    {m.tag}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-montserrat)] text-2xl font-semibold text-white">
                    {m.title}
                  </h3>
                  <ul className="mt-5 flex-1 space-y-3">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[15px] text-white/75">
                        <Check />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <TrackedLink
                    event={m.src}
                    href={withSrc(href.fees, m.src)}
                    className={`${i === 0 ? BTN_PRIMARY : BTN_SECONDARY} mt-8 self-start`}
                  >
                    {m.cta}
                  </TrackedLink>
                </article>
              </FadeIn>
            ))}
          </div>
          <FadeIn>
            <p className="mt-6 text-center text-sm text-[#94A3B8]">
              Both include 1-on-1 mentorship, the capstone project, a completion
              certificate and lifetime access to course materials.
            </p>
          </FadeIn>
        </Section>

        {/* ───────── 10. FAQ ───────── */}
        <Section>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <FadeIn>
              <p className={KICKER}>FAQ</p>
              <h2 className={`mt-3 ${H2}`}>
                Questions about{" "}
                <span className={GRADIENT_TEXT}>SAP EWM training</span>
              </h2>
              <p className="mt-5 text-[17px] leading-relaxed text-white/70">
                Your next chapter starts here. A free session is the quickest
                way to see if EWM is right for you.
              </p>
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
