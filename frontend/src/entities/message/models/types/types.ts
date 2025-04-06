import { IMessage } from "../../types/types";

export interface IMessageSlice {
  messages: Array<IMessage>;
  isTyping: null | number;
  isLoadingRepeat: boolean;
}
