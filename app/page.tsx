import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import LearningPath from "@/components/Path";
import Problem from "@/components/Problem";
import Perks from "@/components/Perks";
import WhyUs from "@/components/WhyUs";
import Community from "@/components/Community";
import Faculty from "@/components/Faculty";
import Faq from "@/components/Faq";

export default function Home() {
  return (
    <div>
      <Hero />
      <Problem />
      <WhyUs />
      <Courses />
      <LearningPath />
      <Perks />
      <Community />
      <Faculty />
      {/* TODO: Founding member offer section does not exist yet.
          When it is added, place it here (after faculty, before FAQ).
          Its only filled control should be PRIMARY:
          CTAButton cta={CTAS.primary} src="founding-offer" variant="primary" size="md"
          Do not invent seat counts, prices, or bonuses. */}
      <Faq />
    </div>
  );
}
