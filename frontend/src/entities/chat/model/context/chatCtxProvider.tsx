import React, { FC, PropsWithChildren } from "react";
import { ChatCtx } from "./chatCtx";

export const ChatCtxProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ChatCtx.Provider
      value={{
        chatId: crypto.randomUUID(),
        userId: "26cdc4b2-866f-46f3-b732-b6dbadc52750",
      }}
    >
      {children}
    </ChatCtx.Provider>
  );
};
