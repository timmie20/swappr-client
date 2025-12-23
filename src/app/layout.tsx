import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import { ClerkProvider, QueryProvider } from "@/lib/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const switzer = localFont({
  src: [
    {
      path: "../../public/fonts/Switzer-Variable.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/Switzer-VariableItalic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-switzer",
});

export const metadata: Metadata = {
  title: "Swappr | Nigeria's First phone valuation system",
  description: "Swappr is a phone worth calculator and exchange system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${switzer.variable} ${inter.variable} font-sans antialiased`}
        >
          <QueryProvider>
            <Navbar />
            <main className="mx-auto h-dvh max-w-[850px] px-4 pb-4 sm:px-0 sm:pb-0">
              {children}
            </main>
          </QueryProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
