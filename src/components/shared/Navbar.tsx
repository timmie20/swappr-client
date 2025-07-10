import React from "react";
import { Button } from "antd";
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
              variant="text"
              color="primary"
              shape="round"
              size="middle"
              className="!text-small !text-tertiary/52 !font-switzer !font-medium"
            >
              Login
            </Button>
            <Button
              className="!font-switzer !font-medium"
              shape="round"
              size="middle"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
