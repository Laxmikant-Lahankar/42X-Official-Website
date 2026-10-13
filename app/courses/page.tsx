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

import { COURSE_TRACKS } from "@/data/courses";

// Theme tokens (styling only)
const HEADING = "font-[family-name:var(--font-montserrat),Montserrat,sans-serif]";
const CTA_GRADIENT = "bg-gradient-to-r from-[#008DFF] via-[#6650FF] to-[#D92FE5]";

// Section background: plain black with a soft cyan glow at the top and a faint
// purple glow in the bottom-right corner (same as the course detail pages).
// Used by the hero and every track section so they all match.
const PANEL = "relative overflow-hidden";
const PANEL_BG = {
  backgroundImage:
    "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(0,180,255,.10), transparent 75%), radial-gradient(ellipse 45% 50% at 100% 100%, rgba(123,61,255,.12), transparent 75%)",
};
// Soft divider line at the top of each section
const PANEL_LINE =
  "pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#263A5D] to-transparent md:inset-x-12";

function getTrackParts(slug: string, idOverride?: string) {
  const track = COURSE_TRACKS.find((t) => t.slug === slug);
  if (!track) return [];
  return [
    {
      id: idOverride || track.slug,
      title: track.title,
      image: track.image,
      meta: `${track.level}  · ${track.lessons.toLowerCase()}`,
      detail: track.description,
    },
  ];
}

const DATA_PARTS = getTrackParts("power-bi", "data-engineering");
const PLATFORM_PARTS = getTrackParts("power-platform");
const DEVOPS_PARTS = getTrackParts("devops");

export default function CoursesPage() {
  return (
    <div>
      <Customsection>
        <div
          className={`${PANEL} px-6 py-12 md:px-12 md:py-16`}
          style={PANEL_BG}
        >
          <span aria-hidden className={PANEL_LINE} />
          <p className="mb-2 text-xs font-medium text-[#94A3B8] sm:text-sm">
            Courses
          </p>
          <h1
            className={`${HEADING} max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl`}
          >
            See what you&apos;ll build
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#C4D1E7] md:text-base">
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
            meta={track.name}
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

      <TrackSection
        id="devops"
        badge="DevOps"
        title="DevOps with AI"
        intro="Linux, Cloud Computing, CI/CD, Infrastructure as Code, and Kubernetes through real-world projects."
      >
        {DEVOPS_PARTS.map((part) => (
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
      <div
        id={id}
        className={`${PANEL} scroll-mt-28 px-6 py-10 md:px-12 md:py-14`}
        style={PANEL_BG}
      >
        <span aria-hidden className={PANEL_LINE} />
        <p className="mb-3 inline-flex rounded-full border border-[#00B4FF]/40 bg-[#00B4FF]/10 px-3 py-1 text-xs font-semibold text-[#00B4FF]">
          {badge}
        </p>
        <h2
          className={`${HEADING} max-w-xl text-3xl font-bold tracking-tight text-white md:text-4xl`}
        >
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#C4D1E7]">
          {intro}
        </p>
        {/* Same 3-column grid everywhere, so every card has the same size */}
        <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
    <Link href={href} className="group relative flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4FF] rounded-2xl border border-[#263A5D] bg-gradient-to-br from-[#101B32]/95 to-[#070D1B] p-3 transition duration-200 hover:-translate-y-0.5 hover:border-[#00B4FF]/70 hover:shadow-[0_0_32px_-12px_rgba(0,180,255,.65)] focus-within:border-[#00B4FF]/70 sm:p-4">
      {/* Same frame on every card */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl bg-[#070D1B] ring-1 ring-white/10">
        {/* Blurred copy fills the empty space, so no black bars */}
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="scale-125 object-cover opacity-60 blur-2xl"
        />
        {/* Sharp poster, fully visible, never cropped */}
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col px-1 pt-4 pb-1">
        <h3 className={`${HEADING} line-clamp-1 text-lg font-bold text-white`}>
          {title}
        </h3>
        <p className="mt-2 text-sm text-[#94A3B8]">{meta}</p>
        <p className="mt-3 line-clamp-3 min-h-[3.9rem] text-sm leading-relaxed text-[#C4D1E7]">
          {detail}
        </p>

        {/* Not a link itself: the whole card is the link, so a click anywhere does what the button does */}
        <span
          className={`${HEADING} mt-5 inline-flex h-10 w-full items-center justify-center rounded-xl ${CTA_GRADIENT} px-5 text-[13px] font-semibold text-white shadow-[0_8px_28px_-10px_rgba(0,180,255,.8)] transition group-hover:brightness-110`}
        >
          Read more about the course
        </span>
      </div>
    </Link>
  );
}