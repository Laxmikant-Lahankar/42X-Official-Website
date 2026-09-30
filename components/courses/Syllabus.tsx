"use client";

import { useState } from "react";
import type { CourseModule } from "@/data/courses";

export function Syllabus({ modules }: { modules: CourseModule[] }) {
  // Module 1 starts open (if it has topics).
  const [open, setOpen] = useState<Set<number>>(
    () => new Set(modules[0]?.topics.length ? [0] : []),
  );

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

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl font-light text-white md:text-4xl">
          Detailed syllabus
        </h2>
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
      </div>

      <div className="mt-8 flex flex-col gap-4">
        {modules.map((m, i) => {
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
            <article
              key={m.title}
              className="rounded-sm bg-[#141414] ring-1 ring-white/10"
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
                  className="list-disc space-y-0.5 pb-6 pl-16 pr-5 text-sm leading-6 text-white/60"
                >
                  {m.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}