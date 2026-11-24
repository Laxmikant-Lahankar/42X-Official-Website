import { C, type SceneDef } from "./types";

const LABEL = {
  fontSize: 9,
  fontWeight: 700,
  fill: "rgba(255,255,255,.75)",
  fontFamily: "var(--font-montserrat), sans-serif",
};

/** Power BI / Data: data sources feeding a live dashboard. */
export const powerbi: SceneDef = {
  anchors: {
    sources: [50, 230],
    kpi: [250, 125],
    bars: [190, 300],
    trend: [430, 215],
    donut: [400, 320],
    model: [520, 125],
  },
  Art: () => (
    <>
      {/* data sources */}
      {[150, 230, 310].map((y, i) => (
        <g key={y}>
          <ellipse cx="50" cy={y - 14} rx="22" ry="6" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.2" />
          <path d={`M28 ${y - 14} v26 c0 4 10 7 22 7 s22 -3 22 -7 v-26`} fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.2" />
          <line x1="74" x2="96" y1={y} y2={y} stroke={C.cyan} strokeWidth="1.4" strokeDasharray="4 4" className="s-flow" style={{ animationDelay: `${-i * 0.3}s` }} />
        </g>
      ))}

      {/* dashboard window */}
      <rect x="100" y="60" width="470" height="320" rx="12" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.5" />
      <line x1="100" x2="570" y1="86" y2="86" stroke="rgba(255,255,255,.1)" />
      {[116, 128, 140].map((x) => (
        <circle key={x} cx={x} cy="73" r="3.5" fill="rgba(255,255,255,.2)" />
      ))}

      {/* KPI tiles */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={120 + i * 148} y="100" width="134" height="50" rx="8" fill={C.indigo} stroke="rgba(255,255,255,.1)" />
          <rect x={132 + i * 148} y="112" width="44" height="5" rx="2.5" fill="rgba(255,255,255,.25)" />
          <rect x={132 + i * 148} y="126" width={56 + i * 8} height="12" rx="4" fill={i === 1 ? C.purple : C.blue} className="s-seq" style={{ animationDelay: `${i * 0.5}s` }} />
          <path d={`M${232 + i * 148} 136 l7 -9 l7 9`} fill="none" stroke={C.cyan} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      ))}

      {/* bar chart */}
      <rect x="120" y="164" width="216" height="200" rx="8" fill={C.indigo} stroke="rgba(255,255,255,.1)" fillOpacity=".5" />
      <text x="132" y="182" {...LABEL}>Revenue by region</text>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x={138 + i * 32} y="200" width="20" height="148" rx="4" fill={i % 2 ? C.purple : C.blue} className="s-bar" style={{ animationDelay: `${-i * 0.4}s` }} />
      ))}

      {/* trend line */}
      <rect x="350" y="164" width="200" height="100" rx="8" fill={C.indigo} stroke="rgba(255,255,255,.1)" fillOpacity=".5" />
      <text x="362" y="182" {...LABEL}>Trend</text>
      <polyline points="364,248 392,236 418,240 444,214 470,222 498,198 536,190" fill="none" stroke="url(#sc-g)" strokeWidth="2.2" strokeLinejoin="round" className="s-line" />

      {/* donut */}
      <rect x="350" y="276" width="200" height="88" rx="8" fill={C.indigo} stroke="rgba(255,255,255,.1)" fillOpacity=".5" />
      <g className="s-rot" style={{ ["--dur" as string]: "10s" }}>
        <circle cx="400" cy="320" r="26" fill="none" stroke={C.blue} strokeWidth="10" strokeDasharray="90 74" />
        <circle cx="400" cy="320" r="26" fill="none" stroke={C.purple} strokeWidth="10" strokeDasharray="50 114" strokeDashoffset="-90" />
        <circle cx="400" cy="320" r="26" fill="none" stroke={C.cyan} strokeWidth="10" strokeDasharray="24 140" strokeDashoffset="-140" />
      </g>
      {[300, 316, 332].map((y, i) => (
        <g key={y}>
          <circle cx="448" cy={y} r="4" fill={[C.blue, C.purple, C.cyan][i]} />
          <rect x="458" y={y - 3} width={60 - i * 12} height="6" rx="3" fill="rgba(255,255,255,.2)" />
        </g>
      ))}
    </>
  ),
};
