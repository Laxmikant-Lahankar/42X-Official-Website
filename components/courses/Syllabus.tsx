"use client";

import { useState, useEffect, useCallback } from "react";
import type { CourseModule } from "@/data/courses";
import { SyllabusUnlockModal } from "./SyllabusUnlockModal";
import { hasValidUserData } from "@/lib/userSession";

const PREVIEW_COUNT = 2;

// Theme tokens only (styling) — no logic/content changes
const HEADING = "font-[family-name:var(--font-montserrat),Montserrat,sans-serif]";
const CTA_GRADIENT = "bg-gradient-to-r from-[#008DFF] via-[#6650FF] to-[#D92FE5]";
// Same background as the courses listing page, so every section matches
const SECTION_BG = {
  backgroundImage:
    "radial-gradient(ellipse 55% 45% at 50% 0%, rgba(0,180,255,.10), transparent 75%), radial-gradient(ellipse 45% 50% at 100% 100%, rgba(123,61,255,.12), transparent 75%)",
};
const CARD =
  "rounded-2xl border bg-gradient-to-br from-[#101B32]/95 to-[#070D1B] transition duration-200";

function storageKey(slug: string) {
  return `syllabus-unlocked:${slug}`;
}

export function Syllabus({
  modules,
  courseSlug,
  courseTitle,
}: {
  modules: CourseModule[];
  courseSlug: string;
  courseTitle: string;
}) {
  // Module 1 starts open (if it has topics).
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(modules[0]?.topics.length ? [0] : []),
  );

  // Unlock state — persisted in sessionStorage and checks valid user session.
  const [unlocked, setUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      if (
        sessionStorage.getItem(storageKey(courseSlug)) === "1" ||
        hasValidUserData()
      ) {
        setUnlocked(true);
      }
    } catch {
      // sessionStorage may be blocked (private browsing edge cases)
    }
  }, [courseSlug]);

  const triggerDownload = useCallback(() => {
    const fileName = courseSlug.replace(/-/g, "_");
    const a = document.createElement("a");
    a.href = `/syllabus/${fileName}.pdf`;
    a.download = `${fileName}_syllabus.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }, [courseSlug]);

  const handleUnlocked = useCallback(() => {
    try {
      sessionStorage.setItem(storageKey(courseSlug), "1");
    } catch {
      // ignore
    }
    setUnlocked(true);
    setShowModal(false);
  }, [courseSlug]);

  const handleUnlockClick = () => {
    // If user already submitted their data anywhere on the site, don't prompt again!
    if (hasValidUserData()) {
      triggerDownload();
      handleUnlocked();
    } else {
      setShowModal(true);
    }
  };

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const expandAll = () =>
    setOpen(new Set(modules.flatMap((m, i) => (m.topics.length ? [i] : []))));

  const buttonClass =
    "inline-flex h-10 items-center justify-center rounded-xl border border-[#263A5D] bg-[#101B32]/80 px-4 text-[13px] text-[#C4D1E7] transition hover:border-[#00B4FF]/70 hover:text-white";

  const visibleModules = unlocked ? modules : modules.slice(0, PREVIEW_COUNT);
  const lockedCount = modules.length - PREVIEW_COUNT;

  function ModuleCard({ m, i }: { m: CourseModule; i: number }) {
    const expandable = m.topics.length > 0;
    const isOpen = open.has(i);

    const head = (
      <>
        <span
          className={`${HEADING} flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-bold ${
            isOpen
              ? "bg-gradient-to-r from-[#00B4FF] via-[#7B3DFF] to-[#E34BEF] text-white"
              : "border border-[#00B4FF]/60 bg-[#00B4FF]/10 text-[#00B4FF]"
          }`}
        >
          {i + 1}
        </span>
        <span
          className={`${HEADING} flex-1 text-base font-bold text-white md:text-lg`}
        >
          {m.title}
        </span>
        <span className="shrink-0 text-xs text-[#C8B8FF] md:text-sm">
          {m.duration}
        </span>
        {expandable ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`shrink-0 text-[#00B4FF] transition-transform motion-reduce:transition-none ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        ) : (
          <span className="w-5 shrink-0" aria-hidden="true" />
        )}
      </>
    );

    return (
      <article
        className={`${CARD} ${
          isOpen
            ? "border-[#00B4FF]/70 shadow-[0_0_32px_-12px_rgba(0,180,255,.65)]"
            : "border-[#263A5D]"
        }`}
      >
        {expandable ? (
          <button
            type="button"
            onClick={() => toggle(i)}
            aria-expanded={isOpen}
            aria-controls={`module-${i}`}
            className="flex w-full items-center gap-4 p-5 text-left"
          >
            {head}
          </button>
        ) : (
          <div className="flex w-full items-center gap-4 p-5">{head}</div>
        )}
        {expandable && isOpen && (
          <ul
            id={`module-${i}`}
            className="list-disc space-y-0.5 pb-6 pl-16 pr-5 text-sm leading-6 text-[#C4D1E7] marker:text-[#00B4FF]"
          >
            {m.topics.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
      </article>
    );
  }

  return (
    <>
      <div>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h2
            className={`${HEADING} text-3xl font-bold tracking-tight text-white md:text-4xl`}
          >
            Detailed syllabus
          </h2>
          {unlocked && (
            <div className="flex gap-2">
              <button type="button" className={buttonClass} onClick={expandAll}>
                Expand all
              </button>
              <button
                type="button"
                className={buttonClass}
                onClick={() => setOpen(new Set())}
              >
                Collapse all
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col gap-4">
          {visibleModules.map((m, i) => (
            <ModuleCard key={m.title} m={m} i={i} />
          ))}
        </div>

        {/* Locked gate — shown when not unlocked and there are hidden modules */}
        {!unlocked && lockedCount > 0 && (
          <div className="relative mt-0">
            {/* Gradient fade over the last visible card */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 left-0 right-0 h-24"
              style={{
                background:
                  "linear-gradient(to bottom, transparent, var(--background, #000))",
              }}
            />

            {/* Lock CTA */}
            <div
              className="mt-4 flex flex-col items-center gap-4 rounded-2xl border border-[#263A5D] bg-[#070D1B] px-6 py-8 text-center"
              style={SECTION_BG}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#00B4FF]/60 bg-[#00B4FF]/10">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#00B4FF]"
                  aria-hidden="true"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <p className={`${HEADING} text-sm font-semibold text-white`}>
                  {lockedCount} more module{lockedCount !== 1 ? "s" : ""} in this curriculum
                </p>
                <p className="mt-1 text-xs text-[#94A3B8]">
                  Leave your details to unlock the full syllabus.
                </p>
              </div>
              <button
                type="button"
                onClick={handleUnlockClick}
                className={`${HEADING} inline-flex h-10 items-center justify-center rounded-xl ${CTA_GRADIENT} px-6 text-sm font-semibold text-white shadow-[0_8px_28px_-10px_rgba(0,180,255,.8)] transition hover:brightness-110`}
              >
                Unlock full syllabus →
              </button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <SyllabusUnlockModal
          courseSlug={courseSlug}
          courseTitle={courseTitle}
          onUnlocked={handleUnlocked}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}