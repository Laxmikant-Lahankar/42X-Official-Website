// TODO: replace with the real 42X Academy Discord invite.
export const DISCORD_INVITE_URL = "https://discord.gg/REPLACE_ME";

// TODO: replace with the real Cal.com or Calendly scheduling URL.
export const CALENDAR_EMBED_URL = "";

// TODO: add the real founding-cohort seat count. Do not invent a number.
export const HERO_COHORT_BADGE = "Founding Cohort '26 · Limited seats";

export const FAQ_FOLLOWUP = "Still unsure?";

export const COURSE_SLUGS = [
  "sap",
  "data-engineering",
  "power-bi",
  "power-platform",
  "devops",
] as const;

export type CourseSlug = (typeof COURSE_SLUGS)[number];

export type Cta = {
  id: string;
  label: string;
  href: string;
  microcopy?: string;
};

export const CTAS = {
  primary: {
    id: "primary",
    label: "Join the cohort",
    href: "/apply",
  },
  secondary: {
    id: "secondary",
    label: "Talk to an Expert",
    href: "/book",
  },
  contact: {
    id: "contact",
    label: "Contact us",
    href: "/contact",
  },
  community: {
    id: "community",
    label: "Join the Community (Free)",
    href: DISCORD_INVITE_URL,
  },
  courseCard: {
    id: "course_card",
    label: "See What You'll Build",
    href: "/courses",
  },
  whatsapp: {
    id: "whatsapp",
    label: "Chat with us",
    href: "https://wa.me/918484834242",
  },
  quiz: {
    id: "quiz",
    label: "Not sure which track? Take the 2-min quiz →",
    href: "/contact?intent=quiz",
  },
} as const satisfies Record<string, Cta>;

/** Location-specific labels. Destinations still come from the CTA they override. */
export const CTA_COPY = {
  whyUs: "See it for yourself: talk to an expert →",
  faculty: "Talk to an Expert",
  communityLive: "Join Thursday's live Ask-Anything call →",
} as const;

export function ctaWithLabel(cta: Cta, label: string): Cta {
  return { ...cta, label };
}

const COURSE_PAGES: Record<string, string> = {
  sap: "/courses#sap",
  "data-engineering": "/courses#data-engineering",
  "power-bi": "/courses#data-engineering",
  "power-platform": "/courses#power-platform",
  devops: "/courses#devops",
};

export function courseCardCta(slug: CourseSlug): Cta {
  return {
    ...CTAS.courseCard,
    href: COURSE_PAGES[slug] || "/courses",
  };
}

export function isExternalHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

export function isCourseSlug(value: string): value is CourseSlug {
  return (COURSE_SLUGS as readonly string[]).includes(value);
}

/** Append `src` while keeping any query params already on the CTA href. */
export function ctaHref(cta: Pick<Cta, "href">, src: string): string {
  const isAbsolute = isExternalHref(cta.href);
  const url = new URL(cta.href, "https://cta.local");
  url.searchParams.set("src", src);
  if (isAbsolute) return url.toString();
  return `${url.pathname}${url.search}${url.hash}`;
}
