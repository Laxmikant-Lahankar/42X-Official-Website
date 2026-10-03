"use client";

import { useState, useEffect, useRef } from "react";

interface Props {
  courseSlug: string;
  courseTitle: string;
  onUnlocked: () => void;
  onClose: () => void;
}

export function SyllabusUnlockModal({
  courseSlug,
  courseTitle,
  onUnlocked,
  onClose,
}: Props) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experienceLevel: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Focus first input on mount
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9+\s]/g, "");
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.experienceLevel
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const phoneDigits = formData.phone.replace(/[^0-9]/g, "");
    if (phoneDigits.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/contact/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          course: courseSlug,
          experienceLevel: formData.experienceLevel,
        }),
      });

      if (!res.ok) throw new Error("Submit failed");

      onUnlocked();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "h-11 w-full rounded-sm border border-white/15 bg-white/[0.04] px-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/40";

  const levelOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="syllabus-modal-title"
        className="relative w-full max-w-md rounded-sm bg-[#111111] ring-1 ring-white/10 animate-fade-up"
        style={{ animationDuration: "0.4s" }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-sm text-white/40 transition-colors hover:bg-white/[0.06] hover:text-white/70"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="px-8 pb-8 pt-7">
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm bg-white/[0.06] ring-1 ring-white/10">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white/60"
              aria-hidden="true"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>

          <h2
            id="syllabus-modal-title"
            className="text-xl font-light text-white"
          >
            Unlock the full syllabus
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-white/50">
            Get access to the complete{" "}
            <span className="text-white/70">{courseTitle}</span> curriculum.
            We&apos;ll also send you course details and cohort updates.
          </p>

          <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-white/50">
                Name <span className="text-red-400">*</span>
              </label>
              <input
                ref={firstInputRef}
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Your full name"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-white/50">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                placeholder="you@example.com"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-white/50">
                WhatsApp / Phone <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                placeholder="e.g. +91 98765 43210"
                required
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-white/50">
                Experience level <span className="text-red-400">*</span>
              </label>
              <div className="flex gap-2">
                {levelOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        experienceLevel: opt.value,
                      }))
                    }
                    className={[
                      "flex-1 rounded-sm py-2.5 text-xs transition-colors ring-1",
                      formData.experienceLevel === opt.value
                        ? "bg-white/10 ring-white/30 text-white"
                        : "bg-white/[0.03] ring-white/10 text-white/50 hover:bg-white/[0.06] hover:text-white/70",
                    ].join(" ")}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-1 h-11 w-full rounded-sm bg-white text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {submitting ? "Submitting\u2026" : "Unlock full syllabus \u2192"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
