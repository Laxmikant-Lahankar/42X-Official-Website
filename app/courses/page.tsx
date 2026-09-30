import type { ReactNode } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Customsection } from "@/app/CustomSection";
import { SAP_TRACKS } from "@/components/sap/tracks";
// import { COURSES, getCourse } from "@/data/courses";

export const metadata: Metadata = {
  title: "Courses — 42X Academy",
  description:
    "SAP, Data Engineering, and Power Platform at 42X Academy, including the SAP tracks for MM, SD, EWM, ABAP, and BASIS.",
};

const DATA_PARTS = [
  {
    id: "data-engineering",
    title: "Power BI",
    image: "/power_bi.png",
    meta: "Beginner · 8 weeks · 24 lessons",
    detail:
      "Build dashboards and data models used in the enterprise. Turn raw data into reports leadership can act on.",
  },
];

const PLATFORM_PARTS = [
  {
    id: "power-platform",
    title: "Power Platform",
    image: "/power_platform.png",
    meta: "Beginner to Intermediate · 10 weeks · 30 lessons",
    detail:
      "Create apps, automate workflows, and ship solutions on Microsoft Power Platform the way enterprise teams work.",
  },
];

export default function CoursesPage() {
  return (
    <div>
      <Customsection>
        <div className="px-6 py-16 md:px-12 md:py-20">
          <p className="mb-2 text-xs font-medium text-white/50 sm:text-sm">
            Courses
          </p>
          <h1 className="max-w-3xl text-3xl font-light text-white md:text-4xl">
            See what you&apos;ll build
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            Three programs. Pick a track and we&apos;ll carry it into the
            contact form.
          </p>
        </div>
      </Customsection>

      <TrackSection
        id="sap"
        badge="SAP"
        title="SAP tracks"
        intro="Five tracks. Each one ends in a capstone and the work consultants and developers actually do."
      >
        {SAP_TRACKS.map((track) => (
          <PartCard
            key={track.id}
            href={`/courses/sap-${track.id}`}
            image="/sap-course.png"
            title={track.code}
            meta={`${track.duration} · ${track.name}`}
            detail={track.structure}
          />
        ))}
      </TrackSection>

      <TrackSection
        id="data-engineering"
        badge="Data Engineering"
        title="Data Engineering"
        intro="Dashboards, models, and reports used in the enterprise."
      >
        {DATA_PARTS.map((part) => (
          <PartCard
            key={part.id}
            href={`/courses/${part.id}`}
            image={part.image}
            title={part.title}
            meta={part.meta}
            detail={part.detail}
          />
        ))}
      </TrackSection>

      <TrackSection
        id="power-platform"
        badge="Power Platform"
        title="Power Platform"
        intro="Apps and automations, built the way enterprise teams ship them."
      >
        {PLATFORM_PARTS.map((part) => (
          <PartCard
            key={part.id}
            href={`/courses/${part.id}`}
            image={part.image}
            title={part.title}
            meta={part.meta}
            detail={part.detail}
          />
        ))}
      </TrackSection>
    </div>
  );
}

function TrackSection({
  id,
  badge,
  title,
  intro,
  children,
}: {
  id: string;
  badge: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <Customsection>
      <div id={id} className="scroll-mt-28 px-6 py-16 md:px-12 md:py-20">
        <p className="mb-2 text-xs font-medium text-white/50 sm:text-sm">
          {badge}
        </p>
        <h2 className="max-w-xl text-3xl font-light text-white md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60">
          {intro}
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {children}
        </div>
      </div>
    </Customsection>
  );
}

function PartCard({
  href,
  image,
  title,
  meta,
  detail,
}: {
  href: string;
  image: string;
  title: string;
  meta: string;
  detail: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-sm bg-[#141414] p-4 ring-1 ring-white/10">
      <div className="relative aspect-[16/10] overflow-hidden rounded-sm bg-black">
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
        />
      </div>
      <h3 className="mt-5 text-lg font-light text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/45">{meta}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-white/60">
        {detail}
      </p>
      <Link
        href={href}
        className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-white/[0.04] px-4 text-[13px] text-white/75 backdrop-blur-sm hover:bg-white/[0.08]"
      >
        Read more about the course
      </Link>
    </article>
  );
}
