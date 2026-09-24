import React from 'react'
import Courses from "@/components/Courses";
import Hero from "@/components/Hero";
import LearningPath from "@/components/Path";
import Problem from "@/components/Problem";
import Perks from "@/components/Perks";
import WhyUs from "@/components/WhyUs";
import Community from "@/components/Community";
import Faculty from "@/components/Faculty";
import Faq from "@/components/Faq";

function page() {
  return (
    <div>
      <Hero title="Master Data Engineering" activeCourse="data-engineering" />
      <Problem />
      <WhyUs />
      <Courses course="data-engineering" />
      <LearningPath />
      <Perks />
      <Community />
      <Faculty course="data-engineering" />
      <Faq />
    </div>
  )
}

export default page