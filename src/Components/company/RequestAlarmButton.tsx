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
  icon = <Bell className="h-4 w-4" />,
  className = "",
}: IRequestAlarmButtonProps) => {
  if (count === 0) return null;

  return (
    <button
      onClick={onClick}
      aria-label={`${label} ${count}건 알림`}
      className={`group relative flex items-center gap-2 rounded-md bg-red-50 px-3 py-1 text-sm font-medium text-red-600 shadow-sm hover:bg-red-100 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-800 ${className}`}
    >
      {/* 아이콘 */}
      {icon}

      <span className="hidden sm:inline">
        {label} ({count})
      </span>

      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white sm:hidden">
        {count}
      </span>
    </button>
  );
};

export default RequestAlarmButton;
