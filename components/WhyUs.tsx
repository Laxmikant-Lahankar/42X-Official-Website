import Image from "next/image";
import Link from "next/link";
import { Customsection } from "@/app/CustomSection";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "./ui/button";
import Reveal from "./Reveal";

const cardData = [
  {
    id: 1,
    cardNumber: "01",
    title: "Built by Enterprise Professionals",
    description:
      "Founded by people from SAP, TCS, Microsoft.\nNot education entrepreneurs. Real experience.",
    image: "/image-1.jpg",
  },
  {
    id: 2,
    cardNumber: "02",
    title: "1-on-1 Expert Mentorship & Assistance",
    description:
      "Your mentor has 10+ years in the industry.\nSomeone who actually cares if you succeed.",
    image: "/image-2.jpg",
  },
  {
    id: 3,
    cardNumber: "03",
    title: "Real Projects, Real Systems",
    description:
      "You work on actual enterprise systems.\nPortfolio that enterprises actually recognize.",
    image: "/image-3.jpg",
  },
  {
    id: 4,
    cardNumber: "04",
    title: "Career Acceleration and Support",
    description:
      "Resume coaching. Interview prep. Enterprise network connections.\n90%+ of graduates land roles within 8-12 weeks.",
    image: "/image-4.jpg",
  },
];

export default function WhyUs() {
  return (
    <Customsection>
      <div className="px-6 py-16 md:px-12 md:py-20">
        <SectionHeader
          badge="Why choose us"
          title="Here’s how we close the gap."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card, index) => (
            <Reveal key={card.id} delayMs={index * 90}>
              <article
                className="group relative isolate aspect-[3/4] overflow-hidden rounded-sm ring-1 ring-white/10 transition-[transform,box-shadow,ring-color] duration-500 ease-out hover:-translate-y-1.5 hover:ring-white/25 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
              <Image
                src={card.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                className="scale-105 object-cover blur-[1px] transition-transform duration-700 ease-out group-hover:scale-[1.1] motion-reduce:transition-none motion-reduce:group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/5 transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
              <span className="absolute top-5 left-5 text-xs tracking-wide text-white/70 transition-colors duration-500 group-hover:text-white">
                {card.cardNumber}
              </span>
              <div className="absolute inset-x-5 bottom-5 translate-y-1 transition-transform duration-500 ease-out group-hover:translate-y-0 motion-reduce:translate-y-0">
                <h3 className="line-clamp-2 h-[3.25rem] text-lg leading-snug text-white">
                  {card.title}
                </h3>
                <p className="mt-2 line-clamp-3 h-[4.4rem] text-sm leading-relaxed whitespace-pre-line text-white/60 transition-colors duration-500 group-hover:text-white/80">
                  {card.description}
                </p>
              </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center">
          <Button
            size="sm"
            className="h-9 rounded-lg bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-4 text-white hover:bg-gradient-to-b hover:from-[#5B8CFF] hover:to-[#2E57DF]"
          >
            <Link href="/courses">Read More</Link>
          </Button>
        </Reveal>
      </div>
    </Customsection>
  );
}
