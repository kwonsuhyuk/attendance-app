import { X } from "lucide-react";

interface NoticeCardProps {
  title: string;
  content: string;
  createdAt: string;
  onDelete?: () => void;
  onClick?: () => void;
  noticeType?: "중요" | "일반";
}

const NoticeCard = ({
  title,
  content,
  createdAt,
  onDelete,
  onClick,
  noticeType,
}: NoticeCardProps) => {
  const firstLine = content.split("\n").find(line => line.trim()) ?? "";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer self-start rounded-md border border-white-border bg-white-card-bg p-5 shadow-md transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-dark-border dark:bg-dark-card-bg"
      data-tour="notice-2"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          {noticeType === "중요" && (
            <span className="rounded text-sm font-semibold text-red-500">[중요]</span>
          )}
          <h3 className="text-base font-semibold text-white-text dark:text-dark-text">{title}</h3>
        </div>

        {onDelete && (
          <button
            onClick={e => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-muted-foreground hover:text-destructive"
            aria-label="삭제"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <p
        className="my-4 line-clamp-1 pr-5 text-sm text-muted-foreground"
        style={{ whiteSpace: "pre-line" }}
      >
        {firstLine}
      </p>

      <div className="mt-2 flex items-center text-xs text-muted-foreground">
        <span>{createdAt?.split("T")[0] ?? "-"}</span>
      </div>
    </div>
  );
};

export default NoticeCard;
