import { ChatCtx } from "@/entities/chat/model/context/chatCtx";
import { useContext } from "react";

export const useChatCtx = () => {
  const { chatId, userId } = useContext(ChatCtx);

  if (!chatId) throw new Error("chatId is required");

  return {
    userId,
    chatId,
  };
};
