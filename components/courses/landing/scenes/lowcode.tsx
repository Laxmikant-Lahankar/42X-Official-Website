import { C, type SceneDef } from "./types";

const LABEL = {
  fontSize: 9,
  fontWeight: 700,
  fill: "rgba(255,255,255,.75)",
  fontFamily: "var(--font-montserrat), sans-serif",
  textAnchor: "middle" as const,
};

const STEPS = ["Trigger", "Condition", "Approval", "Update"];

/** Power Platform: Power Apps form → Power Automate flow → Copilot bot + Dataverse. */
export const lowcode: SceneDef = {
  anchors: {
    app: [95, 200],
    flow: [300, 190],
    bot: [490, 130],
    data: [490, 300],
  },
  Art: () => (
    <>
      {/* Power Apps: phone with a form filling in */}
      <rect x="40" y="70" width="110" height="300" rx="18" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.5" />
      <rect x="78" y="80" width="34" height="4" rx="2" fill="rgba(255,255,255,.2)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x="56" y={104 + i * 52} width="40" height="5" rx="2.5" fill="rgba(255,255,255,.25)" />
          <rect x="56" y={114 + i * 52} width="78" height="22" rx="6" fill={C.indigo} stroke="rgba(255,255,255,.12)" />
          <rect x="62" y={122 + i * 52} width={30 + i * 10} height="6" rx="3" fill={C.blue} className="s-type" style={{ animationDelay: `${i * 0.4}s` }} />
        </g>
      ))}
      <rect x="56" y="320" width="78" height="26" rx="13" fill="url(#sc-g)" className="s-seq" style={{ animationDelay: "1.8s" }} />
      <text x="95" y="388" {...LABEL}>App</text>

      <line x1="152" x2="236" y1="333" y2="333" stroke={C.cyan} strokeWidth="1.4" strokeDasharray="4 4" className="s-flow" />
      <path d="M236 333 C 250 333, 250 96, 262 96" fill="none" stroke={C.cyan} strokeWidth="1.4" strokeDasharray="4 4" className="s-flow" />

      {/* Power Automate: vertical flow */}
      {STEPS.map((s, i) => (
        <g key={s}>
          <rect x="250" y={76 + i * 78} width="110" height="40" rx="10" fill={C.indigo} stroke={i === 2 ? C.cyan : "url(#sc-g)"} strokeWidth="1.4" />
          <circle cx="270" cy={96 + i * 78} r="7" fill={i % 2 ? C.purple : C.blue} />
          <text x="318" y={99 + i * 78} {...LABEL} fill="#fff">{s}</text>
          {i < STEPS.length - 1 && (
            <line x1="305" x2="305" y1={118 + i * 78} y2={152 + i * 78} stroke="rgba(0,229,255,.55)" strokeWidth="1.4" strokeDasharray="4 4" className="s-flow" />
          )}
        </g>
      ))}
      <circle cx="305" cy="96" r="5" fill={C.cyan} className="s-down" style={{ ["--dy" as string]: "234px", ["--dur" as string]: "3.2s" }} />

      {/* Copilot bot */}
      <path d="M360 120 C 390 120, 400 120, 418 120" fill="none" stroke="rgba(123,61,255,.6)" strokeDasharray="4 4" className="s-flow" />
      <rect x="420" y="70" width="140" height="104" rx="14" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.4" />
      <rect x="434" y="86" width="84" height="22" rx="11" fill={C.indigo} stroke="rgba(255,255,255,.14)" />
      <rect x="458" y="116" width="88" height="22" rx="11" fill="url(#sc-g)" opacity=".85" />
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={446 + i * 12} cy="156" r="3.5" fill={C.cyan} className="s-blink" style={{ animationDelay: `${i * 0.25}s` }} />
      ))}
      <text x="490" y="190" {...LABEL}>Copilot</text>

      {/* Dataverse table */}
      <path d="M360 274 C 390 274, 400 290, 418 290" fill="none" stroke="rgba(0,229,255,.55)" strokeDasharray="4 4" className="s-flow" />
      <rect x="420" y="236" width="140" height="124" rx="10" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.4" />
      <rect x="420" y="236" width="140" height="22" rx="10" fill={C.indigo} />
      {[0, 1, 2, 3].map((r) => (
        <g key={r} className="s-seq" style={{ animationDelay: `${r * 0.4}s` }}>
          <rect x="432" y={268 + r * 22} width="40" height="8" rx="3" fill="rgba(255,255,255,.22)" />
          <rect x="482" y={268 + r * 22} width="64" height="8" rx="3" fill={r % 2 ? C.purple : C.blue} opacity=".8" />
        </g>
      ))}
      <text x="490" y="388" {...LABEL}>Dataverse</text>
    </>
  ),
};
