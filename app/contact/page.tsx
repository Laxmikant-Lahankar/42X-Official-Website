import type { Metadata } from "next";
import { Customsection } from "@/app/CustomSection";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact — 42X Academy",
  description:
    "Get in touch with 42X Academy about the next SAP, Data Engineering, or Power Platform cohort.",
};

export default function ContactPage() {
  return (
    <Customsection>
      <div className="flex min-h-[70vh] flex-col justify-center px-6 py-20 text-white md:px-16 md:py-32 lg:px-24 lg:py-40">
        <div className="mx-auto w-full max-w-2xl">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.28em] text-white/50">
            Contact
          </p>
          <h1 className="text-4xl font-light md:text-5xl">Get in touch</h1>
          <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/60 md:text-base">
            Tell us a bit about your goals. We will reach out about the next
            42X Academy cohort.
          </p>

          <form className="mt-12 flex flex-col gap-6">
            <label className="flex flex-col gap-2.5 text-left text-sm text-white/70">
              Name
              <input
                type="text"
                name="name"
                required
                className="h-12 rounded-lg border border-white/15 bg-white/5 px-4 text-white outline-none focus:border-[#2E57DF]"
              />
            </label>
            <label className="flex flex-col gap-2.5 text-left text-sm text-white/70">
              Email
              <input
                type="email"
                name="email"
                required
                className="h-12 rounded-lg border border-white/15 bg-white/5 px-4 text-white outline-none focus:border-[#2E57DF]"
              />
            </label>
            <label className="flex flex-col gap-2.5 text-left text-sm text-white/70">
              Message
              <textarea
                name="message"
                rows={7}
                required
                className="rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-white outline-none focus:border-[#2E57DF]"
              />
            </label>
            <Button
              type="submit"
              className="mt-2 h-12 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] text-white hover:from-[#6B98FF] hover:to-[#3A64E8]"
            >
              Send message
            </Button>
          </form>
        </div>
      </div>
    </Customsection>
  );
}
