import { setNewChat } from "@/entities/chat/model/libs/chatService";
import { messageSelectors } from "@/entities/message/models/store/messageSlice";
import { IMessage } from "@/entities/message/types/types";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { getAccessToken } from "@/entities/token/libs/tokenService";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useTransition } from "react";

export const useSendMessage = () => {
  const socket = useAppSelector(socketSelectors.socket);
  const messages = useAppSelector(messageSelectors.messages);
  const { setCurrentChatId, connectionSocket } = useActions();

  const [isPending, startTransition] = useTransition();

  const handleSendNewMessage = async ({
    content,
  }: {
    content: IMessage["content"];
  }) => {
    startTransition(async () => {
      if (!messages.length) {
        const newChat = await setNewChat();
        setCurrentChatId(newChat.id);
        connectionSocket({
          url: `chat/${newChat.id}?access_token=${getAccessToken()}`,
        });
      }

      if (socket) {
        socket.send(JSON.stringify({ content }));
      }
    });
  };

  return {
    isPending,
    handleSendNewMessage,
  };
};
