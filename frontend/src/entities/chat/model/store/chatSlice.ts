import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/model/store";
import { IChatSlice } from "./types";

const initialState: IChatSlice = {
  currentChatId: null,
};

export const chatSlice = createSlice({
  name: "chat-slice",
  initialState,
  selectors: {
    currentChatId: (state) => state.currentChatId,
  },
  reducers: (create) => ({
    setCurrentChatId: create.reducer(
      (state, { payload }: PayloadAction<string>) => {
        state.currentChatId = payload;
      }
    ),
  }),
}).injectInto(rootReducer);

export const chatActions = chatSlice.actions;
export const chatSelectors = chatSlice.selectors;
