"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Hero scene: an animated SAP EWM warehouse with the IT roles that run it
 * placed around it. Every ~2.4s one role lights up together with the part
 * of the warehouse it works on. Hover a role to pin it.
 *
 * Coordinates use a 1000×460 viewBox. The warehouse sits in x 200–800, so on
 * narrow screens the SVG crops to just the building (preserveAspectRatio
 * slice) and the roles move into a grid below.
 */

export type SceneRole = {
  title: string;
  station: Station;
};

type Station = "dock" | "racks" | "erp" | "monitor" | "scanner" | "conveyor";

// Anchor point of each station in viewBox coordinates.
const ANCHOR: Record<Station, [number, number]> = {
  erp: [670, 50],
  racks: [485, 212],
  dock: [285, 300],
  monitor: [695, 200],
  scanner: [632, 318],
  conveyor: [470, 372],
};

// Where the role chips sit around the building (desktop), viewBox coords.
const SLOTS: { x: number; y: number; side: "l" | "r" }[] = [
  { x: 192, y: 110, side: "l" },
  { x: 192, y: 245, side: "l" },
  { x: 192, y: 380, side: "l" },
  { x: 808, y: 60, side: "r" },
  { x: 808, y: 205, side: "r" },
  { x: 808, y: 340, side: "r" },
];

const VB_W = 1000;
const VB_H = 460;

