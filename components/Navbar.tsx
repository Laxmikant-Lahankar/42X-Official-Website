"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { CTAS } from "@/lib/cta";
import { Customsection } from "@/app/CustomSection";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/#faq", label: "FAQ" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <Customsection>
      <header className="animate-drop-down relative w-full">
        <div className="relative flex h-16 w-full items-center justify-between px-6">
          <Link
            href="/"
            className="relative z-10 flex items-center gap-2.5 text-white"
          >
            <Image
              src="/logo2.png"
              alt="42X Academy"
              width={160}
              height={64}
              priority
              className="h-8 w-auto"
            />
            <span className="hidden text-base font-semibold tracking-wide text-lg sm:inline">
              Academy
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/85 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <CTAButton
              cta={CTAS.contact}
              src="header"
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
            />

            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-md text-white md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>

                {open ? (
          <div className="border-t border-white/10 bg-black/80 px-6 py-4 backdrop-blur-md md:hidden">
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-1 text-sm text-white/85"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <CTAButton
                cta={CTAS.contact}
                src="header-menu"
                variant="primary"
                size="sm"
                className="mt-2 w-full"
                onClick={() => setOpen(false)}
              />
            </nav>
          </div>
        ) : null}
      </header>
    </Customsection>
  );
}
