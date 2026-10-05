import Image from "next/image";
import { BookOpen, Calendar, Infinity, Signal } from "lucide-react";
import { Customsection } from "@/app/CustomSection";
import { CTAButton } from "@/components/CTAButton";
import { courseCardCta, CTAS, isCourseSlug } from "@/lib/cta";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

import { COURSE_TRACKS } from "@/data/courses";

export default function Courses({ course }: { course?: string } = {}) {
  const filteredCourses = course
    ? COURSE_TRACKS.filter((item) => item.slug === course)
    : COURSE_TRACKS;

  return (
    <Customsection id="courses">
      <div className="px-6 py-16 md:px-12 md:py-20">
        <SectionHeader
          badge="Our courses"
          title="Explore Courses Designed for Delivering Real World Results"
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredCourses.map((course, index) => (
            <Reveal key={course.slug} delayMs={index * 90} className="h-full">
              <article className="flex h-full flex-col rounded-sm bg-[#141414] p-4 ring-1 ring-white/10">
                <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-black">
                  <Image
                    src={course.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-contain"
                  />
                  <span className="absolute top-3 left-3 rounded-md bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {course.badge}
                  </span>
                </div>

                <h3 className="mt-5 text-lg leading-snug text-white">
                  {course.title}
                </h3>
                <p className="mt-2 min-h-[4.4rem] text-sm leading-relaxed text-white/60">
                  {course.description}
                </p>

                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-white/70">
                  <li className="flex items-center gap-2">
                    <Signal className="size-3.5 shrink-0 text-white/45" />
                    {course.level}
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar className="size-3.5 shrink-0 text-white/45" />
                    {course.duration}
                  </li>
                  <li className="flex items-center gap-2">
                    <BookOpen className="size-3.5 shrink-0 text-white/45" />
                    {course.lessons}
                  </li>
                  <li className="flex items-center gap-2">
                    <Infinity className="size-3.5 shrink-0 text-white/45" />
                    {course.access}
                  </li>
                </ul>

                {isCourseSlug(course.slug) ? (
                  <CTAButton
                    cta={courseCardCta(course.slug)}
                    src="courses"
                    variant="secondary"
                    size="md"
                    className="mt-6 w-full"
                  />
                ) : null}
              </article>
            </Reveal>
          ))}

          <Reveal delayMs={270} className="h-full">
            <article className="flex h-full min-h-[28rem] flex-col items-center justify-center rounded-sm border border-dashed border-white/20 bg-white/[0.03] p-8 text-center">
              <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-medium tracking-wide text-white/70">
                Coming soon
              </span>
              <h3 className="mt-5 max-w-xs text-lg leading-snug text-white">
                More interesting courses on the way
              </h3>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/55">
                New tracks are in the works. Check back for the next programs
                from 42x.
              </p>
            </article>
          </Reveal>
        </div>

        <div className="mt-8 flex justify-center">
          <CTAButton cta={CTAS.quiz} src="courses" variant="link" />
        </div>
      </div>
    </Customsection>
  );
}
