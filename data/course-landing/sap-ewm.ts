// Sales-page copy for /courses/sap-ewm.
// Curriculum facts (modules, durations, capstone, outcomes, roles) come from
// data/courses.ts and public/syllabus/sap_ewm.pdf — this file only adds the
// selling layer around them.
//
// RULES (from the repo + brand guide): no invented prices, seat counts, batch
// dates, placement numbers or testimonials. Every claim here must be true today.

export type LandingFlowStep = {
  code: string; // short label shown on the animated warehouse flow
  label: string;
  module: number; // syllabus module that teaches it
};

export type LandingJourneyStep = {
  modules: string;
  title: string;
  body: string;
};

export type LandingFaq = { question: string; answer: string };

export type CourseLanding = {
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  lede: string;
  totalWeeks: string;
  flow: LandingFlowStep[];
  rfLog: string[];
  marquee: string[];
  whyNow: { title: string; body: string }[];
  journey: LandingJourneyStep[];
  capstoneSteps: { title: string; body: string }[];
  audiences: { title: string; body: string }[];
  mentor: { title: string; body: string } | null;
  faqs: LandingFaq[];
};

export const SAP_EWM_LANDING: CourseLanding = {
  eyebrow: "SAP Supply Chain · Online worldwide · Classroom in Pune",
  headline: "SAP EWM Training",
  headlineAccent: "Run a real warehouse in SAP.",
  lede: "Follow every pallet from goods receipt to goods issue. Configure the warehouse, connect it to ERP, run RF and waves, and debug the issues consultants actually get paid to fix. Join live online from anywhere, or in class at our Pune centre.",
  // Syllabus PDF states "~14 weeks" (11 modules ≈ 12 weeks + capstone).
  totalWeeks: "~14",

  flow: [
    { code: "GR", label: "Goods receipt", module: 4 },
    { code: "PUT", label: "Putaway", module: 4 },
    { code: "BIN", label: "Storage bin", module: 2 },
    { code: "PICK", label: "Picking & waves", module: 5 },
    { code: "PACK", label: "Pack & stage", module: 5 },
    { code: "GI", label: "Goods issue", module: 5 },
  ],

  // Illustrative RF/monitor lines for the hero animation (not real data).
  rfLog: [
    "Inbound delivery received · HU created",
    "Putaway WT confirmed via RF",
    "Wave released · 3 pick WTs",
    "Packed & staged at door",
    "Goods issue posted · ERP updated",
  ],

  marquee: [
    "Warehouse structure",
    "Storage types & bins",
    "Product master",
    "CIF",
    "IDocs",
    "Delivery integration",
    "HU management",
    "Putaway strategies",
    "Picking",
    "Wave management",
    "Packing & staging",
    "RF framework",
    "Warehouse monitor",
    "Physical inventory",
    "Replenishment",
    "Yard management",
    "Slotting",
    "Cross-docking",
    "Kitting",
    "QM in EWM",
    "PP-EWM integration",
    "ABAP debugging",
  ],

  whyNow: [
    {
      title: "WM is giving way to EWM",
      body: "In S/4HANA, SAP's direction for warehousing is Extended Warehouse Management. Companies moving off classic WM need people who know both. Module 1 starts with exactly that comparison.",
    },
    {
      title: "Process + system, together",
      body: "EWM sits where logistics meets IT. If you understand how a warehouse really moves and can make SAP do it, you're useful on day one of a project.",
    },
    {
      title: "Functional skills with a technical edge",
      body: "This course doesn't stop at putaway and picking. You'll also debug warehouse tasks and IDocs in ABAP and understand the BASIS landscape, so you can investigate issues, not just log tickets.",
    },
  ],

  journey: [
    {
      modules: "Modules 1–2",
      title: "Build the warehouse",
      body: "EWM functionality and deployment options, then the warehouse number, storage types, sections, bins, activity areas, work centres and product master.",
    },
    {
      modules: "Module 3",
      title: "Connect it to ERP",
      body: "CIF, delivery integration and IDocs: how S/4HANA and EWM talk, and where it breaks.",
    },
    {
      modules: "Module 4",
      title: "Receive and put away",
      body: "Goods receipt, putaway and handling-unit management, the inbound flow you'll configure and run end to end.",
    },
    {
      modules: "Module 5",
      title: "Pick, pack and ship",
      body: "Picking, packing, staging, goods issue and wave management for the outbound side of the warehouse.",
    },
    {
      modules: "Modules 6–7",
      title: "Monitor, RF and inventory",
      body: "Warehouse monitor, RF menus, queues and resources, then physical inventory and replenishment strategies.",
    },
    {
      modules: "Modules 8–9",
      title: "Go advanced",
      body: "Yard management, slotting, cross-docking and kitting, plus quality inspection and production supply with PP-EWM.",
    },
    {
      modules: "Modules 10–11",
      title: "Think like a consultant",
      body: "ABAP debugging for EWM (trace warehouse-task creation, analyse IDoc issues) and BASIS awareness: landscapes, transports and roles.",
    },
  ],

  capstoneSteps: [
    {
      title: "Simulate warehouse operations",
      body: "Run a full inbound-to-outbound flow, end to end.",
    },
    {
      title: "Work in Jira sprints",
      body: "Plan and deliver the way real SAP project teams do.",
    },
    {
      title: "Resolve an injected exception",
      body: "Something breaks on purpose. You investigate and fix it.",
    },
    {
      title: "Demo to stakeholders",
      body: "Present your warehouse flow like a consultant at sign-off.",
    },
  ],

  audiences: [
    {
      title: "Graduates & career starters",
      body: "Commerce, engineering, supply-chain or science graduates who want a focused SAP career path. No prior SAP experience needed.",
    },
    {
      title: "Warehouse & logistics professionals",
      body: "You already know how a warehouse runs. Learn the system that runs it and move into SAP roles.",
    },
    {
      title: "SAP consultants upskilling",
      body: "MM, SD or classic WM consultants adding EWM for S/4HANA projects.",
    },
  ],

  // TODO(42X): confirm mentor wording before go-live. Keep it factual.
  mentor: {
    title: "Taught by a working SAP EWM practitioner",
    body: "Your EWM mentor works hands-on as an SAP EWM functional analyst in a European distribution centre, so every module is grounded in how warehouses actually run today, not just how the textbook says they should.",
  },

  faqs: [
    {
      question: "Do I need SAP experience to join the SAP EWM course?",
      answer:
        "No. We start from EWM fundamentals and the warehouse structure before moving into processes. Graduates, logistics professionals and existing SAP consultants all follow the same path, with 1-on-1 mentorship when you get stuck.",
    },
    {
      question: "How long is the course and how much time does it take each week?",
      answer:
        "The programme runs for about 14 weeks across 11 modules plus a capstone project. Plan for 8–12 hours a week; it's structured so working professionals can complete it alongside a job.",
    },
    {
      question: "Can I take SAP EWM training online from outside India?",
      answer:
        "Yes. Live online classes are open to students anywhere in the world. Tell us your time zone when you enquire and we'll share batch timings that suit you.",
    },
    {
      question: "Where are the classroom batches in Pune?",
      answer:
        "At our centre: Office No. 15, 2nd Floor, Bhosale Shinde Arcade, opp. Lenskart, J.M. Road, Pune 411004. Classroom and online students follow the same syllabus and capstone.",
    },
    {
      question: "Will I get a certificate?",
      answer:
        "Yes, you receive a 42X Academy completion certificate. The bigger hiring signal is your capstone: an end-to-end warehouse simulation you can walk an interviewer through.",
    },
    {
      question: "What are the fees and when does the next batch start?",
      answer:
        "Fees depend on the mode (online or classroom) and batch. Share your details through the enquiry form or WhatsApp us at +91 84848 34242 and we'll send current fees and upcoming batch dates.",
    },
  ],
};
