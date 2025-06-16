import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface BoldLabelProps extends PropsWithChildren {
  className?: string;
}

export default function BoldLabel({ children, className }: BoldLabelProps) {
  return (
    <h1
      className={cn(
        "font-inter text-center text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl",
        className,
      )}
    >
      {children}
    </h1>
  );
}
