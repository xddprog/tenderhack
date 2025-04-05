import React from "react";
import { NewChatIcon } from "@/shared/assets/newChatIcon";
import { Menu, User2Icon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet/sheet";
import { DialogTitle } from "@/shared/ui/dialog/dialog";
import { AssistantAside } from "./assistantAside";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { userSelectors } from "@/entities/user/models/store/userSlice";
import TooltipAction from "@/shared/ui/tooltip/tooltipAction";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip/tooltip";

export const AssistantHeader = () => {
  const currentUser = useAppSelector(userSelectors.currentUser);
  return (
    <section className="flex justify-between items-center border-b border-neutral-500 p-3">
      <TooltipAction label="Новый чат" side="bottom">
        <NewChatIcon classname="hidden md:block" />
      </TooltipAction>

      <Sheet>
        <DialogTitle className="sr-only">Mobile toggle</DialogTitle>
        <SheetTrigger asChild>
          <Menu className="w-6 h-6 text-zinc-400 cursor-pointer mr-2 md:hidden" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0  flex gap-0 w-[300px] max-w-[90vw]"
        >
          <AssistantAside classname="flex" />
        </SheetContent>
      </Sheet>
      {currentUser && (
        <div className="flex items-center text-white space-x-3">
          <h2 className="font-semibold text-sm text-zinc-400">
            {" "}
            {currentUser?.email.split("@")[0]}
          </h2>
          <div className="bg-zinc-800/70 p-1.5 rounded-full cursor-pointer">
            <User2Icon className="text-zinc-400" />
          </div>
        </div>
      )}
    </section>
  );
};
