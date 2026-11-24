"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { SceneDef, SceneId, SceneRole } from "./scenes/types";
import { warehouse } from "./scenes/warehouse";
import { p2p } from "./scenes/p2p";
import { o2c } from "./scenes/o2c";
import { abap } from "./scenes/abap";
import { basis } from "./scenes/basis";

const SCENES: Record<SceneId, SceneDef> = { warehouse, p2p, o2c, abap, basis };

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

const CSS = `
@media (prefers-reduced-motion: no-preference) {
  .s-move { animation: s-move var(--dur, 7s) linear infinite; }
  .s-trip { animation: s-trip var(--dur, 4.8s) cubic-bezier(.45,0,.2,1) infinite; }
  .s-bar { transform-box: fill-box; transform-origin: 50% 100%; animation: s-bar 2.6s ease-in-out infinite; }
  .s-pick { animation: s-pick 4.8s ease-in-out infinite; }
  .s-blink { animation: s-blink 1.4s steps(2, jump-none) infinite; }
  .s-ring { transform-box: fill-box; transform-origin: center; animation: s-ring 1.8s ease-out infinite; }
  .s-flow { animation: s-flow 1.2s linear infinite; }
  .s-type { transform-box: fill-box; transform-origin: 0 50%; animation: s-type 6s ease-in-out infinite; }
  .s-step { animation: s-step var(--dur, 6s) steps(6) infinite; }
  .s-rise { animation: s-rise 3s ease-out infinite; }
  .s-seq { animation: s-seq 4.5s ease-in-out infinite; }
  .s-line { stroke-dasharray: 600; animation: s-line 5s ease-in-out infinite; }
  .s-spin { transform-box: fill-box; transform-origin: 50% 100%; animation: s-spin 4s linear infinite; }
}
@keyframes s-move { from { transform: translateX(0) } to { transform: translateX(var(--dx, 300px)) } }
@keyframes s-trip { 0% { transform: translateX(var(--from, -90px)); opacity: 0 } 15% { opacity: 1 } 60%, 100% { transform: translateX(0) } 85% { opacity: 1 } 100% { opacity: 0 } }
@keyframes s-bar { 0%, 100% { transform: scaleY(.45) } 50% { transform: scaleY(1) } }
@keyframes s-pick { 0%, 40% { opacity: 1 } 50%, 80% { opacity: .15 } 90%, 100% { opacity: 1 } }
@keyframes s-blink { 0% { opacity: .9 } 100% { opacity: .15 } }
@keyframes s-ring { from { transform: scale(.6); opacity: .9 } to { transform: scale(1.8); opacity: 0 } }
@keyframes s-flow { to { stroke-dashoffset: -16 } }
@keyframes s-type { 0% { transform: scaleX(0) } 40%, 85% { transform: scaleX(1); opacity: 1 } 100% { transform: scaleX(1); opacity: 0 } }
@keyframes s-step { from { transform: translateY(0) } to { transform: translateY(var(--dy, 120px)) } }
@keyframes s-rise { 0% { transform: translateY(0); opacity: 0 } 20% { opacity: .8 } 100% { transform: translateY(-40px); opacity: 0 } }
@keyframes s-seq { 0%, 10% { opacity: .15 } 20%, 85% { opacity: 1 } 100% { opacity: .15 } }
@keyframes s-line { 0% { stroke-dashoffset: 600 } 50%, 100% { stroke-dashoffset: 0 } }
@keyframes s-spin { to { transform: rotate(360deg) } }
`;

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
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const current = pinned ?? active;

  useEffect(() => {
    if (reduce || pinned !== null) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % Math.min(roles.length, SLOTS.length)),
      2400,
    );
    return () => clearInterval(id);
  }, [reduce, pinned, roles.length]);

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
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="sc-g" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#00B4FF" />
              <stop offset="1" stopColor="#7B3DFF" />
            </linearGradient>
            <linearGradient id="sc-wall" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#0B1F44" stopOpacity=".75" />
              <stop offset="1" stopColor="#0B1F44" stopOpacity=".15" />
            </linearGradient>
            <radialGradient id="sc-glow">
              <stop offset="0" stopColor="#00E5FF" stopOpacity=".55" />
              <stop offset="1" stopColor="#00E5FF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <style>{CSS}</style>

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
              animate={reduce ? undefined : { y: [0, -5, 0] }}
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
