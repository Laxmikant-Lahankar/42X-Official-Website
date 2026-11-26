import { EYEBROW, standardFaqs, type CourseLanding } from "./types";

export const SAP_BASIS_LANDING: CourseLanding = {
  seoDescription:
    "SAP BASIS course online or in Pune: system landscape, users and roles, transports, background jobs, HANA, monitoring, patching and security. ~12.5 weeks.",
  eyebrow: EYEBROW,
  headlineAccent: "Keep SAP running. Always.",
  lede: "Administer SAP landscapes end to end: users and roles, transports, jobs, HANA, monitoring, patching and security.",
  totalWeeks: "~12.5",
  reading: ["what-is-sap-basis", "which-sap-module-to-choose", "learn-sap-online"],
  scene: "basis",
  roles: [
    { title: "SAP Security & Authorizations Analyst", station: "security" },
    { title: "SAP BASIS Administrator", station: "dev" },
    { title: "Transport & Release Coordinator", station: "transport" },
    { title: "SAP Operations & Monitoring Analyst", station: "monitor" },
    { title: "SAP Technical Administrator", station: "prd" },
    { title: "SAP HANA Database Administrator", station: "hana" },
  ],
  capstoneTitle: ["Three incidents.", "One health check."],
  capstoneLine:
    "Diagnose three injected system issues, track them in Jira and brief stakeholders like an on-call admin.",
  incident: {
    label: "Capstone · System health check",
    steps: [
      { tone: "alert", text: "Alert · Short dumps spiking in PRD" },
      { tone: "work", text: "Investigating · ST22 & SM21 logs" },
      { tone: "work", text: "Root cause · Failed background job chain" },
      { tone: "ok", text: "Resolved · Jobs rescheduled, incident report filed" },
    ],
  },
  faqs: standardFaqs({
    name: "SAP BASIS",
    weeks: "~12.5",
    modules: 9,
    prerequisite:
      "No SAP experience needed. Comfort with operating systems and networking basics helps; we start from SAP architecture and the system landscape, with 1-on-1 mentorship throughout.",
  }),
};
