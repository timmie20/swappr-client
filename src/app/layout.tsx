import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { ConfigProvider } from "antd";
import type { ThemeConfig } from "antd";

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
  title: "Swappr",
  description: "Swappr is a phone worth calculator and exchange system",
};

const customTheme: ThemeConfig = {
  token: {
    colorPrimary: "#3b82fd",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConfigProvider theme={customTheme}>
        <body
          className={`${switzer.variable} ${inter.variable} font-sans antialiased`}
        >
          {children}
        </body>
      </ConfigProvider>
    </html>
  );
}
