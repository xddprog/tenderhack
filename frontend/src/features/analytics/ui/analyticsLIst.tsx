import { AnimatedCounter } from "@/features/viewer/ui/animatedCounter";
import { ArrowDown, ArrowUp } from "lucide-react";

const stats = [
  {
    title: "Вопросы по базе знаний",
    value: "14",
    trend: "down",
    count: 42,
  },
  {
    title: "Техническая поддержка",
    value: "5",
    trend: "down",
    count: 124,
  },
  {
    title: "Нерелевантный запрос",
    value: "27",
    trend: "up",
    count: 81,
  },
];

export const AnalyticsList = () => {
  return (
    <div className="grid grid-cols-1  p-6  md:grid-cols-3 gap-6">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-neutral-800 rounded-lg p-6 shadow-lg hover:bg-neutral-700 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-neutral-400 text-sm font-medium">
                {item.title}
              </h3>
              <div className="flex items-center mt-2">
                <AnimatedCounter value={item.value} />
                {item.trend === "up" ? (
                  <ArrowUp className="h-5 w-5 text-green-500" />
                ) : (
                  <ArrowDown className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>

            <div className="bg-neutral-700 rounded-full px-3 py-1">
              <span className="font-medium">{item.count}</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-700">
            <div className="h-2 bg-neutral-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-out ${
                  item.trend === "up" ? "bg-green-500" : "bg-red-500"
                }`}
                style={{
                  width: `${parseInt(item.value) * 3}%`,
                  transitionProperty: "width",
                }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
