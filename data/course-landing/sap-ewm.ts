// Sales-page copy for /courses/sap-ewm — kept deliberately minimal.
// Curriculum facts (modules, durations, capstone) come from data/courses.ts
// and public/syllabus/sap_ewm.pdf; this file only adds the selling layer.
//
// RULES (repo + brand guide): no invented prices, seat counts, batch dates,
// placement numbers or testimonials. Every claim here must be true today.

import type { SceneRole } from "@/components/courses/landing/WarehouseScene";

export type LandingFaq = { question: string; answer: string };

export type CourseLanding = {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  lede: string;
  totalWeeks: string;
  /** IT roles shown around the animated warehouse (max 6), each tied to the
   *  part of the warehouse it works on. */
  roles: SceneRole[];
  capstoneLine: string;
  faqs: LandingFaq[];
};

export const SAP_EWM_LANDING: CourseLanding = {
  eyebrow: "Online worldwide · Classroom in Pune",
  headline: "SAP EWM Training",
  headlineAccent: "Run the warehouse. Own the system.",
  lede: "Configure, run and debug SAP Extended Warehouse Management, from goods receipt to goods issue.",
  // Syllabus PDF states "~14 weeks" (11 modules ≈ 12 weeks + capstone).
  totalWeeks: "~14",

  // Order matters: slots go left column top→bottom, then right column.
  roles: [
    { title: "SAP EWM Consultant", station: "racks" },
    { title: "Warehouse Functional Consultant", station: "dock" },
    { title: "Supply Chain Systems Analyst", station: "conveyor" },
    { title: "S/4HANA Integration Specialist", station: "erp" },
    { title: "EWM Support Analyst", station: "monitor" },
    { title: "RF & Mobility Analyst", station: "scanner" },
  ],

  capstoneLine:
    "We break your warehouse on purpose. You find the fault, fix it and demo the result.",

  faqs: [
    {
      question: "Do I need SAP experience to join the SAP EWM course?",
      answer:
        "No. We start from EWM fundamentals and the warehouse structure. Graduates, logistics professionals and SAP consultants all follow the same path, with 1-on-1 mentorship.",
    },
    {
      question: "How long is the course and how much time does it take?",
      answer:
        "About 14 weeks: 11 modules plus a capstone project. Plan for 8–12 hours a week, so you can study alongside a job.",
    },
    {
      question: "Can I join online from outside India, or in class in Pune?",
      answer:
        "Both. Live online classes are open to students anywhere; classroom batches run at our centre on J.M. Road, Pune. Same syllabus, mentors and capstone either way.",
    },
    {
      question: "What are the fees and when does the next batch start?",
      answer:
        "Fees depend on mode and batch. Book a free session or WhatsApp +91 84848 34242 and we'll share current fees and dates.",
    },
  ],
};
