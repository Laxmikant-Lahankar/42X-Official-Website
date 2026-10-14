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
const HEADING =
  "font-[family-name:var(--font-montserrat),Montserrat,sans-serif]";
const CTA_GRADIENT =
  "bg-gradient-to-r from-[#008DFF] via-[#6650FF] to-[#D92FE5]";

// Muted neutral text (replaces the blue-tinted greys)
const TEXT = "text-white/60";
const MUTED = "text-white/45";

// Section background: near-black with one very faint cool glow at the top.
// No purple corner glow, so the page matches the rest of the site.
const PANEL = "relative overflow-hidden";
const PANEL_BG = {
  backgroundImage:
    "radial-gradient(ellipse 50% 30% at 50% 0%, rgba(0,180,255,.04), transparent 80%)",
};
// Soft divider line at the top of each section
const PANEL_LINE =
  "pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent md:inset-x-12";

// Card: very dark, faint blue-tinted border, soft blue glow rising from the bottom
// (same tokens as the home page course cards)
const CARD =
  "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#4a6fb5]/20 bg-[#111113] p-3 transition duration-200 hover:-translate-y-1 hover:border-[#4a6fb5]/35 hover:shadow-lg hover:shadow-black/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60 sm:p-4";
const GLOW =
  "pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-[radial-gradient(ellipse_75%_100%_at_50%_100%,rgba(70,120,230,0.13),transparent_70%)]";

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
          <p className={`mb-2 text-xs font-medium ${MUTED} sm:text-sm`}>
            Courses
          </p>
          <h1
            className={`${HEADING} max-w-3xl text-3xl font-bold tracking-tight text-white md:text-5xl`}
          >
            See what you&apos;ll build
          </h1>
          <p
            className={`mt-4 max-w-2xl text-sm leading-relaxed ${TEXT} md:text-base`}
          >
            Three programs. Pick a track and we&apos;ll carry it into the
            contact form.
          </p>
        </div>
      </Customsection>

      {/* 1. SAP: all five tracks together */}
      <Customsection>
        <div
          id="sap"
          className={`${PANEL} scroll-mt-28 px-6 py-10 md:px-12 md:py-14`}
          style={PANEL_BG}
        >
          <span aria-hidden className={PANEL_LINE} />
          <TrackHeader
            badge="SAP"
            title="SAP tracks"
            intro="Five tracks. Each one ends in a capstone and the work consultants and developers actually do."
          />
          <div className="mt-8 grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SAP_TRACKS.map((track) => (
              <PartCard
                key={track.id}
                href={`/courses/sap-${track.id}`}
                // image="/sap-course.png"
                image={`/sap_${track.id}.png`}
                title={track.code}
                meta={track.name}
                detail={track.structure}
              />
            ))}
          </div>
        </div>
      </Customsection>

      {/* 2. Data Engineering, Power Platform and DevOps: one row, three equal thirds.
          Same 3-col grid + gap as the SAP row, so every card is the same width.
          The dotted separators run the full height of the section, border to border. */}
      <Customsection>
        <div
          className={`${PANEL} px-6 py-10 md:px-12 md:py-14`}
          style={PANEL_BG}
        >
          <span aria-hidden className={PANEL_LINE} />

          {/* Full-height dotted separators, centred in the gaps between the thirds */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-6 inset-y-0 hidden grid-cols-3 gap-x-5 md:inset-x-12 lg:grid"
          >
            <span />
            <span className="-translate-x-[10px] border-l border-dashed border-white/20" />
            <span className="-translate-x-[10px] border-l border-dashed border-white/20" />
          </div>

          <div className="relative grid gap-12 lg:grid-cols-3 lg:gap-x-5 lg:gap-y-0">
            <CourseColumn
              id="data-engineering"
              badge="Data Engineering"
              title="Data Engineering"
              intro="Dashboards, models, and reports used in the enterprise."
              parts={DATA_PARTS}
            />
            <CourseColumn
              id="power-platform"
              badge="Power Platform"
              title="Power Platform"
              intro="Apps and automations, built the way enterprise teams ship them."
              parts={PLATFORM_PARTS}
              separator
            />
            <CourseColumn
              id="devops"
              badge="DevOps"
              title="DevOps with AI"
              intro="Linux, Cloud Computing, CI/CD, Infrastructure as Code, and Kubernetes through real-world projects."
              parts={DEVOPS_PARTS}
              separator
            />
          </div>
        </div>
      </Customsection>
    </div>
  );
}

function CourseColumn({
  id,
  badge,
  title,
  intro,
  parts,
  separator = false,
}: {
  id: string;
  badge: string;
  title: string;
  intro: string;
  parts: ReturnType<typeof getTrackParts>;
  separator?: boolean;
}) {
  return (
    <div
      id={id}
      className={`flex scroll-mt-28 flex-col ${
        // Stacked layout: dashed line runs edge to edge above the column
        separator
          ? "max-lg:-mx-6 max-lg:border-t max-lg:border-dashed max-lg:border-white/20 max-lg:px-6 max-lg:pt-12 md:max-lg:-mx-12 md:max-lg:px-12"
          : ""
      }`}
    >
      <TrackHeader center compact badge={badge} title={title} intro={intro} />

      {/* mt-auto pins the cards to the same baseline across the three columns */}
      <div className="mx-auto mt-auto flex w-full max-w-md pt-6 lg:max-w-none">
        {parts.map((part) => (
          <PartCard
            key={part.id}
            href={`/courses/${part.id}`}
            image={part.image}
            title={part.title}
            meta={part.meta}
            detail={part.detail}
          />
        ))}
      </div>
    </div>
  );
}

function TrackHeader({
  badge,
  title,
  intro,
  center = false,
  compact = false,
}: {
  badge: string;
  title: string;
  intro: string;
  center?: boolean;
  compact?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="mb-3 inline-flex rounded-full border border-[#4a6fb5]/25 bg-black/40 px-3 py-1 text-xs font-semibold text-white/80">
        {badge}
      </p>
      <h2
        className={`${HEADING} max-w-xl font-bold tracking-tight text-white ${
          compact ? "text-2xl md:text-3xl" : "text-3xl md:text-4xl"
        } ${center ? "mx-auto" : ""}`}
      >
        {title}
      </h2>
      <p
        className={`mt-3 max-w-2xl text-sm leading-relaxed ${TEXT} ${
          center ? "mx-auto" : ""
        }`}
      >
        {intro}
      </p>
    </div>
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
    <Link href={href} className={CARD}>
      <span aria-hidden="true" className={GLOW} />

      {/* Same frame on every card */}
     <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-black ring-1 ring-white/10">
        {/* Dimmed, blurred copy fills the empty space, so no black bars */}
        <Image
          src={image}
          alt=""
          aria-hidden
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="scale-125 object-cover opacity-30 blur-2xl"
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

      <div className="relative flex flex-1 flex-col px-1 pt-4 pb-1">
        <h3 className={`${HEADING} line-clamp-1 text-lg font-bold text-white`}>
          {title}
        </h3>
        <p className={`mt-2 text-sm ${MUTED}`}>{meta}</p>
        <p
          className={`mt-3 line-clamp-3 min-h-[3.9rem] text-sm leading-relaxed ${TEXT}`}
        >
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
