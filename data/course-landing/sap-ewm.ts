import { EYEBROW, standardFaqs, type CourseLanding } from "./types";

export const SAP_EWM_LANDING: CourseLanding = {
  seoDescription:
    "SAP EWM training online or in Pune: inbound, outbound, RF, waves, yard and ERP integration, with a warehouse capstone and 1-on-1 mentorship. ~14 weeks.",
  eyebrow: EYEBROW,
  headlineAccent: "Run the warehouse. Own the system.",
  lede: "Configure, run and debug SAP Extended Warehouse Management, from goods receipt to goods issue.",
  totalWeeks: "~14",
  scene: "warehouse",
  roles: [
    { title: "SAP EWM Consultant", station: "racks" },
    { title: "Warehouse Functional Consultant", station: "dock" },
    { title: "Supply Chain Systems Analyst", station: "conveyor" },
    { title: "S/4HANA Integration Specialist", station: "erp" },
    { title: "EWM Support Analyst", station: "monitor" },
    { title: "RF & Mobility Analyst", station: "scanner" },
  ],
  capstoneTitle: ["Your warehouse.", "Your go‑live."],
  capstoneLine:
    "We break your warehouse on purpose. You find the fault, fix it and demo the result.",
  incident: {
    label: "Capstone · Injected exception",
    steps: [
      { tone: "alert", text: "Exception · Warehouse task stuck in queue" },
      { tone: "work", text: "Investigating · Debugger on WT creation" },
      { tone: "work", text: "Root cause · Storage type search sequence" },
      { tone: "ok", text: "Resolved · Flow restored, stakeholders updated" },
    ],
  },
  faqs: standardFaqs({
    name: "SAP EWM",
    weeks: "~14",
    modules: 11,
    prerequisite:
      "No. We start from EWM fundamentals and the warehouse structure. Graduates, logistics professionals and SAP consultants all follow the same path, with 1-on-1 mentorship.",
  }),
};
