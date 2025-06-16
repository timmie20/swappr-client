"use client";
import "@ant-design/v5-patch-for-react-19";

import DeviceCard from "@/components/others/DeviceCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AppleIcon from "@/components/icon/apple-icon";
import Heading from "@/components/shared/Heading";
import { devices } from "@/data/data";

const iphoneModels = [
  "7",
  "7 Plus",
  "8",
  "8 Plus",
  "X",
  "XR",
  "XS",
  "XS Max",
  "11",
  "11 Pro",
  "11 Pro Max",
  "SE (2nd gen)",
  "12 mini",
  "12",
  "12 Pro",
  "12 Pro Max",
  "13 mini",
  "13",
  "13 Pro",
  "13 Pro Max",
  "SE (3rd gen)",
  "14",
  "14 Plus",
  "14 Pro",
  "14 Pro Max",
  "15",
  "15 Plus",
  "15 Pro",
  "15 Pro Max",
  "16e",
  "16",
  "16 Plus",
  "16 Pro",
  "16 Pro Max",
];

export default function CheckWorth() {
  return (
    <div className="py-12 sm:px-6">
      <div className="text-center">
        <Heading>Find out how much your iphone is worth </Heading>
      </div>

      <div className="scrollbar-hide my-10 flex w-full snap-mandatory items-center gap-2 overflow-x-auto md:flex-wrap md:justify-center">
        {iphoneModels.map((model) => (
          <Button variant="outline" size="sm" key={model}>
            <AppleIcon />
            {model}
          </Button>
        ))}
      </div>

      <section id="deals" className="mt-12">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {devices.map((device) => (
            <Link
              key={device.id}
              href={`/check-worth/${device.id}`}
              className="block"
            >
              <DeviceCard device={device} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
