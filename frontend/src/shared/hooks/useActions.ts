import { messageActions } from "@/entities/message/models/store/messageSlice";
import { socketActions } from "@/entities/socket/model/store/socketSlice";
import { userActions } from "@/entities/user/models/store/userSlice";
import { viewerActions } from "@/entities/viewer/model/store/viewerSlice";
import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(
    {
      ...socketActions,
      ...messageActions,
      ...viewerActions,
      ...userActions,
    },
    dispatch
  );
};
