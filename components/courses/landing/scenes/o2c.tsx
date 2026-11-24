import { C, type SceneDef } from "./types";

const LABEL = {
  fontSize: 10,
  fontWeight: 700,
  fill: "#fff",
  fontFamily: "var(--font-montserrat), sans-serif",
  textAnchor: "middle" as const,
};
const CAPTION = { ...LABEL, fontSize: 9, fill: "rgba(255,255,255,.7)" };

function Arrow({ x1, x2, y }: { x1: number; x2: number; y: number }) {
  return <line x1={x1} x2={x2} y1={y} y2={y} stroke={C.cyan} strokeWidth="1.5" strokeDasharray="4 4" className="s-flow" />;
}

/** SAP SD: order-to-cash. Customer → SO → pricing → credit → delivery → billing → cash. */
export const o2c: SceneDef = {
  anchors: {
    customer: [90, 105],
    so: [232, 110],
    pricing: [340, 110],
    credit: [465, 112],
    delivery: [200, 380],
    billing: [430, 345],
  },
  Art: () => (
    <>
      {/* ── customer laptop ── */}
      <rect x="40" y="70" width="100" height="66" rx="6" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.3" />
      <path d="M28 140 h124 l-8 10 h-108 z" fill={C.indigo} stroke="rgba(255,255,255,.2)" />
      <path d="M62 92 h6 l6 20 h22 l5 -14 h-30" fill="none" stroke={C.cyan} strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="77" cy="118" r="2.4" fill={C.cyan} />
      <circle cx="93" cy="118" r="2.4" fill={C.cyan} />
      <rect x="104" y="112" width="28" height="12" rx="6" fill="url(#sc-g)" className="s-seq" />
      <text x="90" y="168" {...CAPTION}>Customer</text>

      <Arrow x1={156} x2={196} y={110} />

      {/* ── sales order ── */}
      <rect x="200" y="70" width="64" height="80" rx="6" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.3" />
      <text x="232" y="88" {...LABEL}>SO</text>
      {[100, 112, 124].map((y, i) => (
        <rect key={y} x="212" y={y} width={i === 2 ? 24 : 40} height="4" rx="2" fill="rgba(255,255,255,.18)" />
      ))}
      <g className="s-seq" style={{ animationDelay: "0.4s" }}>
        <circle cx="250" cy="138" r="5" fill={C.cyan} />
        <path d="M247.5 138 l2 2 l3.5 -4" stroke={C.ink} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>
      <text x="216" y="141" fontSize="7.5" fill="rgba(255,255,255,.7)" fontFamily="var(--font-inter), sans-serif">ATP</text>

      <Arrow x1={268} x2={300} y={110} />

      {/* ── pricing tag ── */}
      <path d="M304 82 h56 l20 28 l-20 28 h-56 z" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="366" cy="110" r="3.5" fill="none" stroke={C.cyan} />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={316 + i * 12} y="96" width="8" height="28" rx="2" fill={i === 1 ? C.purple : C.blue} className="s-bar" style={{ animationDelay: `${-i * 0.5}s` }} />
      ))}
      <text x="340" y="160" {...CAPTION}>Pricing</text>

      <Arrow x1={384} x2={432} y={110} />

      {/* ── credit check shield ── */}
      <path d="M465 76 l32 12 v22 c0 20 -14 32 -32 40 c-18 -8 -32 -20 -32 -40 v-22 z" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M452 112 l9 9 l17 -18" fill="none" stroke={C.cyan} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="s-seq" style={{ animationDelay: "0.8s" }} />
      <text x="465" y="168" {...CAPTION}>Credit</text>

      {/* released order → shipping */}
      <path d="M462 152 C 440 250, 170 230, 96 316" fill="none" stroke="rgba(123,61,255,.55)" strokeDasharray="4 4" className="s-flow" />

      {/* ── shipping point ── */}
      <rect x="30" y="322" width="96" height="78" fill="url(#sc-wall)" stroke="rgba(255,255,255,.16)" />
      {[
        [42, 372],
        [68, 372],
        [55, 350],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="22" height="20" rx="2.5" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.2" />
      ))}
      <text x="104" y="340" {...LABEL} fontSize="9">PGI</text>

      {/* road + delivery truck */}
      <line x1="126" x2="330" y1="399" y2="399" stroke="rgba(255,255,255,.18)" strokeDasharray="10 8" />
      <g className="s-trip" style={{ ["--from" as string]: "-110px" }}>
        <rect x="216" y="364" width="44" height="28" rx="3" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.4" />
        <path d="M260 374 h14 l8 10 v8 h-22 z" fill={C.indigo} stroke={C.blue} strokeWidth="1.4" strokeLinejoin="round" />
        <circle cx="228" cy="394" r="5" fill={C.ink} stroke={C.cyan} />
        <circle cx="270" cy="394" r="5" fill={C.ink} stroke={C.cyan} />
      </g>

      {/* ── billing document ── */}
      <rect x="398" y="300" width="64" height="86" rx="6" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.3" />
      <text x="430" y="318" {...LABEL}>Bill</text>
      {[330, 342, 354].map((y, i) => (
        <rect key={y} x="410" y={y} width={i === 2 ? 24 : 40} height="4" rx="2" fill="rgba(255,255,255,.18)" />
      ))}
      <rect x="410" y="366" width="40" height="8" rx="4" fill="url(#sc-g)" className="s-seq" style={{ animationDelay: "1.2s" }} />

      <line x1="466" x2="502" y1="343" y2="343" stroke={C.cyan} strokeWidth="1.5" strokeDasharray="4 4" className="s-flow" />

      {/* ── cash ── */}
      <circle cx="530" cy="343" r="24" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.5" />
      <text x="530" y="348" {...LABEL} fontSize="14">₹</text>
      {[0, -1, -2].map((d) => (
        <circle key={d} cx="530" cy="312" r="5" fill="none" stroke={C.cyan} strokeWidth="1.4" className="s-rise" style={{ animationDelay: `${d}s` }} />
      ))}
      <text x="530" y="386" {...CAPTION}>Cash</text>
    </>
  ),
};
