"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Pauses a scene's CSS + SMIL animations while it is off-screen, so pages with
 * several animated scenes don't keep the main thread busy (better INP/TBT).
 * Returns a ref for the <svg> and whether it is currently visible.
 */
export function useScenePause() {
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const apply = (on: boolean) => {
      el.classList.toggle("s-paused", !on);
      if (on) el.unpauseAnimations?.();
      else el.pauseAnimations?.();
      setVisible(on);
    };
    apply(false);
    const io = new IntersectionObserver(
      ([entry]) => apply(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}
