"use client";

import { useState } from "react";
import { Customsection } from "@/app/CustomSection";
import { CTAButton } from "@/components/CTAButton";
import { CTA_COPY, CTAS, ctaWithLabel } from "@/lib/cta";
import SectionHeader from "./SectionHeader";
import { CoverflowCarousel, type CoverflowSlide } from "./Coverflowcarousel";

type FacultyMember = {
  id: string;
  name: string;
  role: string;
  company: string;
  bio: string;
  /** TODO: add this mentor's real LinkedIn profile URL. */
  linkedin?: string;
  image: string;
  courses: string[];
};

const COURSE_LABELS: Record<string, string> = {
  "power-bi": "Power BI",
  sql: "SQL",
  excel: "Excel",
  python: "Python",
  "soft-skills": "Soft Skills",
  devops: "DevOps",
  "data-engineering": "Data Engineering",
};

const FACULTY: FacultyMember[] = [
  {
    id: "dr-shivani",
    name: "Dr. Shivani",
    role: "Founder & Soft Skills Mentor",
    company: "Based in Antwerp, Belgium",
    bio: "Rebuilt a career from the ground up in a new country, so she knows technical skill alone doesn't get you hired. At 42X she makes sure every mentor session builds the confidence and communication to match the technical depth you're gaining, so you walk into the room ready to own it.",
    image: "/founder.png",
    courses: ["soft-skills"],
  },
  {
    id: "prathemesh-pawar",
    name: "Prathemesh Pawar",
    role: "Data & BI Lead Coach",
    company: "Data & BI Lead Coach",
    bio: "Brings deep, hands-on expertise in Power BI, SQL, Excel, and Python, earned by solving real analytics problems for global clients. He has built dashboards that drive decisions, designed data models that scale, and turned messy business data into insights leadership actually acts on.",
    image: "/prathemesh-pawar.jpg",
    courses: ["power-bi", "sql", "excel", "python"],
  },
  {
    id: "murkute-dnyaneshwar",
    name: "Murkute Dnyaneshwar",
    role: "DevOps Engineer | Certified Professional",
    company: "Certified Professional",
    bio: "Certified DevOps Engineer with 5+ years of hands-on experience. Helps aspiring professionals build practical, industry-ready skills across Linux, Git, Docker, Kubernetes, Jenkins, CI/CD, AWS, infrastructure as code, and automation.",
    image: "/murkute-dnyaneshwar.jpg",
    courses: ["devops"],
  },
];

function LinkedInMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0Z" />
    </svg>
  );
}

export default function Faculty({ course }: { course?: string } = {}) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredFaculty = course
    ? FACULTY.filter((member) => member.courses.includes(course))
    : FACULTY;

  if (filteredFaculty.length === 0) return null;

  // Transform faculty data into carousel slides
  const slides: CoverflowSlide[] = filteredFaculty.map((member) => ({
    src: member.image,
    alt: member.name,
    title: member.name,
    subtitle: member.role,
    meta: [],
  }));

  const activeFaculty = filteredFaculty[selectedIndex];

  // Handle carousel index changes
  const handleCarouselChange = (newIndex: number) => {
    setSelectedIndex(newIndex);
  };

  return (
    <Customsection>
      <div className="px-6 py-16 md:px-12 md:py-20">
        <SectionHeader
          badge="Faculty"
          title="The people who will actually teach you"
        />

        {/* Full Width Carousel */}
        <div className="mt-12 w-full">
          <div className="w-full">
            <CoverflowCarousel
              slides={slides}
              showCaption={false}
              showNavigation={true}
              showPagination={false}
              cardWidth="clamp(220px, 35vw, 360px)"
              label="Faculty carousel"
              className="w-full"
              cardClassName="border border-white/10"
              onSlideChange={handleCarouselChange}
            />
          </div>

          {/* Minimal Info Below Carousel */}
          {activeFaculty && (
            <div className="mt-8 w-full max-w-4xl mx-auto px-6">
              <div className="space-y-6 text-center">
                {/* Name */}
                <div>
                  <h3 className="text-2xl font-light text-white">
                    {activeFaculty.name}
                  </h3>
                  <p className="text-xs text-white/40 uppercase tracking-[0.12em] mt-2">
                    {activeFaculty.role}
                  </p>
                </div>

                {/* Background - Condensed */}
                <div className="text-sm text-white/60 leading-relaxed max-w-2xl mx-auto">
                  <p className="text-xs uppercase tracking-[0.1em] text-white/40 mb-2">
                    Background
                  </p>
                  <p>{activeFaculty.bio}</p>
                </div>

                {/* What They Teach */}
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-white/40 mb-3">
                    What They Teach
                  </p>
                  <div className="flex justify-center gap-2 flex-wrap">
                    {activeFaculty.courses.map((course) => (
                      <span
                        key={course}
                        className="text-xs text-white/80 px-3 py-1 border border-white/20 rounded-full"
                      >
                        {COURSE_LABELS[course] ??
                          course
                            .split("-")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                            )
                            .join(" ")}
                      </span>
                    ))}
                  </div>
                </div>

                {/* TODO: LinkedIn icon renders once activeFaculty.linkedin is a real profile URL. */}
                {activeFaculty.linkedin ? (
                  <div className="pt-2">
                    <a
                      href={activeFaculty.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${activeFaculty.name} on LinkedIn`}
                      className="inline-flex min-h-11 items-center gap-2 text-xs text-white/60 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB0FF]"
                    >
                      <LinkedInMark />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                  </div>
                ) : null}
              </div>
            </div>
          )}

          {/* Pagination Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === selectedIndex}
                onClick={() => handleCarouselChange(index)}
                className={`size-2 rounded-full transition-opacity ${
                  index === selectedIndex
                    ? "bg-white opacity-100"
                    : "bg-white opacity-30 hover:opacity-50"
                }`}
              />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <CTAButton
              cta={ctaWithLabel(CTAS.secondary, CTA_COPY.faculty)}
              src="faculty"
              variant="ghost"
              size="md"
            />
          </div>
        </div>
      </div>
    </Customsection>
  );
}
