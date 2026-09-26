export type SapModule = {
  name: string;
  focus: string;
  duration: string;
};

export type SapTrack = {
  id: string;
  code: string;
  name: string;
  focus: string;
  duration: string;
  structure: string;
  audience: string;
  gains: string[];
  modules: SapModule[];
  skills: string[];
  capstone: string;
  outcomes: string[];
  roles: string[];
  differentiator: string;
};

export const SCHEDULE =
  "Live remote classes, 3 evenings a week plus 1 weekend session, 2–3 hours each. Durations are estimates and can shift with trainer bandwidth and the batch.";

export const PROFESSIONAL_SKILLS = [
  {
    title: "Jira & Agile",
    body: "Agile and Scrum fundamentals, Jira projects and issue types, backlog grooming, sprint planning, and Scrum or Kanban boards.",
  },
  {
    title: "Professional communication",
    body: "Email and Slack or Teams tone, response-time norms, escalation, client-facing updates, and expectation management.",
  },
  {
    title: "Problem solving",
    body: "5 Whys, fishbone diagrams, issue trees, hypothesis-driven thinking, case simulations, and written recommendations.",
  },
  {
    title: "Meeting facilitation",
    body: "Agendas, stand-ups, sprint reviews, retrospectives, discussion control, minutes, and action items.",
  },
];

