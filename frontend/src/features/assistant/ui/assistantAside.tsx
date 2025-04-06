"use client";
import { chatSelectors } from "@/entities/chat/model/store/chatSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { ScrollArea } from "@/shared/ui/scrollArea/scrollArea";
import clsx from "clsx";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { useOpenChat } from "../hooks/useOpenChat";
import { deleteAccessToken } from "@/entities/token/libs/tokenService";
import { userSelectors } from "@/entities/user/models/store/userSlice";
import { ELocalStorageKeys } from "@/shared/libs/localStorageKeys";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutDashboard, LogOut } from "lucide-react";
import { AiLogo } from "@/shared/assets/aiLogo";

interface IAssistantAside {
  classname?: string;
}

export const AssistantAside: FC<IAssistantAside> = ({
  classname = "hidden md:flex",
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const commonChatsHistory = useAppSelector(chatSelectors.commonChatsHistory);
  const currentUser = useAppSelector(userSelectors.currentUser);
  const currentChatId = useAppSelector(chatSelectors.currentChatId);
  const pathname = usePathname();
  const { handleOpenChat } = useOpenChat();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = () => {
    if (currentUser) {
      deleteAccessToken();
      document.location.assign("/");
    } else {
      document.location.assign("/");
      localStorage.removeItem(ELocalStorageKeys.PERMANENT_AUTH);
    }
  };

  if (!isMounted) return null;

  return (
    <div
      suppressHydrationWarning
      className={clsx(
        "w-64  bg-zinc-800 text-white flex-col justify-between",
        classname
      )}
    >
      <div className="flex flex-col h-full">
        <div className="md:px-4 pl-3 md:pl-5 md:pt-6  text-xl font-semibold">
          <AiLogo />
        </div>

        <ScrollArea className="flex-1 md:px-2 pb-4 space-y-5">
          <div className="space-y-3 pb-4 pr-2">
            {pathname === "/" && (
              <div className="flex flex-col gap-1">
                {!!commonChatsHistory.length && (
                  <span className="px-3 text-xs font-semibold">Сегодня</span>
                )}
                <section className="pl-2 space-y-1">
                  {commonChatsHistory.map((history) => (
                    <button
                      key={history.id}
                      value={history.id}
                      className={clsx(
                        "block text-left w-full py-1 rounded-md px-3 outline-none ring-0",
                        Number(currentChatId) === Number(history.id)
                          ? "bg-neutral-600 "
                          : "hover:bg-neutral-600"
                      )}
                      onClick={handleOpenChat}
                    >
                      <p className="dark:text-zinc-300 text-[14px] text-zinc-600 line-clamp-1 break-words">
                        {history.title}
                      </p>
                    </button>
                  ))}
                </section>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="space-y-2 border-t border-slate-700 pt-2 pb-2 px-2">
          {pathname === "/" ? (
            <Link href="/dashboard">
              <button className="flex items-center w-full px-4 py-2 text-left rounded-lg hover:bg-neutral-700 transition-colors duration-200 group">
                <LayoutDashboard className="h-5 w-5 mr-3 text-neutral-400 group-hover:text-white" />
                <span className="text-neutral-200 text-sm group-hover:text-white">
                  Дэшборд
                </span>
              </button>
            </Link>
          ) : (
            <Link href="/">
              <button className="flex items-center w-full px-4 py-2 text-left rounded-lg hover:bg-neutral-700 transition-colors outline-none ring-0 duration-200 group">
                <Home className="h-5 w-5 mr-3 text-neutral-400 group-hover:text-white" />
                <span className="text-neutral-200 text-sm  group-hover:text-white">
                  Чат-бот
                </span>
              </button>
            </Link>
          )}
          {currentUser && (
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-left rounded-lg hover:bg-neutral-700 transition-colors duration-200 group text-red-400 hover:text-red-300"
            >
              <LogOut className="h-5 w-5 mr-3 text-red-400 group-hover:text-red-300" />
              <span className="text-sm ">Выйти</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
