import { EYEBROW, type CourseLanding } from "./types";

// Facts: data/courses.ts (no designed PDF; ~12 weeks = sum of module durations).
export const POWER_PLATFORM_LANDING: CourseLanding = {
  seoDescription:
    "Power Platform course online or in Pune: Power Apps, Power Automate, Dataverse, Power BI and Copilot Studio, with a hands-on business solution capstone.",
  eyebrow: EYEBROW,
  headlineAccent: "Build apps and automate work, without heavy code.",
  lede: "Power Apps, Power Automate, Dataverse, Power BI and Copilot Studio in one path, ending in a complete business solution you can demo.",
  totalWeeks: "~12",
  scene: "lowcode",
  roles: [
    { title: "Power Apps Developer", station: "app" },
    { title: "Power Platform Developer", station: "flow" },
    { title: "Business Process Automation Analyst", station: "flow" },
    { title: "Copilot Studio Bot Developer", station: "bot" },
    { title: "Low-code Consultant", station: "data" },
    { title: "Dataverse Data Modeler", station: "data" },
  ],
  capstoneTitle: ["Your business app.", "Your stakeholder demo."],
  capstoneLine:
    "A Dataverse-backed app, an approval automation and a Power BI dashboard, built in Jira sprints and demoed like a real delivery.",
  incident: {
    label: "Capstone · Solution issue",
    steps: [
      { tone: "alert", text: "Issue · Approval flow stuck running" },
      { tone: "work", text: "Investigating · Flow run history" },
      { tone: "work", text: "Root cause · Missing Dataverse security role" },
      { tone: "ok", text: "Resolved · Role fixed, solution demoed" },
    ],
  },
  faqs: [
    {
      question: "Do I need coding experience for the Power Platform course?",
      answer:
        "No. Power Platform is low-code: you build apps and automations visually and learn Power Fx formulas as you go. We start from platform fundamentals, with 1-on-1 mentorship throughout.",
    },
    {
      question: "How long is the Power Platform course?",
      answer:
        "About 12 weeks across 9 modules (apps, automation, Dataverse, Power BI, Copilot Studio and governance) plus a capstone. Plan for 8–12 hours a week.",
    },
    {
      question: "Does the course help with the PL-900 exam?",
      answer:
        "The course covers the platform areas PL-900 introduces and suits learners preparing for it. The certification exam itself is run and booked separately through Microsoft.",
    },
    {
      question: "Can I take the Power Platform course online, or in class in Pune?",
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
