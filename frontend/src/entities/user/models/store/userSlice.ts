import {
  asyncThunkCreator,
  buildCreateSlice,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/model/store";
import { IUserSlice } from "../type/types";
import { getCurrentUser } from "../../libs/userService";

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

const initialState: IUserSlice = {
  currentUser: null,
};

export const userSlice = createSliceWithThunks({
  name: "user-slice",
  initialState,
  selectors: {
    currentUser: (state) => state.currentUser,
  },
  reducers: (create) => ({
    getCurrentUser: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        try {
          const currentUser = getCurrentUser();
          return currentUser;
        } catch (e) {
          return rejectWithValue(String(e));
        }
      },
      {
        fulfilled: (state, { payload }) => {
          state.currentUser = payload;
        },
      }
    ),
  }),
}).injectInto(rootReducer);

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
