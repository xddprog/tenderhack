import { useEffect } from "react";
import { useAppSelector } from "./useAppSelector";
import { socketSelectors } from "@/entities/socket/model/store/socketSlice";

export const useWebSocketEvents = <T>(
  eventType: string,
  callback: (data: T) => void
) => {
  const socket = useAppSelector(socketSelectors.socket);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const parsedData = JSON.parse(event.data);
        if (parsedData.event === eventType) {
          callback(parsedData);
        }
      } catch (error) {
        console.error("Ошибка при парсинге сообщения:", error);
      }
    };

    socket.addEventListener("message", handleMessage);

    return () => {
      socket.removeEventListener("message", handleMessage);
    };
  }, [socket, eventType, callback]);
};
