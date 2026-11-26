import { getCourse } from "@/data/courses";
import { LANDINGS } from "@/data/course-landing";
import { OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "42X Academy course";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourse(slug);
  const landing = LANDINGS[slug];
  return renderOgCard({
    kicker: landing ? `Course · ${landing.totalWeeks} weeks` : "Course",
    title: `${course?.title ?? "42X Academy"} Training`,
    subtitle: landing?.headlineAccent ?? course?.subtitle,
  });
}
