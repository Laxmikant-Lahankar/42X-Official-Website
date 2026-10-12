"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Cloud,
  Database,
  Star,
  Workflow,
  X,
  type LucideIcon,
} from "lucide-react";

/**
 * 42X Academy brand tokens (from brand guide)
 * Brand Blue   #00B4FF   Brand Purple #7B3DFF
 * Accent Cyan  #00E5FF   Deep Indigo  #0B1F44
 * Soft Lavender #C8B8FF  Slate        #94A3B8
 * Black        #0F172A
 * Fonts: Montserrat (headings / CTAs), Inter (body / UI)
 *
 * Expects next/font variables `--font-montserrat` and `--font-inter`
 * to be set on <html> or <body>. Falls back to system fonts otherwise.
 */
const HEADING = "font-[family-name:var(--font-montserrat),Montserrat,sans-serif]";
const BODY = "font-[family-name:var(--font-inter),Inter,sans-serif]";

const SAP_MODULES = ["MM", "SD", "ABAP", "BASIS"] as const;

type Track = {
  id: string;
  hash: string;
  label: string;
  detail: string;
  icon: LucideIcon;
  /** Tailwind classes for the icon tile */
  tile: string;
  /** Tailwind class for the explore link colour */
  link: string;
  /** Hover glow colour */
  glow: string;
};

const SAP = {
  id: "sap",
  hash: "sap",
  label: "SAP",
  detail: "Five tracks, from MM and SD through ABAP and BASIS.",
} as const;

const TRACKS: Track[] = [
  {
    id: "data-engineering",
    hash: "data-engineering",
    label: "Data Engineering",
    detail: "Models, pipelines, and reports leadership can act on.",
    icon: Database,
    tile: "border-[#00B4FF]/30 bg-[#00B4FF]/10 text-[#00B4FF]",
    link: "text-[#00B4FF]",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(0,180,255,0.45)] group-hover:border-[#00B4FF]/50",
  },
  {
    id: "power-platform",
    hash: "power-platform",
    label: "Power Platform",
    detail: "Apps, flows, and the automations enterprise teams ship.",
    icon: Workflow,
    tile: "border-[#7B3DFF]/40 bg-[#7B3DFF]/15 text-[#C8B8FF]",
    link: "text-[#C8B8FF]",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(123,61,255,0.5)] group-hover:border-[#7B3DFF]/60",
  },
  {
    id: "devops",
    hash: "devops",
    label: "DevOps with AI",
    detail: "Linux, Cloud Computing, CI/CD, Kubernetes and AI tools.",
    icon: Cloud,
    tile: "border-[#00E5FF]/30 bg-[#00E5FF]/10 text-[#00E5FF]",
    link: "text-[#00E5FF]",
    glow: "group-hover:shadow-[0_0_40px_-8px_rgba(0,229,255,0.4)] group-hover:border-[#00E5FF]/50",
  },
];

