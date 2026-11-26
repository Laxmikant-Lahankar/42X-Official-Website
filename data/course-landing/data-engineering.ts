import { EYEBROW, type CourseLanding } from "./types";

// Facts: data/courses.ts + public/syllabus/data_engineering.pdf (~19 weeks).
export const DATA_ENGINEERING_LANDING: CourseLanding = {
  seoDescription:
    "Data Engineering course online or in Pune: Python, SQL, ETL/ELT, Spark, Airflow, Azure Data Factory, dbt and Kafka, with a production-style capstone.",
  eyebrow: EYEBROW,
  headlineAccent: "Build the pipelines data runs on.",
  lede: "From Python and SQL to Spark, Airflow and the cloud: design, build and run production-style data pipelines end to end.",
  totalWeeks: "~19",
  scene: "powerbi",
  roles: [
    { title: "Analytics Engineer", station: "kpi" },
    { title: "Data Engineer", station: "sources" },
    { title: "ETL / Data Pipeline Developer", station: "bars" },
    { title: "Cloud Data Engineer (Azure)", station: "model" },
    { title: "Big Data (Spark) Developer", station: "trend" },
    { title: "Data Quality & Governance Analyst", station: "donut" },
  ],
  capstoneTitle: ["Your pipeline.", "Your demo day."],
  capstoneLine:
    "Ingest, transform and load real data into a warehouse, ready for dashboards, in two-week Jira sprints with a stakeholder review.",
  incident: {
    label: "Capstone · Pipeline incident",
    steps: [
      { tone: "alert", text: "Alert · Nightly Airflow run failed" },
      { tone: "work", text: "Investigating · Task logs & source data" },
      { tone: "work", text: "Root cause · Schema change upstream" },
      { tone: "ok", text: "Resolved · Fixed, data-quality check added" },
    ],
  },
  faqs: [
    {
      question: "Do I need experience to join the Data Engineering course?",
      answer:
        "No prior data engineering experience is needed. The course starts with Python and SQL foundations before moving to warehousing, Spark, orchestration and the cloud, with 1-on-1 mentorship along the way.",
    },
    {
      question: "How long is the Data Engineering course?",
      answer:
        "About 19 weeks: 10 modules from Python and SQL to Kafka and data governance, plus a production-style capstone. Plan for 8–12 hours a week.",
    },
    {
      question: "Which cloud does the course use?",
      answer:
        "Azure is the primary cloud, with Azure Data Factory for pipelines. AWS Glue and Google BigQuery are introduced as alternatives so you can recognise them on the job.",
    },
    {
      question: "Can I take the Data Engineering course online, or in class in Pune?",
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
