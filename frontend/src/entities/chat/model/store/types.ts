import { IHistoryChats } from "../../types/types";

export interface IChatSlice {
  currentChatId: null | string;
  commonChatsHistory: Array<IHistoryChats>;
}
