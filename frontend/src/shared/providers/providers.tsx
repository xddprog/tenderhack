"use client";

import React, { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../model/store";
import { ChatCtxProvider } from "@/entities/chat/model/context/chatCtxProvider";
import ModalProvider from "./modalProvider";
import { AuthProvider } from "./authProvider";
import { queryClient } from "../api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ChatCtxProvider>
          {/* <SocketProvider> */}
          <AuthProvider />
          <ModalProvider />
          {children}
          {/* </SocketProvider> */}
        </ChatCtxProvider>
      </Provider>
    </QueryClientProvider>
  );
};
