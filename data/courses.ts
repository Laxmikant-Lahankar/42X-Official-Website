// All detail-page content lives here (source: 42X Academy course details PDF).
// slug     = the URL: /courses/<slug>
// category = the section id on /courses ("sap", "data-engineering", "power-platform"),
//            used for the "Back to courses" link.
//
// NOTE: Topics marked "// added" were NOT in the PDF (it lists only title + duration
// for those modules). They follow the standard SAP curriculum and must be confirmed
// by the academy/trainer before publishing.

export type CourseCategory = "sap" | "data-engineering" | "power-platform" | "devops";

export interface CourseModule {
  title: string;
  duration: string;
  topics: string[];
}

export interface CourseContent {
  slug: string;
  category: CourseCategory;
  title: string;
  subtitle: string;
  duration: string;
  structure: string;
  audience: string;
  highlights: string[];
  modules: CourseModule[];
  skills: string[];
  capstone: string;
  outcomes: string[];
  roles: string[];
  differentiator: string;
}

const m = (title: string, duration: string, topics: string[]): CourseModule => ({
  title,
  duration,
  topics,
});

export const COURSES: CourseContent[] = [
// temp
{
  slug: "power-platform",
  category: "power-platform",
  title: "Power Platform",
  subtitle: "Low-code business apps, automation and dashboards: Power Apps, Power Automate, Dataverse, Power BI and Copilot Studio.",
  duration: "~12 weeks",
  structure: "Fundamentals → Apps → Automation → Data & BI → Governance/ALM → Capstone",
  audience:
    "Learners targeting low-code developer, Power Platform consultant and business-automation pathways, including those preparing for PL-900.",
  highlights: [
    "Build canvas and model-driven apps with Power Apps",
    "Automate business processes with cloud flows and desktop flows (RPA)",
    "Design data models and security in Dataverse",
    "Build dashboards with Power BI",
    "Create chatbots with Copilot Studio and portals with Power Pages",
    "Solutions, environments and governance basics",
  ],
  modules: [
    m("Power Platform Fundamentals", "1 week", [
      "Platform overview and components",
      "Environments and licensing basics",
      "Microsoft 365 and Dynamics 365 integration",
    ]),
    m("Dataverse & Data Modeling", "1.5 weeks", [
      "Tables, columns and relationships",
      "Choice columns and calculated columns",
      "Business rules",
      "Security roles and access",
    ]),
    m("Power Apps: Canvas Apps", "2 weeks", [
      "Screens, controls and galleries",
      "Power Fx formulas",
      "Connectors and data sources",
      "Forms, validation and UX",
    ]),
    m("Power Apps: Model-Driven Apps", "1 week", [
      "Forms, views and dashboards",
      "Site map and app design",
      "Business process flows",
    ]),
    m("Power Automate: Cloud Flows", "2 weeks", [
      "Triggers and actions",
      "Conditions, loops and expressions",
      "Approvals",
      "Error handling and run history",
    ]),
    m("Power Automate: Desktop Flows (RPA)", "1 week", [
      "Desktop flow basics",
      "UI automation",
      "Attended vs unattended overview",
    ]),
    m("Power BI for Platform Users", "1.5 weeks", [
      "Data modeling",
      "DAX measures",
      "Report and dashboard building",
      "Embedding in Power Apps",
    ]),
    m("Copilot Studio & Power Pages", "1 week", [
      "Building a chatbot with topics",
      "Connecting bots to flows",
      "Power Pages site basics",
    ]),
    m("Solutions, ALM & Governance", "1 week", [
      "Solutions and environments",
      "Managed vs unmanaged solutions",
      "Data loss prevention (DLP) policies",
      "Deployment basics",
    ]),
  ],
  skills: [
    "Power Apps (canvas and model-driven)",
    "Power Fx",
    "Power Automate cloud and desktop flows",
    "Dataverse modeling and security",
    "Power BI",
    "Copilot Studio basics",
    "Solution management",
  ],
  capstone:
    "Build a business solution end to end: a Dataverse-backed app, an approval automation and a Power BI dashboard, delivered through Jira sprints with a stakeholder demo and documentation.",
  outcomes: [
    "Build and explain canvas and model-driven apps",
    "Automate processes with cloud and desktop flows",
    "Model data and apply security in Dataverse",
    "Publish dashboards with Power BI",
    "Package and move solutions across environments",
    "Present a working solution to stakeholders",
  ],
  roles: [
    "Power Platform Developer",
    "Power Apps / Power Automate Developer",
    "Low-code Consultant",
    "Business Process Automation roles",
  ],
  differentiator:
    "Covers the full platform in one path (apps, automation, data, BI and bots) with a solution-based capstone rather than isolated tool demos.",
},
  {
    slug: "sap-mm",
    category: "sap",
    title: "SAP MM",
    subtitle: "Materials Management: a Procure-to-Pay (P2P) focused functional SAP program.",
    duration: "~15 weeks",
    structure: "Functional + embedded ABAP/BASIS awareness + capstone",
    audience:
      "Learners targeting SAP MM, procurement and materials-management functional consulting pathways.",
    highlights: [
      "SAP ERP/S/4HANA navigation and organizational structures",
      "Master data, procurement, inventory, invoice verification, valuation and MRP",
      "Integration with FI/CO, SD, PP, QM and EWM/WM",
      "Embedded ABAP debugging and BASIS awareness",
    ],
    modules: [
      m("SAP & ERP Fundamentals", "1 week", [
        "SAP GUI",
        "S/4HANA",
        "Company code",
        "Plant",
        "Storage location",
        "Purchasing organization",
      ]),
      m("Master Data", "1.5 weeks", [
        "Material Master",
        "Business Partner/Vendor",
        "Info Records",
        "Source Lists",
      ]),
      m("Procurement (P2P)", "2 weeks", [
        "PR",
        "RFQ",
        "Quotation comparison",
        "PO",
        "Contracts",
        "Scheduling agreements",
      ]),
      m("Inventory Management", "1.5 weeks", [
        "GR",
        "GI",
        "Stock transfers",
        "Movement types",
        "Physical inventory",
      ]),
      m("Invoice Verification", "1 week", ["MIRO", "GR/IR", "ERS"]),
      m("Valuation & Account Determination", "1 week", [
        // added
        "Valuation area and valuation class",
        "Standard vs moving average price",
        "Automatic account determination",
        "Material ledger basics",
      ]),
      m("MRP", "1 week", ["Planning runs", "Reorder point", "Lot sizing"]),
      m("Special Procurement", "1 week", [
        "Subcontracting",
        "Consignment",
        "STO",
        "Third-party",
      ]),
      m("Pricing, Conditions & GST", "1 week", [
        // added
        "Condition technique",
        "Pricing procedure and condition types",
        "GST condition types (CGST, SGST, IGST)",
        "Tax codes",
      ]),
      m("Integration", "1 week", ["FI/CO", "SD", "PP", "QM", "EWM/WM"]),
      m("Reporting & Fiori Apps", "0.5 week", [
        // added
        "Standard MM reports",
        "Stock and PO monitoring",
        "Fiori launchpad",
        "Key MM Fiori apps",
      ]),
      m("ABAP Debugging for MM Consultants", "1 week", [
        // added
        "Debugger basics and breakpoints",
        "Reading standard program flow",
        "Tracing pricing and posting issues",
        "Identifying enhancement points",
      ]),
      m("BASIS Awareness", "0.5 week", [
        // added
        "DEV/QA/PRD landscape",
        "Transport requests",
        "Roles and authorizations overview",
        "Background jobs overview",
      ]),
    ],
    skills: [
      "P2P execution",
      "Inventory and stock movement",
      "MRP and valuation awareness",
      "Functional issue investigation",
      "Client-style documentation",
    ],
    capstone:
      "Live client simulation of a full P2P cycle, Jira sprints, stakeholder sign-off and root-cause write-up for an injected data issue.",
    outcomes: [
      "Navigate core MM processes",
      "Understand procurement and inventory scenarios",
      "Explain integration points",
      "Investigate common functional issues",
      "Present and document a solution",
    ],
    roles: [
      "SAP MM Consultant",
      "SAP Functional Consultant",
      "Procurement / Materials SAP roles",
    ],
    differentiator:
      "Functional training is strengthened with embedded ABAP debugging and BASIS awareness rather than stopping at configuration alone.",
  },
  {
    slug: "sap-sd",
    category: "sap",
    title: "SAP SD",
    subtitle: "Sales & Distribution: an Order-to-Cash (O2C) focused functional SAP program.",
    duration: "~13 weeks",
    structure: "Functional + embedded ABAP/BASIS awareness + capstone",
    audience:
      "Learners targeting SAP SD and sales / order-management functional consulting pathways.",
    highlights: [
      "Enterprise structure and master data",
      "End-to-end order-to-cash",
      "Pricing, ATP, credit management, delivery, billing and returns",
      "Integration with MM, FI/CO and PP",
      "Embedded debugging and BASIS awareness",
    ],
    modules: [
      m("SD Basics & Enterprise Structure", "1 week", [
        // added
        "SD overview and O2C flow",
        "Sales organization, distribution channel, division",
        "Sales area",
        "Shipping point and plant assignment",
      ]),
      m("Master Data", "1.5 weeks", [
        "Customer/Business Partner",
        "Material sales views",
        "Pricing/output",
      ]),
      m("Sales Document Processing", "1.5 weeks", [
        "Inquiry",
        "Quotation",
        "Sales order",
        "Item categories",
      ]),
      m("Pricing & Condition Technique", "1 week", [
        // added
        "Condition types and condition tables",
        "Access sequences",
        "Pricing procedure",
        "Condition records",
      ]),
      m("ATP & Credit Management", "1 week", [
        // added
        "Availability check and checking rules",
        "Credit control area",
        "Credit checks and credit blocks",
        "Releasing blocked documents",
      ]),
      m("Shipping & Delivery", "1 week", [
        // added
        "Shipping point determination",
        "Delivery creation",
        "Picking and packing",
        "Post goods issue",
      ]),
      m("Billing", "1 week", ["Invoices", "Memos", "Cash sales", "Cancellations"]),
      m("Returns & Complaints", "0.5 week", [
        // added
        "Returns order",
        "Return delivery",
        "Credit memo request",
        "Free-of-charge processing",
      ]),
      m("Special Order Types", "1 week", [
        // added
        "Consignment processing",
        "Third-party order",
        "Intercompany sales",
        "Rush orders",
      ]),
      m("Integration", "0.5 week", ["SD/MM/FI-CO/PP"]),
      m("ABAP Debugging", "1 week", [
        // added
        "Debugger basics and breakpoints",
        "Analyzing pricing and output issues",
        "Reading standard program flow",
        "Identifying user exits",
      ]),
      m("BASIS Awareness", "0.5 week", [
        // added
        "DEV/QA/PRD landscape",
        "Transport requests",
        "Roles and authorizations overview",
        "Background jobs overview",
      ]),
    ],
    skills: [
      "O2C process execution",
      "Pricing and condition awareness",
      "Delivery, billing and returns",
      "Pricing/output issue investigation",
      "Client demo and documentation",
    ],
    capstone:
      "Live O2C simulation with Jira sprints, client demo and documented resolution for an injected pricing/credit-block issue.",
    outcomes: [
      "Execute the O2C lifecycle",
      "Work with sales master data",
      "Understand integration",
      "Approach functional issues systematically",
      "Demonstrate an end-to-end process",
    ],
    roles: [
      "SAP SD Consultant",
      "SAP Functional Consultant",
      "Sales / Order-management SAP roles",
    ],
    differentiator:
      "Combines SD functional process knowledge with embedded debugging and BASIS awareness.",
  },
  {
    slug: "sap-ewm",
    category: "sap",
    title: "SAP EWM",
    subtitle:
      "Extended Warehouse Management: a modern warehouse-management program with Basic + Advanced coverage.",
    duration: "~14 weeks",
    structure: "Basic + Advanced + embedded debugging + capstone",
    audience: "Learners interested in SAP warehouse operations and EWM consulting.",
    highlights: [
      "EWM architecture and deployment",
      "Warehouse structures and master data",
      "Inbound and outbound operations",
      "Monitoring, RF and exception handling",
      "Advanced yard, slotting, cross-docking, kitting and production integration",
    ],
    modules: [
      m("Introduction to EWM", "1 week", [
        "Functionality",
        "Deployment",
        "Classic WM comparison",
      ]),
      m("EWM Structure & Master Data", "1.5 weeks", [
        // added
        "Warehouse number",
        "Storage types, sections and bins",
        "Activity areas and work centers",
        "Product master and packaging specifications",
      ]),
      m("ERP–EWM Integration", "1 week", ["CIF", "Delivery integration", "IDocs"]),
      m("Inbound Processing", "1.5 weeks", ["GR", "Putaway", "HU management"]),
      m("Outbound Processing", "1.5 weeks", [
        "Picking",
        "Packing",
        "Staging",
        "GI",
        "Wave management",
      ]),
      m("Warehouse Monitor & RF Framework", "1 week", [
        // added
        "Warehouse monitor nodes",
        "RF menus and screens",
        "Warehouse task confirmation via RF",
        "Queues and resources",
      ]),
      m("Physical Inventory & Replenishment", "0.5 week", [
        // added
        "Physical inventory procedures",
        "Counting and difference posting",
        "Replenishment strategies",
      ]),
      m("Advanced", "1.5 weeks", ["Yard", "Slotting", "Cross-docking", "Kitting"]),
      m("Advanced QM & PP-EWM Integration", "1 week", [
        // added
        "Quality inspection in EWM",
        "Production supply and staging",
        "Production order receipt",
      ]),
      m("ABAP Debugging for EWM", "1 week", [
        // added
        "Debugger basics and breakpoints",
        "Tracing warehouse task creation",
        "Analyzing integration and IDoc issues",
      ]),
      m("BASIS Awareness", "0.5 week", [
        // added
        "DEV/QA/PRD landscape",
        "Transport requests",
        "Roles and authorizations overview",
        "Background jobs overview",
      ]),
    ],
    skills: [
      "Inbound/outbound execution",
      "Putaway, picking, packing and waves",
      "Monitoring and RF awareness",
      "Advanced warehouse processes",
      "Exception investigation",
    ],
    capstone:
      "Warehouse operations simulation from inbound to outbound, Jira sprints, stakeholder demo and resolution of an injected exception.",
    outcomes: [
      "Explain EWM structure and processes",
      "Execute warehouse scenarios",
      "Understand ERP–EWM integration",
      "Investigate exceptions",
      "Demonstrate end-to-end warehouse flow",
    ],
    roles: [
      "SAP EWM Consultant",
      "SAP Warehouse Functional Consultant",
      "Warehouse / Supply Chain SAP roles",
    ],
    differentiator:
      "Goes beyond basic putaway and picking into advanced warehouse scenarios.",
  },
  {
    slug: "sap-abap",
    category: "sap",
    title: "SAP ABAP",
    subtitle: "Technical / Developer track: a deep technical SAP development program.",
    duration: "~13.5 weeks",
    structure: "Technical / Developer + capstone",
    audience: "Learners pursuing an SAP technical developer pathway.",
    highlights: [
      "ABAP programming and Data Dictionary",
      "Reports, ALV and dialog programming",
      "Enhancements, BAdIs and OO ABAP",
      "BAPIs/RFCs and data-transfer techniques",
      "Fiori/UI5, OData, debugging and performance analysis",
    ],
    modules: [
      m("ABAP Fundamentals", "2 weeks", [
        "Data types",
        "Internal tables",
        "Data Dictionary",
      ]),
      m("Reports Programming", "1.5 weeks", ["Classical/interactive reports", "ALV"]),
      m("Dialog Programming", "1.5 weeks", [
        "Module pool",
        "Screen painter",
        "Transactions",
      ]),
      m("Enhancements & Modifications", "1.5 weeks", ["Exits", "BAdIs"]),
      m("Object-Oriented ABAP", "1.5 weeks", [
        // added
        "Classes and objects",
        "Inheritance and polymorphism",
        "Interfaces",
        "Exception classes",
      ]),
      m("Function Modules, BAPIs & RFCs", "1 week", [
        // added
        "Function groups and function modules",
        "BAPI structure and usage",
        "RFC destinations",
        "Remote calls",
      ]),
      m("Data Transfer", "1 week", ["BDC", "LSMW", "IDocs", "BAPI loads"]),
      m("Fiori/UI5 & OData Basics", "1.5 weeks", [
        // added
        "Fiori architecture",
        "SAPUI5 basics",
        "OData services with SEGW",
        "Fiori launchpad",
      ]),
      m("Debugging & Performance Tuning", "1.5 weeks", [
        // added
        "ABAP debugger",
        "SQL trace (ST05)",
        "Runtime analysis (SAT)",
        "Code inspector and optimization",
      ]),
    ],
    skills: [
      "ABAP reports and debugging",
      "Data Dictionary and internal tables",
      "Enhancements/BAdIs",
      "Integration and data transfer",
      "Performance investigation",
    ],
    capstone:
      "Build and debug a custom report + BAdI for an injected client requirement, with Jira sprints, code walkthrough and test/defect log.",
    outcomes: [
      "Develop core ABAP programs",
      "Work with enhancements and OO concepts",
      "Understand integration and data transfer",
      "Debug performance issues",
      "Present a development solution",
    ],
    roles: ["SAP ABAP Developer", "SAP Technical Consultant", "SAP Development roles"],
    differentiator:
      "A dedicated technical path going deeper than embedded debugging modules in functional SAP courses.",
  },
  {
    slug: "sap-basis",
    category: "sap",
    title: "SAP BASIS",
    subtitle:
      "Technical / Administration track: an SAP system administration and operations program.",
    duration: "~12.5 weeks",
    structure: "Technical / Administration + capstone",
    audience:
      "Learners pursuing SAP administration, monitoring and technical operations pathways.",
    highlights: [
      "SAP architecture and DEV/QA/PRD landscapes",
      "User/client administration and TMS",
      "Background jobs, spool and database concepts",
      "Performance monitoring, dumps and logs",
      "Patching, security and troubleshooting",
    ],
    modules: [
      m("SAP Architecture & System Landscape", "1 week", [
        // added
        "Three-tier architecture",
        "Application server and work processes",
        "DEV/QA/PRD landscape",
        "Clients",
      ]),
      m("Installation & System Setup", "1.5 weeks", [
        // added
        "Prerequisites and sizing",
        "Installation overview",
        "Instance profiles",
        "Post-installation steps",
      ]),
      m("User & Client Administration", "1.5 weeks", ["SU01", "PFCG"]),
      m("Transport Management System", "1 week", [
        // added
        "Transport routes and layers",
        "Transport requests",
        "STMS and import queues",
        "Transport troubleshooting",
      ]),
      m("Background Jobs & Monitoring", "1 week", ["SM36", "SM37"]),
      m("Database Administration", "1.5 weeks", ["HANA", "Backup/recovery basics"]),
      m("Performance Monitoring & Tuning", "1.5 weeks", ["CCMS", "ST22", "SM21"]),
      m("Patches, Kernel Upgrades & Support Packages", "1 week", [
        // added
        "Support packages",
        "Kernel upgrade",
        "Pre- and post-update checks",
        "Update tools overview",
      ]),
      m("System Monitoring, Troubleshooting & Security", "1 week", [
        // added
        "System alerts and logs",
        "Short dump and log analysis",
        "Security audit basics",
        "Incident troubleshooting",
      ]),
    ],
    skills: [
      "Architecture and landscape",
      "User, role and client administration",
      "Transport and job management",
      "Monitoring and incident diagnosis",
      "Database, patching and security fundamentals",
    ],
    capstone:
      "System health-check simulation: diagnose three injected issues, track them as Jira tickets, prepare an incident report and conduct a stakeholder debrief.",
    outcomes: [
      "Understand SAP technical architecture",
      "Handle core administration scenarios",
      "Monitor and troubleshoot issues",
      "Document incidents",
      "Communicate resolutions",
    ],
    roles: [
      "SAP BASIS Administrator",
      "SAP Technical Administrator",
      "SAP System Operations roles",
    ],
    differentiator: "Focuses on practical administration, monitoring and troubleshooting.",
  },
  {
    slug: "data-engineering",
    category: "data-engineering",
    title: "Full Stack Data Engineering",
    subtitle: "An industry-aligned journey from foundations to production-style pipelines.",
    duration: "~19 weeks",
    structure: "Python/SQL → Spark → Cloud → Orchestration → Capstone",
    audience:
      "Learners seeking a structured path into data engineering with Python, SQL, big data, cloud and orchestration.",
    highlights: [
      "Python and advanced SQL foundations",
      "Warehousing, dimensional modeling and ETL/ELT",
      "Apache Spark/PySpark for scale",
      "Airflow orchestration and Azure Data Factory",
      "dbt transformations and Kafka streaming fundamentals",
      "Data quality, governance and security",
      "End-to-end production-style capstone",
    ],
    modules: [
      m("Python for Data Engineering", "2 weeks", [
        "Scripting",
        "Data structures",
        "APIs",
        "Files",
      ]),
      m("SQL & Relational Databases", "2 weeks", [
        "Joins",
        "CTEs",
        "Window functions",
        "Optimization",
      ]),
      m("Data Warehousing", "1.5 weeks", [
        "Dimensional modeling",
        "Star/snowflake schemas",
        "Warehouse, lake and lakehouse",
      ]),
      m("ETL/ELT Pipeline Design", "1.5 weeks", [
        "Extraction",
        "Transformation",
        "Loading",
        "Idempotency",
      ]),
      m("Apache Spark (PySpark)", "2.5 weeks", [
        "RDDs",
        "DataFrames",
        "Spark SQL",
        "Execution plans",
      ]),
      m("Apache Airflow", "1.5 weeks", [
        "DAGs",
        "Scheduling",
        "Dependencies",
        "Retries",
      ]),
      m("Cloud Data Engineering", "2.5 weeks", [
        "Azure Data Factory",
        "AWS Glue / GCP BigQuery overview",
      ]),
      m("dbt", "1 week", ["Models", "Tests", "Documentation"]),
      m("Kafka", "1.5 weeks", [
        "Producers",
        "Consumers",
        "Topics",
        "Real-time basics",
      ]),
      m("Data Quality, Governance & Security", "1 week", [
        "Validation",
        "Lineage",
        "Access control",
        "Privacy",
      ]),
    ],
    skills: [
      "Python scripting",
      "Advanced SQL",
      "Data modeling",
      "ETL/ELT design",
      "PySpark",
      "Airflow",
      "Azure Data Factory",
      "dbt",
      "Kafka",
      "Data quality and governance",
    ],
    capstone:
      "Production-style end-to-end pipeline: ingestion → transformation → warehouse → dashboard-ready output, run through two-week Jira sprints with a midpoint stakeholder review and a final demo.",
    outcomes: [
      "Build and explain end-to-end pipelines",
      "Use Python and SQL as core tools",
      "Process data at scale with Spark",
      "Orchestrate workflows with Airflow",
      "Build cloud workflows with ADF",
      "Apply transformation, quality and governance practices",
      "Deliver an industry-style capstone",
    ],
    roles: [
      "Data Engineer",
      "Junior Data Engineer",
      "Cloud Data Engineering roles",
      "ETL / Data Pipeline roles",
    ],
    differentiator:
      "Combines SQL/Python foundations with Spark, one cloud platform, orchestration and transformation tooling. Azure is the primary cloud; AWS Glue and GCP BigQuery are introduced as alternatives.",
  },
  {
    slug: "devops",
    category: "devops",
    title: "DevOps with AI",
    subtitle: "3-Month Course | 2 Hours per Day | Monday to Friday",
    duration: "~12 weeks",
    structure: "Fundamentals → Linux/Bash → AWS/CI/CD → Docker/K8s → Terraform/Ansible → Monitoring",
    audience: "Learners seeking to become DevOps Engineers or Cloud Engineers through real-world projects and AI tools.",
    highlights: [
      "Linux, Bash Scripting, and Git/GitHub fundamentals",
      "AWS cloud computing and CI/CD with Jenkins",
      "Containerization with Docker and Orchestration with Kubernetes",
      "Infrastructure as Code with Terraform and Ansible",
      "Monitoring with Prometheus and Grafana",
      "Using AI tools for generating, debugging, and explaining code in every module"
    ],
    modules: [
      m("DevOps Fundamentals + AI for DevOps", "1 week", [
        "DevOps lifecycle",
        "Waterfall vs Agile, Agile and Scrum basics",
        "Monitoring concepts",
        "Prompting for DevOps, verifying AI output"
      ]),
      m("Linux", "1.5 weeks", [
        "Installation, commands, users and groups, permissions",
        "Processes, packages, systemctl, disk partitioning",
        "SSH, networking commands, cron and at jobs, logs and log rotation",
        "Troubleshooting with AI, website deployment project on Ubuntu"
      ]),
      m("Bash Scripting", "0.5 weeks", [
        "Variables, conditions, loops, functions, arrays",
        "Case statements, file handling",
        "AI script generation and debugging, automation scripts"
      ]),
      m("Git & GitHub", "0.5 weeks", [
        "Core commands, branching, merge, rebase, stash",
        "Tags, conflicts, pull requests",
        "GitHub Actions basics, AI for commit messages and workflows"
      ]),
      m("AWS", "1.5 weeks", [
        "IAM, EC2, S3, VPC (subnets, route tables, IGW, NAT)",
        "Security groups, NACL, ALB, Auto Scaling",
        "CloudWatch, CloudTrail, RDS, Route 53, AWS CLI",
        "Security best practices"
      ]),
      m("Jenkins & CI/CD", "1 week", [
        "Installation, freestyle and pipeline jobs, Jenkinsfile",
        "Git/Maven/Docker integration, triggers, plugins",
        "Backup, security, end-to-end pipeline",
        "AI for Jenkinsfiles and build logs"
      ]),
      m("Docker", "1 week", [
        "Images and containers, Dockerfile, volumes",
        "Networking, Compose, multi-stage builds",
        "Docker Hub, security basics, best practices",
        "AI for Dockerfiles"
      ]),
      m("Kubernetes", "2 weeks", [
        "Architecture, Minikube, kubectl, Pods, Deployments",
        "Services, ConfigMaps, Secrets, PV/PVC, Ingress",
        "Rolling updates and rollbacks, StatefulSets, DaemonSets",
        "Helm, RBAC, troubleshooting with AI"
      ]),
      m("Terraform", "1 week", [
        "Installation, providers, variables, outputs",
        "State and remote backend",
        "Modules, workspaces",
        "EC2, VPC and S3 builds"
      ]),
      m("Ansible", "0.5 weeks", [
        "Inventory, ad-hoc commands, playbooks, variables",
        "Handlers, roles, Galaxy",
        "Server configuration, multi-server automation"
      ]),
      m("Monitoring", "1 week", [
        "Prometheus, Node Exporter, Alertmanager",
        "Grafana dashboards, basic alerts",
        "AI for PromQL"
      ]),
      m("Real-Time Projects", "Ongoing", [
        "Website deployment on Ubuntu",
        "CI/CD pipeline using Jenkins, Git and Docker",
        "Dockerized application deployed on Kubernetes",
        "AWS infrastructure built with Terraform and configured with Ansible"
      ])
    ],
    skills: [
      "Linux Administration",
      "Bash Scripting",
      "Git & GitHub",
      "AWS Cloud",
      "Jenkins CI/CD",
      "Docker & Kubernetes",
      "Terraform & Ansible",
      "Monitoring (Prometheus/Grafana)"
    ],
    capstone: "Four hands-on projects including website deployment, CI/CD pipelines, Kubernetes orchestration, and AWS infrastructure as code.",
    outcomes: [
      "Deploy and manage Linux servers",
      "Automate tasks with Bash and Ansible",
      "Build CI/CD pipelines with Jenkins",
      "Containerize and orchestrate apps with Docker and Kubernetes",
      "Provision cloud infrastructure with Terraform and AWS",
      "Monitor systems using Prometheus and Grafana",
      "Utilize AI tools to accelerate workflows"
    ],
    roles: [
      "DevOps Engineer",
      "Cloud Engineer",
      "Site Reliability Engineer (SRE)"
    ],
    differentiator: "Integrates AI tooling (generate, debug, explain) into every step of the DevOps lifecycle with 4 real-world projects and daily hands-on practice."
  },
  {
    // No content for this course in the PDF yet: everything below is placeholder text.
    slug: "power-platform-placeholder",
    category: "power-platform",
    title: "Power Platform",
    subtitle: "Placeholder subtitle",
    duration: "Placeholder duration",
    structure: "Placeholder structure",
    audience: "Placeholder: who this course is for.",
    highlights: Array.from({ length: 6 }, (_, i) => `Placeholder highlight ${i + 1}`),
    modules: Array.from({ length: 5 }, (_, i) =>
      m(`Placeholder module ${i + 1}`, "1 week", ["Placeholder topic one", "Placeholder topic two"]),
    ),
    skills: ["Placeholder skill one", "Placeholder skill two", "Placeholder skill three"],
    capstone: "Placeholder capstone description.",
    outcomes: ["Placeholder outcome one", "Placeholder outcome two", "Placeholder outcome three"],
    roles: ["Placeholder role one", "Placeholder role two"],
    differentiator: "Placeholder differentiator.",
  },
];

