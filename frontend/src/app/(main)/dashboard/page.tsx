"use client";
import { userSelectors } from "@/entities/user/models/store/userSlice";
import { AnalyticsList } from "@/features/analytics/ui/analyticsLIst";
import { useAppSelector } from "@/shared/hooks/useAppSelector";
import { User2Icon } from "lucide-react";

const DashboardPage = () => {
  const currentUser = useAppSelector(userSelectors.currentUser);
  return (
    <div className="bg-neutral-900 h-full text-white">
      <section className="border-b border-zinc-400 space-x-2 h-[64px] flex items-center justify-end px-6">
        <h2 className="font-semibold text-sm text-zinc-400">
          {" "}
          {currentUser?.email.split("@")[0]}
        </h2>
        <div className="bg-zinc-800/70 p-1.5 rounded-full cursor-pointer">
          <User2Icon className="text-zinc-400" />
        </div>
      </section>
      <AnalyticsList />
    </div>
  );
};

export default DashboardPage;
