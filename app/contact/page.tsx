"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, CheckCircle2, X } from "lucide-react";
import { INTEREST_OPTIONS, isInterestId } from "@/lib/interest";
import { Customsection } from "@/app/CustomSection";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCourse } from "@/data/courses";

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

function ContactContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("intent") === "demo";
  const presetCourse = searchParams.get("course") ?? "";

  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: isInterestId(presetCourse) ? presetCourse : "",
    experienceLevel: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isInterestId(presetCourse)) return;

    setFormData((current) => ({
      ...current,
      course: presetCourse,
    }));
  }, [presetCourse]);

  // Determine course details for customized labels and redirection
  const activeCourseId = presetCourse || formData.course;
  const courseDetails = activeCourseId ? getCourse(activeCourseId) : undefined;
  const courseName =
    courseDetails?.title ??
    INTEREST_OPTIONS.find((o) => o.id === activeCourseId)?.label ??
    "the course";

  const getRedirectUrl = () => {
    if (activeCourseId) {
      return `/courses/${activeCourseId}`;
    }
    return "/courses";
  };

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(getRedirectUrl());
    }
  };

  const handleRedirect = () => {
    router.push(getRedirectUrl());
  };

  // 3-second countdown timer before redirecting
  useEffect(() => {
    if (!showThankYou) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showThankYou]);

  const updateField = (field: keyof typeof formData, value: string) => {
    if (errorMessage) setErrorMessage("");
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
    setErrorMessage("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.course ||
      !formData.experienceLevel
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");

    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setErrorMessage("Please enter a valid phone number (7-15 digits).");
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

      setShowThankYou(true);
    } catch (err) {
      console.error(err);
      setErrorMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `h-12 w-full rounded-2xl border bg-[#101a30] px-4 text-base text-white outline-none transition-colors duration-200 placeholder:text-[#94a3b8] ${
      focusedField === field
        ? "border-[#00c8ff] shadow-[0_0_0_1px_rgba(0,200,255,0.12)]"
        : "border-[#293c60] hover:border-[#3b5078]"
    }`;

  const labelClass = "mb-1.5 block text-sm font-normal text-[#a1aec2]";

  return (
    <div className="relative min-h-full overflow-hidden bg-black px-4 py-7 text-white sm:px-6 sm:py-9">
      {/* Subtle blue glow, keeping the page predominantly black */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-64 w-[500px] -translate-x-1/2 rounded-full bg-[#1749a8]/10 blur-[110px]"
      />

      <div className="relative mx-auto w-full max-w-xl">
        {/* Back button on top-left of the form */}
        <div className="mb-5 flex items-center">
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 transition-all hover:border-white/20 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00c8ff]"
          >
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>{courseDetails ? `Back to ${courseDetails.title}` : "Back to courses"}</span>
          </button>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#38bdf8]">
            {isDemo ? "FREE SESSION" : "42X ACADEMY"}
          </p>

          <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {isDemo ? "Book your free session" : "Let's get started."}
          </h1>

          <p className="mt-2 max-w-lg text-sm leading-5 text-[#94a3b8]">
            {isDemo
              ? "Share your details and our representative will contact you to schedule your free session."
              : "Tell us about yourself and your learning goals. Our team will reach out about the next cohort."}
          </p>
        </div>

        {/* Inline error banner */}
        {errorMessage ? (
          <div className="mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-300">
            {errorMessage}
          </div>
        ) : null}

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className={labelClass}>
              Name <span className="text-red-400">*</span>
            </label>

            <input
              id="name"
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
            <label htmlFor="email" className={labelClass}>
              Email <span className="text-red-400">*</span>
            </label>

            <input
              id="email"
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
            <label htmlFor="phone" className={labelClass}>
              WhatsApp / Phone <span className="text-red-400">*</span>
            </label>

            <input
              id="phone"
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

          {/* Course */}
          <div>
            <label htmlFor="course" className={labelClass}>
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
                id="course"
                className="p-6 rounded-2xl w-full border border-[#293c60] bg-[#101a30] 
                px-4 text-base text-white transition-colors hover:border-[#3b5078] focus:border-[#00c8ff] 
                focus:ring-0 data-[placeholder]:text-[#94a3b8]"
              >
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>

              <SelectContent className="border-[#293c60] bg-[#101a30] text-white">
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

            <div className="grid grid-cols-3 gap-2.5">
              {EXPERIENCE_LEVELS.map((level) => {
                const selected = formData.experienceLevel === level.value;

                return (
                  <button
                    key={level.value}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => updateField("experienceLevel", level.value)}
                    className={`flex h-12 items-center justify-center rounded-2xl border px-2 text-sm font-medium transition-all duration-200 ${
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
            className="mt-1 h-12 w-full rounded-2xl border-0 bg-gradient-to-r from-[#168fff] via-[#6155ff] to-[#d42be8] text-base font-semibold text-white shadow-[0_8px_24px_rgba(45,93,255,0.16)] transition-all duration-200 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Submitting...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Submit Request
                <span aria-hidden="true" className="text-xl">
                  →
                </span>
              </span>
            )}
          </Button>
        </form>
      </div>

      {/* Custom Thank You Modal */}
      {showThankYou && mounted
        ? createPortal(
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
              {/* Backdrop */}
              <div
                aria-hidden="true"
                onClick={handleRedirect}
                className="animate-in fade-in-0 duration-200 absolute inset-0 bg-black/80 backdrop-blur-md"
              />

              {/* Modal Card */}
              <div
                role="dialog"
                aria-modal="true"
                className="animate-in fade-in-0 zoom-in-95 duration-200 relative z-10 flex w-full max-w-md flex-col items-center rounded-3xl border border-[#243657] bg-[#070D1B] p-6 text-center text-white shadow-[0_24px_80px_rgba(0,0,0,0.85)] sm:p-8"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,180,255,0.15), transparent 75%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(123,61,255,0.15), transparent 75%)",
                }}
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={handleRedirect}
                  aria-label="Close"
                  className="absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <X className="size-4" />
                </button>

                {/* Celebration Checkmark */}
                <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30">
                  <CheckCircle2 className="size-9" />
                </div>

                <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
                  Thank You!
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-[#94a3b8]">
                  We&apos;ve received your enquiry for{" "}
                  <span className="font-semibold text-white">{courseName}</span>.
                  Our team will reach out to you shortly to assist you.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#00c8ff]/25 bg-[#00c8ff]/10 px-3 py-1 text-xs text-[#38bdf8]">
                  <span>Redirecting to course in</span>
                  <span className="flex size-5 items-center justify-center rounded-full bg-[#00c8ff]/25 font-bold text-white">
                    {countdown}
                  </span>
                </div>

                <Button
                  type="button"
                  onClick={handleRedirect}
                  className="mt-6 h-11 w-full rounded-xl border-0 bg-gradient-to-r from-[#168fff] via-[#6155ff] to-[#d42be8] text-sm font-semibold text-white shadow-[0_8px_24px_rgba(45,93,255,0.2)] transition-all hover:brightness-110"
                >
                  Return to Course Now
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}

export default function ContactPage() {
  return (
    <Customsection>
      <Suspense fallback={<div className="min-h-[60vh] bg-black" />}>
        <ContactContent />
      </Suspense>
    </Customsection>
  );
}
