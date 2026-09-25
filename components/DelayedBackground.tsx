"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function DelayedBackground({
  children,
  className,
  delayMs = 1,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const id = window.setTimeout(() => setVisible(true), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs]);

  return (
    <div
      className={cn(
        "absolute inset-0",
        visible ? "animate-hero-bg" : "opacity-0",
        className,
      )}
      aria-hidden={!visible}
    >
      {children}
    </div>
  );
}
