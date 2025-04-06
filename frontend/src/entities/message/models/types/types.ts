import { IMessage } from "../../types/types";

export interface IMessageSlice {
  messages: Array<IMessage>;
  isTyping: boolean;
}
