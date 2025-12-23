import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?:
    | "link"
    | "ghost"
    | "default"
    | "destructive"
    | "outline"
    | "secondary";
  size?: "sm" | "default" | "lg" | "icon";
  shape?: "default" | "round";
  children: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string;
};

export default function PrimaryButton({
  variant = "default",
  size = "default",
  shape = "default",
  children,
  onClick,
  fullWidth,
  className,
}: ButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn(
        fullWidth && "w-full",
        shape === "round" && "rounded-full",
        "font-switzer text-small bg-[#08161f] font-medium hover:bg-[#08161f]/90",
        className,
      )}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