/** Simple placeholder mark. Swap for the official SAP logo asset (next/image) if you have one. */
function SapMark() {
  return (
    <div
      aria-hidden="true"
      className="relative flex h-14 w-24 shrink-0 items-center justify-start bg-[#008FD3] pl-2 sm:h-[72px] sm:w-32"
      style={{ clipPath: "polygon(0 0, 100% 0, 55% 100%, 0 100%)" }}
    >
      <span className="font-[family-name:var(--font-montserrat),Montserrat,sans-serif] text-2xl font-extrabold tracking-tight text-white sm:text-4xl">
        SAP
      </span>
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

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-8">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close"
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-[#0F172A]/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cohort-picker-title"
        className={`${BODY} relative z-10 flex max-h-[min(920px,calc(100vh-1.5rem))] w-full max-w-6xl flex-col overflow-y-auto rounded-3xl border border-white/10 bg-[#0F172A] px-5 py-8 text-white shadow-[0_40px_120px_rgba(0,0,0,0.65)] sm:px-10 sm:py-12`}
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 15% 0%, rgba(0,180,255,0.14), transparent 70%), radial-gradient(ellipse 60% 40% at 90% 100%, rgba(123,61,255,0.18), transparent 70%)",
        }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close course picker"
          className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/60 transition hover:border-[#00B4FF]/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4FF] sm:top-5 sm:right-5"
        >
          <X className="size-4" />
        </button>

        {/* Header */}
        <header className="mx-auto max-w-3xl text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#00B4FF] sm:w-16" />
            <p className="text-xs font-medium tracking-wide text-[#00B4FF] sm:text-sm">
              Admissions Open
            </p>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#00B4FF] sm:w-16" />
          </div>
          <h2
            id="cohort-picker-title"
            className={`${HEADING} mt-4 text-3xl leading-[1.2] font-bold tracking-tight sm:text-4xl md:text-5xl`}
          >
            Choose your{" "}
            <span className="bg-gradient-to-r from-[#00B4FF] to-[#7B3DFF] bg-clip-text text-transparent">
              career track
            </span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#94A3B8] sm:text-base md:text-lg">
            Pick a track to see the syllabus, projects and how to enrol.
          </p>
        </header>

        {/* Flagship: SAP */}
        <div className="mt-8 rounded-3xl bg-gradient-to-r from-[#00B4FF] via-[#7B3DFF] to-[#C84BFF] p-px shadow-[0_0_60px_-15px_rgba(123,61,255,0.6)] sm:mt-10">
          <div
            className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-[#0B1F44] px-5 py-6 sm:px-8 sm:py-7"
            style={{
              backgroundImage:
                "linear-gradient(120deg, rgba(0,180,255,0.12), rgba(123,61,255,0.18))",
            }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8">
              {/* Logo + copy */}
              <div className="flex flex-1 items-center gap-5 sm:gap-7">
                <SapMark />
                <div className="min-w-0">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#7B3DFF]/60 bg-[#7B3DFF]/25 px-3 py-1 text-xs font-medium text-[#C8B8FF]">
                    <Star className="size-3 fill-current" />
                    Flagship Program
                  </span>
                  <h3
                    className={`${HEADING} mt-2 text-3xl leading-[1.4] font-bold sm:text-4xl`}
                  >
                    {SAP.label}
                  </h3>
                  <p className="max-w-sm text-sm leading-relaxed text-white/75 sm:text-base">
                    {SAP.detail}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="hidden h-24 w-px bg-white/10 lg:block" />

              {/* Modules + CTA */}
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
                <div>
                  <ul className="flex flex-wrap gap-2">
                    {SAP_MODULES.map((m) => (
                      <li
                        key={m}
                        className={`${HEADING} rounded-lg border border-[#00B4FF]/40 bg-[#0F172A]/60 px-3.5 py-2 text-xs font-semibold tracking-wide text-white`}
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-[#94A3B8]">
                    Fifth track to be confirmed
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => choose(SAP.hash)}
                  className={`${HEADING} group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#00B4FF] to-[#7B3DFF] px-6 py-3.5 text-base leading-[1.2] font-semibold whitespace-nowrap text-white shadow-[0_8px_30px_-8px_rgba(0,180,255,0.6)] transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00E5FF]`}
                >
                  Explore SAP Tracks
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other tracks */}
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {TRACKS.map((track) => {
            const Icon = track.icon;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => choose(track.hash)}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#0B1F44]/70 to-[#0F172A] p-6 text-left transition duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00B4FF] ${track.glow}`}
              >
                <span
                  className={`inline-flex size-12 items-center justify-center rounded-xl border ${track.tile}`}
                >
                  <Icon className="size-6" strokeWidth={1.6} />
                </span>
                <span
                  className={`${HEADING} mt-5 text-xl leading-[1.4] font-semibold sm:text-2xl`}
                >
                  {track.label}
                </span>
                <span className="mt-1.5 text-sm leading-relaxed text-white/70 sm:text-base">
                  {track.detail}
                </span>
                <span className="mt-6 border-t border-white/10 pt-4">
                  <span
                    className={`${HEADING} inline-flex items-center gap-2 text-sm font-semibold ${track.link}`}
                  >
                    Explore
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>,
    document.body,
  );
}
