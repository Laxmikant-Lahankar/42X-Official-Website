import type { Metadata } from "next";

// Single source of truth for SEO facts. Keep these identical to the Google
// Business Profile and directory listings (Justdial, Sulekha, UrbanPro):
// search engines cross-check name, address and phone across sites.
export const SITE = {
  url: "https://42xacademy.com",
  name: "42X Academy",
  legalName: "42X Academy Pvt. Ltd.",
  logo: "https://42xacademy.com/42Xlogo.png",
  ogImage: "/logo2.png",
  email: "contact@42xacademy.com",
  phone: "+91-8484834242",
  address: {
    streetAddress:
      "Office No. 15, 2nd Floor, Bhosale Shinde Arcade, Opp. Lenskart, Jangali Maharaj Road (J.M. Road)",
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411004",
    addressCountry: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/42x-academy/",
    "https://www.instagram.com/42xacademy",
  ],
} as const;

/** Course pages that exist in data but are not ready to be indexed. */
export const UNLISTED_COURSES = new Set(["power-platform-placeholder"]);

/** Meta descriptions (≤ ~155 chars) for course pages without a landing page. */
export const COURSE_SEO_DESCRIPTIONS: Record<string, string> = {
  "power-platform":
    "Power Platform course online or in Pune: Power Apps, Power Automate, Dataverse, Power BI and Copilot Studio, with a hands-on capstone project.",
  "data-engineering":
    "Data Engineering course online or in Pune: Python, SQL, ETL/ELT, Spark, Airflow, Azure Data Factory, dbt and Kafka, with a production-style capstone.",
  devops:
    "DevOps with AI course online or in Pune: Linux, cloud, CI/CD, containers, Kubernetes and infrastructure as code, with AI tools in every module.",
};

/** Phrase used in titles/descriptions to cover both audiences. */
export const MODES_SHORT = "Online & in Pune";
export const MODES_LONG =
  "Live online classes for students worldwide, or classroom batches at our Pune centre (J.M. Road).";

/**
 * Per-page metadata with a self-referencing canonical and matching
 * Open Graph / Twitter tags (child metadata replaces the layout's
 * openGraph object entirely, so every page must set its own).
 */
export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  absoluteTitle?: boolean;
  noindex?: boolean;
}): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${SITE.name}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: SITE.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}

/** Render-safe JSON-LD string (escapes `<` per Next.js JSON-LD guide). */
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export const ORG_ID = `${SITE.url}/#organization`;

/** Organisation + Pune centre, rendered once in the root layout. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": ORG_ID,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE.url,
        logo: SITE.logo,
        image: SITE.logo,
        email: SITE.email,
        telephone: SITE.phone,
        description:
          "42X Academy trains students in SAP (MM, SD, EWM, ABAP, BASIS), Power BI, Power Platform, Data Engineering and DevOps through live online classes worldwide and classroom batches in Pune.",
        address: { "@type": "PostalAddress", ...SITE.address },
        areaServed: "Worldwide",
        sameAs: SITE.sameAs,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: SITE.phone,
          email: SITE.email,
          contactType: "admissions",
          availableLanguage: ["English", "Hindi", "Marathi"],
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        url: SITE.url,
        name: SITE.name,
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** Course offered in both modes: online (worldwide) and onsite (Pune). */
export function courseSchema(course: {
  slug: string;
  title: string;
  subtitle: string;
  audience?: string;
  skills?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${SITE.url}/courses/${course.slug}#course`,
    name: `${course.title} Training`,
    description: course.subtitle,
    url: `${SITE.url}/courses/${course.slug}`,
    provider: {
      "@id": ORG_ID,
      "@type": "EducationalOrganization",
      name: SITE.name,
      sameAs: SITE.url,
    },
    inLanguage: "en",
    ...(course.audience
      ? { audience: { "@type": "Audience", audienceType: course.audience } }
      : {}),
    ...(course.skills?.length ? { teaches: course.skills } : {}),
    hasCourseInstance: [
      { "@type": "CourseInstance", courseMode: "Online" },
      {
        "@type": "CourseInstance",
        courseMode: "Onsite",
        location: {
          "@type": "Place",
          name: `${SITE.name}, Pune`,
          address: { "@type": "PostalAddress", ...SITE.address },
        },
      },
    ],
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** BreadcrumbList for Google's breadcrumb display, e.g. Home › Courses › SAP MM. */
export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE.url}${it.path}`,
    })),
  };
}
