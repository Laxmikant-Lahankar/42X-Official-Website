import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpen,
  Infinity,
  Signal,
  Sparkles,
} from "lucide-react";
import { Customsection } from "@/app/CustomSection";
import { CTAButton } from "@/components/CTAButton";
import { courseCardCta, CTAS, isCourseSlug } from "@/lib/cta";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

import { COURSE_TRACKS } from "@/data/courses";

// Track badges shown on the SAP flagship card.
// (Move these into COURSE_TRACKS as a `tracks` field if you'd rather keep them in data.)
const SAP_TRACKS = ["MM", "SD", "EWM", "ABAP", "BASIS"];

// Very dark card, faint blue-tinted border, soft blue glow rising from the bottom
const CARD =
  "group relative overflow-hidden rounded-2xl border border-[#4a6fb5]/20 bg-[#111113] transition duration-200 hover:-translate-y-1 hover:border-[#4a6fb5]/35 hover:shadow-lg hover:shadow-black/40";
const GLOW =
  "pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(ellipse_75%_100%_at_50%_100%,rgba(70,120,230,0.13),transparent_70%)]";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <li className="rounded-lg border border-[#4a6fb5]/25 bg-black/40 px-3 py-1 text-xs font-semibold tracking-wide text-white/80">
      {children}
    </li>
  );
}

// Detail-page slug when it differs from the course slug
// (the Power BI course lives at /courses/data-engineering)
const DETAIL_SLUG: Record<string, string> = { "power-bi": "data-engineering" };

// SAP has tracks, so it goes to the listing section (/courses#sap).
// Every other course has no sub-modules, so it opens its detail page directly.
function cardCta(slug: string) {
  const cta = courseCardCta(slug);
  if (/sap/i.test(slug)) return cta;
  return { ...cta, href: `/courses/${DETAIL_SLUG[slug] ?? slug}` };
}

export default function Courses({ course }: { course?: string } = {}) {
  const filteredCourses = course
    ? COURSE_TRACKS.filter((item) => item.slug === course)
    : COURSE_TRACKS;

  // Bento: first course is the flagship, the rest go in the modules grid
  const [flagship, ...modules] = filteredCourses;
  const isSap = flagship
    ? /sap/i.test(`${flagship.slug} ${flagship.title}`)
    : false;

  return (
    <Customsection id="courses">
      <div className="px-10 py-15">
        <SectionHeader
          badge="Our courses"
          title="Explore Courses Designed for Delivering Real World Results"
        />

        <div className="mt-12 flex flex-col gap-4">
          {/* Flagship card (wide, image left / copy right) */}
          {flagship ? (
            <Reveal delayMs={0} className="h-full">
              <article className={`${CARD} h-full`}>
                <span aria-hidden="true" className={GLOW} />

                <div className="relative grid h-full grid-cols-1 gap-6 p-4 lg:grid-cols-[1.1fr_1fr]">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black lg:aspect-auto lg:min-h-[22rem]">
                    <Image
                      src={flagship.image}
                      alt={flagship.title}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="object-contain"
                    />
                    <span className="absolute top-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      {flagship.badge}
                    </span>
                  </div>

                  <div className="flex flex-col justify-center lg:py-4 lg:pr-4">
                    {isSap ? (
                      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#7c6ce0]/30 bg-[#7c6ce0]/10 px-3 py-1 text-xs font-medium text-[#b9b0f2]">
                        <Sparkles className="size-3.5" />
                        Flagship Programme
                      </span>
                    ) : null}

                    <h3 className="mt-3 text-2xl leading-snug text-white">
                      {flagship.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/60">
                      {flagship.description}
                    </p>

                    {isSap ? (
                      <ul
                        className="mt-5 flex flex-wrap gap-2"
                        aria-label="SAP tracks"
                      >
                        {SAP_TRACKS.map((t) => (
                          <Pill key={t}>{t}</Pill>
                        ))}
                      </ul>
                    ) : null}

                    <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-white/70">
                      <li className="flex items-center gap-2">
                        <Signal className="size-3.5 shrink-0 text-white/45" />
                        {flagship.level}
                      </li>
                      <li className="flex items-center gap-2">
                        <BookOpen className="size-3.5 shrink-0 text-white/45" />
                        {flagship.lessons}
                      </li>
                      <li className="flex items-center gap-2">
                        <Infinity className="size-3.5 shrink-0 text-white/45" />
                        {flagship.access}
                      </li>
                    </ul>

                    {isCourseSlug(flagship.slug) ? (
                      <CTAButton
                        cta={cardCta(flagship.slug)}
                        src="courses"
                        variant="gradient"
                        size="md"
                        className="mt-6 w-full sm:w-auto sm:self-start"
                      />
                    ) : null}
                  </div>
                </div>
              </article>
            </Reveal>
          ) : null}

          {/* Modules grid (remaining courses) */}
          {modules.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((item, index) => (
                <Reveal
                  key={item.slug}
                  delayMs={(index + 1) * 90}
                  className="h-full"
                >
                  <article className={`${CARD} h-full`}>
                    <span aria-hidden="true" className={GLOW} />

                    <div className="relative flex h-full flex-col p-4">
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-black">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          className="object-contain"
                        />
                        <span className="absolute top-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="mt-5 text-lg leading-snug text-white">
                        {item.title}
                      </h3>

                      <p className="mt-2 min-h-[4.4rem] text-sm leading-relaxed text-white/60">
                        {item.description}
                      </p>

                      <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-white/70">
                        <li className="flex items-center gap-2">
                          <Signal className="size-3.5 shrink-0 text-white/45" />
                          {item.level}
                        </li>
                        <li className="flex items-center gap-2">
                          <BookOpen className="size-3.5 shrink-0 text-white/45" />
                          {item.lessons}
                        </li>
                        <li className="flex items-center gap-2">
                          <Infinity className="size-3.5 shrink-0 text-white/45" />
                          {item.access}
                        </li>
                      </ul>

                      {isCourseSlug(item.slug) ? (
                        <CTAButton
                          cta={cardCta(item.slug)}
                          src="courses"
                          variant="gradient"
                          size="md"
                          className="mt-6 w-full"
                        />
                      ) : null}
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : null}

          {/* Bottom wide card */}
          <Reveal delayMs={(modules.length + 1) * 90} className="h-full">
            <Link
              href="/courses"
              aria-label="Explore all courses"
              className="flex h-full items-center justify-between gap-6 rounded-2xl border border-dashed border-white/20 bg-white/[0.03] px-6 py-5 transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              <div className="min-w-0">
                <div className="text-xs text-white/55">More on the way</div>
                <h3 className="mt-2 text-base leading-snug text-white">
                  More interesting courses
                  <span className="block text-white/60">are on the way.</span>
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/55">
                  Explore the full course lineup and see what you can learn
                  next.
                </p>
              </div>

              <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-white/10 text-white/80">
                <ArrowUpRight className="size-4" />
              </span>
            </Link>
          </Reveal>
        </div>

        <div className="mt-8 flex justify-center">
          <CTAButton
            cta={CTAS.quiz}
            src="courses"
            variant="gradient"
            size="md"
          />
        </div>
      </div>
    </Customsection>
  );
}
