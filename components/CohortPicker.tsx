"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Cloud,
  Database,
  GraduationCap,
  Layers3,
  Sparkles,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";

const HEADING = "font-[family-name:var(--font-montserrat),Montserrat,sans-serif]";
const BODY = "font-[family-name:var(--font-inter),Inter,sans-serif]";

const SAP_MODULES = ["MM", "SD", "EWM", "ABAP", "BASIS"] as const;

type Track = {
  id: string;
  hash: string;
  label: string;
  eyebrow: string;
  detail: string;
  outcome: string;
  icon: LucideIcon;
  accent: "blue" | "purple" | "pink";
};

const TRACKS: Track[] = [
  {
    id: "data-engineering",
    hash: "data-engineering",
    label: "Data Engineering & Analytics",
    eyebrow: "Turn data into decisions",
    detail: "Work with data models, pipelines, SQL and reporting workflows to make information useful.",
    outcome: "Explore data, tools and project work",
    icon: Database,
    accent: "blue",
  },
  {
    id: "power-platform",
    hash: "power-platform",
    label: "Power Platform",
    eyebrow: "Build smarter ways to work",
    detail: "Create practical apps, automate repetitive tasks and connect business processes with Power Platform.",
    outcome: "Explore apps, flows and automation",
    icon: Workflow,
    accent: "purple",
  },
  {
    id: "devops",
    hash: "devops",
    label: "DevOps with AI",
    eyebrow: "Build. Deploy. Improve.",
    detail: "Explore Linux, cloud, CI/CD, Kubernetes and AI-enabled tools used in modern delivery workflows.",
    outcome: "Explore cloud, delivery and AI tools",
    icon: Cloud,
    accent: "pink",
  },
];

const accentClasses = {
  blue: {
    tile: "border-[#00B4FF]/60 bg-[#00B4FF]/10 text-[#00B4FF]",
    glow: "hover:border-[#00B4FF]/70 hover:shadow-[0_0_32px_-12px_rgba(0,180,255,.65)]",
    link: "text-[#00B4FF]",
    line: "from-transparent via-[#00B4FF]/70 to-transparent",
  },
  purple: {
    tile: "border-[#7B3DFF]/70 bg-[#7B3DFF]/15 text-[#C8B8FF]",
    glow: "hover:border-[#7B3DFF]/70 hover:shadow-[0_0_32px_-12px_rgba(123,61,255,.65)]",
    link: "text-[#C8B8FF]",
    line: "from-transparent via-[#7B3DFF]/70 to-transparent",
  },
  pink: {
    tile: "border-[#D946EF]/60 bg-[#D946EF]/10 text-[#F06BEA]",
    glow: "hover:border-[#D946EF]/70 hover:shadow-[0_0_32px_-12px_rgba(217,70,239,.55)]",
    link: "text-[#F06BEA]",
    line: "from-transparent via-[#D946EF]/70 to-transparent",
  },
};

function SapMark() {
  return (
    <div
      aria-label="SAP course track"
      className="relative flex h-16 w-28 shrink-0 items-center justify-start bg-[#008FD3] pl-2 sm:h-[76px] sm:w-[136px]"
      style={{ clipPath: "polygon(0 0, 100% 0, 66% 100%, 0 100%)" }}
    >
      <span className={`${HEADING} text-3xl font-extrabold tracking-tight text-white sm:text-4xl`}>SAP</span>
    </div>
  );
}

