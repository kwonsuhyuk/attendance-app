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
  iconColor = "text-white",
  bgColor = "bg-point-color",
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
        "group relative flex flex-col justify-between rounded-xl border border-transparent bg-gradient-to-br from-white to-gray-100 p-4 shadow-sm transition hover:shadow-md hover:ring-1 hover:ring-point-color/30",
        "dark:from-zinc-900 dark:to-zinc-800 dark:hover:ring-zinc-600",
        link && "cursor-pointer",
      )}
    >
      {/* 데코 배경 요소 */}
      <div className="absolute inset-0 z-0 rounded-xl bg-point-color/5 transition group-hover:opacity-60" />

      {/* 상단 아이콘 */}
      <div
        className={clsx(
          "relative z-10 mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg",
          bgColor,
        )}
      >
        <Icon className={clsx("h-5 w-5", iconColor)} />
      </div>

      {/* 메인 콘텐츠 */}
      <div className="relative z-10 flex flex-col gap-0.5">
        <p className="text-xl font-bold text-gray-900 dark:text-white">
          {count !== undefined ? count : "-"}
        </p>
        <h2 className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</h2>
        {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>}
      </div>

      {/* 화살표 아이콘 */}
      {link && (
        <ArrowRight className="absolute bottom-3 right-3 z-10 h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-1 group-hover:text-point-color dark:text-zinc-500 dark:group-hover:text-white" />
      )}
    </div>
  );
};

export default SummaryCard;
