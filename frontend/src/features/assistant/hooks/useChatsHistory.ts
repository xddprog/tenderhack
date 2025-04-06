import { getHistoryChat } from "@/entities/chat/model/libs/chatService";
import { IHistoryChats } from "@/entities/chat/types/types";
import { userSelectors } from "@/entities/user/models/store/userSlice";
import { useActions } from "@/shared/hooks/useActions";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { useWebSocketEvents } from "@/shared/hooks/useSocketEvents";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useChatHistory = () => {
  const { setChatsHistory, setNewChatHistory } = useActions();
  const currentUser = useAppSelector(userSelectors.currentUser);

  const { data, isSuccess } = useQuery({
    queryKey: ["chats-history", currentUser],
    queryFn: getHistoryChat,
    enabled: !!currentUser,
  });

  useEffect(() => {
    if (isSuccess && data.length) {
      setChatsHistory(data);
    }
  }, [isSuccess]);

  useWebSocketEvents("chatTitleMessage", (data: IHistoryChats) => {
    setNewChatHistory(data);
  });
};
