import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { PanelBottom, FileDown } from "lucide-react";

export default function DetailsDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          View Details <PanelBottom />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Details</DrawerTitle>
            <DrawerDescription>
              These are the details your phone&apos;s worth calcalution
            </DrawerDescription>
          </DrawerHeader>

          <div></div>
          <DrawerFooter>
            <Button className="cursor-pointer">
              Download <FileDown />
            </Button>
            <DrawerClose>
              <Button variant="outline" className="w-full cursor-pointer">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
