import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/model/store";
import { IChatSlice } from "./types";
import { IHistoryChats } from "../../types/types";

const initialState: IChatSlice = {
  currentChatId: null,
  commonChatsHistory: [],
};

export const chatSlice = createSlice({
  name: "chat-slice",
  initialState,
  selectors: {
    currentChatId: (state) => state.currentChatId,
    commonChatsHistory: (state) => state.commonChatsHistory,
  },
  reducers: (create) => ({
    setCurrentChatId: create.reducer(
      (state, { payload }: PayloadAction<string>) => {
        state.currentChatId = payload;
      }
    ),
    setChatsHistory: create.reducer(
      (state, { payload }: PayloadAction<Array<IHistoryChats>>) => {
        state.commonChatsHistory = payload;
      }
    ),
    setNewChatHistory: create.reducer(
      (state, { payload }: PayloadAction<IHistoryChats>) => {
        state.commonChatsHistory = [payload, ...state.commonChatsHistory];
      }
    ),
  }),
}).injectInto(rootReducer);

export const chatActions = chatSlice.actions;
export const chatSelectors = chatSlice.selectors;
