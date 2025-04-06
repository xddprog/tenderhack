import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage } from "../../types/types";
import { rootReducer } from "@/shared/model/store";
import { IMessageSlice } from "../types/types";

const initialState: IMessageSlice = {
  messages: [],
  isTyping: null,
};

export const messageSlice = createSlice({
  name: "message-slice",
  initialState,
  selectors: {
    messages: (state) => state.messages,
    isTyping: (state) => state.isTyping,
  },
  reducers: (create) => ({
    setNewMessage: create.reducer(
      (state, { payload }: PayloadAction<IMessage>) => {
        if (!payload?.id || !payload.text) return;

        const messageIndex = state.messages.findIndex(
          (message) => message.id === payload.id
        );

        if (messageIndex !== -1) {
          const updatedMessages = [...state.messages];
          const existingMessage = updatedMessages[messageIndex];

          updatedMessages[messageIndex] = {
            ...existingMessage,
            text: `${existingMessage.text}${payload.text}`.trim(),
          };

          state.messages = updatedMessages;
        } else {
          state.messages = [...state.messages, payload];
        }
      }
    ),
    resetMessage: create.reducer((state) => {
      state.messages = [];
    }),
    toggleTyping: create.reducer(
      (state, { payload }: PayloadAction<null | number>) => {
        state.isTyping = payload;
      }
    ),
    setChatMessages: create.reducer(
      (state, { payload }: PayloadAction<Array<IMessage>>) => {
        state.messages = payload;
      }
    ),
    toggleReaction: create.reducer(
      (
        state,
        { payload }: PayloadAction<{ id: number; liked: boolean | null }>
      ) => {
        const messageIndex = state.messages.findIndex(
          (message) => message.id === payload.id
        );

        if (messageIndex !== -1) {
          const updatedMessages = [...state.messages];
          const existingMessage = updatedMessages[messageIndex];

          updatedMessages[messageIndex] = {
            ...existingMessage,
            liked: payload.liked,
          };
        }
      }
    ),
  }),
}).injectInto(rootReducer);

export const messageActions = messageSlice.actions;
export const messageSelectors = messageSlice.selectors;
