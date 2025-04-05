import { axiosAuth } from "@/shared/api/baseQueryInstanse";
import { IHistoryChats } from "../../types/types";
import { IMessage } from "@/entities/message/types/types";

class ChatService {
  private static instance: ChatService;

  public static getInstance(): ChatService {
    if (!ChatService.instance) {
      ChatService.instance = new ChatService();
    }

    return ChatService.instance;
  }

  public async getHistoryChat(): Promise<Array<IHistoryChats>> {
    const { data } = await axiosAuth.get<Array<IHistoryChats>>("user/chats");

    return data;
  }

  public async setNewChat(): Promise<IHistoryChats> {
    const { data } = await axiosAuth.post<IHistoryChats>("chat");
    return data;
  }

  public async getChatMessage({
    chatId,
  }: {
    chatId: string;
  }): Promise<Array<IMessage>> {
    const { data } = await axiosAuth.get<Array<IMessage>>(
      `chat/${chatId}/messages`
    );
    return data;
  }
}

export const { getHistoryChat, setNewChat, getChatMessage } =
  ChatService.getInstance();
