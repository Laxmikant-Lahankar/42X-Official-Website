import { EYEBROW, standardFaqs, type CourseLanding } from "./types";

export const SAP_ABAP_LANDING: CourseLanding = {
  seoDescription:
    "SAP ABAP course online or in Pune: reports, ALV, OO ABAP, BAdIs, BAPIs, OData and Fiori, debugging and performance tuning. ~13.5 weeks.",
  eyebrow: EYEBROW,
  headlineAccent: "Write the code that runs SAP.",
  lede: "Build reports, enhancements, OO ABAP, BAPIs and Fiori/OData services, then debug and tune them like a professional developer.",
  totalWeeks: "~13.5",
  scene: "abap",
  roles: [
    { title: "SAP ABAP Developer", station: "editor" },
    { title: "SAP Technical Consultant", station: "debugger" },
    { title: "SAP Data Migration Developer", station: "migration" },
    { title: "ABAP on HANA Developer", station: "hana" },
    { title: "SAP Fiori / UI5 Developer", station: "fiori" },
    { title: "SAP Integration Developer", station: "api" },
  ],
  capstoneTitle: ["Your requirement.", "Your release."],
  capstoneLine:
    "Build and debug a custom report and BAdI for a client requirement, then walk the team through your code.",
  incident: {
    label: "Capstone · Defect log",
    steps: [
      { tone: "alert", text: "Defect · Report times out in QA" },
      { tone: "work", text: "Investigating · SQL trace (ST05)" },
      { tone: "work", text: "Root cause · SELECT inside a loop" },
      { tone: "ok", text: "Fixed · Query optimised, code reviewed" },
    ],
  },
  faqs: standardFaqs({
    name: "SAP ABAP",
    weeks: "~13.5",
    modules: 9,
    prerequisite:
      "No SAP experience needed. Any programming background helps, but we start from ABAP fundamentals: data types, internal tables and the Data Dictionary, with 1-on-1 mentorship throughout.",
  }),
};