export function CohortPicker({
  open,
  onClose,
  src,
}: {
  open: boolean;
  onClose: () => void;
  src: string;
}) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const choose = (hash: string) => {
    const params = new URLSearchParams({ src });
    onClose();
    router.push(`/courses?${params.toString()}#${hash}`);
  };

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 lg:p-8">
      <button
        type="button"
        aria-label="Close course selection"
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-[#020617]/80 backdrop-blur-md"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cohort-picker-title"
        className={`${BODY} relative z-10 flex max-h-[min(900px,calc(100vh-1.5rem))] w-full max-w-6xl flex-col overflow-y-auto rounded-3xl border border-[#243657] bg-[#070D1B] px-5 py-7 text-white shadow-[0_40px_120px_rgba(0,0,0,.7)] sm:px-7 sm:py-9 lg:px-10 lg:py-10`}
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 35% at 50% 0%, rgba(0,180,255,.10), transparent 75%), radial-gradient(ellipse 45% 40% at 100% 100%, rgba(123,61,255,.12), transparent 75%)",
        }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close course picker"
          className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/[.03] text-white/70 transition hover:border-[#00B4FF]/70 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4FF] sm:right-5 sm:top-5"
        >
          <X className="size-5" />
        </button>

        <header className="mx-auto max-w-3xl px-5 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#00B4FF] sm:w-12" />
            <p className="text-xs font-semibold tracking-wide text-[#8DBEFF] sm:text-sm">Admissions Open</p>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#7B3DFF] sm:w-12" />
          </div>
          <h2 id="cohort-picker-title" className={`${HEADING} mt-3 text-3xl leading-tight font-bold tracking-tight sm:text-4xl md:text-5xl`}>
            Choose your <span className="bg-gradient-to-r from-[#00B4FF] via-[#7B3DFF] to-[#E34BEF] bg-clip-text text-transparent">career track</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#C3D1EA] sm:text-base md:text-lg">
            Build practical skills for what’s next. Find the learning path that fits your goals.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-[#94A3B8] sm:text-sm">
            <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="size-3.5 text-[#00B4FF]" /> Practical learning</span>
            <span className="inline-flex items-center gap-1.5"><Layers3 className="size-3.5 text-[#C8B8FF]" /> Project-focused approach</span>
            <span className="inline-flex items-center gap-1.5"><GraduationCap className="size-3.5 text-[#F06BEA]" /> Career-oriented skills</span>
          </div>
        </header>

        {/* Featured SAP programme: keep this as the primary visual and conversion point. */}
        <div className="mt-7 rounded-3xl bg-gradient-to-r from-[#00B4FF] via-[#7B3DFF] to-[#E34BEF] p-[2px] shadow-[0_0_45px_-18px_rgba(123,61,255,.8)] sm:mt-8">
          <div
            className="relative overflow-hidden rounded-[calc(1.5rem-2px)] bg-[#081631] px-5 py-6 sm:px-7 sm:py-7"
            style={{ backgroundImage: "linear-gradient(115deg, rgba(0,180,255,.10), rgba(123,61,255,.12) 65%, rgba(217,70,239,.08))" }}
          >
            <div className="pointer-events-none absolute -bottom-8 left-0 h-20 w-2/5 opacity-40" style={{ backgroundImage: "repeating-radial-gradient(ellipse at bottom left, transparent 0 10px, rgba(0,180,255,.65) 11px 12px, transparent 13px 22px)" }} />
            <div className="pointer-events-none absolute -bottom-8 right-0 h-20 w-2/5 opacity-30" style={{ backgroundImage: "repeating-radial-gradient(ellipse at bottom right, transparent 0 10px, rgba(217,70,239,.65) 11px 12px, transparent 13px 22px)" }} />
            <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-7">
              <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-6">
                <SapMark />
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7B3DFF]/70 bg-[#7B3DFF]/25 px-3 py-1 text-xs font-semibold text-[#E0D5FF]">
                    <Sparkles className="size-3.5 fill-current" /> Flagship Programme
                  </span>
                  <h3 className={`${HEADING} mt-2 text-3xl leading-tight font-bold sm:text-4xl`}>SAP</h3>
                  <p className="mt-1 max-w-sm text-sm leading-relaxed text-[#D6E2F8] sm:text-base">
                    Explore enterprise processes and the SAP skills behind modern business operations.
                  </p>
                </div>
              </div>
              <div className="hidden h-24 w-px shrink-0 bg-white/15 lg:block" />
              <div className="flex flex-col gap-4 lg:max-w-[48%] lg:flex-row lg:items-center lg:gap-5">
                <div className="min-w-0 flex-1">
                  <ul className="flex flex-wrap gap-2">
                    {SAP_MODULES.map((module) => (
                      <li key={module} className={`${HEADING} rounded-lg border border-[#00B4FF]/55 bg-[#070D1B]/70 px-3.5 py-2 text-xs font-semibold tracking-wide text-white sm:text-sm`}>
                        {module}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-xs leading-relaxed text-[#AABAD6]">Five focused SAP tracks: MM, SD, EWM, ABAP and BASIS.</p>
                </div>
                <button
                  type="button"
                  onClick={() => choose("sap")}
                  className={`${HEADING} group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#008DFF] via-[#6650FF] to-[#D92FE5] px-5 py-3.5 text-sm font-semibold text-white shadow-[0_8px_28px_-10px_rgba(0,180,255,.8)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF] sm:px-6 sm:text-base`}
                >
                  Explore SAP Tracks <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {TRACKS.map((track) => {
            const Icon = track.icon;
            const accent = accentClasses[track.accent];
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => choose(track.hash)}
                className={`group relative flex min-h-[245px] flex-col overflow-hidden rounded-2xl border border-[#263A5D] bg-gradient-to-br from-[#101B32]/95 to-[#070D1B] p-5 text-left transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4FF] sm:p-6 ${accent.glow}`}
              >
                <span className={`inline-flex size-12 items-center justify-center rounded-xl border ${accent.tile}`}>
                  <Icon className="size-6" strokeWidth={1.8} />
                </span>
                <span className="mt-4 text-[11px] font-semibold uppercase tracking-[.12em] text-[#94A3B8] sm:text-xs">{track.eyebrow}</span>
                <span className={`${HEADING} mt-1 text-xl leading-snug font-bold sm:text-[22px]`}>{track.label}</span>
                <span className="mt-2 text-sm leading-relaxed text-[#C4D1E7]">{track.detail}</span>
                <span className="mt-auto pt-5">
                  <span className={`block h-px bg-gradient-to-r ${accent.line}`} />
                  <span className={`${HEADING} mt-3 inline-flex items-center gap-2 text-sm font-semibold ${accent.link}`}>
                    {track.outcome} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-center text-xs leading-relaxed text-[#8191AC]">
          Not sure where to start? Explore a track to review its course details, syllabus and projects before deciding.
        </p>
      </div>
    </div>,
    document.body,
  );
}
