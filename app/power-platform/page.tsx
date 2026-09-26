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
          <Hero title="Master Power Platform" />
          <Problem />
          <WhyUs />
          <Courses course="power-platform" />
          <LearningPath />
          <Perks />
          <Community />
          <Faculty course="power-platform" />
          <Faq />
   </div>
  )
}

export default page