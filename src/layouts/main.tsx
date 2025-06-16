import Navbar from "@/components/shared/Navbar";
import React from "react";
import "@ant-design/v5-patch-for-react-19";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="mx-auto h-dvh max-w-[794px] px-4 pb-4 sm:px-0 sm:pb-0">
        {children}
      </main>
    </>
  );
}
