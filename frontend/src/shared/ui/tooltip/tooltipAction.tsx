interface IActionTooltip {
  label: string;
  children: React.ReactNode;
  side: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
}

import React, { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

const TooltipAction: FC<IActionTooltip> = ({
  align,
  children,
  label,
  side,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="bg-zinc-900/90 border-none"
        >
          <p className="font-semibold  text-white text-sm capitalize">
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipAction;
