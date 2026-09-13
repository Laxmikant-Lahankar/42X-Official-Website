import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import LearningPath from "@/components/Path";
import Problem from "@/components/Problem";
import Perks from "@/components/Perks";
import WhyUs from "@/components/WhyUs";

export default function Home() {
  return (
    <div>
      <Hero />
      <Problem />
      <WhyUs />
      <Courses />
      <LearningPath />
      <Perks />
    </div>
  );
}
