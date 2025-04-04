import { ScrollArea } from "@/shared/ui/scrollArea/scrollArea";
import clsx from "clsx";
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
        <div>
          <div className="px-4 py-6 text-xl font-semibold">VERSACC</div>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto px-2 space-y-5">
          <div className="space-y-3 pb-4">
            <div className="flex flex-col gap-2">
              <span className="px-3">Today</span>
              <section className="pl-2">
                <button className="block text-left w-full py-1 hover:bg-neutral-600 rounded-md px-3">
                  Get Started
                </button>
                <button className="block text-left w-full py-1 px-3 hover:bg-neutral-600 rounded-md">
                  Get Started
                </button>
              </section>
            </div>
            <div className="flex flex-col gap-2">
              <span className="px-3">Today</span>
              <section className="pl-2">
                <button className="block text-left w-full py-1 hover:bg-neutral-600 rounded-md px-3">
                  Get Started
                </button>
                <button className="block text-left w-full py-1 px-3 hover:bg-neutral-600 rounded-md">
                  Get Started
                </button>
              </section>
            </div>
            <div className="flex flex-col gap-2">
              <span className="px-3">Today</span>
              <section className="pl-2">
                <button className="block text-left w-full py-1 hover:bg-neutral-600 rounded-md px-3">
                  Get Started
                </button>
                <button className="block text-left w-full py-1 px-3 hover:bg-neutral-600 rounded-md">
                  Get Started
                </button>
              </section>
            </div>
            <div className="flex flex-col gap-2">
              <span className="px-3">Today</span>
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
