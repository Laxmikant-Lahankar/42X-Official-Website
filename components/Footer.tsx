"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowUp, Send, Check, BriefcaseBusiness, Camera, Play, BadgeX, GitBranch } from "lucide-react";
import Image from "next/image";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail("");
    }, 4000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "About", href: "#" },
    { name: "Courses", href: "#" },
    { name: "Curriculum", href: "#" },
    { name: "FAQ", href: "#" },
    { name: "Contact", href: "#" },
  ];

  const socialLinks = [
    { name: "LinkedIn", href: "#", handle: "42xacademy", icon: BriefcaseBusiness },
    { name: "Instagram", href: "#", handle: "@42x.academy", icon: Camera },
    { name: "YouTube", href: "#", handle: "@42xacademy", icon: Play },
    { name: "Twitter / X", href: "#", handle: "@42x_hq", icon: BadgeX },
    { name: "GitHub", href: "#", handle: "42x-academy", icon: GitBranch },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Use", href: "#" },
    { name: "Cookie Settings", href: "#" },
    { name: "Security & Trust", href: "#" },
  ];

  return (
    <footer
      id="site-footer"
      className="relative z-10 w-full bg-black text-white overflow-hidden select-none"
    >
      {/* Subtle top edge hairline separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-neutral-700 to-transparent" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-12 relative z-10">
        {/* Top Grid: Brand & Newsletter + Navigation Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-neutral-900">
          {/* Left Column (Brand, Status & Newsletter) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand Wordmark - Bold Black & White Architecture */}
              <div className="flex items-center gap-3">
                <a
                  href="#"
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
                </a>

                {/* System Status Pill */}
                <div className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-neutral-800 bg-neutral-950 text-[11px] font-mono text-neutral-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neutral-200"></span>
                  </span>
                  <span>Cohort '26 Enrolling</span>
                </div>
              </div>

              <p className="mt-4 text-sm text-neutral-400 font-normal leading-relaxed max-w-sm">
                Empowering the next generation of engineers, builders, and
                technical leaders with world-class curriculum and mentorship.
              </p>

              {/* Newsletter / Terminal Dispatch */}
              <div className="mt-8">
                <div className="text-xs font-mono tracking-wider uppercase text-neutral-400 mb-2.5">
                  Stay in the loop
                </div>
                <form onSubmit={handleSubscribe} className="relative max-w-md">
                  <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl p-1.5 focus-within:border-neutral-500 transition-all">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your work email..."
                      className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none font-sans"
                      required
                    />
                    <button
                      type="submit"
                      className="flex-shrink-0 flex items-center gap-1.5 px-4 py-2 bg-white text-white bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] text-xs font-semibold rounded-lg transition-all duration-200"
                    >
                      {subscribed ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Joined</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <Send className="w-3 h-3" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
                <div className="mt-2 text-[11px] text-neutral-600 font-mono">
                  Weekly engineering digest. Zero marketing fluff.
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
          </div>
        </div>

        {/* Middle Metadata & Quick Bar */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-neutral-900 text-xs font-mono text-neutral-500">
          <div className="flex items-center gap-6">
            <span>© 2026 42X Academy, Inc.</span>
            <span className="hidden md:inline-block text-neutral-700">•</span>
            <span className="hidden md:inline-block">
              Designed for builders & engineers
            </span>
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
              <span>India • Global</span>
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
