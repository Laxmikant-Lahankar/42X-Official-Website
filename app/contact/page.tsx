import { Customsection } from "@/app/CustomSection";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  return (
    <Customsection>
      <div className="px-6 py-16 text-white md:py-24">
        <div className="mx-auto max-w-xl">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-white/50">
            Contact
          </p>
          <h1 className="text-3xl md:text-4xl">Get in touch</h1>
          <p className="mt-4 text-sm text-white/60">
            Tell us a bit about your goals. We will reach out about the next
            42X Academy cohort.
          </p>

          <form className="mt-10 flex flex-col gap-4">
            <label className="flex flex-col gap-2 text-left text-sm text-white/70">
              Name
              <input
                type="text"
                name="name"
                required
                className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-white outline-none focus:border-[#2E57DF]"
              />
            </label>
            <label className="flex flex-col gap-2 text-left text-sm text-white/70">
              Email
              <input
                type="email"
                name="email"
                required
                className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-white outline-none focus:border-[#2E57DF]"
              />
            </label>
            <label className="flex flex-col gap-2 text-left text-sm text-white/70">
              Message
              <textarea
                name="message"
                rows={5}
                required
                className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white outline-none focus:border-[#2E57DF]"
              />
            </label>
            <Button
              type="submit"
              className="mt-2 h-11 rounded-full bg-gradient-to-b from-[#5B8CFF] to-[#2E57DF] text-white hover:from-[#6B98FF] hover:to-[#3A64E8]"
            >
              Send message
            </Button>
          </form>
        </div>
      </div>
    </Customsection>
  );
}
