import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import LearningPath from "@/components/Path";
import Perks from "@/components/Perks";
import WhyUs from "@/components/WhyUs";
import Faculty from "@/components/Faculty";
import Faq from "@/components/Faq";
import ScrollContactModal from "@/components/ScrollContactModal";

export default function Home() {
  return (
    <div>
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
      <Faq />
    </div>
  );
}
