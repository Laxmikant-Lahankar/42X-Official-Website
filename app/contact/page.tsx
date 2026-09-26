"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Customsection } from "@/app/CustomSection";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function ContactContent() {
  const searchParams = useSearchParams();
  const isDemo = searchParams.get("intent") === "demo";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    experienceLevel: "",
  });

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers, +, and spaces
    const value = e.target.value.replace(/[^0-9+\s]/g, "");
    setFormData({ ...formData, phone: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all fields are filled
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

    // Validate phone length
    const phoneDigits = formData.phone.replace(/[^0-9]/g, "");
    if (phoneDigits.length < 7) {
      alert("Please enter a valid phone number");
      return;
    }

    // If validation passes, submit form
    console.log("Form submitted:", formData);
    // You can add your API call here
  };

  return (
    <div className="px-6 py-16 text-white md:py-24">
      <div className="mx-auto max-w-xl">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-white/50">
          {isDemo ? "Free Session" : "Contact"}
        </p>
        <h1 className="text-3xl md:text-4xl">
          {isDemo ? "Book your free session" : "Get in touch"}
        </h1>
        <p className="mt-4 text-sm text-white/60">
          {isDemo
            ? "Add your info below and our representative will call you to schedule your free session."
            : "Tell us a bit about your goals. We will reach out about the next 42X Academy cohort."}
        </p>

        <form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-left text-sm text-white/70">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-white outline-none focus:border-[#2E57DF]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-left text-sm text-white/70">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-white outline-none focus:border-[#2E57DF]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-left text-sm text-white/70">
              WhatsApp / Phone number <span className="text-red-400">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handlePhoneChange}
              required
              placeholder="e.g. +91 98765 43210"
              className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-white outline-none focus:border-[#2E57DF]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-left text-sm text-white/70">
              Course interested in <span className="text-red-400">*</span>
            </label>
            <Select
              name="course"
              value={formData.course}
              onValueChange={(value) =>
                setFormData({ ...formData, course: value })
              }
              required
            >
              <SelectTrigger className="h-11 w-full border-white/15 bg-white/5 text-white focus:border-[#2E57DF] data-[placeholder]:text-white/40 py-6">
                <SelectValue placeholder="Select a course" />
              </SelectTrigger>
              <SelectContent className="border-white/15 bg-[#0B0F1A] text-white">
                <SelectItem value="sap">SAP</SelectItem>
                <SelectItem value="power-platform">Power Platform</SelectItem>
                <SelectItem value="data-engineering">
                  Data Engineering
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-left text-sm text-white/70">
              Experience level <span className="text-red-400">*</span>
            </label>
            <Select
              name="experienceLevel"
              value={formData.experienceLevel}
              onValueChange={(value) =>
                setFormData({ ...formData, experienceLevel: value })
              }
              required
            >
              <SelectTrigger className="h-11 w-full border-white/15 bg-white/5 text-white focus:border-[#2E57DF] data-[placeholder]:text-white/40 py-6">
                <SelectValue placeholder="Select your level" />
              </SelectTrigger>
              <SelectContent className="border-white/15 bg-[#0B0F1A] text-white">
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="mt-2 h-11 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] text-white hover:from-[#6B98FF] hover:to-[#3A64E8]"
          >
            Send Request
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Customsection>
      <Suspense fallback={null}>
        <ContactContent />
      </Suspense>
    </Customsection>
  );
}
