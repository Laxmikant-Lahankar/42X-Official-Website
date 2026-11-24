import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import FloatingNavbar from "@/components/FloatingNavbar";
import Navbar from "@/components/Navbar";
import Finalcta from "@/components/Finalcta";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/JsonLd";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { SITE, organizationSchema } from "@/lib/seo";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const DEFAULT_TITLE = "SAP, Power BI & DevOps Training | Online & Pune | 42X Academy";
const DEFAULT_DESCRIPTION = `SAP (MM, SD, EWM, ABAP, BASIS), Power BI, Power Platform and DevOps training with 1-on-1 mentorship and real projects. Live online or in Pune.`;

// Pages override title/description/canonical/openGraph via pageMeta() in lib/seo.ts.
// No canonical here on purpose: a layout canonical would be inherited by every page.
export const metadata: Metadata = {
  title: {
    default: DEFAULT_TITLE,
    template: "%s | 42X Academy",
  },
  description: DEFAULT_DESCRIPTION,
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE.url,
    siteName: SITE.name,
    images: [SITE.ogImage],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [SITE.ogImage],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${poppins.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        {/* Meta Pixel */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '28757198127235681');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=28757198127235681&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        <JsonLd data={organizationSchema()} />
        <Navbar />
        <FloatingNavbar />
        {children}
        <Finalcta />
        <Footer />
        <WhatsAppFab />
        <Analytics />
      </body>
    </html>
  );
}