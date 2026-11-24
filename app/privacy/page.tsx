import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { SITE, pageMeta } from "@/lib/seo";

// DRAFT for review by the founders / legal advisor before relying on it.
// Facts here reflect the site's code as of the "updated" date: what the forms
// collect, where submissions go, browser storage and the tracking scripts.
export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How 42X Academy collects, uses and protects the details you share through our website, enquiry forms and WhatsApp.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="24 November 2026">
      <p>
        This policy explains what information 42X Academy (&ldquo;we&rdquo;,
        &ldquo;us&rdquo;) collects when you use {SITE.url.replace("https://", "")},
        why we collect it and the choices you have. We keep it short and in plain
        language.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Details you give us</strong> when you send an enquiry, book a
          free session or unlock a syllabus: your name, email address, phone
          number, the course you are interested in and your experience level.
        </li>
        <li>
          <strong>Messages you send us</strong> by email, phone or WhatsApp.
        </li>
        <li>
          <strong>Usage information</strong> collected by the analytics and
          advertising tools described below, such as pages visited, device type
          and approximate location.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and share course details, fees and batch dates.</li>
        <li>To arrange a free session or counselling call you asked for.</li>
        <li>To understand which pages are useful and improve the website.</li>
        <li>To measure and improve our advertising.</li>
      </ul>
      <p>We do not sell your personal information.</p>

      <h2>Where your enquiry is stored</h2>
      <p>
        Enquiry form submissions are stored in our Microsoft 365 workspace
        (SharePoint), which only authorised members of our team can access.
      </p>

      <h2>Your browser</h2>
      <p>
        To save you from typing your details twice, the website keeps the
        details you entered in your browser&apos;s local storage for up to 2
        hours. You can clear this at any time from your browser settings.
      </p>

      <h2>Analytics and advertising tools</h2>
      <ul>
        <li>
          <strong>Vercel Web Analytics</strong> counts page views so we can see
          which pages are useful.
        </li>
        <li>
          <strong>Google Analytics</strong> (through Google Tag Manager) shows
          us how visitors find and use the site, such as which pages are
          visited and which buttons are clicked. It uses cookies. You can opt
          out with Google&apos;s{" "}
          <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
            Analytics opt-out add-on
          </a>{" "}
          or by blocking cookies in your browser.
        </li>
        <li>
          <strong>Meta Pixel</strong> (Facebook / Instagram) helps us measure our
          ads and show them to people who may be interested. Meta may use cookies
          for this. You can manage ad preferences in your Meta account settings
          and block cookies in your browser.
        </li>
      </ul>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiry details only for as long as we need them to respond to
        you and to provide the courses you sign up for, and we delete them when
        they are no longer needed.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask us to access, correct or delete your personal information,
        or to stop contacting you, at any time. Email{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we will respond
        as soon as possible.
      </p>

      <h2>Contact</h2>
      <p>
        42X Academy, {SITE.address.streetAddress}, {SITE.address.addressLocality}{" "}
        {SITE.address.postalCode}, India · <a href={`mailto:${SITE.email}`}>{SITE.email}</a>{" "}
        · +91 84848 34242
      </p>

      <p>
        If we change this policy, we will update this page and the date at the
        top.
      </p>
    </LegalPage>
  );
}
