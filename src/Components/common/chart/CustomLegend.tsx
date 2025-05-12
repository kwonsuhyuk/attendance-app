import { VACATION_TYPE_COLOR_MAP } from "@/constants/chartColor";
import React from "react";
import { twMerge } from "tailwind-merge";

interface CustomLegendProps {
  payload: { value: { name: string; value: number }; color: string }[];
  total: number;
  className?: string;
}

export const CustomLegend = ({ payload, total, className }: CustomLegendProps) => {
  return (
    <ul
      className={twMerge("mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm", className)}
    >
      {payload.map((entry, index) => {
        const { name, value } = entry.value;
        const percent = ((value / total) * 100).toFixed(1);
        return (
          <li key={index} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: entry.color }} />
            <span className="text-gray-700 dark:text-white">{name}</span>
            <span className="text-xs text-gray-500 dark:text-gray-300">{`${value}명 (${percent}%)`}</span>
          </li>
        );
      })}
    </ul>
  );
};

export const CustomBarLegend = () => {
  return (
    <ul className="flex flex-wrap justify-end gap-4 text-sm text-gray-700 dark:text-white">
      {Object.entries(VACATION_TYPE_COLOR_MAP).map(([name, color]) => (
        <li key={name} className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: color }} />
          <span>{name}</span>
        </li>
      ))}
    </ul>
  );
};
