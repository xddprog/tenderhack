import { useEffect } from "react";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { getAccessToken } from "@/entities/token/libs/tokenService";
import { chatSelectors } from "@/entities/chat/model/store/chatSlice";

export const useSocketConnect = () => {
  const { connectionSocket } = useActions();
  const isConnected = useAppSelector(socketSelectors.isConnected);
  const socket = useAppSelector(socketSelectors.socket);
  const currentChatId = useAppSelector(chatSelectors.currentChatId);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!currentChatId) return;

    const accessToken = getAccessToken();

    if (!isConnected) {
      connectionSocket({
        url: `chat/${currentChatId}?access_token=${accessToken}`,
      });
    }

    if (socket instanceof WebSocket) {
      socket.onclose = () => {
        connectionSocket({
          url: `chat/${currentChatId}?access_token=${accessToken}`,
        });
      };
    }

    return () => {
      if (socket instanceof WebSocket) {
        socket.onclose = null;
      }
    };
  }, [isConnected, socket, connectionSocket, currentChatId]);
};
