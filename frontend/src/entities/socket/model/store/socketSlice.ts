import {
  asyncThunkCreator,
  buildCreateSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { SocketState } from "../../types/types";
import { rootReducer } from "@/shared/model/store";

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

export const initialState: SocketState = {
  socket: null,
  isConnected: false,
  error: "",
};

export const socketSlice = createSliceWithThunks({
  name: "socketSlice",
  initialState,
  selectors: {
    isConnected: (state) => state.isConnected,
    socket: (state) => state.socket,
    error: (state) => state.error,
  },
  reducers: (create) => ({
    connectionSocket: create.asyncThunk<
      WebSocket,
      { url: string },
      { rejectValue: string }
    >(
      async ({ url }, { rejectWithValue }) => {
        try {
          const socket = new WebSocket(
            `${process.env.NEXT_PUBLIC_WS_BASE_URL}${url}`
          );

          return socket;
        } catch (err) {
          return rejectWithValue(`${err}`);
        }
      },
      {
        pending: (state) => {
          state.isConnected = false;
          state.error = "";
        },
        fulfilled: (state, { payload }: PayloadAction<WebSocket>) => {
          console.log(payload);
          return {
            ...state,
            socket: payload,
            isConnected: true,
          };
        },
        rejected: (state) => {
          state.error = "No connection";
          state.isConnected = false;
        },
      }
    ),
    setWebSocket: create.reducer(
      (state, { payload }: PayloadAction<WebSocket>) => {
        state.socket = payload;
      }
    ),
  }),
}).injectInto(rootReducer);

export const socketReducer = socketSlice.reducer;
export const socketActions = socketSlice.actions;
export const socketSelectors = socketSlice.selectors;
