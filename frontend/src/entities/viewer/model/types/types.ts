import { EModalVariables } from "@/shared/lib/modalVariables";

export interface IViewerSlice {
  isOpen: boolean;
  selectType: EModalVariables | null;
}
