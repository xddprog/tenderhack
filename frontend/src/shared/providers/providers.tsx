"use client";

import React, { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../model/store";
import { ChatCtxProvider } from "@/entities/chat/model/context/chatCtxProvider";
import ModalProvider from "./modalProvider";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <ChatCtxProvider>
        {/* <SocketProvider> */}
        <ModalProvider />
        {children}
        {/* </SocketProvider> */}
      </ChatCtxProvider>
    </Provider>
  );
};
