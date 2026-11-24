import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { SITE, pageMeta } from "@/lib/seo";

// DRAFT for review by the founders / legal advisor before relying on it.
export const metadata: Metadata = pageMeta({
  title: "Terms of Use",
  description:
    "The terms that apply when you use the 42X Academy website and enquire about our courses.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated="24 November 2026">
      <p>
        These terms apply to your use of {SITE.url.replace("https://", "")}. By
        using the website you agree to them.
      </p>

      <h2>Course information</h2>
      <p>
        We describe our courses, syllabi, durations and formats as accurately as
        we can. Durations are estimates and can change with the batch and
        trainer schedule. Fees, batch dates and enrolment terms are confirmed
        with you directly before you enrol.
      </p>

      <h2>No job guarantee</h2>
      <p>
        Our courses are designed to build practical, job-relevant skills, but
        we do not guarantee employment, interviews or a particular salary.
      </p>

      <h2>Trademarks</h2>
      <p>
        SAP, S/4HANA, Power BI, Power Platform and other product names belong
        to their respective owners. 42X Academy is an independent training
        provider and is not affiliated with or endorsed by these companies
        unless we say so explicitly.
      </p>

      <h2>Our content</h2>
      <p>
        The website&apos;s text, graphics, syllabi and course materials belong
        to 42X Academy. You may view and share links to them, but please do not
        copy or republish them without our permission.
      </p>

      <h2>Links to other sites</h2>
      <p>
        We link to other websites, such as WhatsApp, LinkedIn and Instagram. We
        are not responsible for their content or practices.
      </p>

      <h2>Privacy</h2>
      <p>
        How we handle your information is explained in our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms? Email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </LegalPage>
  );
}
