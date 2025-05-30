import { LucideIcon, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

interface SummaryCardProps {
  title: string;
  count?: number | string;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
  link?: string;
}

const SummaryCard = ({
  title,
  count,
  subtitle,
  icon: Icon,
  iconColor = "text-point-color",
  bgColor = "bg-point-color-sub",
  link,
}: SummaryCardProps) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (link) navigate(link);
  };

  return (
    <div
      onClick={handleClick}
      className={clsx(
        "group relative flex items-center gap-4 rounded-2xl border border-solid border-point-color bg-white p-4 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-point-color/30",
        "dark:bg-[#1f2b26] dark:hover:ring-white/20",
        link && "cursor-pointer",
      )}
    >
      {/* 아이콘 */}
      <div
        className={clsx("flex h-12 w-12 shrink-0 items-center justify-center rounded-xl", bgColor)}
      >
        <Icon className={clsx("h-5 w-5", iconColor)} />
      </div>

      {/* 텍스트 */}
      <div className="flex flex-col justify-center">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>}
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {count !== undefined ? count : "-"}
        </p>
      </div>

      {/* 화살표 */}
      {link && (
        <ArrowRight className="absolute right-5 h-4 w-4 text-point-color transition-transform group-hover:translate-x-1 dark:text-white" />
      )}
    </div>
  );
};

export default SummaryCard;
