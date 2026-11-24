import { C, type SceneDef } from "./types";

const LABEL = {
  fontSize: 10,
  fontWeight: 700,
  fill: "#fff",
  fontFamily: "var(--font-montserrat), sans-serif",
  textAnchor: "middle" as const,
};

function Doc({ x, y, label, h = 80, lines = true }: { x: number; y: number; label: string; h?: number; lines?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width="64" height={h} rx="6" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.3" />
      <text x={x + 32} y={y + 18} {...LABEL}>{label}</text>
      {lines && [30, 42, 54].map((dy, i) => (
        <rect key={dy} x={x + 12} y={y + dy} width={i === 2 ? 24 : 40} height="4" rx="2" fill="rgba(255,255,255,.18)" />
      ))}
    </g>
  );
}

/** SAP MM: procure-to-pay. PR → RFQ → PO → vendor → GR → MIRO → FI, with MRP. */
export const p2p: SceneDef = {
  anchors: {
    po: [292, 110],
    vendor: [75, 300],
    stock: [350, 330],
    mrp: [475, 115],
    invoice: [462, 300],
    fi: [545, 330],
  },
  Art: () => (
    <>
      {/* ── purchasing documents ── */}
      <Doc x={40} y={70} label="PR" />
      <Doc x={150} y={70} label="RFQ" />
      <Doc x={260} y={70} label="PO" />
      {[
        [104, 150],
        [214, 260],
      ].map(([a, b]) => (
        <line key={a} x1={a + 4} x2={b - 4} y1="110" y2="110" stroke={C.cyan} strokeWidth="1.5" strokeDasharray="4 4" className="s-flow" />
      ))}

      {/* PO → vendor, PO → stores */}
      <path d="M262 140 C 200 200, 120 220, 90 282" fill="none" stroke="rgba(0,229,255,.45)" strokeDasharray="4 4" className="s-flow" />
      <path d="M300 152 C 310 220, 345 250, 350 296" fill="none" stroke="rgba(123,61,255,.55)" strokeDasharray="4 4" className="s-flow" />

      {/* ── MRP panel ── */}
      <rect x="380" y="60" width="190" height="110" rx="8" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.3" />
      <text x="400" y="80" {...LABEL} textAnchor="start" fontSize="9">MRP · stock level</text>
      <line x1="395" x2="555" y1="140" y2="140" stroke={C.cyan} strokeDasharray="3 3" strokeWidth="1" opacity=".7" />
      <polyline
        points="395,95 435,136 437,97 477,138 479,99 519,139 521,101 555,126"
        fill="none"
        stroke="url(#sc-g)"
        strokeWidth="2"
        strokeLinejoin="round"
        className="s-line"
      />

      {/* ── vendor factory ── */}
      <rect x="30" y="320" width="100" height="80" fill="url(#sc-wall)" stroke="rgba(255,255,255,.16)" />
      <path d="M30 320 L55 300 L55 320 L80 300 L80 320 L105 300 L105 320 L130 300 L130 320" fill="none" stroke="url(#sc-g)" strokeWidth="2" strokeLinejoin="round" />
      <rect x="108" y="276" width="12" height="30" fill={C.indigo} stroke="rgba(255,255,255,.2)" />
      {[0, -1, -2].map((d) => (
        <circle key={d} cx="114" cy="268" r="5" fill="rgba(200,184,255,.35)" className="s-rise" style={{ animationDelay: `${d}s` }} />
      ))}
      <text x="80" y="370" {...LABEL} fontSize="9" fill="rgba(255,255,255,.7)">Vendor</text>

      {/* road + truck */}
      <line x1="130" x2="300" y1="399" y2="399" stroke="rgba(255,255,255,.18)" strokeDasharray="10 8" />
      <g className="s-trip" style={{ ["--from" as string]: "-120px", ["--dur" as string]: "5s" }}>
        <rect x="210" y="364" width="44" height="28" rx="3" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.4" />
        <path d="M254 374 h14 l8 10 v8 h-22 z" fill={C.indigo} stroke={C.blue} strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="222" cy="394" r="5" fill={C.ink} stroke={C.cyan} />
        <circle cx="264" cy="394" r="5" fill={C.ink} stroke={C.cyan} />
      </g>

      {/* ── stores / goods receipt ── */}
      <path d="M300 316 L350 292 L400 316" fill="none" stroke="url(#sc-g)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <rect x="304" y="316" width="92" height="84" fill="url(#sc-wall)" stroke="rgba(255,255,255,.16)" />
      {[
        [318, 372],
        [344, 372],
        [370, 372],
        [331, 350],
        [357, 350],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="22" height="20" rx="2.5" fill={C.indigo} stroke={i === 4 ? C.cyan : "url(#sc-g)"} strokeWidth="1.2" className={i === 4 ? "s-pick" : undefined} />
      ))}
      <text x="350" y="338" {...LABEL} fontSize="9">GR</text>

      {/* ── invoice verification (3-way match) ── */}
      <Doc x={430} y={290} label="MIRO" h={100} lines={false} />
      {["PO", "GR", "INV"].map((t, i) => (
        <g key={t} className="s-seq" style={{ animationDelay: `${i * 0.5}s` }}>
          <circle cx="446" cy={338 + i * 16} r="5" fill={C.cyan} />
          <path d={`M443.5 ${338 + i * 16} l2 2 l3.5 -4`} stroke={C.ink} strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <text x="456" y={341 + i * 16} fontSize="8.5" fill="rgba(255,255,255,.8)" fontFamily="var(--font-inter), sans-serif">{t}</text>
        </g>
      ))}

      {/* ── payment to FI ── */}
      <line x1="496" x2="520" y1="330" y2="330" stroke={C.cyan} strokeWidth="1.5" strokeDasharray="4 4" className="s-flow" />
      <circle cx="545" cy="330" r="24" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.5" />
      <text x="545" y="334" {...LABEL}>FI</text>
    </>
  ),
};
