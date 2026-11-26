import { EYEBROW, type CourseLanding } from "./types";

// Facts: data/courses.ts + public/syllabus/devops.pdf
// (3 months, Mon–Fri, 2 hours/day, 4 real-time projects, AI in every module).
export const DEVOPS_LANDING: CourseLanding = {
  seoDescription:
    "DevOps with AI course online or in Pune: Linux, AWS, Jenkins CI/CD, Docker, Kubernetes, Terraform, Ansible and monitoring, with 4 real-world projects.",
  eyebrow: EYEBROW,
  headlineAccent: "Ship it. Scale it. Keep it running.",
  lede: "Linux, AWS, CI/CD, Docker, Kubernetes and infrastructure as code, with AI tools used in every module to generate, debug and explain your work.",
  totalWeeks: "~12",
  projects: { count: "4", label: "Real-world projects" },
  scene: "cicd",
  roles: [
    { title: "Linux & Automation Engineer", station: "code" },
    { title: "Cloud Engineer (AWS)", station: "cluster" },
    { title: "Infrastructure as Code Engineer", station: "cluster" },
    { title: "Build & Release (CI/CD) Engineer", station: "deploy" },
    { title: "DevOps Engineer", station: "test" },
    { title: "Kubernetes / SRE Engineer", station: "k8s" },
  ],
  capstoneTitle: ["Four projects.", "One production mindset."],
  capstoneLine:
    "Deploy a website on Ubuntu, build a Jenkins CI/CD pipeline, run a Dockerized app on Kubernetes and provision AWS with Terraform and Ansible.",
  incident: {
    label: "Project · Failed deployment",
    steps: [
      { tone: "alert", text: "Alert · Deployment failing in the pipeline" },
      { tone: "work", text: "Investigating · Jenkins build logs" },
      { tone: "work", text: "Root cause · Wrong image tag in manifest" },
      { tone: "ok", text: "Resolved · Rolled back, fix verified" },
    ],
  },
  faqs: [
    {
      question: "Do I need experience to join the DevOps with AI course?",
      answer:
        "No prior DevOps experience is needed. The course starts with DevOps fundamentals and Linux before moving to cloud, CI/CD, containers and infrastructure as code, with 1-on-1 mentorship along the way.",
    },
    {
      question: "How long is the DevOps course and what is the schedule?",
      answer:
        "Three months, Monday to Friday, 2 hours per day. Plan for another 30–60 minutes of daily practice on your own AWS free-tier account, VM or Minikube.",
    },
    {
      question: "How is AI used in the DevOps course?",
      answer:
        "You build fundamentals by hand first, then use AI to generate scripts, YAML, Dockerfiles, Jenkinsfiles and Terraform code, to debug errors and to explain commands. You verify every output and never paste secrets or company data into AI tools.",
    },
    {
      question: "Can I take the DevOps course online, or in class in Pune?",
      answer:
        "Both. Live online classes are open to students anywhere; classroom batches run at our centre on J.M. Road, Pune. Same syllabus, mentors and projects either way.",
    },
    {
      question: "What are the fees and when does the next batch start?",
      answer:
        "Fees depend on mode and batch. Book a free session or WhatsApp +91 84848 34242 and we'll share current fees and dates.",
    },
  ],
};
