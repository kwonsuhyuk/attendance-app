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
  if (count === 0) return 0;

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-100 ${className}`}
    >
      {icon}
      {label} ({count})
    </button>
  );
};

export default RequestAlarmButton;
