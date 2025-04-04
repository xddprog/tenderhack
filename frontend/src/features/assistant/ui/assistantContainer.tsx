import clsx from "clsx";
import { FC, PropsWithChildren } from "react";

export const AssistantContainer: FC<PropsWithChildren> = ({ children }) => (
  <div
    className={clsx(
      "w-full h-screen md:h-[92%] bg-zinc-700 md:rounded-3xl  flex flex-col"
    )}
  >
    {children}
  </div>
);
