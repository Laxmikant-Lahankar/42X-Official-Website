import type { Metadata } from "next";
import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import LearningPath from "@/components/Path";
import Perks from "@/components/Perks";
import WhyUs from "@/components/WhyUs";
import Faculty from "@/components/Faculty";
import Faq from "@/components/Faq";
import ScrollContactModal from "@/components/ScrollContactModal";
import BlogSection from "@/components/BlogSection";
import { JsonLd } from "@/components/JsonLd";
import { FAQS } from "@/lib/faqs";
import { MODES_LONG, MODES_SHORT, faqSchema, pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: `SAP, Power BI & DevOps Training – ${MODES_SHORT} | 42X Academy`,
  absoluteTitle: true,
  description: `Industry-ready training in SAP (MM, SD, EWM, ABAP, BASIS), Power BI, Power Platform and DevOps with 1-on-1 mentorship and real projects. ${MODES_LONG}`,
  path: "/",
});

export default function Home() {
  return (
    <div>
      <JsonLd data={faqSchema(FAQS)} />
      <ScrollContactModal />
      <Hero />
      {/* <Problem /> */}
      <Courses />
      <WhyUs />
      <Perks />
      <Faculty />
      <LearningPath />
      {/* TODO: Founding member offer section does not exist yet.
          When it is added, place it here (after faculty, before FAQ).
          Its only filled control should be PRIMARY:
          CTAButton cta={CTAS.primary} src="founding-offer" variant="primary" size="md"
          Do not invent seat counts, prices, or bonuses. */}
      <BlogSection />
      <Faq />
    </div>
  );
}
