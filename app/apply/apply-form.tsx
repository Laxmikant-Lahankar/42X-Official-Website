"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { CTAS } from "@/lib/cta";

const inputClass =
  "h-11 w-full rounded-lg border border-white/15 bg-white/5 px-3 text-white outline-none focus:border-[#2E57DF]";

export default function ApplyForm() {
  const src = useSearchParams().get("src") ?? "";
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    background: "",
    track: "",
    why: "",
  });

  const handlePhoneChange = (value: string) => {
    setFormData({ ...formData, phone: value.replace(/[^0-9+\s]/g, "") });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const phoneDigits = formData.phone.replace(/[^0-9]/g, "");
    if (phoneDigits.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/apply/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, src }),
      });
      if (!res.ok) throw new Error("Submit failed");
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="mt-10 rounded-xl border border-white/15 bg-white/5 p-6">
        <h2 className="text-xl text-white">Application received</h2>
        <p className="mt-3 text-sm leading-relaxed text-white/70">
          We&apos;ll be in touch with next steps.
        </p>
      </div>
    );
  }

  return (
    <form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}>
      <input type="hidden" name="src" value={src} />

      <div className="flex flex-col gap-1">
        <label htmlFor="apply-name" className="text-left text-sm text-white/70">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          id="apply-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={formData.name}
          onChange={(event) =>
            setFormData({ ...formData, name: event.target.value })
          }
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="apply-phone" className="text-left text-sm text-white/70">
          Phone <span className="text-red-400">*</span>
        </label>
        <input
          id="apply-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          placeholder="e.g. +91 98765 43210"
          value={formData.phone}
          onChange={(event) => handlePhoneChange(event.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="apply-email" className="text-left text-sm text-white/70">
          Email <span className="text-red-400">*</span>
        </label>
        <input
          id="apply-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor="apply-background"
          className="text-left text-sm text-white/70"
        >
          Background <span className="text-red-400">*</span>
        </label>
        <select
          id="apply-background"
          name="background"
          required
          value={formData.background}
          onChange={(event) =>
            setFormData({ ...formData, background: event.target.value })
          }
          className={inputClass}
        >
          <option value="" disabled>
            Select your background
          </option>
          <option value="student">Student</option>
          <option value="working-professional">Working professional</option>
          <option value="career-switcher">Career switcher</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="apply-track" className="text-left text-sm text-white/70">
          Preferred track <span className="text-red-400">*</span>
        </label>
        <select
          id="apply-track"
          name="track"
          required
          value={formData.track}
          onChange={(event) =>
            setFormData({ ...formData, track: event.target.value })
          }
          className={inputClass}
        >
          <option value="" disabled>
            Select a track
          </option>
          <option value="sap">SAP</option>
          <option value="power-bi">Power BI</option>
          <option value="power-platform">Power Platform</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="apply-why" className="text-left text-sm text-white/70">
          Why do you want to join? <span className="text-red-400">*</span>
        </label>
        <textarea
          id="apply-why"
          name="why"
          required
          rows={4}
          value={formData.why}
          onChange={(event) =>
            setFormData({ ...formData, why: event.target.value })
          }
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-white outline-none focus:border-[#2E57DF]"
        />
      </div>

      {error ? (
        <p role="alert" className="text-sm text-red-400">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 inline-flex h-10 items-center justify-center rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] px-5 text-[13px] font-medium text-white hover:from-[#6B98FF] hover:to-[#3A64E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB0FF] focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50"
      >
        {submitting ? "Sending..." : CTAS.primary.label}
      </button>
    </form>
  );
}
