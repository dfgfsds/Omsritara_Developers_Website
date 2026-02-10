import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Headers from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/ScrollToTop";
import PopupContactForm from "@/components/PopupContactForm";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Omsritara Developers",
  description: "Omsritara Developers",
  verification: {
    google: "RI3eojFSgslOU-Voa5IcUKl8cKQjxvMxPw6q5QdyPUY",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="RI3eojFSgslOU-Voa5IcUKl8cKQjxvMxPw6q5QdyPUY"
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-visible`}>
        {/* Google tag (gtag.js) */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-DN5M3HQZFP"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DN5M3HQZFP');
          `}
        </Script>

        <Headers />
        <Toaster position="top-right" reverseOrder={false} />
        {children}
        <Footer />
        <ScrollToTop />
        <PopupContactForm />
      </body>
    </html>
  );
}
