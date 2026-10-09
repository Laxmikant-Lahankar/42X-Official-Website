import type { Metadata } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
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
    icon: "/logo2.png",
    shortcut: "/logo2.png",
    apple: "/logo2.png",
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
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
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