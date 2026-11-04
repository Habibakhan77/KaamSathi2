import type { Metadata } from "next";
import "@/styles/globals.css";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingAIAssistant } from "@/components/ai/FloatingAIAssistant";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "KaamSaathi | AI-Powered Verified Local Services Marketplace for Pakistan",
  description:
    "Har kaam ke liye, aik bharosemand saathi. Pakistan's first AI-powered marketplace connecting households with verified electricians, plumbers, AC technicians, and carpenters in Swat (Mingora, Saidu Sharif, Kanju). BS Software Engineering capstone project at University of Swat.",
  keywords: [
    "KaamSaathi",
    "Swat Local Services",
    "Electrician in Mingora",
    "Plumber Saidu Sharif",
    "AC Technician Kanju",
    "Verified Ustads Pakistan",
    "University of Swat BSSE",
  ],
  authors: [{ name: "Habiba Khan & Laiba Khaist (Supervised by Muhammad Hamza)" }],
  icons: {
    icon: "/brand/kaamsaathi-icon.svg",
    shortcut: "/brand/kaamsaathi-icon.svg",
    apple: "/brand/kaamsaathi-icon.svg",
  },
  openGraph: {
    title: "KaamSaathi: Har kaam ke liye, aik bharosemand saathi.",
    description: "AI-Powered Verified Local Services Marketplace launching in Swat Valley.",
    url: "https://kaamsaathi.pk",
    siteName: "KaamSaathi",
    images: [
      {
        url: "/brand/kaamsaathi-logo.png",
        width: 1200,
        height: 630,
        alt: "KaamSaathi - AI-Powered Verified Local Services",
      },
    ],
    locale: "en_PK",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-emerald-700 selection:text-white">
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingAIAssistant />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
