import { EYEBROW, standardFaqs, type CourseLanding } from "./types";

export const SAP_MM_LANDING: CourseLanding = {
  seoDescription:
    "SAP MM course online or in Pune: procure-to-pay in S/4HANA, purchasing, inventory, MIRO, valuation and MRP, with a live P2P capstone. ~15 weeks.",
  eyebrow: EYEBROW,
  headlineAccent: "Master procure-to-pay in SAP.",
  lede: "Run the full P2P cycle in SAP S/4HANA: purchasing, inventory, invoice verification and MRP, with debugging skills built in.",
  totalWeeks: "~15",
  scene: "p2p",
  roles: [
    { title: "SAP MM Consultant", station: "po" },
    { title: "Procurement Systems Analyst", station: "vendor" },
    { title: "Inventory Control Analyst", station: "stock" },
    { title: "MRP & Supply Planning Analyst", station: "mrp" },
    { title: "P2P Process Analyst", station: "invoice" },
    { title: "SAP MM–FI Integration Consultant", station: "fi" },
  ],
  capstoneTitle: ["Your client.", "Your P2P go‑live."],
  capstoneLine:
    "Run a full procure-to-pay cycle for a simulated client, then trace an injected data issue to its root cause.",
  incident: {
    label: "Capstone · Injected data issue",
    steps: [
      { tone: "alert", text: "Issue · Invoice blocked: price variance" },
      { tone: "work", text: "Investigating · PO history & GR/IR" },
      { tone: "work", text: "Root cause · Wrong info record price" },
      { tone: "ok", text: "Resolved · Invoice posted, root cause documented" },
    ],
  },
  faqs: standardFaqs({
    name: "SAP MM",
    weeks: "~15",
    modules: 13,
    prerequisite:
      "No. We start with SAP navigation and organisational structures before procurement. Graduates, procurement professionals and career-switchers all follow the same path, with 1-on-1 mentorship.",
  }),
};
