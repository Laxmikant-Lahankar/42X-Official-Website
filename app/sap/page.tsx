import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import LearningPath from "@/components/Path";
import Problem from "@/components/Problem";
import Perks from "@/components/Perks";
import WhyUs from "@/components/WhyUs";
import Community from "@/components/Community";
import Faculty from "@/components/Faculty";
import Faq from "@/components/Faq";

export default function SapPage() {
  return (
    <div>
      <Hero title="Master SAP" activeCourse="sap" />
      <Problem />
      <WhyUs />
      <Courses course="sap" />
      <LearningPath />
      <Perks />
      <Community />
      <Faculty course="sap" />
      <Faq />
    </div>
  );
}