"use client";
import { userSelectors } from "@/entities/user/models/store/userSlice";
import { AnalyticsList } from "@/features/analytics/ui/analyticsLIst";
import { ArrowDown, ArrowUp, Menu, User2Icon } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/sheet/sheet";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { DialogTitle } from "@/shared/ui/dialog/dialog";
import { AssistantAside } from "@/features/assistant/ui/assistantAside";

const DashboardPage = () => {
  const currentUser = useAppSelector(userSelectors.currentUser);
  return (
    <div className="bg-neutral-900 h-full text-white">
      <section className="border-b border-neutral-500 space-x-2 h-[61px] flex items-center justify-beetwen px-5">
        <Sheet>
          <DialogTitle className="sr-only">Mobile toggle</DialogTitle>
          <SheetTrigger asChild>
            <div className="w-full">
              <Menu className="w-6 h-6 text-zinc-400 cursor-pointer mr-2 md:hidden" />
            </div>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 bg-neutral-800 flex gap-0 w-[300px] max-w-[90vw]"
          >
            <AssistantAside classname="flex" />
          </SheetContent>
        </Sheet>
        <div className="flex items-center space-x-3">
          <h2 className="font-semibold text-sm text-zinc-400">
            {currentUser?.email.split("@")[0]}
          </h2>
          <div className="bg-zinc-800/70 p-1.5 rounded-full cursor-pointer">
            <User2Icon className="text-zinc-400" />
          </div>
        </div>
      </section>
      <AnalyticsList />
      <div className="bg-neutral-800 rounded-lg mx-6 p-6 shadow-lg">
        <h3 className="text-xl font-semibold mb-4">
          Общая статистика запросов
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <p className="text-neutral-400 text-sm">Всего запросов</p>
            <p className="text-2xl font-bold">247</p>
            <p className="text-green-500 text-sm flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" /> 12% за час
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-neutral-400 text-sm">Среднее время ответа</p>
            <p className="text-2xl font-bold">8.2 сек</p>
            <p className="text-green-500 text-sm flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" /> Быстрее на 0.8 сек
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-neutral-400 text-sm">Удовлетворенность</p>
            <p className="text-2xl font-bold">87%</p>
            <p className="text-red-500 text-sm flex items-center">
              <ArrowDown className="h-4 w-4 mr-1" /> На 3% ниже
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-neutral-400 text-sm">Новые темы</p>
            <p className="text-2xl font-bold">14</p>
            <p className="text-green-500 text-sm flex items-center">
              <ArrowUp className="h-4 w-4 mr-1" /> 5 за час
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
