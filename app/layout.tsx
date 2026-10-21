import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import FloatingNavbar from "@/components/FloatingNavbar";
import Navbar from "@/components/Navbar";
import Finalcta from "@/components/Finalcta";
import { Footer } from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "42X Academy — Master SAP, Data Engineering & Power Platform",
    template: "%s | 42X Academy",
  },
  description:
    "Professional training in SAP, Data Engineering, and Power Platform with 1-on-1 mentorship, real enterprise projects, and career acceleration.",
  metadataBase: new URL("https://42xacademy.com"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "42X Academy",
    description:
      "Professional training in SAP, Data Engineering, and Power Platform with 1-on-1 mentorship.",
    url: "https://42xacademy.com",
    siteName: "42X Academy",
    images: ["/logo2.png"],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "42X Academy",
    description:
      "Professional training in SAP, Data Engineering, and Power Platform.",
    images: ["/logo2.png"],
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

        <Navbar />
        <FloatingNavbar />
        {children}
        <Finalcta />
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}