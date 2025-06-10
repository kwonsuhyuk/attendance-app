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

  const isAlert = count > 0;
  const baseStyle =
    "flex items-center gap-1 rounded-md px-2 py-1 text-sm  font-medium transition-colors";
  const alertStyle = "bg-red-50 text-red-600 hover:bg-red-100";
  const normalStyle = "bg-gray-100 text-gray-600 hover:bg-gray-200";

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${isAlert ? alertStyle : normalStyle} ${className}`}
    >
      {icon}
      {label} ({count})
    </button>
  );
};

export default RequestAlarmButton;
