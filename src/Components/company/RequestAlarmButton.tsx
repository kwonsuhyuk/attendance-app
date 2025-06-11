import React from "react";
import { Bell } from "lucide-react";

interface IRequestAlarmButtonProps {
  count: number;
  label?: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
}

const RequestAlarmButton = ({
  count,
  label = "요청",
  onClick,
  icon = <Bell className="h-4 w-4 text-red-500" />,
  className = "",
}: IRequestAlarmButtonProps) => {
  if (count === 0) return null;

  return (
    <button
      onClick={onClick}
      aria-label={`${label} ${count}건 알림`}
      className={`relative inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700 shadow hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800 ${className}`}
    >
      <span className="relative flex items-center gap-1">
        {icon}
        <span>{label}</span>
      </span>

      <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-600 px-1.5 text-xs font-bold text-white dark:bg-red-500">
        {count}
      </span>
    </button>
  );
};

export default RequestAlarmButton;
