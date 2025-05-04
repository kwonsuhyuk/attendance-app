import React from "react";
import { LucideIcon, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SummaryCardProps = {
  title: string;
  count?: number | string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
  borderColor?: string;
  link?: string;
};

const SummaryCard = ({
  title,
  count,
  subtitle,
  icon: Icon,
  iconColor = "text-white",
  bgColor = "bg-point-color",
  borderColor = "border-point-color",
  link,
}: SummaryCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) navigate(link);
  };

  return (
    <div
      onClick={handleClick}
      className={`group flex items-center gap-4 rounded-xl border border-solid ${borderColor} bg-white px-5 py-4 shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-900 ${
        link ? "cursor-pointer" : ""
      }`}
    >
      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${bgColor}`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h2>
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {count !== undefined ? count : "-"}
        </p>
        {subtitle && <span className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</span>}
      </div>
      {link && (
        <ArrowRight className="h-4 w-4 text-gray-400 transition group-hover:translate-x-1 group-hover:text-gray-600 dark:text-zinc-400 dark:group-hover:text-white" />
      )}
    </div>
  );
};

export default SummaryCard;
