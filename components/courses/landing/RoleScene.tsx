"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { SceneId, SceneRole } from "./scenes/types";
import { SCENES } from "./scenes";
import { SceneDefs } from "./scenes/SceneDefs";
import { useScenePause } from "./scenes/useScenePause";

/**
 * Hero scene: an animated course illustration with the IT roles that work on
 * it placed around it. Every ~2.4s one role lights up together with the part
 * of the illustration it works on. Hover a role to pin it.
 *
 * Canvas is 1000×460; the art (600×460) sits at x 200–800, so on narrow
 * screens the SVG crops to just the art (preserveAspectRatio slice) and the
 * roles move into a list below.
 */

const VB_W = 1000;
const VB_H = 460;
const ART_X = 200;

// Chip slots: left column top→bottom, then right column top→bottom.
const SLOTS: { x: number; y: number; side: "l" | "r" }[] = [
  { x: 192, y: 110, side: "l" },
  { x: 192, y: 245, side: "l" },
  { x: 192, y: 380, side: "l" },
  { x: 808, y: 60, side: "r" },
  { x: 808, y: 205, side: "r" },
  { x: 808, y: 340, side: "r" },
];

export function RoleScene({
  scene,
  roles,
  label,
}: {
  scene: SceneId;
  roles: SceneRole[];
  label: string;
}) {
  const reduce = useReducedMotion() ?? false;
  const def = SCENES[scene];
  const { ref: svgRef, visible } = useScenePause();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const current = pinned ?? active;

  useEffect(() => {
    if (reduce || pinned !== null || !visible) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % Math.min(roles.length, SLOTS.length)),
      2400,
    );
    return () => clearInterval(id);
  }, [reduce, pinned, roles.length, visible]);

  const anchor = (station: string): [number, number] => {
    const a = def.anchors[station] ?? [300, 230];
    return [a[0] + ART_X, a[1]];
  };
  const placed = roles.slice(0, SLOTS.length).map((r, i) => ({
    ...r,
    slot: SLOTS[i],
    i,
  }));
  const activeRole = placed[current];

  const chip = (r: (typeof placed)[number], compact = false) => {
    const on = r.i === current;
    return (
      <div
        onMouseEnter={() => setPinned(r.i)}
        onMouseLeave={() => setPinned(null)}
        className={`max-w-[13.5rem] rounded-2xl p-px transition-all duration-500 ${
          on
            ? "bg-gradient-to-r from-[#00B4FF] to-[#7B3DFF] shadow-[0_0_28px_-4px_rgba(0,180,255,.7)]"
            : "bg-white/12"
        }`}
      >
        <div
          className={`flex items-center gap-2 rounded-[15px] bg-[#070b18] ${
            compact ? "px-3 py-2" : "px-4 py-2.5"
          }`}
        >
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-500 ${
              on ? "bg-[#00E5FF]" : "bg-white/25"
            }`}
          />
          <span
            className={`font-[family-name:var(--font-montserrat)] text-[12.5px] font-semibold leading-tight transition-colors duration-500 ${
              on ? "text-white" : "text-white/60"
            }`}
          >
            {r.title}
          </span>
        </div>
      </div>
    );
  };

  return (
    <figure className="relative">
      <figcaption className="sr-only">
        {label}: {roles.map((r) => r.title).join(", ")}.
      </figcaption>

      <div className="relative mx-auto aspect-[600/460] w-full lg:aspect-[1000/460]">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          ref={svgRef}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <SceneDefs />

          {/* connectors (desktop only: chips sit in the side gutters) */}
          <g className="hidden lg:inline">
            {placed.map((r) => {
              const [ax, ay] = anchor(r.station);
              const sx = r.slot.side === "l" ? 196 : 804;
              const on = r.i === current;
              return (
                <path
                  key={r.title}
                  d={`M${sx} ${r.slot.y} C ${(sx + ax) / 2} ${r.slot.y}, ${(sx + ax) / 2} ${ay}, ${ax} ${ay}`}
                  fill="none"
                  stroke={on ? "url(#sc-g)" : "rgba(255,255,255,.10)"}
                  strokeWidth={on ? 1.6 : 1}
                  strokeDasharray="4 4"
                  className={on ? "s-flow" : undefined}
                  style={{ transition: "stroke .5s" }}
                />
              );
            })}
          </g>

          {/* course illustration */}
          <g transform={`translate(${ART_X} 0)`}>
            <line x1="-40" x2="640" y1="400" y2="400" stroke="rgba(255,255,255,.12)" />
            <def.Art reduce={reduce} />
          </g>

          {/* active station highlight */}
          {activeRole && (
            <g key={`${activeRole.station}-${current}`}>
              {(() => {
                const [cx, cy] = anchor(activeRole.station);
                return (
                  <>
                    <circle cx={cx} cy={cy} r="28" fill="url(#sc-glow)" />
                    <circle cx={cx} cy={cy} r="12" fill="none" stroke="#00E5FF" strokeWidth="1.5" className="s-ring" />
                    <circle cx={cx} cy={cy} r="3.5" fill="#00E5FF" />
                  </>
                );
              })()}
            </g>
          )}
        </svg>

        {/* role chips around the illustration (desktop) */}
        <ul className="hidden lg:block">
          {placed.map((r) => (
            <motion.li
              key={r.title}
              className={`absolute -translate-y-1/2 ${r.slot.side === "l" ? "-translate-x-full" : ""}`}
              style={{
                left: `${(r.slot.x / VB_W) * 100}%`,
                top: `${(r.slot.y / VB_H) * 100}%`,
              }}
              animate={reduce || !visible ? undefined : { y: [0, -5, 0] }}
              transition={{
                duration: 4 + r.i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {chip(r)}
            </motion.li>
          ))}
        </ul>
      </div>

      {/* role chips below the illustration (mobile / tablet) */}
      <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:hidden">
        {placed.map((r) => (
          <li key={r.title}>{chip(r, true)}</li>
        ))}
      </ul>
    </figure>
  );
}
