import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HydrationWrapper from "./HydrationWrapper";

// ✅ Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata
export const metadata: Metadata = {
  title: "Tech Nerds",
  description: "Gamified learning platform for B.Tech CSE students.",
};

// ✅ Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-black via-gray-950 to-gray-900 text-white`}
      >
        {/* Client-side hydration safe wrapper */}
        <HydrationWrapper>
          {/* Optional neon background glow */}
          <div className="fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {children}
        </HydrationWrapper>
      </body>
    </html>
  );
}
