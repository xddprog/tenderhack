import React from "react";
import { NewChatIcon } from "@/shared/assets/newChatIcon";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet/sheet";
import { DialogTitle } from "@/shared/ui/dialog/dialog";
import { AssistantAside } from "./assistantAside";

export const AssistantHeader = () => {
  return (
    <section className="flex justify-between items-center border-b border-neutral-500 p-3">
      <div className="hidden md:block" />
      <Sheet>
        <DialogTitle className="sr-only">Mobile toggle</DialogTitle>
        <SheetTrigger asChild>
          <Menu className="w-6 h-6 text-white cursor-pointer mr-2 md:hidden" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0  flex gap-0 w-[300px] max-w-[90vw]"
        >
          <AssistantAside classname="flex" />
        </SheetContent>
      </Sheet>
      <NewChatIcon />
    </section>
  );
};
