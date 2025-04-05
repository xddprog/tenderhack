import { PropsWithChildren } from "react";
import { useSocketConnect } from "../hooks/useSocketConnect";

const SocketProvider = ({ children }: PropsWithChildren) => {
  return children;
};

export default SocketProvider;
