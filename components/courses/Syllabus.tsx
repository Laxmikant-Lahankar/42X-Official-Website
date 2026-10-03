"use client";

import { useState, useEffect, useCallback } from "react";
import type { CourseModule } from "@/data/courses";
import { SyllabusUnlockModal } from "./SyllabusUnlockModal";

const PREVIEW_COUNT = 2;

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

  // Unlock state — persisted in sessionStorage so it survives soft navigations.
  const [unlocked, setUnlocked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey(courseSlug)) === "1") {
        setUnlocked(true);
      }
    } catch {
      // sessionStorage may be blocked (private browsing edge cases)
    }
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
    "inline-flex h-10 items-center justify-center rounded-full bg-white/[0.04] px-4 text-[13px] text-white/75 backdrop-blur-sm hover:bg-white/[0.08]";

  const visibleModules = unlocked ? modules : modules.slice(0, PREVIEW_COUNT);
  const lockedCount = modules.length - PREVIEW_COUNT;

  function ModuleCard({ m, i }: { m: CourseModule; i: number }) {
    const expandable = m.topics.length > 0;
    const isOpen = open.has(i);

    const head = (
      <>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-white/[0.06] text-sm font-medium text-white">
          {i + 1}
        </span>
        <span className="flex-1 text-base font-light text-white md:text-lg">
          {m.title}
        </span>
        <span className="shrink-0 text-xs text-white/45 md:text-sm">
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
            className={`shrink-0 text-white/50 transition-transform motion-reduce:transition-none ${
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
      <article className="rounded-sm bg-[#141414] ring-1 ring-white/10">
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
            className="list-disc space-y-0.5 pb-6 pl-16 pr-5 text-sm leading-6 text-white/60"
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
          <h2 className="text-3xl font-light text-white md:text-4xl">
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
            <div className="mt-4 flex flex-col items-center gap-4 rounded-sm bg-[#141414] px-6 py-8 ring-1 ring-white/10 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/[0.06] ring-1 ring-white/10">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/50"
                  aria-hidden="true"
                >
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-light text-white">
                  {lockedCount} more module{lockedCount !== 1 ? "s" : ""} in this curriculum
                </p>
                <p className="mt-1 text-xs text-white/45">
                  Leave your details to unlock the full syllabus.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="inline-flex h-10 items-center justify-center rounded-sm bg-white px-6 text-sm font-medium text-black transition-opacity hover:opacity-90"
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