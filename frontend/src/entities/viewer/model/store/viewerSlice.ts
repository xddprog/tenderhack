import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "@/shared/model/store";
import { IViewerSlice } from "../types/types";
import { EModalVariables } from "@/shared/libs/modalVariables";

const initialState: IViewerSlice = {
  selectType: null,
  isOpen: false,
};

export const viewerSlice = createSlice({
  name: "viewer-slice",
  initialState,
  selectors: {
    selectType: (state) => state.selectType,
    isOpen: (state) => state.isOpen,
  },
  reducers: (create) => ({
    setOpen: create.reducer(
      (
        state,
        { payload }: PayloadAction<{ type: EModalVariables; isOpen: boolean }>
      ) => {
        state.isOpen = payload.isOpen;
        state.selectType = payload.type;
      }
    ),
    setClose: create.reducer((state, { payload }: PayloadAction<boolean>) => {
      state.isOpen = false;
      state.selectType = null;
    }),
  }),
}).injectInto(rootReducer);

export const viewerActions = viewerSlice.actions;
export const viewerSelectors = viewerSlice.selectors;
