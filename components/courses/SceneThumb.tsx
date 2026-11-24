"use client";

import { useReducedMotion } from "motion/react";
import { SCENES } from "@/components/courses/landing/scenes";
import { SceneDefs } from "@/components/courses/landing/scenes/SceneDefs";
import type { SceneId } from "@/components/courses/landing/scenes/types";

/**
 * Card-sized, animated version of a course scene (no role chips).
 * Same art as the course page hero, so the listing and detail pages match.
 */
export function SceneThumb({ scene, label }: { scene: SceneId; label: string }) {
  const reduce = useReducedMotion() ?? false;
  const def = SCENES[scene];
  return (
    <svg
      viewBox="5 30 590 370"
      preserveAspectRatio="xMidYMid meet"
      className="h-full w-full"
      role="img"
      aria-label={label}
    >
      <SceneDefs />
      <line x1="-20" x2="620" y1="400" y2="400" stroke="rgba(255,255,255,.12)" />
      <def.Art reduce={reduce} />
    </svg>
  );
}
