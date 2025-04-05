import { ScrollArea } from "@/shared/ui/scrollArea/scrollArea";
import clsx from "clsx";
import Image from "next/image";
import React, { FC } from "react";

interface IAssistantAside {
  classname?: string;
}

export const AssistantAside: FC<IAssistantAside> = ({
  classname = "hidden md:flex",
}) => {
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
            <div className="flex flex-col gap-1">
              <span className="px-3 text-sm">Today</span>
              <section className="pl-2">
                <button className="block text-left w-full py-1 hover:bg-neutral-600 rounded-md px-3">
                  Get Started
                </button>
                <button className="block text-left w-full py-1 px-3 hover:bg-neutral-600 rounded-md">
                  Get Started
                </button>
              </section>
            </div>
            <div className="flex flex-col gap-1">
              <span className="px-3 text-sm">Today</span>
              <section className="pl-2">
                <button className="block text-left w-full py-1 hover:bg-neutral-600 rounded-md px-3">
                  Get Started
                </button>
                <button className="block text-left w-full py-1 px-3 hover:bg-neutral-600 rounded-md">
                  Get Started
                </button>
              </section>
            </div>
            <div className="flex flex-col gap-1">
              <span className="px-3 text-sm">Today</span>
              <section className="pl-2">
                <button className="block text-left w-full py-1 hover:bg-neutral-600 rounded-md px-3">
                  Get Started
                </button>
                <button className="block text-left w-full py-1 px-3 hover:bg-neutral-600 rounded-md">
                  Get Started
                </button>
              </section>
            </div>
            <div className="flex flex-col gap-1">
              <span className="px-3 text-sm">Today</span>
              <section className="pl-2">
                <button className="block text-left w-full py-1 hover:bg-neutral-600 rounded-md px-3">
                  Get Started
                </button>
                <button className="block text-left w-full py-1 px-3 hover:bg-neutral-600 rounded-md">
                  Get Started
                </button>
              </section>
            </div>
          </div>
        </ScrollArea>

        <div className="px-4 py-4 space-y-2 border-t border-slate-700">
          <button className="block text-left w-full">Dashboard</button>
          <button className="block text-left w-full">Logout</button>
        </div>
      </div>
    </aside>
  );
};
