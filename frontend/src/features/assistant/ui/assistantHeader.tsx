import React from "react";
import { NewChatIcon } from "@/shared/assets/newChatIcon";
import { Menu, User2Icon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet/sheet";
import { DialogTitle } from "@/shared/ui/dialog/dialog";
import { AssistantAside } from "./assistantAside";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { userSelectors } from "@/entities/user/models/store/userSlice";
import TooltipAction from "@/shared/ui/tooltip/tooltipAction";
import { chatSelectors } from "@/entities/chat/model/store/chatSlice";
import clsx from "clsx";
import { useActions } from "@/shared/hooks/useActions";
import { Button } from "@/shared/ui/button/button";
import { EModalVariables } from "@/shared/libs/modalVariables";

export const AssistantHeader = () => {
  const currentUser = useAppSelector(userSelectors.currentUser);
  const currentChatId = useAppSelector(chatSelectors.currentChatId);
  const { resetMessage, setOpen } = useActions();

  const handleNewChat = async () => {
    resetMessage();
  };

  const handleOpen = () =>
    setOpen({ type: EModalVariables.CONFIRMATION, isOpen: true });

  return (
    <section className="flex justify-between items-center border-b px-5 border-neutral-500 p-3">
      <div
        className={clsx("hidden", !currentChatId ? "hidden" : "md:block")}
        onClick={handleNewChat}
      >
        <TooltipAction label="Новый чат" side="bottom">
          <NewChatIcon classname="text-zinc-400" />
        </TooltipAction>
      </div>
      {!currentChatId && <div className="hidden md:block" />}

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
      {!currentUser && (
        <Button variant={"ghost"} className="bg-white" onClick={handleOpen}>
          Войти
        </Button>
      )}
    </section>
  );
};
