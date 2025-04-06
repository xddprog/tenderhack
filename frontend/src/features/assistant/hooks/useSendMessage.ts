import { setNewChat } from "@/entities/chat/model/libs/chatService";
import { chatSelectors } from "@/entities/chat/model/store/chatSlice";
import { messageSelectors } from "@/entities/message/models/store/messageSlice";
import { IMessage } from "@/entities/message/types/types";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { getAccessToken } from "@/entities/token/libs/tokenService";
import { userSelectors } from "@/entities/user/models/store/userSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useTransition } from "react";

export const useSendMessage = () => {
  const socket = useAppSelector(socketSelectors.socket);
  const messages = useAppSelector(messageSelectors.messages);
  const currentUser = useAppSelector(userSelectors.currentUser);
  const currentChatId = useAppSelector(chatSelectors.currentChatId);
  const { setCurrentChatId, setWebSocket, setIsLoadingRepeat } = useActions();

  const [isPending, startTransition] = useTransition();

  const handleSendNewMessage = async ({
    content,
  }: {
    content: IMessage["text"];
  }) => {
    startTransition(async () => {
      let currentSocket: WebSocket | null = null;
      let chatId = currentChatId;

      if (!messages.length) {
        const newChat = await setNewChat();
        chatId = newChat.id;
        currentSocket = new WebSocket(
          `${`ws://89.104.68.181/api/v1/chat/${
            newChat.id
          }?access_token=${getAccessToken()}`}`
        );

        currentSocket.onopen = () => {
          if (currentSocket) {
            setWebSocket(currentSocket);
            currentSocket!.send(JSON.stringify({ content }));
            setIsLoadingRepeat(true);
          }
        };

        currentSocket.onerror = (error) => {
          console.error("WebSocket error:", error);
        };

        setCurrentChatId(chatId);
      } else {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ content }));
          setIsLoadingRepeat(true);
        }
      }
    });
  };

  const handleSendMesssageNoAuth = ({
    content,
  }: {
    content: IMessage["text"];
  }) => {
    startTransition(async () => {
      let currentSocket: WebSocket | null = null;

      if (!messages.length) {
        const uuid = Math.random();
        currentSocket = new WebSocket(
          `${`ws://89.104.68.181/api/v1/chat/${uuid}`}`
        );

        currentSocket.onopen = () => {
          if (currentSocket) {
            setWebSocket(currentSocket);
            currentSocket!.send(JSON.stringify({ content }));
            setIsLoadingRepeat(true);
          }
        };

        currentSocket.onerror = (error) => {
          console.error("WebSocket error:", error);
        };
      }
    });
  };
  return {
    isPending,

    handleSendNewMessage: currentUser
      ? handleSendNewMessage
      : handleSendMesssageNoAuth,
  };
};
