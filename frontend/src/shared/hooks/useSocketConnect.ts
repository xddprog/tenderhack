import { useEffect } from "react";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";
import { useChatCtx } from "./useChatCtx";

export const useSocketConnect = () => {
  const { connectionSocket } = useActions();
  const isConnected = useAppSelector(socketSelectors.isConnected);
  const socket = useAppSelector(socketSelectors.socket);
  const { chatId, userId } = useChatCtx();

  useEffect(() => {
    if (!isConnected) {
      connectionSocket({
        url: `chat?user_id=${userId}&chat_id=${chatId}`,
      });
    }

    if (socket instanceof WebSocket) {
      socket.onclose = () => {
        connectionSocket({
          url: `chat?user_id=${userId}&chat_id=${chatId}`,
        });
      };
    }

    return () => {
      if (socket instanceof WebSocket) {
        socket.onclose = null;
      }
    };
  }, [isConnected, socket, connectionSocket]);
};
