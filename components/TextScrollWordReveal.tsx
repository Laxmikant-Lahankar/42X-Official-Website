"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Fragment, useRef } from "react";
import { Customsection } from "@/app/CustomSection";

const PARAGRAPHS = [
  "Millions of professionals want to advance their careers in SAP, Data Engineering, and Power Platform—but traditional education teaches theory, not the practical skills enterprises actually need.",
  "Most academies are classrooms of 100+, with zero mentorship. The result? Graduates are certificate holders, not career-ready professionals. The market demands real skills. But the training doesn't deliver.",
  "And this is what we are here to solve",
];
const START_OPACITY = 0.15;
const SPREAD = 0.8;
const WORD_DURATION = 0.2;

export interface WordProgressRange {
  start: number;
  end: number;
}

function getWordProgressRange(index: number, count: number): WordProgressRange {
  const start = count <= 1 ? 0 : (index / (count - 1)) * SPREAD;

  return {
    start,
    end: Math.min(1, start + WORD_DURATION),
  };
}

export function getWordOpacity(
  progress: number,
  { start, end }: WordProgressRange,
  startOpacity = START_OPACITY,
): number {
  if (progress <= start) return startOpacity;
  if (progress >= end) return 1;

  const wordProgress = (progress - start) / (end - start);
  return startOpacity + (1 - startOpacity) * wordProgress;
}

function Word({
  children,
  progress,
  index,
  count,
  reducedMotion,
}: {
  children: string;
  progress: MotionValue<number>;
  index: number;
  count: number;
  reducedMotion: boolean;
}) {
  const range = getWordProgressRange(index, count);
  const opacity = useTransform(progress, (latest) =>
    getWordOpacity(latest, range),
  );

  return (
    <motion.span
      aria-hidden="true"
      className="inline"
      style={reducedMotion ? undefined : { opacity }}
    >
      {children}
    </motion.span>
  );
}

function RevealedParagraph({
  text,
  startIndex,
  count,
  progress,
  reducedMotion,
}: {
  text: string;
  startIndex: number;
  count: number;
  progress: MotionValue<number>;
  reducedMotion: boolean;
}) {
  const words = text.split(" ");

  return (
    <p>
      {words.map((word, index) => (
        <Fragment key={`${word}-${startIndex + index}`}>
          <Word
            progress={progress}
            index={startIndex + index}
            count={count}
            reducedMotion={reducedMotion}
          >
            {word}
          </Word>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </p>
  );
}

export default function TextScrollWordReveal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const paragraphStarts = PARAGRAPHS.map((_, index) =>
    PARAGRAPHS.slice(0, index).reduce(
      (total, paragraph) => total + paragraph.split(" ").length,
      0,
    ),
  );
  const wordCount = PARAGRAPHS.reduce(
    (total, paragraph) => total + paragraph.split(" ").length,
    0,
  );

  return (
    <Customsection>
      <div ref={sectionRef} className="relative px-6 py-16 md:px-12 md:py-20">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col items-start gap-2">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-gray-400 shadow-inner backdrop-blur-md sm:text-sm mb-2">
              <span className="relative flex h-1 w-1">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex h-1 w-1 rounded-full bg-blue-500" />
              </span>
              The problem
            </div>
            <h2 className="text-3xl font-light text-white md:text-4xl">
              The enterprise skills gap <br />
              is real.
            </h2>
          </div>
          <div
            className="flex max-w-xl flex-col gap-6 text-lg font-light leading-[1.45] tracking-[-0.02em] text-white md:text-xl md:leading-[1.4]"
            aria-label={PARAGRAPHS.join(" ")}
          >
            {PARAGRAPHS.map((paragraph, index) => (
              <RevealedParagraph
                key={paragraph}
                text={paragraph}
                startIndex={paragraphStarts[index]}
                count={wordCount}
                progress={scrollYProgress}
                reducedMotion={Boolean(reducedMotion)}
              />
            ))}
          </div>
        </div>
      </div>
    </Customsection>
  );
}
