"use client";

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

type Animation = "fade-up" | "drop-down" | "fade-in";

const ANIMATION_CLASS: Record<Animation, string> = {
  "fade-up": "animate-fade-up",
  "drop-down": "animate-drop-down",
  "fade-in": "animate-fade-in-delayed",
};

export default function Reveal({
  children,
  className,
  animation = "fade-up",
  delayMs = 0,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  animation?: Animation;
  delayMs?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={cn(
        visible ? ANIMATION_CLASS[animation] : "opacity-0",
        className,
      )}
      style={delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