export const SAP_TRACKS: SapTrack[] = [
  {
    id: "mm",
    code: "SAP MM",
    name: "Materials Management",
    focus: "Procure-to-Pay (P2P) functional program",
    duration: "~15 weeks",
    structure: "Functional, with embedded ABAP and BASIS awareness, plus a capstone",
    audience:
      "Learners aiming at SAP MM, procurement, and materials-management consulting.",
    gains: [
      "SAP ERP and S/4HANA navigation, and how organizational structures fit together.",
      "Master data, procurement, inventory, invoice verification, valuation, and MRP.",
      "How MM connects to FI/CO, SD, PP, QM, and EWM/WM.",
      "Embedded ABAP debugging and BASIS awareness.",
    ],
    modules: [
      {
        name: "SAP & ERP Fundamentals",
        focus:
          "SAP GUI, S/4HANA, company code, plant, storage location, purchasing organization",
        duration: "1 week",
      },
      {
        name: "Master Data",
        focus:
          "Material Master, Business Partner and Vendor, Info Records, Source Lists",
        duration: "1.5 weeks",
      },
      {
        name: "Procurement (P2P)",
        focus:
          "Purchase requisitions, RFQ, quotation comparison, purchase orders, contracts, scheduling agreements",
        duration: "2 weeks",
      },
      {
        name: "Inventory Management",
        focus:
          "Goods receipt, goods issue, stock transfers, movement types, physical inventory",
        duration: "1.5 weeks",
      },
      {
        name: "Invoice Verification",
        focus: "MIRO, GR/IR, evaluated receipt settlement",
        duration: "1 week",
      },
      {
        name: "Valuation & Account Determination",
        focus: "How stock value and account determination work in MM",
        duration: "1 week",
      },
      {
        name: "MRP",
        focus: "Planning runs, reorder point, lot sizing",
        duration: "1 week",
      },
      {
        name: "Special Procurement",
        focus: "Subcontracting, consignment, stock transport orders, third-party",
        duration: "1 week",
      },
      {
        name: "Pricing, Conditions & GST",
        focus: "Condition technique and GST in procurement",
        duration: "1 week",
      },
      {
        name: "Integration",
        focus: "FI/CO, SD, PP, QM, and EWM/WM touchpoints",
        duration: "1 week",
      },
      {
        name: "Reporting & Fiori Apps",
        focus: "Operational reports and the Fiori apps consultants actually open",
        duration: "0.5 week",
      },
      {
        name: "ABAP Debugging for MM Consultants",
        focus: "Read a dump and trace a functional issue into the code",
        duration: "1 week",
      },
      {
        name: "BASIS Awareness",
        focus: "What the system landscape means when a process fails",
        duration: "0.5 week",
      },
    ],
    skills: [
      "Run a procure-to-pay cycle",
      "Move and count stock",
      "Read MRP and valuation",
      "Investigate a functional issue",
      "Write client-style documentation",
    ],
    capstone:
      "A live client simulation of a full P2P cycle, run in Jira sprints, with stakeholder sign-off and a root-cause write-up for an injected data issue.",
    outcomes: [
      "Navigate the core MM processes.",
      "Work through procurement and inventory scenarios.",
      "Explain where MM meets the rest of SAP.",
      "Investigate common functional issues.",
      "Present and document a solution.",
    ],
    roles: [
      "SAP MM Consultant",
      "SAP Functional Consultant",
      "Procurement and materials SAP roles",
    ],
    differentiator:
      "Functional training includes embedded ABAP debugging and BASIS awareness, so it does not stop at configuration.",
  },
  {
    id: "sd",
    code: "SAP SD",
    name: "Sales & Distribution",
    focus: "Order-to-Cash (O2C) functional program",
    duration: "~13 weeks",
    structure: "Functional, with embedded ABAP and BASIS awareness, plus a capstone",
    audience:
      "Learners aiming at SAP SD and sales or order-management consulting.",
    gains: [
      "Enterprise structure and master data.",
      "The full order-to-cash path.",
      "Pricing, ATP, credit management, delivery, billing, and returns.",
      "Integration with MM, FI/CO, and PP.",
      "Embedded debugging and BASIS awareness.",
    ],
    modules: [
      {
        name: "SD Basics & Enterprise Structure",
        focus: "How sales organizations, channels, and divisions are set up",
        duration: "1 week",
      },
      {
        name: "Master Data",
        focus:
          "Customer and Business Partner, material sales views, pricing and output",
        duration: "1.5 weeks",
      },
      {
        name: "Sales Document Processing",
        focus: "Inquiry, quotation, sales order, and item categories",
        duration: "1.5 weeks",
      },
      {
        name: "Pricing & Condition Technique",
        focus: "How prices, discounts, and conditions are determined",
        duration: "1 week",
      },
      {
        name: "ATP & Credit Management",
        focus: "Availability checks and credit blocks",
        duration: "1 week",
      },
      {
        name: "Shipping & Delivery",
        focus: "Delivery creation, picking, and goods issue",
        duration: "1 week",
      },
      {
        name: "Billing",
        focus: "Invoices, memos, cash sales, and cancellations",
        duration: "1 week",
      },
      {
        name: "Returns & Complaints",
        focus: "Returns processing and complaint documents",
        duration: "0.5 week",
      },
      {
        name: "Special Order Types",
        focus: "Order types outside the standard sales order",
        duration: "1 week",
      },
      {
        name: "Integration",
        focus: "SD with MM, FI-CO, and PP",
        duration: "0.5 week",
      },
      {
        name: "ABAP Debugging",
        focus: "Trace pricing and output issues into the code",
        duration: "1 week",
      },
      {
        name: "BASIS Awareness",
        focus: "What the landscape means when an order process fails",
        duration: "0.5 week",
      },
    ],
    skills: [
      "Run an order-to-cash process",
      "Read pricing and conditions",
      "Handle delivery, billing, and returns",
      "Investigate pricing and output issues",
      "Demo the process and document it",
    ],
    capstone:
      "A live order-to-cash simulation with Jira sprints, a client demo, and a documented fix for an injected pricing or credit-block issue.",
    outcomes: [
      "Execute the order-to-cash lifecycle.",
      "Work with sales master data.",
      "Explain SD integration points.",
      "Approach functional issues systematically.",
      "Demonstrate an end-to-end process.",
    ],
    roles: [
      "SAP SD Consultant",
      "SAP Functional Consultant",
      "Sales and order-management SAP roles",
    ],
    differentiator:
      "SD process knowledge is paired with embedded debugging and BASIS awareness.",
  },
  {
    id: "ewm",
    code: "SAP EWM",
    name: "Extended Warehouse Management",
    focus: "Warehouse program covering Basic and Advanced EWM",
    duration: "~14 weeks",
    structure: "Basic and Advanced, with embedded debugging, plus a capstone",
    audience: "Learners interested in warehouse operations and EWM consulting.",
    gains: [
      "EWM architecture and how it is deployed.",
      "Warehouse structures and master data.",
      "Inbound and outbound operations.",
      "Monitoring, RF, and exception handling.",
      "Yard, slotting, cross-docking, kitting, and production integration.",
    ],
    modules: [
      {
        name: "Introduction to EWM",
        focus: "Functionality, deployment options, and how it differs from classic WM",
        duration: "1 week",
      },
      {
        name: "EWM Structure & Master Data",
        focus: "Warehouse numbers, storage types, bins, and master data",
        duration: "1.5 weeks",
      },
      {
        name: "ERP–EWM Integration",
        focus: "CIF, delivery integration, and IDocs",
        duration: "1 week",
      },
      {
        name: "Inbound Processing",
        focus: "Goods receipt, putaway, and handling-unit management",
        duration: "1.5 weeks",
      },
      {
        name: "Outbound Processing",
        focus: "Picking, packing, staging, goods issue, and wave management",
        duration: "1.5 weeks",
      },
      {
        name: "Warehouse Monitor & RF Framework",
        focus: "Monitor the floor and work through the RF framework",
        duration: "1 week",
      },
      {
        name: "Physical Inventory & Replenishment",
        focus: "Count stock and replenish bins",
        duration: "0.5 week",
      },
      {
        name: "Advanced Warehouse Processes",
        focus: "Yard, slotting, cross-docking, and kitting",
        duration: "1.5 weeks",
      },
      {
        name: "Advanced QM & PP-EWM Integration",
        focus: "Quality and production touchpoints inside the warehouse",
        duration: "1 week",
      },
      {
        name: "ABAP Debugging for EWM",
        focus: "Trace a warehouse exception into the code",
        duration: "1 week",
      },
      {
        name: "BASIS Awareness",
        focus: "What the landscape means when warehouse integration fails",
        duration: "0.5 week",
      },
    ],
    skills: [
      "Run inbound and outbound flows",
      "Putaway, pick, pack, and release waves",
      "Use the monitor and RF",
      "Work advanced warehouse processes",
      "Investigate exceptions",
    ],
    capstone:
      "A warehouse simulation from inbound to outbound, run in Jira sprints, with a stakeholder demo and a resolved injected exception.",
    outcomes: [
      "Explain EWM structure and processes.",
      "Execute warehouse scenarios.",
      "Understand ERP–EWM integration.",
      "Investigate exceptions.",
      "Demonstrate an end-to-end warehouse flow.",
    ],
    roles: [
      "SAP EWM Consultant",
      "SAP Warehouse Functional Consultant",
      "Warehouse and supply-chain SAP roles",
    ],
    differentiator:
      "The track goes past basic putaway and picking into advanced warehouse scenarios.",
  },
  {
    id: "abap",
    code: "SAP ABAP",
    name: "Technical / Developer",
    focus: "A dedicated SAP development program",
    duration: "~13.5 weeks",
    structure: "Technical developer track plus a capstone",
    audience: "Learners pursuing an SAP technical developer path.",
    gains: [
      "ABAP programming and the Data Dictionary.",
      "Reports, ALV, and dialog programming.",
      "Enhancements, BAdIs, and object-oriented ABAP.",
      "BAPIs, RFCs, and data-transfer techniques.",
      "Fiori and UI5, OData, debugging, and performance analysis.",
    ],
    modules: [
      {
        name: "ABAP Fundamentals",
        focus: "Data types, internal tables, and the Data Dictionary",
        duration: "2 weeks",
      },
      {
        name: "Reports Programming",
        focus: "Classical and interactive reports, and ALV",
        duration: "1.5 weeks",
      },
      {
        name: "Dialog Programming",
        focus: "Module pool, screen painter, and transactions",
        duration: "1.5 weeks",
      },
      {
        name: "Enhancements & Modifications",
        focus: "User exits and BAdIs",
        duration: "1.5 weeks",
      },
      {
        name: "Object-Oriented ABAP",
        focus: "Classes, interfaces, and OO patterns used in SAP",
        duration: "1.5 weeks",
      },
      {
        name: "Function Modules, BAPIs & RFCs",
        focus: "Reusable functions and remote calls",
        duration: "1 week",
      },
      {
        name: "Data Transfer",
        focus: "BDC, LSMW, IDocs, and BAPI loads",
        duration: "1 week",
      },
      {
        name: "Fiori, UI5 & OData Basics",
        focus: "How a Fiori app talks to the backend",
        duration: "1.5 weeks",
      },
      {
        name: "Debugging & Performance Tuning",
        focus: "Find the slow path and the broken one",
        duration: "1.5 weeks",
      },
    ],
    skills: [
      "Write and debug ABAP reports",
      "Use the Data Dictionary and internal tables",
      "Build enhancements and BAdIs",
      "Move data with integration techniques",
      "Investigate performance",
    ],
    capstone:
      "Build and debug a custom report plus a BAdI for an injected client requirement, with Jira sprints, a code walkthrough, and a test and defect log.",
    outcomes: [
      "Develop core ABAP programs.",
      "Work with enhancements and object-oriented concepts.",
      "Understand integration and data transfer.",
      "Debug performance issues.",
      "Present a development solution.",
    ],
    roles: [
      "SAP ABAP Developer",
      "SAP Technical Consultant",
      "SAP development roles",
    ],
    differentiator:
      "A dedicated technical path, deeper than the embedded debugging modules inside the functional courses.",
  },
  {
    id: "basis",
    code: "SAP BASIS",
    name: "Technical / Administration",
    focus: "SAP system administration and operations",
    duration: "~12.5 weeks",
    structure: "Technical administration track plus a capstone",
    audience:
      "Learners pursuing SAP administration, monitoring, and technical operations.",
    gains: [
      "SAP architecture and DEV, QA, and PRD landscapes.",
      "User and client administration, and the transport system.",
      "Background jobs, spool, and database concepts.",
      "Performance monitoring, dumps, and logs.",
      "Patching, security, and troubleshooting.",
    ],
    modules: [
      {
        name: "SAP Architecture & System Landscape",
        focus: "How DEV, QA, and PRD are separated and connected",
        duration: "1 week",
      },
      {
        name: "Installation & System Setup",
        focus: "What a system install and initial setup involve",
        duration: "1.5 weeks",
      },
      {
        name: "User & Client Administration",
        focus: "SU01, PFCG, and client administration",
        duration: "1.5 weeks",
      },
      {
        name: "Transport Management System",
        focus: "Move changes across the landscape",
        duration: "1 week",
      },
      {
        name: "Background Jobs & Monitoring",
        focus: "SM36 and SM37, and how jobs fail",
        duration: "1 week",
      },
      {
        name: "Database Administration",
        focus: "HANA, and backup and recovery basics",
        duration: "1.5 weeks",
      },
      {
        name: "Performance Monitoring & Tuning",
        focus: "CCMS, ST22, and SM21",
        duration: "1.5 weeks",
      },
      {
        name: "Patches, Kernel Upgrades & Support Packages",
        focus: "How systems are patched and upgraded",
        duration: "1 week",
      },
      {
        name: "Monitoring, Troubleshooting & Security",
        focus: "Incidents, logs, and security fundamentals",
        duration: "1 week",
      },
    ],
    skills: [
      "Read architecture and landscapes",
      "Administer users, roles, and clients",
      "Manage transports and jobs",
      "Monitor and diagnose incidents",
      "Cover database, patching, and security fundamentals",
    ],
    capstone:
      "A system health-check simulation: diagnose three injected issues, track them as Jira tickets, write an incident report, and debrief stakeholders.",
    outcomes: [
      "Understand SAP technical architecture.",
      "Handle core administration scenarios.",
      "Monitor and troubleshoot issues.",
      "Document incidents.",
      "Communicate a resolution.",
    ],
    roles: [
      "SAP BASIS Administrator",
      "SAP Technical Administrator",
      "SAP system operations roles",
    ],
    differentiator:
      "The focus is practical administration, monitoring, and troubleshooting.",
  },
];
