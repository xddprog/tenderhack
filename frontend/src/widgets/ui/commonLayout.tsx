import { AssistantAside } from "@/features/assistant/ui/assistantAside";
import { ScrollArea } from "@/shared/ui/scrollArea/scrollArea";
import React, { FC, PropsWithChildren } from "react";

export const CommonLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className=" flex h-screen ">
      <AssistantAside />
      <main className="flex-1 ">{children}</main>
    </div>
  );
};
