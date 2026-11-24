import { C, type SceneDef } from "./types";

/** SAP EWM: inbound dock, racks, conveyor, RF scanner, monitor, S/4 link. */
export const warehouse: SceneDef = {
  anchors: {
    erp: [470, 50],
    racks: [285, 212],
    dock: [85, 300],
    monitor: [495, 200],
    scanner: [432, 318],
    conveyor: [270, 372],
  },
  Art: ({ reduce }) => (
    <>
      <rect x="30" y="170" width="540" height="230" fill="url(#sc-wall)" />
      <path d="M18 176 L300 100 L582 176" fill="none" stroke="url(#sc-g)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="30" x2="30" y1="173" y2="400" stroke="rgba(255,255,255,.14)" />
      <line x1="570" x2="570" y1="173" y2="400" stroke="rgba(255,255,255,.14)" />

      {/* S/4HANA node + data link */}
      <path id="wh-erp-link" d="M392 125 Q 420 66 452 54" fill="none" stroke="rgba(0,229,255,.45)" strokeDasharray="3 4" />
      <circle cx="470" cy="50" r="22" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.5" />
      <text x="470" y="53.5" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff" fontFamily="var(--font-montserrat), sans-serif">S/4</text>
      {!reduce &&
        [0, 0.6, 1.2].map((d) => (
          <circle key={d} r="2.6" fill={C.cyan}>
            <animateMotion dur="1.8s" begin={`${d}s`} repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath href="#wh-erp-link" />
            </animateMotion>
          </circle>
        ))}

      {/* dock door + inbound pallet */}
      <rect x="50" y="280" width="70" height="120" rx="3" fill={C.ink} stroke="rgba(255,255,255,.16)" />
      {[292, 304, 316, 328].map((y) => (
        <line key={y} x1="54" x2="116" y1={y} y2={y} stroke="rgba(255,255,255,.08)" />
      ))}
      <g className="s-trip">
        <rect x="72" y="374" width="26" height="22" rx="3" fill={C.indigo} stroke={C.blue} strokeWidth="1.4" />
        <line x1="72" x2="98" y1="383" y2="383" stroke="rgba(0,180,255,.5)" />
      </g>

      {/* racks */}
      {[160, 250, 340].map((x0, r) => (
        <g key={x0}>
          <line x1={x0} x2={x0} y1="196" y2="340" stroke={C.line} strokeWidth="1.5" />
          <line x1={x0 + 70} x2={x0 + 70} y1="196" y2="340" stroke={C.line} strokeWidth="1.5" />
          {[230, 280, 330].map((y, s) => (
            <g key={y}>
              <line x1={x0} x2={x0 + 70} y1={y} y2={y} stroke={C.line} strokeWidth="1.5" />
              {[8, 38].map((dx, b) => {
                if ((r + s + b) % 5 === 4) return null;
                const picking = (r === 1 && s === 0 && b === 1) || (r === 2 && s === 1 && b === 0);
                return (
                  <rect
                    key={dx}
                    x={x0 + dx}
                    y={y - 21}
                    width="24"
                    height="20"
                    rx="2.5"
                    fill={C.indigo}
                    stroke={picking ? C.cyan : "url(#sc-g)"}
                    strokeWidth="1.2"
                    className={picking ? "s-pick" : undefined}
                    style={picking && r === 2 ? { animationDelay: "-2.4s" } : undefined}
                  />
                );
              })}
            </g>
          ))}
        </g>
      ))}

      {/* warehouse monitor */}
      <rect x="450" y="200" width="90" height="60" rx="6" fill={C.ink} stroke="url(#sc-g)" strokeWidth="1.3" />
      <line x1="495" x2="495" y1="260" y2="276" stroke="rgba(255,255,255,.2)" />
      <line x1="480" x2="510" y1="276" y2="276" stroke="rgba(255,255,255,.2)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={462 + i * 15} y="214" width="9" height="36" rx="2" fill={i % 2 ? C.purple : C.blue} className="s-bar" style={{ animationDelay: `${-i * 0.45}s` }} />
      ))}

      {/* RF scanner + laser */}
      <g transform="rotate(-18 432 318)">
        <rect x="418" y="306" width="30" height="16" rx="4" fill={C.indigo} stroke={C.cyan} strokeWidth="1.2" />
        <rect x="422" y="318" width="9" height="20" rx="3" fill={C.indigo} stroke={C.cyan} strokeWidth="1.2" />
      </g>
      <line x1="447" y1="313" x2="472" y2="352" stroke={C.cyan} strokeWidth="1.5" className="s-blink" />

      {/* conveyor */}
      <line x1="150" x2="560" y1="372" y2="372" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
      {Array.from({ length: 19 }, (_, i) => (
        <circle key={i} cx={156 + i * 22} cy="380" r="4" fill="none" stroke="rgba(255,255,255,.18)" />
      ))}
      <clipPath id="wh-belt">
        <rect x="150" y="330" width="410" height="45" />
      </clipPath>
      <g clipPath="url(#wh-belt)">
        {[0, -2.33, -4.66].map((d) => (
          <g key={d} className="s-move" style={{ animationDelay: `${d}s`, ["--dx" as string]: "390px" }}>
            <rect x="140" y="349" width="28" height="22" rx="3" fill={C.indigo} stroke="url(#sc-g)" strokeWidth="1.3" />
            <line x1="140" x2="168" y1="358" y2="358" stroke="rgba(123,61,255,.5)" />
          </g>
        ))}
      </g>
    </>
  ),
};