export function WarehouseScene({ roles }: { roles: SceneRole[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState<number | null>(null);
  const current = pinned ?? active;

  useEffect(() => {
    if (reduce || pinned !== null) return;
    const id = setInterval(
      () => setActive((i) => (i + 1) % roles.length),
      2400,
    );
    return () => clearInterval(id);
  }, [reduce, pinned, roles.length]);

  const activeStation = roles[current]?.station;
  const placed = roles.slice(0, SLOTS.length).map((r, i) => ({
    ...r,
    slot: SLOTS[i],
    i,
  }));

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
        An animated SAP EWM warehouse. IT roles that work on it:{" "}
        {roles.map((r) => r.title).join(", ")}.
      </figcaption>

      <div className="relative mx-auto aspect-[600/460] w-full lg:aspect-[1000/460]">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="xMidYMid slice"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ewm-g" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#00B4FF" />
              <stop offset="1" stopColor="#7B3DFF" />
            </linearGradient>
            <linearGradient id="ewm-wall" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#0B1F44" stopOpacity=".75" />
              <stop offset="1" stopColor="#0B1F44" stopOpacity=".15" />
            </linearGradient>
            <radialGradient id="ewm-glow">
              <stop offset="0" stopColor="#00E5FF" stopOpacity=".55" />
              <stop offset="1" stopColor="#00E5FF" stopOpacity="0" />
            </radialGradient>
          </defs>

          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              .ewm-belt { animation: ewm-belt 7s linear infinite; }
              .ewm-in { animation: ewm-in 4.8s cubic-bezier(.45,0,.2,1) infinite; }
              .ewm-bar { transform-box: fill-box; transform-origin: 50% 100%; animation: ewm-bar 2.6s ease-in-out infinite; }
              .ewm-pick { animation: ewm-pick 4.8s ease-in-out infinite; }
              .ewm-laser { animation: ewm-laser 1.4s steps(2, jump-none) infinite; }
              .ewm-ring { transform-box: fill-box; transform-origin: center; animation: ewm-ring 1.8s ease-out infinite; }
              .ewm-flow { animation: ewm-flow 1.2s linear infinite; }
            }
            @keyframes ewm-belt { from { transform: translateX(0) } to { transform: translateX(390px) } }
            @keyframes ewm-in { 0% { transform: translateX(-90px); opacity: 0 } 15% { opacity: 1 } 60%,100% { transform: translateX(0); opacity: 1 } 85%,100% { opacity: 0 } }
            @keyframes ewm-bar { 0%,100% { transform: scaleY(.45) } 50% { transform: scaleY(1) } }
            @keyframes ewm-pick { 0%,40% { opacity: 1 } 50%,80% { opacity: .15 } 90%,100% { opacity: 1 } }
            @keyframes ewm-laser { 0% { opacity: .9 } 100% { opacity: .15 } }
            @keyframes ewm-ring { from { transform: scale(.6); opacity: .9 } to { transform: scale(1.8); opacity: 0 } }
            @keyframes ewm-flow { to { stroke-dashoffset: -16 } }
          `}</style>

          {/* ── connectors (desktop only: chips sit in the side gutters) ── */}
          <g className="hidden lg:inline">
            {placed.map((r) => {
              const [ax, ay] = ANCHOR[r.station];
              const sx = r.slot.side === "l" ? 196 : 804;
              const on = r.i === current;
              return (
                <path
                  key={r.title}
                  d={`M${sx} ${r.slot.y} C ${(sx + ax) / 2} ${r.slot.y}, ${(sx + ax) / 2} ${ay}, ${ax} ${ay}`}
                  fill="none"
                  stroke={on ? "url(#ewm-g)" : "rgba(255,255,255,.10)"}
                  strokeWidth={on ? 1.6 : 1}
                  strokeDasharray="4 4"
                  className={on ? "ewm-flow" : undefined}
                  style={{ transition: "stroke .5s" }}
                />
              );
            })}
          </g>

          {/* ── building ── */}
          <g transform="translate(200 0)">
            {/* ground */}
            <line x1="-40" x2="640" y1="400" y2="400" stroke="rgba(255,255,255,.12)" />
            {/* walls + roof */}
            <rect x="30" y="170" width="540" height="230" fill="url(#ewm-wall)" />
            <path d="M18 176 L300 100 L582 176" fill="none" stroke="url(#ewm-g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="30" x2="30" y1="173" y2="400" stroke="rgba(255,255,255,.14)" />
            <line x1="570" x2="570" y1="173" y2="400" stroke="rgba(255,255,255,.14)" />

            {/* ERP / S/4HANA node + data link */}
            <path id="ewm-erp-link" d="M392 125 Q 420 66 452 54" fill="none" stroke="rgba(0,229,255,.45)" strokeDasharray="3 4" />
            <circle cx="470" cy="50" r="22" fill="#0B1F44" stroke="url(#ewm-g)" strokeWidth="1.5" />
            <text x="470" y="53.5" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff" fontFamily="var(--font-montserrat), sans-serif">S/4</text>
            {!reduce &&
              [0, 0.6, 1.2].map((d) => (
                <circle key={d} r="2.6" fill="#00E5FF">
                  <animateMotion dur="1.8s" begin={`${d}s`} repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                    <mpath href="#ewm-erp-link" />
                  </animateMotion>
                </circle>
              ))}

            {/* dock door + inbound pallet */}
            <rect x="50" y="280" width="70" height="120" rx="3" fill="#060a16" stroke="rgba(255,255,255,.16)" />
            {[292, 304, 316, 328].map((y) => (
              <line key={y} x1="54" x2="116" y1={y} y2={y} stroke="rgba(255,255,255,.08)" />
            ))}
            <g className="ewm-in">
              <rect x="72" y="374" width="26" height="22" rx="3" fill="#0B1F44" stroke="#00B4FF" strokeWidth="1.4" />
              <line x1="72" x2="98" y1="383" y2="383" stroke="rgba(0,180,255,.5)" />
            </g>

            {/* racks */}
            {[160, 250, 340].map((x0, r) => (
              <g key={x0}>
                <line x1={x0} x2={x0} y1="196" y2="340" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" />
                <line x1={x0 + 70} x2={x0 + 70} y1="196" y2="340" stroke="rgba(255,255,255,.22)" strokeWidth="1.5" />
                {[230, 280, 330].map((y, s) => (
                  <g key={y}>
                    <line x1={x0} x2={x0 + 70} y1={y} y2={y} stroke="rgba(255,255,255,.22)" strokeWidth="1.5" />
                    {[8, 38].map((dx, b) => {
                      const empty = (r + s + b) % 5 === 4;
                      if (empty) return null;
                      const picking = (r === 1 && s === 0 && b === 1) || (r === 2 && s === 1 && b === 0);
                      return (
                        <rect
                          key={dx}
                          x={x0 + dx}
                          y={y - 21}
                          width="24"
                          height="20"
                          rx="2.5"
                          fill="#0B1F44"
                          stroke={picking ? "#00E5FF" : "url(#ewm-g)"}
                          strokeWidth="1.2"
                          className={picking ? "ewm-pick" : undefined}
                          style={picking && r === 2 ? { animationDelay: "-2.4s" } : undefined}
                        />
                      );
                    })}
                  </g>
                ))}
              </g>
            ))}

            {/* warehouse monitor */}
            <rect x="450" y="200" width="90" height="60" rx="6" fill="#060a16" stroke="url(#ewm-g)" strokeWidth="1.3" />
            <line x1="495" x2="495" y1="260" y2="276" stroke="rgba(255,255,255,.2)" />
            <line x1="480" x2="510" y1="276" y2="276" stroke="rgba(255,255,255,.2)" />
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={462 + i * 15}
                y="214"
                width="9"
                height="36"
                rx="2"
                fill={i % 2 ? "#7B3DFF" : "#00B4FF"}
                className="ewm-bar"
                style={{ animationDelay: `${-i * 0.45}s` }}
              />
            ))}

            {/* RF scanner + laser onto the belt */}
            <g transform="rotate(-18 432 318)">
              <rect x="418" y="306" width="30" height="16" rx="4" fill="#0B1F44" stroke="#00E5FF" strokeWidth="1.2" />
              <rect x="422" y="318" width="9" height="20" rx="3" fill="#0B1F44" stroke="#00E5FF" strokeWidth="1.2" />
            </g>
            <line x1="447" y1="313" x2="472" y2="352" stroke="#00E5FF" strokeWidth="1.5" className="ewm-laser" />

            {/* conveyor + moving cartons */}
            <line x1="150" x2="560" y1="372" y2="372" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
            {Array.from({ length: 19 }, (_, i) => (
              <circle key={i} cx={156 + i * 22} cy="380" r="4" fill="none" stroke="rgba(255,255,255,.18)" />
            ))}
            <clipPath id="ewm-belt-clip">
              <rect x="150" y="330" width="410" height="45" />
            </clipPath>
            <g clipPath="url(#ewm-belt-clip)">
              {[0, -2.33, -4.66].map((d) => (
                <g key={d} className="ewm-belt" style={{ animationDelay: `${d}s` }}>
                  <rect x="140" y="349" width="28" height="22" rx="3" fill="#0B1F44" stroke="url(#ewm-g)" strokeWidth="1.3" />
                  <line x1="140" x2="168" y1="358" y2="358" stroke="rgba(123,61,255,.5)" />
                </g>
              ))}
            </g>
          </g>

          {/* ── active station highlight ── */}
          {activeStation && (
            <g key={`${activeStation}-${current}`}>
              <circle cx={ANCHOR[activeStation][0]} cy={ANCHOR[activeStation][1]} r="28" fill="url(#ewm-glow)" />
              <circle cx={ANCHOR[activeStation][0]} cy={ANCHOR[activeStation][1]} r="12" fill="none" stroke="#00E5FF" strokeWidth="1.5" className="ewm-ring" />
              <circle cx={ANCHOR[activeStation][0]} cy={ANCHOR[activeStation][1]} r="3.5" fill="#00E5FF" />
            </g>
          )}
        </svg>

        {/* Role chips around the building (desktop) */}
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

      {/* Role chips below the building (mobile / tablet) */}
      <ul className="mt-6 flex flex-wrap justify-center gap-2 lg:hidden">
        {placed.map((r) => (
          <li key={r.title}>{chip(r, true)}</li>
        ))}
      </ul>
    </figure>
  );
}
