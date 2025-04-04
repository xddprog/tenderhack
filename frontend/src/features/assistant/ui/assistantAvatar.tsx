import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar/avatar";
import React from "react";

export const AssistantAvatar = () => {
  return (
    <Avatar className="h-11 w-11">
      {/* <AvatarImage src="/images/tmsg-widget-logo.png" alt="@shadcn" /> */}
      <AvatarFallback>IO</AvatarFallback>
    </Avatar>
  );
};
