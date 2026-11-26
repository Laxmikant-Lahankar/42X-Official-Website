// Shared shape for course sales pages (/courses/<slug>).
//
// RULES (repo + brand guide): no invented prices, seat counts, batch dates,
// placement numbers or testimonials. Every claim must be true today.
// Curriculum facts come from data/courses.ts and public/syllabus/*.pdf.

import type { SceneId, SceneRole } from "@/components/courses/landing/scenes/types";

export type LandingFaq = { question: string; answer: string };

export type IncidentStep = { tone: "alert" | "work" | "ok"; text: string };

export type CourseLanding = {
  /** Meta description (≤ ~160 chars): primary keywords + online & Pune. */
  seoDescription: string;
  eyebrow: string;
  headlineAccent: string;
  lede: string;
  /** As stated in the syllabus PDF, e.g. "~15". */
  totalWeeks: string;
  /** Fact-strip override when a course has several projects instead of one capstone. */
  projects?: { count: string; label: string };
  scene: SceneId;
  /** Blog post slugs shown as "Guides for this course" (internal links). */
  reading?: string[];
  /** IT roles around the illustration (max 6; order = left col, right col). */
  roles: SceneRole[];
  capstoneTitle: [string, string];
  capstoneLine: string;
  incident: { label: string; steps: IncidentStep[] };
  faqs: LandingFaq[];
};

export const EYEBROW = "Online worldwide · Classroom in Pune";

/** The four FAQs every course page answers (keyword-rich for search). */
export function standardFaqs({
  name,
  weeks,
  modules,
  prerequisite,
}: {
  name: string;
  weeks: string;
  modules: number;
  prerequisite: string;
}): LandingFaq[] {
  const w = weeks.replace("~", "");
  return [
    {
      question: `Do I need SAP experience to join the ${name} course?`,
      answer: prerequisite,
    },
    {
      question: `How long is the ${name} course and how much time does it take?`,
      answer: `About ${w} weeks: ${modules} modules plus a capstone project. Plan for 8–12 hours a week, so you can study alongside a job.`,
    },
    {
      question: `Can I take ${name} training online from outside India, or in class in Pune?`,
      answer:
        "Both. Live online classes are open to students anywhere; classroom batches run at our centre on J.M. Road, Pune. Same syllabus, mentors and capstone either way.",
    },
    {
      question: `What are the ${name} course fees and when does the next batch start?`,
      answer:
        "Fees depend on mode and batch. Book a free session or WhatsApp +91 84848 34242 and we'll share current fees and dates.",
    },
  ];
}
