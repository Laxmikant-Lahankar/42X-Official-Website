import { EYEBROW, standardFaqs, type CourseLanding } from "./types";

export const SAP_SD_LANDING: CourseLanding = {
  seoDescription:
    "SAP SD course online or in Pune: order-to-cash in S/4HANA, sales orders, pricing, ATP, credit, delivery and billing, with a live O2C capstone. ~13 weeks.",
  eyebrow: EYEBROW,
  headlineAccent: "Master order-to-cash in SAP.",
  lede: "Take an order from quotation to cash in SAP S/4HANA: pricing, availability, credit, delivery and billing, with debugging skills built in.",
  totalWeeks: "~13",
  reading: ["sap-mm-vs-sap-sd", "which-sap-module-to-choose", "learn-sap-online"],
  scene: "o2c",
  roles: [
    { title: "SAP SD Consultant", station: "so" },
    { title: "Order Management Analyst", station: "customer" },
    { title: "Logistics Execution Analyst", station: "delivery" },
    { title: "Pricing & Conditions Analyst", station: "pricing" },
    { title: "Credit Management Analyst", station: "credit" },
    { title: "Billing & Revenue Analyst", station: "billing" },
  ],
  capstoneTitle: ["Your customer.", "Your O2C go‑live."],
  capstoneLine:
    "Run order-to-cash for a simulated client, then clear an injected pricing or credit-block issue and document the fix.",
  incident: {
    label: "Capstone · Injected issue",
    steps: [
      { tone: "alert", text: "Issue · Sales order on credit block" },
      { tone: "work", text: "Investigating · Credit check & pricing log" },
      { tone: "work", text: "Root cause · Wrong condition record" },
      { tone: "ok", text: "Resolved · Order released, billed, demoed" },
    ],
  },
  faqs: standardFaqs({
    name: "SAP SD",
    weeks: "~13",
    modules: 12,
    prerequisite:
      "No. We start with the SD enterprise structure and the O2C flow before configuration. Graduates, sales and customer-service professionals and career-switchers all follow the same path, with 1-on-1 mentorship.",
  }),
};
