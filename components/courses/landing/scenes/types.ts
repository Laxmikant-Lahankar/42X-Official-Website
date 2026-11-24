import type { ReactNode } from "react";

/**
 * A course illustration for RoleScene.
 * Art is drawn in a 600×460 local box (ground line at y=400). RoleScene
 * places it in the middle of a 1000×460 canvas and puts role chips in the
 * side gutters. Anchors are in the same local coordinates.
 */
export type SceneDef = {
  anchors: Record<string, [number, number]>;
  Art: (props: { reduce: boolean }) => ReactNode;
};

export type SceneId =
  | "warehouse"
  | "p2p"
  | "o2c"
  | "abap"
  | "basis"
  | "powerbi"
  | "lowcode"
  | "cicd";

export type SceneRole = { title: string; station: string };

/** Shared palette (42X brand guide). */
export const C = {
  blue: "#00B4FF",
  purple: "#7B3DFF",
  cyan: "#00E5FF",
  indigo: "#0B1F44",
  lavender: "#C8B8FF",
  ink: "#060a16",
  line: "rgba(255,255,255,.22)",
  faint: "rgba(255,255,255,.12)",
} as const;
