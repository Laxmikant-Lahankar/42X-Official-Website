"use client";
import React from "react";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ArrowUp,
  BriefcaseBusiness,
  Camera,
  GitBranch,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "./Reveal";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Blogs", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/42x-academy/posts/",
      external: true,
      icon: BriefcaseBusiness,
    },
    {
      name: "Instagram",
      href: "https://www.instagram.com/42xacademy",
      external: true,
      icon: Camera,
    },
    // TODO: add YouTube / X here once the real profiles exist.
  ];

  // Legal column renders only when real pages exist (placeholder "#" links
  // hurt trust and crawl quality). Add e.g. { name: "Privacy Policy", href: "/privacy" }.
  const legalLinks: { name: string; href: string }[] = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Use", href: "/terms" },
  ];

  return (
    <footer
      id="site-footer"
      className="relative z-10 w-full bg-black text-white overflow-hidden select-none"
    >
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 relative z-10">
        {/* Top Grid: Brand & Newsletter + Navigation Columns */}
        <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-neutral-900">
          {/* Left Column (Brand, Status & Newsletter) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand Wordmark - Bold Black & White Architecture */}
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2.5 text-2xl sm:text-3xl font-black tracking-tight text-white hover:text-neutral-200 transition-colors"
                >
                  <Image
                    src="/logo2.png"
                    alt="42X Academy"
                    width={160}
                    height={64}
                    priority
                    className="h-8 w-auto"
                  />
                  <span className="font-semibold tracking-normal text-white">
                    Academy
                  </span>
                </Link>

                {/* System Status Pill */}
                <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-neutral-800 bg-neutral-950 text-[11px] font-mono text-neutral-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-200"></span>
                  </span>
                  <span>Cohort &apos;26 Enrolling</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-neutral-400 font-normal leading-relaxed max-w-sm">
                Empowering the next generation of engineers, builders, and
                technical leaders with world-class curriculum and mentorship.
              </p>

              {/* Office Address */}
              <div className="mt-6 text-sm text-neutral-400 leading-relaxed">
                <p className="font-semibold text-white">
                  42X Academy Pvt. Ltd.
                </p>
                <p className="mt-1">
                  Office No. 15, 2nd Floor, Bhosale Shinde Arcade,
                  <br />
                  Opp. Lenskart, Jangali Maharaj Road (J.M. Road),
                  <br />
                  Pune - 411004
                </p>
                <p className="mt-2">
                  <a
                    href="tel:+918484834242"
                    className="hover:text-white transition-colors"
                  >
                    Phone: 8484-83-4242
                  </a>
                </p>
                <p className="mt-1">
                  <a
                    href="mailto:contact@42xacademy.com"
                    className="hover:text-white transition-colors"
                  >
                    Email: contact@42xacademy.com
                  </a>
                </p>
              </div>

              {/* Lead actions (replaced a newsletter form that saved nothing).
                  Both go to channels that actually reach the team. */}
              <div className="mt-8">
                <div className="text-xs font-mono tracking-wider uppercase text-neutral-400 mb-2.5">
                  Talk to us
                </div>
                <div className="flex max-w-md flex-col gap-2 sm:flex-row">
                  <Link
                    href="/contact?intent=demo&src=footer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-[#00B4FF] to-[#7B3DFF] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
                  >
                    Book a free session <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  <a
                    href="https://wa.me/918484834242?src=footer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-neutral-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#25D366] hover:text-[#25D366]"
                  >
                    WhatsApp us
                  </a>
                </div>
                <div className="mt-2 text-[11px] text-neutral-500">
                  Fees, batch dates and track advice. Online or in Pune.
                </div>
              </div>
            </div>
          </div>

          {/* Spacer Column */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Right Navigation Columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {/* Column 1: Navigation */}
            <div>
              <div className="text-xs font-mono tracking-wider uppercase text-neutral-400 mb-4 pb-1 border-b border-neutral-900 inline-block">
                Navigation
              </div>
              <ul className="space-y-3">
                {navLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors duration-150"
                    >
                      <span className="relative">
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-200 group-hover:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Connect / Social */}
            <div>
              <div className="text-xs font-mono tracking-wider uppercase text-neutral-400 mb-4 pb-1 border-b border-neutral-900 inline-block">
                Network
              </div>
              <ul className="space-y-3">
                {socialLinks.map((item) => {
                  const Icon = item.icon;

                  return (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        {...(item.external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="group inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-150"
                      >
                        <Icon className="size-3.5 shrink-0 text-neutral-500 group-hover:text-white transition-colors" />
                        <span>{item.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-neutral-600 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Column 3: Legal & Standards */}
            {legalLinks.length > 0 && (
            <div className="col-span-2 sm:col-span-1">
              <div className="text-xs font-mono tracking-wider uppercase text-neutral-400 mb-4 pb-1 border-b border-neutral-900 inline-block">
                Legal
              </div>
              <ul className="space-y-3">
                {legalLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors duration-150"
                    >
                      <span className="relative">
                        {item.name}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-white transition-all duration-200 group-hover:w-full" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>
        </Reveal>

        {/* Middle Metadata & Quick Bar */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-900 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-6">
            <span>© 2026 42X Academy</span>
            <span className="hidden md:inline-block text-neutral-700">•</span>
            <span className="hidden md:inline-block">
              Designed for builders & engineers
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              <span>Global,India</span>
            </span>

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              type="button"
              className="group flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white transition-all"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Massive Watermark Typography - The Architectural Character */}
        <div className="pt-8 sm:pt-12 pb-2 w-full max-w-[1250px] mx-auto overflow-hidden select-none pointer-events-none">
          <div className="relative w-full flex items-center justify-center">
            {/* Responsive SVG ensures 100% full width, never overflows or clips on mobile/tablet/desktop */}
            <svg
              viewBox="0 0 1250 170"
              className="w-full h-auto max-w-[1250px] block"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <text
                x="50%"
                y="65%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="font-black tracking-tighter uppercase"
                style={{
                  fontFamily:
                    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontWeight: 900,
                  fontSize: "150px",
                  letterSpacing: "-0.04em",
                  stroke: "rgba(35, 77, 135, 0.48)",
                  strokeWidth: "1.5px",
                  fill: "transparent",
                }}
              >
                42X ACADEMY
              </text>
            </svg>

            {/* Subtle gradient vignette to blend the typography naturally into the base */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </footer>
  );
};
