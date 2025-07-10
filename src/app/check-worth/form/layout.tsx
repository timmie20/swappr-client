import React from "react";
import ProgressBar from "@/components/shared/progress";

interface FormLayoutProps {
  children: React.ReactNode;
}

export default function FormLayout({ children }: FormLayoutProps) {
  return (
    <div className="relative mx-auto w-full space-y-6 sm:max-w-[640px]">
      <div className="sticky top-0 z-50 bg-white py-4 min-[460px]:mt-16">
        <ProgressBar />
      </div>
      <main className="min-h-[80dvh] min-[460px]:min-h-fit">{children}</main>
    </div>
  );
}
