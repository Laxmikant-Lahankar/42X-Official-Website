"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Customsection } from "@/app/CustomSection";
import { cn } from "@/lib/utils";
import {
  PROFESSIONAL_SKILLS,
  SAP_TRACKS,
  SCHEDULE,
  type SapTrack,
} from "./tracks";

export default function SapCourseDetails() {
  const [activeId, setActiveId] = useState(SAP_TRACKS[0].id);
  const track =
    SAP_TRACKS.find((item) => item.id === activeId) ?? SAP_TRACKS[0];
  const listRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[activeId];
    if (!list || !tab) return;
    list.scrollTo({
      left: tab.offsetLeft - list.clientWidth / 2 + tab.clientWidth / 2,
      behavior: "smooth",
    });
  }, [activeId]);

  return (
    <div>
      <Customsection>
        <div className="px-6 py-14 md:px-12 md:py-20">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-white/50">
            SAP course details
          </p>
          <h1 className="max-w-3xl text-4xl font-light text-white md:text-5xl">
            What you get in the SAP course
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            Five SAP tracks. Each one is built around the work consultants and
            developers actually do: the process, the tools, a capstone, and the
            professional habits that sit around the system.
          </p>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/45">
            {SCHEDULE}
          </p>
        </div>
      </Customsection>

      <Customsection>
        <div className="px-6 py-8 md:px-12 md:py-12">
          <div
            ref={listRef}
            role="tablist"
            aria-label="SAP tracks"
            className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {SAP_TRACKS.map((item) => {
              const selected = item.id === track.id;
              return (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabRefs.current[item.id] = node;
                  }}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(item.id)}
                  className={cn(
                    "shrink-0 rounded-full px-4 py-2.5 text-left whitespace-nowrap ring-1 transition-colors",
                    selected
                      ? "bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] text-white ring-transparent"
                      : "bg-[#141414] text-white/70 ring-white/10 hover:text-white hover:ring-white/25",
                  )}
                >
                  <span className="text-sm font-medium">{item.code}</span>
                  <span
                    className={cn(
                      "ml-2 text-xs",
                      selected ? "text-white/80" : "text-white/40",
                    )}
                  >
                    {item.duration}
                  </span>
                </button>
              );
            })}
          </div>

          <TrackDetail track={track} />

          <p className="mt-10 text-sm leading-relaxed text-white/45">
            Every track also covers{" "}
            {PROFESSIONAL_SKILLS.map((skill) => skill.title).join(", ")}. The
            capstone is a Jira project, and you run at least one stakeholder
            demo.
          </p>
        </div>
      </Customsection>
    </div>
  );
}

function TrackDetail({ track }: { track: SapTrack }) {
  return (
    <div className="mt-10">
      <p className="text-sm text-[#8EB4FF]">{track.focus}</p>
      <h2 className="mt-2 text-3xl font-light text-white md:text-4xl bg-green">
        {track.code}
        <span className="text-white/40"> — {track.name}</span>
      </h2>
      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
        {track.audience} The track runs {track.duration.toLowerCase()} and is{" "}
        {track.structure.charAt(0).toLowerCase() + track.structure.slice(1)}.
      </p>

      <ul className="mt-6 max-w-2xl space-y-2">
        {track.gains.map((item) => (
          <li key={item} className="text-sm leading-relaxed text-white/70">
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        {track.modules.map((module) => (
          <article
            key={module.name}
            className="rounded-sm bg-[#141414] p-5 ring-1 ring-white/10"
          >
            <p className="text-xs text-white/40">{module.duration}</p>
            <h3 className="mt-2 text-base font-medium text-white">
              {module.name}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              {module.focus}
            </p>
          </article>
        ))}
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/60">
        <span className="text-white">Capstone. </span>
        {track.capstone} {track.differentiator}
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {track.roles.map((role) => (
          <span
            key={role}
            className="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-white/70"
          >
            {role}
          </span>
        ))}
      </div>

      <Link
        href={`/contact?course=sap-${track.id}`}
        className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-6 text-sm font-medium text-white hover:from-[#6B98FF] hover:to-[#3A64E8]"
      >
        Ask about {track.code}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  );
}
