import { C, type SceneDef } from "./types";

const LABEL = {
  fontSize: 10,
  fontWeight: 700,
  fill: "#fff",
  fontFamily: "var(--font-montserrat), sans-serif",
  textAnchor: "middle" as const,
};

// Code lines: [indent, ...token widths]. Colours cycle through the palette.
const CODE: number[][] = [
  [0, 58, 90],
  [0, 70, 40, 60],
  [16, 44, 110],
  [16, 60, 30, 70],
  [32, 90, 50],
  [32, 40, 100],
  [16, 70],
  [0, 50, 80],
  [16, 36, 90, 30],
  [32, 120],
  [16, 60],
  [0, 64],
];
const TOKEN = [C.purple, C.blue, C.lavender, "rgba(0,229,255,.7)"];
const LINE_Y = (i: number) => 104 + i * 22;

/** SAP ABAP: editor + debugger, Data Dictionary/HANA, BAPI/RFC API, Fiori app. */
export const abap: SceneDef = {
  anchors: {
    editor: [120, 140],
    debugger: [180, 216],
    migration: [200, 350],
    hana: [440, 100],
    fiori: [520, 250],
    api: [410, 300],
  },
  Art: () => (
    <>
      {/* ── editor window ── */}
      <rect x="20" y="60" width="320" height="320" rx="10" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.4" />
      <line x1="20" x2="340" y1="84" y2="84" stroke="rgba(255,255,255,.1)" />
      {[34, 46, 58].map((x) => (
        <circle key={x} cx={x} cy="72" r="3.5" fill="rgba(255,255,255,.2)" />
      ))}
      <text x="80" y="76" fontSize="9.5" fill="rgba(255,255,255,.65)" fontFamily="var(--font-geist-mono), monospace">ZREPORT_SALES.abap</text>

      {/* debugger current line (steps down) */}
      <g className="s-step" style={{ ["--dy" as string]: "132px", ["--dur" as string]: "6s" }}>
        <rect x="22" y={LINE_Y(2) - 12} width="316" height="18" fill="rgba(0,229,255,.12)" />
        <path d={`M28 ${LINE_Y(2) - 7} l6 4 l-6 4 z`} fill={C.cyan} />
      </g>
      {/* breakpoint */}
      <circle cx="26" cy={LINE_Y(6) - 3} r="3.5" fill={C.purple} />

      {CODE.map(([indent, ...tokens], i) => {
        let x = 50 + indent;
        return (
          <g key={i} className="s-type" style={{ animationDelay: `${i * 0.18}s` }}>
            <text x="40" y={LINE_Y(i) + 1} fontSize="8" textAnchor="end" fill="rgba(255,255,255,.25)" fontFamily="var(--font-geist-mono), monospace">
              {i + 1}
            </text>
            {tokens.map((w, t) => {
              const r = <rect key={t} x={x} y={LINE_Y(i) - 7} width={w} height="7" rx="3.5" fill={TOKEN[(i + t) % TOKEN.length]} opacity=".85" />;
              x += w + 8;
              return r;
            })}
          </g>
        );
      })}

      {/* ── Data Dictionary / HANA ── */}
      <path d="M340 122 C 370 122, 380 104, 398 102" fill="none" stroke="rgba(0,229,255,.5)" strokeDasharray="4 4" className="s-flow" />
      <ellipse cx="440" cy="70" rx="40" ry="11" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.4" />
      <path d="M400 70 v62 c0 6 18 11 40 11 s40 -5 40 -11 v-62" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.4" />
      <path d="M400 92 c0 6 18 11 40 11 s40 -5 40 -11" fill="none" stroke="rgba(255,255,255,.15)" />
      <path d="M400 114 c0 6 18 11 40 11 s40 -5 40 -11" fill="none" stroke="rgba(255,255,255,.15)" />
      <text x="440" y="126" {...LABEL} fontSize="9">DDIC</text>

      {/* ── BAPI / RFC API node ── */}
      <line x1="340" x2="386" y1="300" y2="300" stroke={C.cyan} strokeWidth="1.5" strokeDasharray="4 4" className="s-flow" />
      <circle cx="410" cy="300" r="23" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.5" />
      <text x="410" y="304" {...LABEL} fontSize="9.5">API</text>
      <path d="M433 294 C 448 286, 456 280, 470 278" fill="none" stroke="rgba(123,61,255,.6)" strokeDasharray="4 4" className="s-flow" />

      {/* ── Fiori app ── */}
      <rect x="470" y="196" width="100" height="186" rx="16" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.4" />
      <rect x="504" y="204" width="32" height="4" rx="2" fill="rgba(255,255,255,.2)" />
      {[0, 1, 2].map((r) =>
        [0, 1].map((c) => (
          <rect
            key={`${r}${c}`}
            x={482 + c * 40}
            y={222 + r * 46}
            width="34"
            height="38"
            rx="6"
            fill={C.indigo}
            stroke={(r + c) % 2 ? C.purple : C.blue}
            strokeWidth="1.2"
            className="s-seq"
            style={{ animationDelay: `${(r * 2 + c) * 0.35}s` }}
          />
        )),
      )}
      <text x="520" y="372" {...LABEL} fontSize="8.5" fill="rgba(255,255,255,.7)">Fiori</text>
    </>
  ),
};
