/**
 * Shared SVG gradients + animation utilities for every course scene.
 * Render <SceneDefs /> once inside each <svg> that draws a scene.
 * All motion is wrapped in prefers-reduced-motion: no-preference.
 */

const CSS = `
@media (prefers-reduced-motion: no-preference) {
  .s-move { animation: s-move var(--dur, 7s) linear infinite; }
  .s-down { animation: s-down var(--dur, 3s) ease-in-out infinite; }
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
  .s-rot { transform-box: fill-box; transform-origin: center; animation: s-spin var(--dur, 8s) linear infinite; }
}
.s-paused, .s-paused * { animation-play-state: paused !important; }
@keyframes s-move { from { transform: translateX(0) } to { transform: translateX(var(--dx, 300px)) } }
@keyframes s-down { 0% { transform: translateY(0); opacity: 0 } 10% { opacity: 1 } 90% { opacity: 1 } 100% { transform: translateY(var(--dy, 200px)); opacity: 0 } }
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

export function SceneDefs() {
  return (
    <>
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
    </>
  );
}