export const getCourse = (slug: string): CourseContent | undefined =>
  COURSES.find((c) => c.slug === slug);

/** Shown on every course page (source: "Embedded Professional & Project Skills"). */
export const PROFESSIONAL_SKILLS: { area: string; practice: string }[] = [
  {
    area: "Jira & Agile",
    practice:
      "Agile/Scrum fundamentals, Jira projects and issue types, backlog grooming, sprint planning, Scrum/Kanban board.",
  },
  {
    area: "Professional communication",
    practice:
      "Email and Slack/Teams tone, response-time norms, escalation, client-facing updates, expectation management.",
  },
  {
    area: "Problem solving",
    practice:
      "5 Whys, fishbone diagrams, issue trees, hypothesis-driven thinking, case simulations and documenting recommendations.",
  },
  {
    area: "Meeting facilitation",
    practice:
      "Meeting agendas, stand-ups, sprint reviews, retrospectives, discussion control, minutes and action items.",
  },
];

export const COURSE_TRACKS = [
  {
    slug: "sap",
    title: "SAP for Enterprise Careers",
    badge: "SAP",
    description:
      "Learn the SAP skills enterprises actually hire for—real modules, live processes, and project work that goes beyond a certificate.",
    image: "/sap-course.png",
    level: "Beginner to Intermediate",
    duration: "12 Weeks",
    lessons: "36 Lessons",
    access: "Lifetime Access",
  },
  {
    slug: "power-bi",
    title: "Power BI for Data Professionals",
    badge: "Power BI",
    description:
      "Build dashboards and data models used in the enterprise. Turn raw data into reports leadership can act on.",
    image: "/power_bi.png",
    level: "Beginner",
    duration: "8 Weeks",
    lessons: "24 Lessons",
    access: "Lifetime Access",
  },
  {
    slug: "power-platform",
    title: "Power Platform Mastery",
    badge: "Power Platform",
    description:
      "Create apps, automate workflows, and ship solutions on Microsoft Power Platform the way enterprise teams work.",
    image: "/power_platform.png",
    level: "Beginner to Intermediate",
    duration: "10 Weeks",
    lessons: "30 Lessons",
    access: "Lifetime Access",
  },
  // {
  //   slug: "data-engineering",
  //   title: "Data Engineering for Enterprise Careers",
  //   badge: "Data Engineering",
  //   description:
  //     "Learn the data engineering skills enterprises actually hire for—real systems, live processes, and project work that goes beyond a certificate.",
  //   image: "/courses-4.png",
  //   level: "Beginner to Intermediate",
  //   duration: "12 Weeks",
  //   lessons: "36 Lessons",
  //   access: "Lifetime Access",
  // },
  {
    slug: "devops",
    title: "DevOps with AI",
    badge: "DevOps",
    description:
      "Gain practical knowledge of Linux, Cloud Computing, CI/CD, Infrastructure as Code, and Kubernetes through real-world projects, using AI tools in every module.",
    image: "/dev_ops.png",
    level: "Beginner to Intermediate",
    duration: "12 Weeks",
    lessons: "60 Lessons",
    access: "Lifetime Access",
  },
];