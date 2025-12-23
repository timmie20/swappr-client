import React from "react";
import PrimaryButton from "@/components/others/PrimaryButton";
import Heading from "@/components/shared/Heading";
import { devices } from "@/data/data";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import PhoneDealCard from "@/components/others/PhoneDealCard";

const models = [
  {
    id: 1,
    label: "iPhone",
    isSelected: true,
  },
  {
    id: 2,
    label: "Samsung Galaxy",
    isSelected: false,
  },
  {
    id: 3,
    label: "Google Pixel",
    isSelected: false,
  },
  {
    id: 4,
    label: "OnePlus",
    isSelected: false,
  },
  {
    id: 5,
    label: "Xiaomi",
    isSelected: false,
  },
  {
    id: 6,
    label: "Huawei",
    isSelected: false,
  },
  {
    id: 7,
    label: "Vivo",
    isSelected: false,
  },
  {
    id: 8,
    label: "Tecno",
    isSelected: false,
  },
];
export default function Client() {
  return (
    <div className="py-12 sm:px-6">
      <div className="text-center">
        <Heading>
          Explore and shop from a large list of budget friendly deals
        </Heading>

        <div className="relative mx-auto my-10 h-18 max-w-md rounded-full px-2 py-2 sm:flex sm:justify-center">
          <div className="from-app-secondary to-app-primary absolute inset-0 top-5 rounded-full bg-gradient-to-r blur-2xl" />
          <div className="relative z-10 flex w-full items-center">
            <Search size={16} className="absolute left-4 text-gray-400" />
            <Input
              placeholder="What are you looking to shop for?"
              className="placeholder:text-tertiary/58 font-switzer h-14 rounded-full pr-4 pl-12"
            />
          </div>
        </div>
      </div>

      <div className="scrollbar-hide mx-auto my-10 max-w-[588px] snap-x snap-mandatory overflow-x-auto py-3">
        <div className="flex min-w-max items-center gap-4">
          {models.map((model) => (
            <div key={model.id} className="shrink-0 snap-start">
              <PrimaryButton
                variant={model.isSelected ? "default" : "outline"}
                shape="round"
                size="lg"
              >
                {model.label}
              </PrimaryButton>
            </div>
          ))}
        </div>
      </div>

      <section id="deals" className="mt-12">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {devices.map((deal) => (
            <PhoneDealCard deal={deal} key={deal.id} />
          ))}
        </div>
      </section>
    </div>
  );
}
