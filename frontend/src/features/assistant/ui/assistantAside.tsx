"use client";
import { chatSelectors } from "@/entities/chat/model/store/chatSlice";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { ScrollArea } from "@/shared/ui/scrollArea/scrollArea";
import clsx from "clsx";
import Image from "next/image";
import React, { FC } from "react";
import { useOpenChat } from "../hooks/useOpenChat";
import { deleteAccessToken } from "@/entities/token/libs/tokenService";
import { userSelectors } from "@/entities/user/models/store/userSlice";
import { ELocalStorageKeys } from "@/shared/libs/localStorageKeys";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface IAssistantAside {
  classname?: string;
}

export const AssistantAside: FC<IAssistantAside> = ({
  classname = "hidden md:flex",
}) => {
  const commonChatsHistory = useAppSelector(chatSelectors.commonChatsHistory);
  const currentUser = useAppSelector(userSelectors.currentUser);
  const currentChatId = useAppSelector(chatSelectors.currentChatId);
  const pathname = usePathname();
  const { handleOpenChat } = useOpenChat();

  const handleLogout = () => {
    if (currentUser) {
      deleteAccessToken();
      document.location.reload();
    } else {
      document.location.reload();
      localStorage.removeItem(ELocalStorageKeys.PERMANENT_AUTH);
    }
  };
  return (
    <aside
      className={clsx(
        "w-64  bg-zinc-800 text-white flex-col justify-between",
        classname
      )}
    >
      <div className="flex flex-col h-full">
        <div className="md:px-4 md:pt-6  text-xl font-semibold">
          <Image
            src={"/image/logo.png"}
            alt="logo-company"
            width={163}
            height={36}
          />
        </div>

        <ScrollArea className="flex-1 md:px-2 pb-4 space-y-5">
          <div className="space-y-3 pb-4">
            {pathname === "/" && (
              <div className="flex flex-col gap-1">
                {!!commonChatsHistory.length && (
                  <span className="px-3 text-sm">Сегодня</span>
                )}
                <section className="pl-2 space-y-1">
                  {commonChatsHistory.map((history) => (
                    <button
                      key={history.id}
                      value={history.id}
                      className={clsx(
                        "block text-left w-full py-1 rounded-md px-3",
                        Number(currentChatId) === Number(history.id)
                          ? "bg-neutral-600 "
                          : "hover:bg-neutral-600"
                      )}
                      onClick={handleOpenChat}
                    >
                      <p className="dark:text-zinc-300 text-zinc-600 line-clamp-1 break-words">
                        {history.title}
                      </p>
                    </button>
                  ))}
                </section>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="space-y-1  border-t border-slate-700">
          {pathname === "/" ? (
            <Link href={"/dashboard"}>
              <button className="block px-4 hover:bg-neutral-600  py-2  text-left w-full">
                Дэшборд
              </button>
            </Link>
          ) : (
            <Link href={"/"}>
              <button className="block px-4 hover:bg-neutral-600  py-2  text-left w-full">
                Чат-бот
              </button>
            </Link>
          )}

          <button
            className="block px-4 py-2 hover:bg-neutral-600  text-left w-full"
            onClick={handleLogout}
          >
            Выйти
          </button>
        </div>
      </div>
    </aside>
  );
};
