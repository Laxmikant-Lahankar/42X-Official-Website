"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, Sparkles, X } from "lucide-react";
import { INTEREST_OPTIONS } from "@/lib/interest";
import { getUserData, hasValidUserData, saveUserData } from "@/lib/userSession";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export default function ScrollContactModal() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const hasTriggeredRef = useRef(false);
  const dismissedRef = useRef(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    experienceLevel: "",
  });

  useEffect(() => {
    setMounted(true);
    // Pre-fill from existing session data if available
    const existing = getUserData();
    if (existing) {
      setFormData((prev) => ({
        ...prev,
        name: existing.name || prev.name,
        email: existing.email || prev.email,
        phone: existing.phone || prev.phone,
        course: existing.course || prev.course,
        experienceLevel: existing.experienceLevel || prev.experienceLevel,
      }));
    }
  }, []);

  // Trigger modal popup only when the courses section comes into view
  useEffect(() => {
    // If user already filled their data in this session, do not prompt again
    if (dismissed || hasTriggeredRef.current || hasValidUserData()) return;

    const checkCoursesVisibility = () => {
      if (hasTriggeredRef.current || dismissedRef.current || hasValidUserData()) return;
      const coursesEl = document.getElementById("courses");
      if (!coursesEl) return;

      const rect = coursesEl.getBoundingClientRect();
      // Only trigger once the user has actually scrolled down to the courses section
      // (top of #courses has reached the upper viewport)
      if (rect.top <= 150 && rect.bottom >= 200) {
        hasTriggeredRef.current = true;
        setTimeout(() => {
          if (!dismissedRef.current && !hasValidUserData()) {
            setOpen(true);
          }
        }, 400);
      }
    };

    window.addEventListener("scroll", checkCoursesVisibility, { passive: true });
    checkCoursesVisibility();

    return () => window.removeEventListener("scroll", checkCoursesVisibility);
  }, [dismissed]);

  // Lock scroll when open & handle Escape key
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        dismissedRef.current = true;
        setOpen(false);
        setDismissed(true);
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleClose = () => {
    dismissedRef.current = true;
    setOpen(false);
    setDismissed(true);
  };

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateField("phone", e.target.value.replace(/[^0-9+\s()-]/g, ""));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.course ||
      !formData.experienceLevel
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      alert("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/contact/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Submit failed");
      }

      saveUserData(formData);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!mounted || !open) return null;

  const inputClass = (field: string) =>
    `h-11 w-full rounded-xl border bg-[#101a30] px-3.5 text-sm text-white outline-none transition-colors duration-200 placeholder:text-[#94a3b8] ${
      focusedField === field
        ? "border-[#00c8ff] shadow-[0_0_0_1px_rgba(0,200,255,0.12)]"
        : "border-[#293c60] hover:border-[#3b5078]"
    }`;

  const labelClass = "mb-1 block text-xs font-medium text-[#a1aec2]";

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-5">
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={handleClose}
        className="animate-in fade-in-0 duration-200 absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Modal Dialog Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="animate-in fade-in-0 zoom-in-95 duration-200 relative z-10 flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-y-auto rounded-3xl border border-[#243657] bg-[#070D1B] p-5 text-white shadow-[0_24px_80px_rgba(0,0,0,0.85)] sm:p-7"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 65% 35% at 50% 0%, rgba(0,180,255,0.12), transparent 75%), radial-gradient(ellipse 50% 45% at 100% 100%, rgba(123,61,255,0.12), transparent 75%)",
        }}
      >
        {/* Cancel / Close icon on top right */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute right-4 top-4 z-20 inline-flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c8ff] sm:right-5 sm:top-5"
        >
          <X className="size-4" />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center py-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
              <CheckCircle2 className="size-8" />
            </div>

            <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
              You&apos;re registered!
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#94a3b8]">
              Thank you for providing your details. Our representative will contact you
              shortly to help you get started completely for free!
            </p>

            <Button
              type="button"
              onClick={handleClose}
              className="mt-6 h-11 rounded-xl bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
            >
              Continue Exploring
            </Button>
          </div>
        ) : (
          <>
            {/* Header / Text on Top */}
            <div className="pr-8">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#00c8ff]/30 bg-[#00c8ff]/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#38bdf8]">
                <Sparkles className="size-3 text-[#38bdf8]" />
                Liking it so far ?
              </div>

              <h2
                id="contact-modal-title"
                className="mt-2 text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl"
              >
                You need to hurry up cause seats are filling faster than ever!
              </h2>

              <p className="mt-1 text-xs text-[#94a3b8] sm:text-sm">
                Add your details to get yourself registered for{" "}
                <span className="font-semibold text-[#38bdf8]">
                  completely FREE!!!
                </span>
              </p>
            </div>

            {/* Form */}
            <form className="mt-4 flex flex-col gap-3.5" onSubmit={handleSubmit}>
              {/* Name */}
              <div>
                <label htmlFor="modal-name" className={labelClass}>
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  id="modal-name"
                  type="text"
                  name="name"
                  autoComplete="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  onFocus={() => setFocusedField("name")}
                  onBlur={() => setFocusedField("")}
                  required
                  className={inputClass("name")}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="modal-email" className={labelClass}>
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  id="modal-email"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                  required
                  className={inputClass("email")}
                />
              </div>

              {/* WhatsApp / Phone */}
              <div>
                <label htmlFor="modal-phone" className={labelClass}>
                  WhatsApp / Phone <span className="text-red-400">*</span>
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  onFocus={() => setFocusedField("phone")}
                  onBlur={() => setFocusedField("")}
                  required
                  className={inputClass("phone")}
                />
              </div>

              {/* Course Interested in */}
              <div>
                <label htmlFor="modal-course" className={labelClass}>
                  Course interested in <span className="text-red-400">*</span>
                </label>
                <Select
                  name="course"
                  items={Object.fromEntries(
                    INTEREST_OPTIONS.map((option) => [option.id, option.label]),
                  )}
                  value={formData.course}
                  onValueChange={(value) => updateField("course", value ?? "")}
                  required
                >
                  <SelectTrigger
                    id="modal-course"
                    className="p-5 w-full rounded-xl border border-[#293c60] bg-[#101a30] px-3.5 text-sm text-white transition-colors hover:border-[#3b5078] focus:border-[#00c8ff] focus:ring-0 data-[placeholder]:text-[#94a3b8]"
                  >
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>

                  <SelectContent className="z-[300] border-[#293c60] bg-[#101a30] text-white">
                    {INTEREST_OPTIONS.map((option) => (
                      <SelectItem
                        key={option.id}
                        value={option.id}
                        className="focus:bg-[#1b2a46] focus:text-white data-[highlighted]:text-white"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Experience level */}
              <fieldset>
                <legend className={labelClass}>
                  Experience level <span className="text-red-400">*</span>
                </legend>
                <div className="grid grid-cols-3 gap-2">
                  {EXPERIENCE_LEVELS.map((level) => {
                    const selected = formData.experienceLevel === level.value;
                    return (
                      <button
                        key={level.value}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => updateField("experienceLevel", level.value)}
                        className={`flex h-10 items-center justify-center rounded-xl border px-2 text-xs font-medium transition-all duration-200 ${
                          selected
                            ? "border-[#00c8ff] bg-[#102b46] text-white"
                            : "border-[#293c60] bg-[#101a30] text-[#c2cde0] hover:border-[#49638d] hover:bg-[#142039]"
                        }`}
                      >
                        {level.label}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              {/* Submit */}
              <Button
                type="submit"
                disabled={submitting}
                className="mt-2 h-11 w-full rounded-xl border-0 bg-gradient-to-r from-[#168fff] via-[#6155ff] to-[#d42be8] text-sm font-semibold text-white shadow-[0_8px_24px_rgba(45,93,255,0.2)] transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Registering...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Register for FREE
                    <span aria-hidden="true" className="text-lg">
                      →
                    </span>
                  </span>
                )}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
