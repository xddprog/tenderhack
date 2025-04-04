import { EModalVariables } from "@/shared/libs/modalVariables";

export interface IViewerSlice {
  isOpen: boolean;
  selectType: EModalVariables | null;
}
