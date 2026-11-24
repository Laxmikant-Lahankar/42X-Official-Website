import { C, type SceneDef } from "./types";

const LABEL = {
  fontSize: 9,
  fontWeight: 700,
  fill: "rgba(255,255,255,.75)",
  fontFamily: "var(--font-montserrat), sans-serif",
  textAnchor: "middle" as const,
};

const STAGES = ["Code", "Build", "Test", "Deploy"];

/** DevOps with AI: CI/CD pipeline → containers on a Kubernetes cluster, AI assist. */
export const cicd: SceneDef = {
  anchors: {
    code: [80, 110],
    build: [220, 110],
    test: [360, 110],
    deploy: [500, 110],
    cluster: [200, 300],
    k8s: [470, 300],
  },
  Art: () => (
    <>
      {/* pipeline */}
      <line x1="80" x2="500" y1="110" y2="110" stroke="rgba(0,229,255,.45)" strokeWidth="1.6" strokeDasharray="5 5" className="s-flow" />
      <g className="s-move" style={{ ["--dx" as string]: "420px", ["--dur" as string]: "4s" }}>
        <rect x="70" y="102" width="16" height="16" rx="3" fill={C.cyan} />
      </g>
      {STAGES.map((s, i) => {
        const cx = 80 + i * 140;
        return (
          <g key={s}>
            <circle cx={cx} cy="110" r="34" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.6" />
            {i === 0 && (
              <g fill="none" stroke={C.cyan} strokeWidth="2" strokeLinecap="round">
                <circle cx={cx - 8} cy="98" r="4" />
                <circle cx={cx - 8} cy="122" r="4" />
                <circle cx={cx + 9} cy="104" r="4" />
                <path d={`M${cx - 8} 102 v16 M${cx + 9} 108 c0 8 -17 6 -17 10`} />
              </g>
            )}
            {i === 1 && (
              <g className="s-rot" style={{ ["--dur" as string]: "5s" }}>
                <circle cx={cx} cy="110" r="11" fill="none" stroke={C.cyan} strokeWidth="2.4" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
                  <rect key={a} x={cx - 2.5} y="94" width="5" height="7" rx="1.5" fill={C.cyan} transform={`rotate(${a} ${cx} 110)`} />
                ))}
              </g>
            )}
            {i === 2 &&
              [0, 1, 2].map((r) => (
                <g key={r} className="s-seq" style={{ animationDelay: `${r * 0.45}s` }}>
                  <circle cx={cx - 10} cy={98 + r * 12} r="4" fill={C.cyan} />
                  <rect x={cx - 2} y={95 + r * 12} width="16" height="6" rx="3" fill="rgba(255,255,255,.3)" />
                </g>
              ))}
            {i === 3 && (
              <path d={`M${cx - 10} 120 l20 -20 m0 0 h-11 m11 0 v11`} fill="none" stroke={C.cyan} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            )}
            <text x={cx} y="164" {...LABEL}>{s}</text>
          </g>
        );
      })}

      {/* deploy → cluster */}
      <path d="M500 146 C 500 200, 330 190, 330 232" fill="none" stroke="rgba(123,61,255,.6)" strokeDasharray="4 4" className="s-flow" />

      {/* cluster with containers */}
      <rect x="60" y="232" width="290" height="140" rx="12" fill="url(#sc-wall)" stroke="url(#sc-g)" strokeWidth="1.4" />
      <text x="80" y="252" {...LABEL} textAnchor="start">Cluster</text>
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}${c}`}
            x={78 + c * 66}
            y={262 + r * 34}
            width="56"
            height="24"
            rx="5"
            fill={C.indigo}
            stroke={(r + c) % 3 ? "url(#sc-g)" : C.cyan}
            strokeWidth="1.2"
            className={(r * 4 + c) % 5 === 2 ? "s-pick" : undefined}
            style={{ animationDelay: `${-(r + c) * 0.6}s` }}
          />
        )),
      )}

      {/* Kubernetes-style wheel (generic, not the logo) */}
      <g className="s-rot" style={{ ["--dur" as string]: "12s" }}>
        <path d="M470 252 l41 20 v56 l-41 20 l-41 -20 v-56 z" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.6" strokeLinejoin="round" />
        <circle cx="470" cy="300" r="20" fill="none" stroke={C.cyan} strokeWidth="2" />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <line key={a} x1="470" y1="300" x2="470" y2="280" stroke={C.cyan} strokeWidth="2" transform={`rotate(${a} 470 300)`} />
        ))}
      </g>
      <line x1="352" x2="426" y1="300" y2="300" stroke={C.cyan} strokeWidth="1.4" strokeDasharray="4 4" className="s-flow" />

      {/* AI assist sparkle */}
      <path d="M556 210 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 l12 -5 z" fill="url(#sc-g)" className="s-blink" />
      <text x="556" y="262" {...LABEL}>AI</text>
    </>
  ),
};
