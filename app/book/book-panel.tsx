"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { INTEREST_OPTIONS, isInterestId } from "@/lib/interest";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle } from "lucide-react";

export default function BookPanel() {
  const searchParams = useSearchParams();
  const presetCourse = searchParams.get("course") ?? "";
  const src = searchParams.get("src") ?? "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: isInterestId(presetCourse) ? presetCourse : "",
    experienceLevel: "",
  });

  useEffect(() => {
    if (!isInterestId(presetCourse)) return;
    setFormData((c) => ({ ...c, course: presetCourse }));
  }, [presetCourse]);

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.course ||
      !formData.experienceLevel
    ) {
      alert("Please fill in all fields");
      return;
    }

    const phoneDigits = formData.phone.replace(/[^0-9]/g, "");
    if (phoneDigits.length < 7) {
      alert("Please enter a valid phone number");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/contact/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, src }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-16 text-center">
        <CheckCircle className="size-12 text-[#5B8CFF]" />
        <h2 className="text-2xl font-light text-white">Request received!</h2>
        <p className="max-w-sm text-sm leading-relaxed text-white/60">
          One of our experts will reach out within 24 hours on the contact
          details you provided.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-10 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 md:grid-cols-2"
    >
      {/* Name */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-white/50">
          FULL NAME <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          placeholder="Your name"
          className="h-11 rounded-lg border border-white/12 bg-white/5 px-3 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#5B8CFF] focus:bg-white/8"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-white/50">
          EMAIL <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          placeholder="you@example.com"
          className="h-11 rounded-lg border border-white/12 bg-white/5 px-3 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#5B8CFF] focus:bg-white/8"
        />
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-white/50">
          WHATSAPP / PHONE <span className="text-red-400">*</span>
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={(e) =>
            setFormData({
              ...formData,
              phone: e.target.value.replace(/[^0-9+\s]/g, ""),
            })
          }
          required
          placeholder="+91 98765 43210"
          className="h-11 rounded-lg border border-white/12 bg-white/5 px-3 text-sm text-white placeholder:text-white/25 outline-none transition focus:border-[#5B8CFF] focus:bg-white/8"
        />
      </div>

      {/* Experience level */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-white/50">
          EXPERIENCE LEVEL <span className="text-red-400">*</span>
        </label>
        <Select
          name="experienceLevel"
          value={formData.experienceLevel}
          onValueChange={(value) =>
            setFormData({ ...formData, experienceLevel: value ?? "" })
          }
          required
        >
          <SelectTrigger className="h-11 w-full border-white/12 bg-white/5 text-sm text-white focus:border-[#5B8CFF] data-[placeholder]:text-white/25">
            <SelectValue placeholder="Select your level" />
          </SelectTrigger>
          <SelectContent className="border-white/12 bg-[#0B0F1A] text-white">
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
            <SelectItem value="not-sure">I&apos;m not sure</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Course — full width */}
      <div className="flex flex-col gap-1.5 md:col-span-2">
        <label className="text-xs font-medium text-white/50">
          COURSE INTERESTED IN <span className="text-red-400">*</span>
        </label>
        <Select
          name="course"
          value={formData.course}
          onValueChange={(value) =>
            setFormData({ ...formData, course: value ?? "" })
          }
          required
        >
          <SelectTrigger className="h-11 w-full border-white/12 bg-white/5 text-sm text-white focus:border-[#5B8CFF] data-[placeholder]:text-white/25">
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent className="border-white/12 bg-[#0B0F1A] text-white">
            <SelectItem value="not-sure">I&apos;m not sure</SelectItem>
            {INTEREST_OPTIONS.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Submit — full width */}
      <div className="md:col-span-2">
        <Button
          type="submit"
          disabled={submitting}
          className="h-11 w-full rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] text-sm font-medium text-white hover:from-[#6B98FF] hover:to-[#3A64E8] disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Talk to an Expert →"}
        </Button>
        <p className="mt-3 text-center text-xs text-white/35">
          We&apos;ll reach out within 24 hours. No spam, ever.
        </p>
      </div>
    </form>
  );
}
