import { C, type SceneDef } from "./types";

const LABEL = {
  fontSize: 10,
  fontWeight: 700,
  fill: "#fff",
  fontFamily: "var(--font-montserrat), sans-serif",
  textAnchor: "middle" as const,
};
const CAPTION = { ...LABEL, fontSize: 9, fill: "rgba(255,255,255,.7)" };

function Server({ x, label, i }: { x: number; label: string; i: number }) {
  return (
    <g>
      <rect x={x} y="185" width="110" height="135" rx="8" fill="url(#sc-wall)" stroke="url(#sc-g)" strokeWidth="1.4" />
      <text x={x + 55} y="203" {...LABEL}>{label}</text>
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <rect x={x + 12} y={216 + r * 24} width="86" height="16" rx="3" fill={C.ink} stroke="rgba(255,255,255,.12)" />
          <rect x={x + 20} y={222 + r * 24} width="34" height="4" rx="2" fill="rgba(255,255,255,.18)" />
          <circle
            cx={x + 88}
            cy={224 + r * 24}
            r="3"
            fill={(r + i) % 3 ? C.cyan : C.purple}
            className="s-blink"
            style={{ animationDelay: `${-(r * 0.3 + i * 0.5)}s` }}
          />
        </g>
      ))}
    </g>
  );
}

/** SAP BASIS: DEV → QA → PRD transports, users/roles, jobs, monitoring, HANA. */
export const basis: SceneDef = {
  anchors: {
    security: [100, 95],
    dev: [95, 252],
    transport: [190, 252],
    monitor: [465, 95],
    prd: [475, 252],
    hana: [475, 366],
  },
  Art: () => (
    <>
      {/* ── users & roles ── */}
      <rect x="30" y="50" width="140" height="90" rx="8" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.3" />
      <circle cx="70" cy="84" r="11" fill="none" stroke={C.blue} strokeWidth="1.6" />
      <path d="M50 120 c4 -14 36 -14 40 0" fill="none" stroke={C.blue} strokeWidth="1.6" strokeLinecap="round" />
      <rect x="110" y="86" width="34" height="26" rx="4" fill={C.indigo} stroke={C.cyan} strokeWidth="1.4" />
      <path d="M118 86 v-7 a9 9 0 0 1 18 0 v7" fill="none" stroke={C.cyan} strokeWidth="1.4" />
      <circle cx="127" cy="99" r="3" fill={C.cyan} className="s-blink" />
      <text x="100" y="156" {...CAPTION}>Users &amp; roles</text>

      {/* ── background jobs ── */}
      <circle cx="280" cy="92" r="34" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.4" />
      {[0, 90, 180, 270].map((a) => (
        <line key={a} x1="280" y1="62" x2="280" y2="67" stroke="rgba(255,255,255,.35)" transform={`rotate(${a} 280 92)`} />
      ))}
      <line x1="280" y1="92" x2="280" y2="70" stroke={C.cyan} strokeWidth="2" strokeLinecap="round" className="s-spin" />
      <circle cx="280" cy="92" r="3" fill={C.cyan} />
      <text x="280" y="144" {...CAPTION}>Jobs</text>

      {/* ── monitoring ── */}
      <rect x="370" y="40" width="190" height="110" rx="8" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.3" />
      <text x="388" y="60" {...LABEL} textAnchor="start" fontSize="9">Monitoring · CPU</text>
      <polyline
        points="385,128 410,118 430,124 450,98 470,110 492,84 512,96 545,88"
        fill="none"
        stroke="url(#sc-g)"
        strokeWidth="2"
        strokeLinejoin="round"
        className="s-line"
      />
      <circle cx="545" cy="58" r="4" fill={C.cyan} className="s-blink" />

      {/* ── landscape ── */}
      <Server x={40} label="DEV" i={0} />
      <Server x={230} label="QA" i={1} />
      <Server x={420} label="PRD" i={2} />
      {[150, 340].map((x, i) => (
        <g key={x}>
          <line x1={x + 2} x2={x + 78} y1="252" y2="252" stroke="rgba(0,229,255,.5)" strokeDasharray="4 4" className="s-flow" />
          <g className="s-move" style={{ ["--dx" as string]: "58px", ["--dur" as string]: "2.4s", animationDelay: `${-i * 1.2}s` }}>
            <rect x={x + 4} y="243" width="18" height="18" rx="3" fill={C.indigo} stroke={C.cyan} strokeWidth="1.3" />
            <text x={x + 13} y="255.5" textAnchor="middle" fontSize="6.5" fontWeight="700" fill="#fff" fontFamily="var(--font-montserrat), sans-serif">TR</text>
          </g>
        </g>
      ))}

      {/* ── HANA database ── */}
      <line x1="475" x2="475" y1="320" y2="340" stroke="rgba(255,255,255,.25)" />
      <ellipse cx="475" cy="346" rx="34" ry="9" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.4" />
      <path d="M441 346 v36 c0 5 15 9 34 9 s34 -4 34 -9 v-36" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.4" />
      <text x="475" y="378" {...LABEL} fontSize="9">HANA</text>
    </>
  ),
};
