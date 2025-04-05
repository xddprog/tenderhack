"use client";

import React, { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { store } from "../model/store";
import ModalProvider from "./modalProvider";
import { AuthProvider } from "./authProvider";
import { queryClient } from "../api/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import SocketProvider from "./socketProvider";

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
          <SocketProvider>
            <AuthProvider />
            <ModalProvider />
            {children}
          </SocketProvider>
      </Provider>
    </QueryClientProvider>
  );
};
