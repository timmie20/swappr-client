import React from "react";
import { Button } from "@/components/ui/button";
export default function Navbar() {
  return (
    <nav className="bg-white">
      <div className="mx-auto max-w-[850px] px-4 sm:px-4 lg:px-0">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-shrink-0">
            <h1 className="text-large font-bold tracking-tight text-gray-900">
              swappr
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="default"
              className="text-small text-tertiary/52 font-switzer rounded-full font-medium"
            >
              Login
            </Button>
            <Button
              size="default"
              className="font-switzer rounded-full font-medium"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
