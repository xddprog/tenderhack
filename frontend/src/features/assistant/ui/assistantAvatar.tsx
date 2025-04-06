import { Avatar, AvatarImage, AvatarFallback } from "@/shared/ui/avatar/avatar";
import React from "react";

export const AssistantAvatar = () => {
  return (
    <Avatar className="h-11 w-11">
      <AvatarFallback>IO</AvatarFallback>
    </Avatar>
  );
};
