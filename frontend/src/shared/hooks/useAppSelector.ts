import { useSelector } from "react-redux";
import { RootState } from "../model/store";

export const useAppSelector = useSelector.withTypes<RootState>();
