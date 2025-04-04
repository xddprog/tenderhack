import { viewerSelectors } from "@/entities/viewer/model/store/viewerSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import { uniqueModal } from "../libs/modalVariables";

const ModalProvider = () => {
  const type = useAppSelector(viewerSelectors.selectType);

  if (!type) return null;

  return uniqueModal[type];
};

export default ModalProvider;
