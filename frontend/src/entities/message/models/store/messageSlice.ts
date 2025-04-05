import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../types/types";
import { rootReducer } from "@/shared/model/store";
import { IMessageSlice } from "../types/types";

const initialState: IMessageSlice = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "message-slice",
  initialState,
  selectors: {
    messages: (state) => state.messages,
  },
  reducers: (create) => ({
    setNewMessage: create.reducer(
      (state, { payload }: PayloadAction<IMessage>) => {
        state.messages.push(payload);
      }
    ),
    resetMessage: create.reducer((state) => {
      state.messages = [];
    }),
    setChatMessages: create.reducer(
      (state, { payload }: PayloadAction<Array<IMessage>>) => {
        state.messages = payload;
      }
    ),
  }),
}).injectInto(rootReducer);

export const messageActions = messageSlice.actions;
export const messageSelectors = messageSlice.selectors;
