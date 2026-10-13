"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

function ContactContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("intent") === "demo";
  const presetCourse = searchParams.get("course") ?? "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: isInterestId(presetCourse) ? presetCourse : "",
    experienceLevel: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState("");

  useEffect(() => {
    if (!isInterestId(presetCourse)) return;

    setFormData((current) => ({
      ...current,
      course: presetCourse,
    }));
  }, [presetCourse]);

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

      alert("Thanks! We'll reach out soon.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        course: "",
        experienceLevel: "",
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
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
