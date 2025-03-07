import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import { twMerge } from "tailwind-merge";

interface ITooltipContainer {
  icon: React.ReactNode;
  contentText: string;
  className?: string;
}

const TooltipContainer = ({ icon, contentText, className }: ITooltipContainer) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="border-none bg-transparent">
          {icon}
        </TooltipTrigger>
        <TooltipContent className={twMerge(className, "text-xs")}>{contentText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipContainer;
