"use client";
import React from "react";
import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

export default function Confetti() {
  const { width, height } = useWindowSize();
  return (
    <ReactConfetti
      className="fixed top-0 right-0 left-0 z-20 h-screen w-full object-cover"
      width={width}
      height={height}
      recycle={false}
    />
  );
}
