import React from "react";
import { TypeChatCtx } from "../../types/types";

export const ChatCtx = React.createContext<TypeChatCtx>({
  userId: "",
  chatId: "",
});
